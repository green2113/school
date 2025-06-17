import { useState } from 'react';

import p1 from './assets/images/p1.png'

const candidates = {
    president: [
        { id: 'p1', name: '김지환', img: p1 },
        { id: 'p2', name: '허수빈', img: p1 },
        { id: 'p3', name: '박성현', img: p1 },
        { id: 'p4', name: '누군지몰라', img: p1 },
    ]
};

export default function VoteForm() {
    const [form, setForm] = useState({ president: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!form.president) {
            alert('한 명도 빠짐 없이 선택해 주세요.');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                alert('투표가 완료 되었습니다.');
                setForm({ president: '' });
            } else {
                alert('서버에 에러가 발생하였습니다.');
            }
        } catch {
            alert('네트워크 오류')
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <title>학생회 선거 | 투표</title>

            <h1 className="text-3xl mb-6">학생회 선거 투표</h1>
            <form onSubmit={handleSubmit} className="space-y-8">
                {Object.entries(candidates).map(([key, list]) => (
                    <section key={key}>
                        <h2 className="text-2xl mb-4">
                            {key === 'president' ? '2학년 회장' : "123"}
                        </h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            {list.map(c => (
                                <label key={c.id} className="flex flex-col items-center cursor-pointer">
                                    <input type="radio" name={key} value={c.id} checked={form[key] === c.id} onChange={handleChange} className="mb-2 sr-only peer" />
                                    <div className="flex flex-col items-center p-4 border-2 border-gray-300 rounded-lg peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:boder-gray-400 transition">
                                        <img src={c.img} alt={c.name} className="w-24 h-24 object-cover" />
                                        <hr className="w-24 h-2" />
                                        <span>{c.name}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </section>
                ))}
            <button type="submit" disabled={loading} className="mt-5 px-5 py-2 bg-blue-600 text-white rounded disabled:opacity-50">{loading ? '투표 중...' : '투표하기'}</button>
            </form>
        </div>
    )
}
import { Routes, Route } from 'react-router-dom';
import VoteForm from './components/VoteForm';
import Resulst from './components/Results';

import './App.css';

function App() {
  return (
    <div className="max-w-3xl mx-auto p-4 text-center">

      <Routes>
        <Route path='/' element={<VoteForm />} />
        <Route path='/results' element={<Resulst />} />
      </Routes>
    </div>
  );
}

export default App;

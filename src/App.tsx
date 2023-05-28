import { Route, Routes } from 'react-router-dom';
import { Niches } from './components';
import { Landing } from './pages';
import '@styles/App.scss';
import Form from '@pages/Form';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/form" element={<Form />} />
        <Route path="/niches" element={<Niches />} />
      </Routes>
    </>
  );
}

export default App;

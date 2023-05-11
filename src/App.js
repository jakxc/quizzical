import './App.css'
import Layout from './components/Layout';
import Home from './components/Home'
import Quiz from './components/Quiz';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="quiz" element={<Quiz />} />
          </Route>
        </Routes>
    </>
  );
}

export default App;

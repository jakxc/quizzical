import Home from './components/Home';
import Quiz from './components/Quiz';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
      </Routes>
      </div>
    </Router>
  );
}

export default App;

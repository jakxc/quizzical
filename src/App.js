import Home from './components/Home';
import Quiz from './components/Quiz';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/quiz" element={<Quiz />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

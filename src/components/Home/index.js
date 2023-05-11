import './index.css'
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className='home-container'>
            <h1 className='home-title'>Quizzical</h1>
            <h2 className='home-subtitle'>A simple React trivia game containing 5 questions related to a random category (Anime for now) </h2>
            <Link to="/quiz"><button className='home-btn'>Start Quiz</button></Link>
        </div>
    )
}

export default Home;
function Home(props)
{
    return (
        <div className='home-container'>
            <h1 className='home-title'>Quizzical</h1>
            <h2 className='home-subtitle'>A simple React trivia game containing 5 questions related to a random category (Anime for now) </h2>
            <button className='home-btn' onClick={props.startQuiz}>Start Quiz</button>
        </div>
    )
}

export default Home;
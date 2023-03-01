
import { useState, useEffect } from 'react';
import Home from './Home.js';
import QuizElement from './QuizElement.js'
import blob from './images/blob.png';

function Quiz()
{
    const [showStart, setShowStart] = useState(true)
    const [score, setScore] = useState(0)
    const [showAnswers, setShowAnswers] = useState(false)
    const [quizData, setQuizData] = useState([])
    const [allComplete, setAllComplete] = useState(false)
    
    function startQuiz()
    {      
        setShowStart(false)    
    }
    
    function playAgain()
    {
        setShowStart(true)
        setShowAnswers(false)
        setAllComplete(false)
    }
    
    function checkAnswers()
    {
        setShowAnswers(true)
    }
    
    function selectAnswer(event, questionID, optionID)
    {
        setQuizData(() => {
            return (
                quizData.map((item, id) => {
                if (questionID === id) {
                    return({...item, selectedAnswer: optionID})
                } else
                {
                    return(item)
                }
                
            }))
        })
    }
    
    useEffect(() => {
        var count = 0;
        for(var i = 0; i < quizData.length; i++)
        {
          if (typeof quizData[i].selectedAnswer !== 'undefined')
          {
            if(quizData[i].options[quizData[i].selectedAnswer] === quizData[i].correctAnswer)
            {
              count++;
            }
          }
        }
        setScore(count)
    }, [showAnswers])
    
    useEffect(() => {
        
        if(showStart === false) {
            
        fetch("https://opentdb.com/api.php?amount=5&category=31&difficulty=easy")
            .then(res => res.json())
            .then(data => setQuizData(data.results.map(item => {
                return({
                        question: item.question,
                        options: item.incorrect_answers.concat([item.correct_answer]).map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value),
                        selectedAnswer: undefined,
                        correctAnswer: item.correct_answer
                    })
            })))
            }
    }, [showStart])
    
    useEffect(() => { 
        setAllComplete(quizData.every(item => typeof item.selectedAnswer !== 'undefined'))
    }, [quizData])
    
    const quizElements = quizData.map((question, index) => {
        return(<QuizElement
                    key={index}
                    question={question}
                    showAnswers={showAnswers}
                    selectAnswer={selectAnswer}
                    id={index}
                />)
    })
    
    
    
    return (
        <div className='app'>
            {showStart ? <Home startQuiz={startQuiz}/> : 
                <div className='quiz-container'>
                    {quizElements}
                    {showAnswers ? 
                        <div className='score-container'>
                            <h3 className='score-text'>{"You scored " + score + "/5 correct answers "}</h3>
                            <button className='button' onClick={playAgain}>Play Again</button>
                        </div> 
                        :
                        <button className='button' disabled={!allComplete} onClick={checkAnswers}>Check Answers</button>}
                </div>}
            <img className='blob1' src={blob} alt=''/>
            <img className='blob2' src={blob} alt=''/>
        </div>
    )
}

export default Quiz
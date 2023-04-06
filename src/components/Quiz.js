
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { nanoid } from 'nanoid'
import QuizElement from './QuizElement.js'
import blob from './images/blob.png';

const Quiz = () =>
{
    const [score, setScore] = useState(0);
    const [showAnswers, setShowAnswers] = useState(false);
    const [quizData, setQuizData] = useState([]);
    const [allComplete, setAllComplete] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const checkAnswers = () =>
    {
        setShowAnswers(true)
    }
    
    const selectAnswer = (event, questionID, optionID) =>
    {
        setQuizData(() => {
            return (
                quizData.map((item) => {
                    if (questionID === item.id) {
                        return {...item, selectedAnswer: optionID}
                    } else
                    {
                        return item
                    }     
            }))
        })
    }

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      
          // swap elements array[i] and array[j]
          [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }
    
    useEffect(() => {
        let currScore = 0;
        for (let i = 0; i < quizData.length; i++) {
            let quizElement = quizData[i];
            if (quizElement.selectedAnswer !== undefined) {   
                let selectedAnswer = "";
                for (let j = 0; j < quizElement.options.length; j++) {
                    if (quizElement.options[j].id === quizElement.selectedAnswer) {
                        selectedAnswer = quizElement.options[j].optionText;
                    }
                }
                if (selectedAnswer === quizElement.correctAnswer) {
                    currScore++;
                }
            }
        }
        setScore(currScore)
    }, [showAnswers])
    
    useEffect(() => { 
        setLoading(true);
        fetch("https://opentdb.com/api.php?amount=5&category=31&difficulty=easy&encode=url3986")
            .then(res => res.json())
            .then(data => setQuizData(data.results.map(item => {
                return({
                        id: nanoid(),
                        question: item.question,
                        options: shuffle(item.incorrect_answers.concat([item.correct_answer])).map(item => {return { id: nanoid(), optionText: item }}),
                        selectedAnswer: undefined,
                        correctAnswer: item.correct_answer
                    })
            })))
            .then(() => setLoading(false))
            .catch(error => setError(error))
    }, [])
    
    useEffect(() => { 
        setAllComplete(quizData.every(item => typeof item.selectedAnswer !== 'undefined'))
    }, [quizData])
    
    const quizElements = quizData.map(item => {
        return (<QuizElement
                    key={item.id}
                    data={item}
                    showAnswers={showAnswers}
                    selectAnswer={selectAnswer}
                    id={item.id}
                />)
    })
    
    return (
        <div className='app'>
            {loading && <h1>Loading...</h1>}
            {error && <pr>{JSON.stringify(error)}</pr>}
            {!loading && !error && <div className='quiz-container'>
                {quizElements}
                {showAnswers ? 
                    <div className='score-container'>
                        <h3 className='score-text'>{"You scored " + score + "/5 correct answers "}</h3>
                        <Link to="/"><button className='button'>Play Again</button></Link>
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
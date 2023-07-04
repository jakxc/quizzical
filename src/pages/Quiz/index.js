
import './index.css'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { nanoid } from 'nanoid'
import QuizElement from '../../components/QuizElement'

const Quiz = () => {
    const [score, setScore] = useState(0);
    const [showAnswers, setShowAnswers] = useState(false);
    const [quizData, setQuizData] = useState([]);
    const [allComplete, setAllComplete] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const checkAnswers = () => {
        setShowAnswers(true)
    }
    
    const selectAnswer = (event, questionID, optionID) => {
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
    }, [showAnswers, quizData])
    
    useEffect(() => { 
        setLoading(true);
        fetch("https://opentdb.com/api.php?amount=5&category=31&difficulty=easy&encode=url3986")
            .then(res => res.json())
            .then(data => setQuizData(data.results.map(item => {
                const shuffledOptions = shuffle(item.incorrect_answers.concat([item.correct_answer]))
                                        .map(item => {
                                            return { id: nanoid(), optionText: item }
                                        });
                return({
                        id: nanoid(),
                        question: item.question,
                        options: shuffledOptions,
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
        <>
            {loading && <pre>Loading...</pre>}
            {error && <pr>{JSON.stringify(error)}</pr>}
            {!loading
                && !error 
                && <div className='quiz'>
                        {quizElements}
                        {showAnswers  
                            ? <div className='quiz__score'>
                                <h3 className='quiz__score__text'>{"You scored " + score + "/5 correct answers "}</h3>
                                <Link to="/"><button className='quiz__btn'>Play Again</button></Link>
                            </div> 
                            : <button className='quiz__btn' disabled={!allComplete} onClick={checkAnswers}>Check Answers</button>}
                    </div>
            }
        </>
    )
}

export default Quiz
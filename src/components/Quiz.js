import { useState, useEffect } from "react";
import QuizElement from "./QuizElement";
import { nanoid } from 'nanoid';

function Quiz()
{
    const [quizData, setQuizData] = useState([]);
    
    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&category=31&difficulty=easy")
        .then(res => res.json())
        .then(data => setQuizData(data.results.map(item => {
            return {
                id: nanoid(),
                question: item.question,
                incorrectAnswers: item.incorrect_answers,
                correctAnswer: item.correct_answer,
                selectedAnswer: ""
            }
        })))
    }, [])


    const quizElements = quizData.map(item => {
        return <QuizElement 
                    key={item.id}
                    id={item.id}
                    question={item.question}
                    correctAnswer={item.correctAnswer}
                    incorrectAnswers = {item.incorrectAnswers}
                />
    })
    
    return(
        <main>
            {quizElements}
        </main>
    )
}

export default Quiz

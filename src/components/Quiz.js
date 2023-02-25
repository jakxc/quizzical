import { useState, useEffect } from "react";
import QuizElement from "./QuizElement";
import {nanoid} from 'nanoid';

function Quiz()
{
    const [quizData, setQuizData] = useState([])

    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&category=31&difficulty=easy")
        .then(res => res.json())
        .then(data => setQuizData(data.results))
    }, [])

    const questionElements = quizData.map(item => {
        return <QuizElement 
                    key={nanoid()}
                    question={item.question}
                    correctAnswer={item.correct_answer}
                    incorrectAnswers={item.incorrect_answers}
                />
    })
    
    return(
        <div>
            {questionElements}
        </div>
    )
}

export default Quiz

import { useState, useEffect } from "react";
import QuizElement from "./QuizElement";
import {nanoid} from 'nanoid';

function Quiz()
{
    const [quizData, setQuizData] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([])

    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&category=31&difficulty=easy")
        .then(res => res.json())
        .then(data => setQuizData(data.results))
    }, [])

    const questionElements = quizData.map(item => {
        item.incorrect_answers.unshift(item.correct_answer);
        return <QuizElement 
                    key={nanoid()}
                    question={item.question}
                    correctAnswer={item.correct_answer}
                    options = {item.incorrect_answers}
                />
    })
    
    return(
        <main>
            {questionElements}
        </main>
    )
}

export default Quiz

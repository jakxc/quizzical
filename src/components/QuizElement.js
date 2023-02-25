import { useEffect } from "react"

function QuizElement(props)
{

    const options = []
    
    return(
        <div>
            <h4>{props.question}</h4>
            <button>{props.correctAnswer}</button>
        </div>
    )
}

export default QuizElement
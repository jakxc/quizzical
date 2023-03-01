function QuizElement(props)
{    
    function styleButton(option, index){
        if (props.showAnswers)
        {
            if (props.question.correctAnswer === option)
            {
                return {
                    backgroundColor: "#94D7A2"
                }
            } else if(props.question.selectedAnswer === index)
            {
                return {
                    backgroundColor: "#F8BCBC"
                }
            } else
            {
                return {
                    backgroundColor: "#F5F7FB"
                }
            }
        }else 
        {
            return (props.question.selectedAnswer === index ? {backgroundColor: "#D6DBF5"} : {backgroundColor: "#F5F7FB"})
        }
    }
    
    const optionElements = props.question.options.map((option, index) => 
        <button
            key={index}
            onClick={(event) => props.selectAnswer(event, props.id, index)}
            style={styleButton(option, index)}
            disabled={props.showAnswers}
            className='quiz-option'
        >{decodeURIComponent(option)}
        </button>
    )
        
    return(<div className='quiz-question-container' >
        <h1 className='quiz-question'>{decodeURIComponent(props.question.question)}</h1>
        <div className='quiz-options-container'>{optionElements}</div>
        <hr className='quiz-divider' />
    </div>)
}

export default QuizElement
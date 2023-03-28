const QuizElement = (props) =>
{    
    function styleButton(option, id){
        if (props.showAnswers)
        {
            if (props.data.correctAnswer === option)
            {
                return {
                    backgroundColor: "#94D7A2"
                }
            } else if (props.data.selectedAnswer === id)
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
        } else 
        {
            return (props.data.selectedAnswer === id ? {backgroundColor: "#D6DBF5"} : {backgroundColor: "#F5F7FB"})
        }
    }
    
    const optionElements = props.data.options.map(item => 
        <button
            key={item.id}
            onClick={(event) => props.selectAnswer(event, props.id, item.id)}
            style={styleButton(item.optionText, item.id)}
            disabled={props.showAnswers}
            className='quiz-option'
        >{decodeURIComponent(item.optionText)}
        </button>
    )
        
    return(<div className='quiz-question-container' >
        <h1 className='quiz-question'>{decodeURIComponent(props.data.question)}</h1>
        <div className='quiz-options-container'>{optionElements}</div>
        <hr className='quiz-divider' />
    </div>)
}

export default QuizElement
import { nanoid } from 'nanoid'

function QuizElement(props)
{
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      
          // swap elements array[i] and array[j]
          // we use "destructuring assignment" syntax to achieve that
          // you'll find more details about that syntax in later chapters
          // same can be written as:
          // let t = array[i]; array[i] = array[j]; array[j] = t
          [array[i], array[j]] = [array[j], array[i]];
        }

        return array
      } 

    const shuffledOptions = shuffle(props.options);
        
    const optionElements = shuffledOptions.map(item => {
        return <div key={nanoid()} className="quiz-option">{item}</div>
    })

    return(
        <div>
            <h4 className="quiz-question">{props.question}</h4>
            <div className="quiz-options-container">{optionElements}</div>
        </div>
    )
}

export default QuizElement
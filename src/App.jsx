import { useEffect, useState } from "react"

const generateRandomColor = () => {
  const digits = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F'
  ]
  const generatedColorCode = new Array(6)
  .fill('')
  .map(() => digits[Math.floor(Math.random() * digits.length )]).join('')
  return `#${generatedColorCode}`
}

const App = () => {
  const [correctAnswer,setCorrectAnswer] = useState('')
  const [answers,setAnswers] = useState([])
  const [isCorrect,setIsCorrect] = useState(undefined)
  const [points,setPoints] = useState(0)
  console.log(correctAnswer, isCorrect);

  const pickColor = () => {
    const actualColor = generateRandomColor()
    setCorrectAnswer(actualColor)
    setAnswers([actualColor, generateRandomColor(), generateRandomColor()]
    .sort(() => 0.5 - Math.random()))
  }

  const checkAns = (item) => {

    if(item === correctAnswer){
        setIsCorrect(true)
        setPoints(points + 10)
        pickColor()
      }else{
        setPoints(points - 10)
        setIsCorrect(false)
      }
  }

  useEffect(() => {
    pickColor()
  }, [])

  // style section
  const mainDivStyle ={
    width : '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b9b9b9ede'
  }
  const colorGameDiv = {
    width : '400px',
    height: '200px',
    backgroundColor: `${correctAnswer}`
  }
  const buttonDiv = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop:"40px"
  }
  const buttons = {
    padding:'5px 20px',
    width:'100px',
    outline:"none",
  }

  const wrongDiv = {
    textAlign: "center",
    backgroundColor: 'red',
    color:'white',
    marginTop:"20px"
  }
  const correctDiv = {
    textAlign: "center",
    backgroundColor: 'green',
    color:'white',
    marginTop:"20px"
  }


  return (
    <div style={mainDivStyle}>
      <div>
        <div>Your point is:  {points}</div>
        {/* color game div */}
        <div style={colorGameDiv}></div>
        {/* color game buttons */}
        <div style={buttonDiv}>
          {
            answers.map((item,index) => {
              return  <button onClick={() => checkAns(item)} key={index} style={buttons}> {item} </button>
            })
          }
        </div>
        {
         isCorrect === false && <div style={wrongDiv}>Wrong </div>
        }
        {
          isCorrect === true && <div style={correctDiv}>Correct </div>
        }
      </div>
    </div>
  )
}

export default App
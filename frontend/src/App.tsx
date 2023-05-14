import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ButtonGroup, Button } from '@mui/material'
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <Link to={`definition-disease`}><Button variant='contained'>Определение болезни</Button></Link>
        <Link to={`knowledge-base`}><Button variant='contained'>База знаний</Button></Link>
      </div>
    </>
  )
}

export default App

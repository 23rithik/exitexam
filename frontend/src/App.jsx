import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Mail from './components/Mail'
import Enterotp from './components/Enterotp'
import Welcome from './components/Welcome'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Mail/>}></Route>
        <Route path={'/enterotp'} element={<Enterotp/>}></Route>
        <Route path={'/welcome'} element={<Welcome/>}></Route>
      </Routes>
    </>
  )
}

export default App

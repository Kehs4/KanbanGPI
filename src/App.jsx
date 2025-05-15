import { useEffect, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import AppRoutes from './routes'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
      
  }, [])
  return (
    <>
      <div>
          <AppRoutes />
      </div>
    </>
  )
}

export default App

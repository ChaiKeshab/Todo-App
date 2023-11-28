import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Sidebar from './layout/Sidebar'

const App = () => {
  return (

    <div className='flex'>
      <Sidebar />
      <Routes>

        <Route path='/' element={<Home />} />

      </Routes>
    </div>
  )
}

export default App
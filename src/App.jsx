import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Sidebar from './layout/Sidebar'

const App = () => {
  return (

    <div className='flex'>
      <Sidebar />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />

      </Routes>
    </div>
  )
}

export default App
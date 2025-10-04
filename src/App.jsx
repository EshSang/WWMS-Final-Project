import './App.css'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>

    </>
  )
}

export default App

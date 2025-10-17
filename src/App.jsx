import './App.css'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import WorkerJobs from './Pages/WorkerJobs';

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/workerjob" element={<WorkerJobs />} />
        </Routes>
      </Router>

    </>
  )
}

export default App

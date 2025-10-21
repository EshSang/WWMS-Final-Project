import './App.css'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import WorkerJobs from './Pages/WorkerJobs';
import WorkerMyService from './Pages/WorkerMyService';
import WorkerOrders from './Pages/WorkerOrders';
import WorkerEarning from './Pages/WorkerEarning';
import WorkerReviews from './Pages/WorkerReviews';
import WorkerAnalytics from './Pages/WorkerAnalytics';

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/workerjob" element={<WorkerJobs />} />
          <Route path="/workermyservice" element={<WorkerMyService />} />


          <Route path="/workerorders" element={<WorkerOrders />} />
          <Route path="/workerearning" element={<WorkerEarning />} />
          <Route path="/workerreviews" element={<WorkerReviews />} />
          <Route path="/workeranalytics" element={<WorkerAnalytics />} />
        </Routes>
      </Router>

    </>
  )
}

export default App

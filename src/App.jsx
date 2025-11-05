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

import CustomerJobs from './Pages/CustomerJobs';
import CustomerJobPost from './Pages/CustomerJobPost';
import CustomerOrders from './Pages/CustomerOrders';
import CustomerPostedJobs from './Pages/CustomerPostedJobs'; 
import CustomerReviews from './Pages/CustomerReviews';
import CustomerAnalytics from './Pages/CustomerAnalytics';

import UserProfile from './Pages/UserProfile';



function App() {
  

  return (
    <>
      <Router>
        <Routes>
          
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />

          {/* Worker Pages */}
          <Route path="/workerjob" element={<WorkerJobs/>} />
          <Route path="/workermyservice" element={<WorkerMyService/>} />
          <Route path="/workerorders" element={<WorkerOrders/>} />
          <Route path="/workerearning" element={<WorkerEarning/>} />
          <Route path="/workerreviews" element={<WorkerReviews/>} />
          <Route path="/workeranalytics" element={<WorkerAnalytics/>} />

          {/* Customer Pages */}
          <Route path="/customerjobs" element={<CustomerJobs/>} />
          <Route path="/customerjobpost" element={<CustomerJobPost/>} />
          <Route path="/customerorders" element={<CustomerOrders/>} />
          <Route path="/customerpostedjobs" element={<CustomerPostedJobs/>} />
          <Route path="/customerreviews" element={<CustomerReviews/>} /> 
          <Route path="/customeranalytics" element={<CustomerAnalytics/>} />

          <Route path="/profile" element={<UserProfile/>} />

          

        </Routes>
      </Router>

    </>
  )
}

export default App

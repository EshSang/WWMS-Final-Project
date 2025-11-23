import './App.css'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
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
import WorkerViewJob from './Pages/WorkerViewJob';



function App() {
  

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />

            {/* Worker Pages */}
            <Route path="/workerjob" element={<ProtectedRoute><WorkerJobs/></ProtectedRoute>} />
            <Route path="/workermyservice" element={<ProtectedRoute><WorkerMyService/></ProtectedRoute>} />
            <Route path="/workerorders" element={<ProtectedRoute><WorkerOrders/></ProtectedRoute>} />
            <Route path="/workerearning" element={<ProtectedRoute><WorkerEarning/></ProtectedRoute>} />
            <Route path="/workerreviews" element={<ProtectedRoute><WorkerReviews/></ProtectedRoute>} />
            <Route path="/workeranalytics" element={<ProtectedRoute><WorkerAnalytics/></ProtectedRoute>} />
            <Route path="/workerviewjob/:id" element={<ProtectedRoute><WorkerViewJob/></ProtectedRoute>} />

            {/* Customer Pages */}
            <Route path="/customerjobs" element={<ProtectedRoute><CustomerJobs/></ProtectedRoute>} />
            <Route path="/customerjobpost" element={<ProtectedRoute><CustomerJobPost/></ProtectedRoute>} />
            <Route path="/customerorders" element={<ProtectedRoute><CustomerOrders/></ProtectedRoute>} />
            <Route path="/customerpostedjobs" element={<ProtectedRoute><CustomerPostedJobs/></ProtectedRoute>} />
            <Route path="/customerreviews" element={<ProtectedRoute><CustomerReviews/></ProtectedRoute>} />
            <Route path="/customeranalytics" element={<ProtectedRoute><CustomerAnalytics/></ProtectedRoute>} />

            {/* User Profile */}
            <Route path="/profile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>} />

          </Routes>
        </Router>
      </AuthProvider>

    </>
  )
}

export default App

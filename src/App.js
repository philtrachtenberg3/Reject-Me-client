import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MyPlans from './pages/MyPlans/MyPlans';
import MyPlanDetails from './pages/MyPlanDetails/MyPlanDetails';
import Anon from './components/Anon/Anon';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/auth/signup" element={
          
          <Anon>
            <SignupPage />
          </Anon>
          
          }/>

      <Route path="/login" element={
        
        <Anon>
          <LoginPage />
        </Anon>
        
        }/>

      <Route path="/" element={<HomePage />}/>  
      <Route path="/plan/my-plans/" element={<MyPlans />}/>  
      <Route path="/plan/my-plans/:planId" element={<MyPlanDetails />}/>  

      </Routes>
      
    </div>
  );
}

export default App;

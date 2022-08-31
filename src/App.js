import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import MyPlans from './pages/MyPlans/MyPlans';
import CreateMyPlan from './pages/CreateMyPlan/CreateMyPlan';
import MyPlanDetails from './pages/MyPlanDetails/MyPlanDetails';
import MyChallengeDetails from './pages/MyChallengeDetails/MyChallengeDetails';
import EditMyChallengeDetails from './pages/EditMyChallengeDetails/EditMyChallengeDetails';
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
      <Route path="/plan/my-plans" element={<MyPlans />}/>  
      <Route path="/profile" element={<ProfilePage />}/>  
      <Route path="/plan/create-my-plan" element={<CreateMyPlan />}/>  
      <Route path="/plan/my-plans/:planId" element={<MyPlanDetails />}/>  
      <Route path="/plan/my-plans/:planId/:challengeId" element={<MyChallengeDetails />}/>  
      <Route path="/plan/my-plans/:planId/:challengeId/edit" element={<EditMyChallengeDetails />}/>  

      </Routes>
      
    </div>
  );
}

export default App;

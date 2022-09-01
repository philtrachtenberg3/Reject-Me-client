import {Link} from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import { Button } from 'flowbite-react';
import { Navbar } from 'flowbite-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbars() {
    const {loggedIn, user, logout} = useContext(AuthContext)

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
    
        const storedToken = localStorage.getItem('authToken')
        axios
        .post(`${process.env.REACT_APP_API_URL}/plan/create-my-plan`, {}, {
          headers: {
              Authorization: `Bearer ${storedToken}`
          }
      })
      .then((response) => {
        navigate(`/plan/my-plans/${response.data._id}`)
      })
    
      }


  return (

    <>
<Navbar
  fluid={true}
  rounded={true}
> 
  <Navbar.Brand>
    <Link to="/">
        <img
        src="../../images/reject-me-logo.jpg"
        className="mr-3 h-6 sm:h-9"
        alt="Reject Me Logo"
        />
    </Link>
    
  </Navbar.Brand>
  <div className="flex md:order-2">
  {loggedIn && (
    <>
        
            <Link to="/plan/create-my-plan">
                <Button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    + Create My Plan
                </Button>
            </Link>
        
        <Navbar.Toggle />
    </>
  )}
  </div>
  <Navbar.Collapse>
    
      <Link to="/" className="text-gray-600">
        Home
      </Link>
    
    {!loggedIn && (
    <>
        
            <Link to="/login" className="text-gray-600">
                Login
            </Link>
        
        
            <Link to="/auth/signup" className="text-gray-600">
                Signup
            </Link>
        
    </>
    )}
    {loggedIn && (
    <>
        
            <Link to="/plan/my-plans" className="text-gray-600">
                My Plans
            </Link>
        
        
            <Link to="/all-plans" className="text-gray-600">
                All Plans
            </Link>
        
        
            <Link to="/view-ideas" className="text-gray-600">
                Ideas
            </Link>
        
        
            <Link to="/profile" className="text-gray-600">
                Profile
            </Link>
        
        
            <Link onClick={logout} to="/" className="text-gray-600">
                Logout
            </Link>
        
    </>
    )}
  </Navbar.Collapse>
  </Navbar>

    </>
  )
}

export default Navbars
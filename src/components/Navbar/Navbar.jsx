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
        src="https://res.cloudinary.com/dt4l4dgkp/image/upload/v1662058876/reject-me/reject-me-logo_ngykxa.jpg"
        className="mr-3 h-6 sm:h-9 w-28"
        alt="Reject Me Logo"
        />
    </Link>
    
  </Navbar.Brand>
  <div className="flex md:order-2">
  {loggedIn && (
    <>
        
            <Link to="/plan/create-my-plan" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                
                    + Create My Plan
              
            </Link>
        
        <Navbar.Toggle />
    </>
  )}
  </div>
  <Navbar.Collapse>
    
      <Link to="/" className="block py-2 pr-4 pl-3 text-xl font-extrabold text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">
        Home
      </Link>
    
    {!loggedIn && (
    <>
        
            <Link to="/login" className="block text-xl font-bold py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Login
            </Link>
        
        
            <Link to="/auth/signup" className="block text-xl font-bold py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Signup
            </Link>
        
    </>
    )}
    {loggedIn && (
    <>
        
            <Link to="/plan/my-plans" className="block text-xl font-bold py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                My Plans
            </Link>
        
        
            <Link to="/all-plans" className="block text-xl font-bold py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                All Plans
            </Link>
        
        
            <Link to="/view-ideas" className="block text-xl font-bold py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Ideas
            </Link>
        
        
            <Link to="/profile" className="block text-xl font-bold py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Profile
            </Link>
        
        
            <Link onClick={logout} to="/" className="block text-xl font-bold py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
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
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
        .post(`${process.env.REACT_APP_API_URL}/plan/create-my-plan`, {
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
  <Navbar.Brand href="https://flowbite.com/">
    <img
      src="../../images/reject-me-logo.jpg"
      className="mr-3 h-6 sm:h-9"
      alt="Reject Me Logo"
    />
    
  </Navbar.Brand>
  <div className="flex md:order-2">
  {loggedIn && (
    <>
        <Navbar.Link href="/plan/create-my-plan" active={true}>
            <Button onClick={handleSubmit}>
                + Create My Plan
            </Button>
        </Navbar.Link>
        <Navbar.Toggle />
    </>
  )}
  </div>
  <Navbar.Collapse>
    <Navbar.Link
      href="/"
      active={true}
    >
      Home
    </Navbar.Link>
    {!loggedIn && (
    <>
        <Navbar.Link href="/login">
        Login
        </Navbar.Link>
        <Navbar.Link href="/auth/signup">
        Signup
        </Navbar.Link>
    </>
    )}
    {loggedIn && (
    <>
        <Navbar.Link href="/plan/my-plans">
            My Plans
        </Navbar.Link><Navbar.Link href="/all-plans">
            All Plans
        </Navbar.Link><Navbar.Link href="/view-ideas">
            Ideas
        </Navbar.Link><Navbar.Link href="/profile">
            Profile
        </Navbar.Link><Navbar.Link onClick={logout} href="/">
            Logout
        </Navbar.Link>
    </>
    )}
  </Navbar.Collapse>
  </Navbar>

    </>
  )
}

export default Navbars
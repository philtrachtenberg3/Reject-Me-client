import {Link} from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';

function Navbar() {
    const {loggedIn, user, logout} = useContext(AuthContext)


  return (

    <><h1 className="text-3xl font-bold underline">
          Hello world!
      </h1>
      <nav className='Navbar'>
              <Link to="/">
                  <button>
                      Home
                  </button>
              </Link>

              {!loggedIn && (
                  <>
                      <Link to="/login">
                          <button>
                              Log In
                          </button>
                      </Link>
                      <Link to="/auth/signup">
                          <button>
                              Sign Up
                          </button>
                      </Link>
                  </>
              )}

              {!loggedIn && (
                  <>
                      <Link to="/plan/my-plans">
                          <button>
                              My Plans
                          </button>
                      </Link>
                      {/* <span>{user.username}</span> */}
                      <button onClick={logout}>Logout</button>
                  </>
              )}

              {loggedIn && (
                  <>
                      <Link to="/all-plans">
                          <button>
                              All Plans
                          </button>
                      </Link>
                      {/* <span>{user.username}</span> */}
                      <button onClick={logout}>Logout</button>
                  </>
              )}

              {loggedIn && (
                  <>
                      <Link to="/view-ideas">
                          <button>
                              Ideas
                          </button>
                      </Link>
                      {/* <span>{user.username}</span> */}
                      <button onClick={logout}>Logout</button>
                  </>
              )}

              {loggedIn && (
                  <>
                      <Link to="/profile">
                          <button>
                              Profile
                          </button>
                      </Link>
                      {/* <span>{user.username}</span> */}
                      <button onClick={logout}>Logout</button>
                  </>
              )}



          </nav></>
  )
}

export default Navbar
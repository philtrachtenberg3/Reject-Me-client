import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function SignupPage() {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
        
    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value)
    const handleUserName = (e) => setUserName(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {email, username: userName, password}

        axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, body)
        .then(() => {
            navigate('/login')
        })
        .catch((err) => {
            console.log(err)
            setErrorMessage(err.response.data.message)
        })
    }


  return (
    <><h1 className="text-4xl font-bold underline">
          Hello world!
      </h1><div className="SignupPage">
              <h1>Sign Up</h1>
              <form onSubmit={handleSubmit}>
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" id="email" value={email} onChange={handleEmail} />

                  <label htmlFor="userName">User Name</label>
                  <input type="text" name="userName" id="userName" value={userName} onChange={handleUserName} />

                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" value={password} onChange={handlePassword} />

                  <button type="submit">Sign Up</button>

              </form>

              {errorMessage && (
                  <>
                      <p>{errorMessage}</p>
                      <p>Already have an account?</p>
                      <Link to="/login">
                          Log In
                      </Link>
                  </>
              )}

          </div></>
  )
}

export default SignupPage
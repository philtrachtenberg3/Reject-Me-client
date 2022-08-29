import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

function LoginPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
        
    const navigate = useNavigate();
    const {storeToken, authenticateUser} = useContext(AuthContext);

    const handleUserName = (e) => setUserName(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {username: userName, password}

        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, body)
        .then((response) => {
            storeToken(response.data.authToken);
            authenticateUser();
            navigate('/');
        })
        .catch((err) => {
            console.log(err)
            setErrorMessage(err.response.data.message)
        })
    }


  return (
    <div className="LoginPage">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
                <label htmlFor="userName">User Name</label>
                <input type="text" name="userName" id="userName" value={userName} onChange={handleUserName}/>
    
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={handlePassword}/>
    
                <button type="submit">Log In</button>
    
        </form>

        {errorMessage && (
            <>
                <p>{errorMessage}</p>
                <p>Don't have an account?</p>
                <Link to="/signup">
                    Sign Up
                </Link>
            </>
        )}

    </div>
  )
}

export default LoginPage
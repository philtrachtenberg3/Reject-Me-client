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
<>
    <h1 className="mb-8 text-4xl font-extrabold tracking-tight leading-none text-blue-400 md:text-5xl lg:text-6xl dark:text-white">Login</h1>


<div className="flex justify-center items-center">
    <div className="block p-6 w-5/12 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

        <form onSubmit={handleSubmit}>
        <div class="mb-6">
            <label for="user" class="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Username*</label>
            <input type="text" id="user" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name1" required="" value={userName} onChange={handleUserName}/>
        </div>
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Password*</label>
            <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required="" value={password} onChange={handlePassword}/>
        </div>
        
        <button type="submit" class="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</button>
        </form>

</div>
</div>

</>


    
  )
}

export default LoginPage
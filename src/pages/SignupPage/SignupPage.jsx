import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function SignupPage() {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [Loading, setLoading] = useState("")
        
    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value)
    const handleUserName = (e) => setUserName(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleProfilePicture = (e) => {
		setLoading(true);
		// console.log("The file to be uploaded is: ", e.target.files[0]);

		const uploadData = new FormData();
		//console.log(user);
		// imageUrl => this name has to be the same as in the model since we pass
		// req.body to .create() method when creating a new movie in '/api/movies' POST route
		uploadData.append("video", e.target.files[0]);

		axios
			.post(`${process.env.REACT_APP_API_URL}/upload`, uploadData)
			.then((response) => {
				// console.log("response is: ", response);
				// response carries "fileUrl" which we can use to update the state
				console.log(response.data.fileUrl);
				setProfilePicture(response.data.fileUrl);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log("Error while uploading the file: ", err);
			});
	};
    
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {email, username: userName, password, profilePicture}

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
    <>
      
<h1 className="mb-8 text-4xl font-extrabold tracking-tight leading-none text-blue-600 md:text-5xl lg:text-6xl dark:text-white">Signup</h1>


<div className="flex justify-center items-center">
    <div className="block p-6 w-5/12 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

        <form onSubmit={handleSubmit}>
                <label class="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300" for="user_avatar">Upload Profile Picture</label>
            <div className="flex justify-center mb-6">
                <input class="block w-3/4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".jpg, .png, .jpeg, .webp, .mp4" onChange={(e) => handleProfilePicture(e)}/>
            </div>
        <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Email*</label>
            <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required="" value={email} onChange={handleEmail}/>
        </div>
        <div class="mb-6">
            <label for="user" class="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Username*</label>
            <input type="text" id="user" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name1" required="" value={userName} onChange={handleUserName}/>
        </div>
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Password*</label>
            <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required="" value={password} onChange={handlePassword}/>
        </div>
        
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
        </form>

</div>
</div>






              {/* <form onSubmit={handleSubmit}>


                



                  <label htmlFor="profilePicture">Profile Picture</label>
                  <input type="file" name="profilePicture" id="profilePicture" onChange={handleProfilePicture} />

                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" id="email" value={email} onChange={handleEmail} />

                  <label htmlFor="userName">User Name</label>
                  <input type="text" name="userName" id="userName" value={userName} onChange={handleUserName} />

                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" value={password} onChange={handlePassword} />


                  <button type="submit">Sign Up</button>

              </form> */}

              {errorMessage && (
                  <>
                      <p>{errorMessage}</p>
                      <p>Already have an account?</p>
                      <Link to="/login">
                          Log In
                      </Link>
                  </>
              )}

          </>
  )
}

export default SignupPage
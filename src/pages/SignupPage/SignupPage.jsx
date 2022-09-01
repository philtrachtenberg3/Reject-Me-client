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
      <div className="SignupPage">
              <h1>Sign Up</h1>
              <form onSubmit={handleSubmit}>
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" id="email" value={email} onChange={handleEmail} />

                  <label htmlFor="userName">User Name</label>
                  <input type="text" name="userName" id="userName" value={userName} onChange={handleUserName} />

                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" value={password} onChange={handlePassword} />

                  <label htmlFor="profilePicture">Profile Picture</label>
                  <input type="file" name="profilePicture" id="profilePicture" onChange={handleProfilePicture} />

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
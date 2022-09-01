import axios from 'axios';
import { Alert } from 'flowbite-react';
import {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';

function MyChallengeDetails() {
  const [challenge, setChallenge] = useState("")
  const [Loading, setLoading] = useState("")
  const {planId, challengeId} = useParams();

  

  const navigate = useNavigate();

  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [journalEntry, setJournalEntry] = useState("")
  const [video, setVideo] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)
  const [wasRejected, setWasRejected] = useState(false)


  const handleTitle = (e) => setTitle(e.target.value)
  const handleDate = (e) => setDate(e.target.value)
  const handleJournalEntry = (e) => setJournalEntry(e.target.value)
  const handleVideo = (e) => setVideo(e.target.value)
  const handleIsCompleted = (e) => setIsCompleted(e.target.checked)
  const handleWasRejected = (e) => setWasRejected(e.target.checked)

  const handleFileUpload = (e) => {
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
				setVideo(response.data.fileUrl);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log("Error while uploading the file: ", err);
			});
	};




  const getChallenge = async () => {
    try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/plan/my-plans/${planId}/${challengeId}`)
        setChallenge(response.data);
        setTitle(response.data.title)
        setDate(response.data.date)
        setJournalEntry(response.data.journalEntry)
        setIsCompleted(response.data.isCompleted)
        setWasRejected(response.data.wasRejected)
        setVideo(response.data.video)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
  getChallenge();
}, [])

const handleSubmit = (e) => {
  e.preventDefault();

  const body = {isCompleted, wasRejected, journalEntry, video};

  axios.put(`${process.env.REACT_APP_API_URL}/plan/my-plans/${planId}/${challengeId}`, body)
  .then(() => navigate(`/plan/my-plans/${planId}/${challengeId}`))
  .catch((err) => console.log(err))
  
}




  return (
    <div>
    {challenge && (
      <>
        <h1>{challenge.title}</h1>
        <h3>Day {challenge.day}</h3>
        <h4>{challenge.date.slice(0,10)}</h4> 
        {/* <p>Did you complete the challenge? {isCompleted ? "Yes" : "No"}</p>
        <p>Were you rejected? {wasRejected ? "Yes" : "No"}</p> */}
        <Link to={`/plan/my-plans/${planId}/${challengeId}/edit`}>
            <button>Edit Plan Details</button>
        </Link>
        <video width="320" height="240" controls>
            <source src={challenge.video} type="video/mp4"/>
        </video>
        
        <form  onSubmit={handleSubmit}>
                <label htmlFor="video">Upload Video<input
						type="file"
						accept=".jpg, .png, .jpeg, .webp, .mp4"
						onChange={(e) => handleFileUpload(e)}/>
				</label>

            <label htmlFor="isCompleted">Did you complete the challenge?</label>
            <input type="checkbox" name="isCompleted" id="isCompleted" checked={isCompleted} onChange={handleIsCompleted}/>

            <label htmlFor="wasRejected">Were you rejected?</label>
            <input type="checkbox" name="wasRejected" id="wasRejected" checked={wasRejected} onChange={handleWasRejected}/>

            <label htmlFor="journalEntry">Share Your Experience!</label>
            <textarea name="journalEntry" id="" cols="30" rows="10" onChange={handleJournalEntry}>{journalEntry}</textarea>

            <button type="submit">Save</button>
        </form>
        

      </>
    )}



    </div>
  )
}

export default MyChallengeDetails
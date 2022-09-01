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

        <h1 class="mb-4 mt-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"><mark class="px-4 text-white bg-blue-600 rounded dark:bg-blue-500"><i>{challenge.title.split(' ')[0]}</i></mark> {challenge.title.split(' ').slice(1,challenge.title.length).join(' ')}</h1>
        <p class="text-xl mb-2 font-normal text-gray-500 lg:text-3xl dark:text-gray-400"><b>Day {challenge.day}</b></p>
        <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{challenge.date.slice(0,10)}</p>

        {/* <p>Did you complete the challenge? {isCompleted ? "Yes" : "No"}</p>
        <p>Were you rejected? {wasRejected ? "Yes" : "No"}</p> */}
        <a href={`/plan/my-plans/${planId}/${challengeId}/edit`}>

            <button type="button" class="mt-4 shadow-xl text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-6 h-6 m-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                Track Your Progress
            </button>
        </a>

        <hr class="my-4 mx-auto w-1/2 h-1 bg-gray-100 rounded border-0 md:my-10 dark:bg-gray-700"/>

        {challenge.video ? (
            <video className="mx-auto w-1/3 max-w-lg border-8 rounded border-blue-100 h-auto" controls>
                <source src={challenge.video} type="video/mp4"/>
            </video>

        ) : 
        <img class="max-w-lg h-auto mx-auto rounded-lg transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0" src="https://thumbs.gfycat.com/SharpMagnificentGreathornedowl-size_restricted.gif" alt="no video"></img>
        }

        <div class="flex items-center justify-center mb-4 mt-4">
            <input disabled id="disabled-checkbox" type="checkbox" checked={isCompleted} class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label for="disabled-checkbox" class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Did you complete the challenge?</label>
        </div>

        <div class="flex items-center justify-center mb-16">
            <input disabled id="disabled-checkbox" type="checkbox" checked={wasRejected} class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label for="disabled-checkbox" class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Were you rejected?</label>
        </div>

        <div class="flex flex-col items-center justify-center mb-4 lg:mx-60 sm:mx-40">
            <label for="message" class="block mb-2 text-lg font-medium text-gray-400 dark:text-gray-400">Share Your Experience!</label>
            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-400 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your experience...">{journalEntry}</textarea>
        </div>


        
        
        {/* <form  onSubmit={handleSubmit}>
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
        </form> */}
        

      </>
    )}



    </div>
  )
}

export default MyChallengeDetails
import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';

function EditMyChallengeDetails() {
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

  const body = {title, date, isCompleted, wasRejected, journalEntry, video};

  axios.put(`${process.env.REACT_APP_API_URL}/plan/my-plans/${planId}/${challengeId}/edit`, body)
  .then(() => navigate(`/plan/my-plans/${planId}/${challengeId}`))
  .catch((err) => console.log(err))
}




  return (
    <div>
    {challenge && (
      <>

        
        <h1 class="mb-8 mt-4 text-4xl font-extrabold tracking-tight leading-none text-blue-600 md:text-5xl lg:text-6xl dark:text-white">Track Your Progress!</h1>
        <div className="flex justify-center items-center">
          <div className="block p-6 w-9/12 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <form  onSubmit={handleSubmit} className="flex flex-col justify-center items-center">

            <div class="mb-6 w-1/2 flex flex-col justify-center items-center">
              <label for="title" className="block mb-2 text-md font-bold font-medium text-gray-900 dark:text-gray-300">Title</label>
              <input type="text" id="title" value={title} onChange={handleTitle} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <div class="mb-6 w-1/5 flex flex-col justify-center items-center">
              <label for="date" className="block mb-2 text-md font-bold font-medium text-gray-900 dark:text-gray-300">Date</label>
              <input type="date" id="date" value={date.slice(0,10)} onChange={handleDate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>

            <fieldset>
                <legend class="sr-only">Checkbox variants</legend>

                <div class="flex items-center mb-4">
                    <label for="checkbox-2" class="ml-2 text-md font-bold text-gray-900 dark:text-gray-300">Did you complete the challenge?</label>
                    <input id="checkbox-2" type="checkbox" checked={isCompleted} onChange={handleIsCompleted} class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                </div>

                <div class="flex items-center mb-4">
                    <label for="checkbox-3" class="ml-2 text-md font-bold text-gray-900 dark:text-gray-300">Were you rejected?</label>
                    <input id="checkbox-3" type="checkbox" checked={wasRejected} onChange={handleWasRejected} class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                </div>
            </fieldset>
            <label class="block mb-2 text-md font-bold text-gray-900 dark:text-gray-300" for="user_avatar">Video</label>
            <input class="block w-1/4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".jpg, .png, .jpeg, .webp, .mp4" onChange={(e) => handleFileUpload(e)}/>
            <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">Upload a video to see how far you've come!</div>



            <label for="message" class="block mb-2 mt-8 text-md font-bold text-gray-900 dark:text-gray-400">Share Your Experience!</label>
            <textarea id="message" rows="4" class="block p-2.5 w-8/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..." onChange={handleJournalEntry}>{journalEntry}</textarea>

            <button type="submit" className="mt-8 w-1/4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Save</button>


              {/*  <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" value={title} onChange={handleTitle}/>

                <label htmlFor="date">Date</label>
                <input type="date" name="date" id="date" value={date.slice(0,10)} onChange={handleDate}/>

                <label htmlFor="isCompleted">Did you complete the challenge?</label>
                <input type="checkbox" name="isCompleted" id="isCompleted" checked={isCompleted} onChange={handleIsCompleted}/>

                <label htmlFor="wasRejected">Were you rejected?</label>
                <input type="checkbox" name="wasRejected" id="wasRejected" checked={wasRejected} onChange={handleWasRejected}/>

              <label htmlFor="video">Video:<input
                type="file"
                accept=".jpg, .png, .jpeg, .webp, .mp4"
                onChange={(e) => handleFileUpload(e)}/>
            </label>

                <label htmlFor="journalEntry">Share Your Experience!</label>
                <textarea name="journalEntry" id="" cols="30" rows="10" onChange={handleJournalEntry}>{journalEntry}</textarea> */}

                

            </form>

          </div>

        </div>
        

      </>
    )}



    </div>
  )
}

export default EditMyChallengeDetails
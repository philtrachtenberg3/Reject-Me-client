import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

function MyChallengeDetails() {
  const [challenge, setChallenge] = useState("")
  const {planId, challengeId} = useParams();

  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [journalEntry, setJournalEntry] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)
  const [wasRejected, setWasRejected] = useState(false)


  const handleTitle = (e) => setTitle(e.target.value)
  const handleDate = (e) => setDate(e.target.value)
  const handleJournalEntry = (e) => setJournalEntry(e.target.value)
  const handleIsCompleted = (e) => setIsCompleted(e.target.checked)
  const handleWasRejected = (e) => setWasRejected(e.target.checked)

  const getChallenge = async () => {
    try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/plan/my-plans/${planId}/${challengeId}`)
        setChallenge(response.data);
        setTitle(response.data.title)
        setDate(response.data.date)
        setJournalEntry(response.data.journalEntry)
        setIsCompleted(response.data.isCompleted)
        setWasRejected(response.data.wasRejected)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
  getChallenge();
}, [])






  return (
    <div>
    {challenge && (
      <>
        <h1>{challenge.title}</h1>
        <h3>Day {challenge.day}</h3>
        <form>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={title} onChange={handleTitle}/>

            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date" value={date.slice(0,10)} onChange={handleDate}/>

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
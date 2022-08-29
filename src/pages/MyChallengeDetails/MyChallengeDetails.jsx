import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

function MyChallengeDetails() {
  const [challenge, setChallenge] = useState("")
  const {planId, challengeId} = useParams();

  const getChallenge = async () => {
    try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/plan/my-plans/${planId}/${challengeId}`)
        setChallenge(response.data)
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

        

      </>
    )}



    </div>
  )
}

export default MyChallengeDetails
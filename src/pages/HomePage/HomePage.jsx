import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import Anon from '../../components/Anon/Anon';

function HomePage() {
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault()

    const storedToken = localStorage.getItem('authToken')
    axios
    .post(`${process.env.REACT_APP_API_URL}/plan/create-my-plan`, {
      headers: {
          Authorization: `Bearer ${storedToken}`
      }
  })
  .then((response) => {
    navigate(`/plan/my-plans/${response.data._id}`)
  })

  }

  
  useEffect(() => {
    axios.get(`https://type.fit/api/quotes/`)
  .then((response) => { 
    const randomNum = Math.floor(Math.random() * response.data.length);
    setQuote(response.data[randomNum].text)
    setAuthor(response.data[randomNum].author)
    })
    .catch(err => err) 
  }, [])
  
  
  
  return (
    <>
      <h1>HomePage</h1>
      <Link to="/plan/create-my-plan">

          <button onClick={handleSubmit}>+ Create My Plan</button>
        
      </Link>
      {quote && (
      <p>~~~ <i>{quote} - {author}</i> ~~~</p>

      )}
      <iframe width="560" height="315" src="https://www.youtube.com/embed/-vZXgApsPCQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

      <p><b>Rejection Therapy</b> is a social self-help game created by Jason Comely where being rejected by another person or group is the sole winning condition. </p>
      <p>There is only one official rule to Rejection Therapy, which is to be rejected by another person at least once, every day.</p>
      <h3>The purpose of playing the game is to overcome the fear of rejection through controlled, forced exposure. By this means, players hope to adapt physically to the stresses of rejection.</h3>

      <h2>Resources:</h2>
      <ul>
        <Link to="https://www.rejectiontherapy.com/">
          <li>Jia Jiang's Rejection Therapy website</li>
        </Link>
        <Link to="https://www.npr.org/sections/health-shots/2015/01/16/377239011/by-making-a-game-out-of-rejection-a-man-conquers-fear?t=1661959918931">
          <li>NPR Article on Rejection Therapy</li>
        </Link>
        <Link to="https://en.wikipedia.org/wiki/Rejection_Therapy">
          <li>Wikipedia article</li>
        </Link>
      </ul>
    </>

  )
}

export default HomePage
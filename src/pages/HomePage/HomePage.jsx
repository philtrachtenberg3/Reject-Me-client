import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import Anon from '../../components/Anon/Anon';

function HomePage() {
  

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

  return (
    <>
      <h1>HomePage</h1>
      <Link to="/plan/create-my-plan">

          <button onClick={handleSubmit}>+ Create My Plan</button>
        
      </Link>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/-vZXgApsPCQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </>

  )
}

export default HomePage
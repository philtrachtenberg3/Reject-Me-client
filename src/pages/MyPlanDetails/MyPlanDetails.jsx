import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

function MyPlanDetails() {
    const [plan, setPlan] = useState(null);
    const {planId} = useParams()

    const getPlan = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/plan/my-plans/${planId}`)
            setPlan(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPlan();
    }, [])


  return (
    <div>
        {plan && (
            <h1>{plan._id}</h1>
        )}
    </div>
  )
}

export default MyPlanDetails
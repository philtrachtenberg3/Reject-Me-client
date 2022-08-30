import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';

function MyPlans() {
    const [planList, setPlanList] = useState([])
    const {planId} = useParams()

    const navigate = useNavigate();

    const getPlanList = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/plan/my-plans`)
            setPlanList(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        getPlanList();
    }, [])

    const handleDelete = (e) => {
        e.preventDefault()
    
        const storedToken = localStorage.getItem('authToken')
        axios
        .delete(`${process.env.REACT_APP_API_URL}/plan/my-plans/${planId}/delete`, {
          headers: {
              Authorization: `Bearer ${storedToken}`
          }
      })
      .then(() => {
        navigate(`/plan/my-plans/`)
      })}


  return (
    <div>
        {planList.map((singlePlanList) => {
            return (
                <div key={singlePlanList._id}>
                    <Link to={`/plan/my-plans/${singlePlanList._id}`}>
                        <h3>Your plan created on: {singlePlanList.createdAt.slice(0,10)}</h3>
                    </Link>
                        <p>id: {singlePlanList._id}</p>
                    <Link to={`/plan/my-plans/${singlePlanList._id}/delete`}>
                        <button onClick={handleDelete}>Delete Plan</button>
                    </Link>
                </div>
            )
        })}
    </div>
  )
}


export default MyPlans
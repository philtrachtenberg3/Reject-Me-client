import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function MyPlans() {
    const [planList, setPlanList] = useState([])

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


  return (
    <div>
        {planList.map((singlePlanList) => {
            return (
                <div key={singlePlanList._id}>
                    <Link to={`/plan/my-plans/${singlePlanList._id}`}>
                        <h1>{singlePlanList._id}</h1>
                    </Link>
                </div>
            )
        })}
    </div>
  )
}

export default MyPlans
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import { Card , Button} from 'flowbite-react';

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
    const handleDelete = (id) => {
    
        const storedToken = localStorage.getItem('authToken')
        axios
        .delete(`${process.env.REACT_APP_API_URL}/plan/my-plans/${id}/delete`, {
          headers: {
              Authorization: `Bearer ${storedToken}`
          }
      })
      .then(() => {
        getPlanList()
        navigate(`/plan/my-plans`)
      })}

    useEffect(() => {
        getPlanList();
    }, [])



  return (
    <div>
        {planList.map((singlePlanList) => {
            return (
                <Card href="#">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <Link to={`/plan/my-plans/${singlePlanList._id}`}>
                            Your plan created on: {singlePlanList.createdAt.slice(0,10)}
                        </Link>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        id: {singlePlanList._id}
                    </p>
                    <Button onClick={() => handleDelete(singlePlanList._id)}>
                        Delete Plan
                        <svg
                        className="ml-2 -mr-1 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                        </svg>
                    </Button>
                </Card>



                
            )
        })}
    </div>
  )
}


export default MyPlans


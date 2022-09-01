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
            const storedToken = localStorage.getItem('authToken')
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/plan/my-plans`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
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
    <div className="flex flex-col justify-center align-center items-center">
        {planList.map((singlePlanList) => {
            return (
                <div className="w-4/12 m-3">
                    <div class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <a href={`/plan/my-plans/${singlePlanList._id}`}>
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Your plan created on: {singlePlanList.createdAt.slice(0,10)}</h5>
                        </a>
                        <button type="button" onClick={() => handleDelete(singlePlanList._id)} class="w-3/12 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                Delete Plan
                            </button>
                    </div>

                </div>



                
            )
        })}
    </div>
  )
}


export default MyPlans


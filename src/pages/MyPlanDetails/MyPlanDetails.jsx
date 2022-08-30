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
    <div className="bg-grey-100">
        {plan && (
            <>
                <h1>Plan ID: {plan._id}</h1>
                <div className="flex flex-initial flex-wrap">
                    {plan.challenges.map((challengeDetails) => {
                        return (
                            <div key={challengeDetails._id} className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <Link to={`/plan/my-plans/${plan._id}/${challengeDetails._id}`} class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-purple-100 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{challengeDetails.title}</h5>
                                </Link>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Day {challengeDetails.day}</p>
                                {/* <Link to={`/plan/my-plans/${plan._id}/${challengeDetails._id}`} class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    
                                        See Challenge
                                        <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </Link> */}
                            </div>
                            
                        )
                    })}
                </div>
                    

            </>
        )
        }
    </div>
  )
}

export default MyPlanDetails
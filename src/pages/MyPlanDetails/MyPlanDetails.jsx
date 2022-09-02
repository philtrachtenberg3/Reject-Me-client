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
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Your Plan created on <span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{plan.createdAt.slice(0,10)}</span></h1>
                <hr class="my-4 mx-auto w-1/2 h-1 bg-gray-100 rounded border-0 md:my-10 dark:bg-gray-700"/>
                <div className="flex flex-initial flex-wrap justify-center">
                    {plan.challenges.map((challengeDetails) => {
                        return (

                            <>
                                <div key={challengeDetails._id}>
                                    <a href={`/plan/my-plans/${plan._id}/${challengeDetails._id}`} className="block p-6 m-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                        <h5 class="mb-2 p-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white bg-blue-100 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{challengeDetails.title}</h5>
                                        <p class="font-normal text-gray-700 dark:text-gray-400">Day {challengeDetails.day}</p>
                                    </a>

                                </div>

                            </>
                            
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
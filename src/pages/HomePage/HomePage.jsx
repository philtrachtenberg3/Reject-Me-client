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
      {quote && (
        <>

          <figure class="mx-auto max-w-screen-md text-center">
              <svg aria-hidden="true" class="mx-auto mb-3 w-12 h-12 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"></path></svg>
              <blockquote>
                  <p class="text-2xl italic font-medium text-gray-900 dark:text-white">{quote}</p>
              </blockquote>
              <figcaption class="flex justify-center items-center mt-6 space-x-3">
                  <div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                      <cite class="pr-3 font-medium text-gray-900 dark:text-white">{author}</cite>
                  </div>
              </figcaption>
          </figure>

        
        </>
        

      )}
      <div className="Video-Homepage">
        <iframe width="560" height="315" className="Video-Homepage-iframe" src="https://www.youtube.com/embed/-vZXgApsPCQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>

      
      <div className="flex flex-wrap justify-around justify-items-start items-start content-start">
        <Link to="#" className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-4">
            <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_122609330_9706889704500100_68824.jpg" alt="rejection therapy"></img>
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">What is Rejection Therapy?</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b className="Bold-Homepage">Rejection Therapy</b> is a social self-help game created by Jason Comely where being rejected by another person or group is the sole winning condition.</p>
            </div>
        </Link>
        <Link to="#" className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://media.baamboozle.com/uploads/images/65676/1599857736_336884" alt="rules"></img>
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">What are the rules?</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">There is only one official rule to Rejection Therapy, which is to be <b className="Bold-Homepage">rejected by another person</b> at least once, every day.</p>
            </div>
        </Link>
        <Link to="#" className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://www.rand.org/content/rand/randeurope/research/projects/eu-child-participation-in-political-democratic-life/_jcr_content/par/imagewithclass.aspectfit.0x0.jpg/1614032119716.jpg" alt="participation"></img>
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Why should I participate?</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">The purpose of playing the game is to <b className="Bold-Homepage">overcome the fear of rejection</b> through controlled, forced exposure. By this means, players hope to adapt physically to the stresses of rejection.</p>
            </div>
        </Link>
        <Link to="#" className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://www.websolutions.com/Customer-Content/www/CMS/files/types-links.png" alt="more resources"></img>
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">I'd like to learn more!</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <ul>
                  <Link to="https://www.rejectiontherapy.com/">
                    <li className="RejectionLinks-Homepage">Jia Jiang's Rejection Therapy website</li>
                  </Link>
                  <Link to="https://www.npr.org/sections/health-shots/2015/01/16/377239011/by-making-a-game-out-of-rejection-a-man-conquers-fear?t=1661959918931">
                    <li className="RejectionLinks-Homepage">NPR Article on Rejection Therapy</li>
                  </Link>
                  <Link to="https://en.wikipedia.org/wiki/Rejection_Therapy">
                    <li className="RejectionLinks-Homepage">Wikipedia article</li>
                  </Link>
                </ul>
                </p>
            </div>
        </Link>
      </div>


    </>

  )
}

export default HomePage
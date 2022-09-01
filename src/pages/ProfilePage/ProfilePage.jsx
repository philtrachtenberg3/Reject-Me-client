import axios from 'axios';
import {useState, useEffect, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function ProfilePage() {
    const { loggedIn, user, logout } = useContext(AuthContext);

  return (
    <>

<h1 className="mb-8 text-4xl font-extrabold tracking-tight leading-none text-blue-600 md:text-5xl lg:text-6xl dark:text-white">Your Profile</h1>
        {user && (


<div className="flex justify-center items-center">
    <div class="w-full max-w-sm bg-gray-50 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center pb-10">
            <img class="mb-3 mt-4 w-24 h-24 rounded-full shadow-lg" src={user.profilePicture} alt="prof pic"/>
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.email}</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">username: {user.username}</span>
        </div>
    </div>
</div>






            
    
        )}
    </>
  )
}

export default ProfilePage
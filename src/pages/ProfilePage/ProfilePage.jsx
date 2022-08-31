import axios from 'axios';
import {useState, useEffect, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function ProfilePage() {
    const { loggedIn, user, logout } = useContext(AuthContext);

  return (
    <>
        {user && (
            <div>
                <img src={user.profilePicture} alt="profile picture" />
                <p>Email: {user.email}</p>
                <p>Username: {user.username}</p>
            </div>
    
        )}
    </>
  )
}

export default ProfilePage
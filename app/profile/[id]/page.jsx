'use client';
import {useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const AnotherProfile = () => {
    const  [posts, setPosts]  = useState([]);
    const userId = useParams();
    const username = useSearchParams().get('name');

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${userId.id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        }

        if (userId.id) fetchPosts(); 
    }, [userId.id])

  return (
    <Profile
        name={username}
        desc="Welcome to your personalized profile page."
        data={posts}
    />
  )
}

export default AnotherProfile
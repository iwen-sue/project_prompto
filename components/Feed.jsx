'use client';

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard';

// this module is only used on the feed
const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map(post => (
        <PromptCard
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  // posts state
  const [allPosts, setAllPosts] = useState([]);

  // search bar state
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchAllPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setAllPosts(data);
  }

  useEffect(() => {
    fetchAllPosts(); // fetch posts from the database
  }, [])

  const filterPosts = (searchText) => {
    const regex = new RegExp(searchText, 'i');
    return allPosts.filter(post => 
      regex.test(post.tag) || 
      regex.test(post.creator.username) || 
      regex.test(post.prompt));
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchResults(filterPosts(e.target.value))

    // debounce search
    setSearchTimeout(setTimeout(() => {
      setSearchResults(filterPosts(e.target.value));
    }, 300));
    
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
    setSearchResults(filterPosts(tag));
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList 
        data={searchText ? searchResults : allPosts}  
        handleTagClick={handleTagClick} 
      />
    </section>
  )
}

export default Feed
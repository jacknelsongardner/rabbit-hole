import React, { useState } from 'react';
import axios from 'axios';

const SearchResults = ({ age, topic, addItem }) => {
  const [search, setSearch] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:2001/search', {
        search,
        age,
        topic
      });
  
      // Process the videos to rename keys
      const processedVideos = (response.data.videos || []).map(video => {
        return {
          ...video,
          title: video.name,    // Rename 'name' to 'title'
          subtitle: video.description,  // Rename 'description' to 'subtitle'
          
        };
      });
  
      setVideos(processedVideos);
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to fetch videos.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Search for a Video</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={search}
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchVideos} style={{ marginLeft: '0.5rem' }}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            <button onClick={() => handleSelect(video)} style={{ cursor: 'pointer' }}>
              {typeof video === 'string' ? video : JSON.stringify(video)}
            </button>
          </li>
        ))}
      </ul>

      {selectedVideo && (
        <div style={{ marginTop: '1rem' }}>
          <h4>Selected Video:</h4>
          <pre>{JSON.stringify(selectedVideo, null, 2)}</pre>
        </div>
      )}

    {selectedVideo && (
        <button 
            onClick={() => addItem(selectedVideo)}
            style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
        >
            Add to List
        </button>
    )}
    </div>
  );
};

export default SearchResults;

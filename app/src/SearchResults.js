import React, { useState } from 'react';
import axios from 'axios';

const VideoSearch = ({ age, topic, addItem }) => {
  const [search, setSearch] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchVideos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('http://localhost:2001/search', {
        search,
        age,
        topic
      });

      setVideos(response.data.videos || []);
    } catch (error) {
      console.error('Error searching videos:', error);
      setError('Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (video) => {
    if (!selectedVideo) {
      setSelectedVideo(video);
      if (addItem) {
        addItem(video);
      }
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Search for a Video (Topic: {topic}, Age: {age})</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Search:
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
        <button onClick={searchVideos} style={{ marginLeft: '1rem' }}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {videos.map((video, index) => (
          <li key={index} style={{ marginBottom: '0.5rem' }}>
            {typeof video === 'string' ? video : JSON.stringify(video)}
            {!selectedVideo && (
              <button onClick={() => handleAdd(video)} style={{ marginLeft: '1rem' }}>
                Add
              </button>
            )}
          </li>
        ))}
      </ul>

      {selectedVideo && (
        <>
          <h3>Selected Video</h3>
          <div style={{ background: '#f2f2f2', padding: '1rem', borderRadius: '8px' }}>
            {typeof selectedVideo === 'string'
              ? selectedVideo
              : JSON.stringify(selectedVideo)}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoSearch;

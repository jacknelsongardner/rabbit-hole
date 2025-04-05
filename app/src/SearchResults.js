import React, { useState } from 'react';
import axios from 'axios';

const SearchResults = ({ last, topic, addItem }) => {
  const [search, setSearch] = useState('');

  const [violence, setViolence] = useState(false);
  const [sexuality, setSexuality] = useState(false);
  const [bodyNegativity, setBodyNegativity] = useState(false);
  const [advertisements, setAdvertisements] = useState(false);
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
        last,
        topic,
        violence,
        sexuality,
        bodynegativity: bodyNegativity,
        advertisements
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
    <div
      style={{
        padding: '1rem',
        maxWidth: '600px',
        margin: '0 auto',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto', // Makes the whole container scrollable
      }}
    >
      <h1>Search for a Video</h1>

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

      <h2>AI Filters</h2>

      {/* Filter checkboxes container with scroll */}
      <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="checkbox"
              checked={violence}
              onChange={(e) => setViolence(e.target.checked)}
            />
            Filter Violence
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="checkbox"
              checked={sexuality}
              onChange={(e) => setSexuality(e.target.checked)}
            />
            Filter Sexuality Explicit Content
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="checkbox"
              checked={bodyNegativity}
              onChange={(e) => setBodyNegativity(e.target.checked)}
            />
            Filter Body Negativity
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="checkbox"
              checked={advertisements}
              onChange={(e) => setAdvertisements(e.target.checked)}
            />
            Filter Advertisements
          </label>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Scrollable video list */}
      <div style={{ flex: '1', overflowY: 'auto' }}>
        <ul>
          {videos.map((video, index) => (
            <li key={index}>
              <button onClick={() => handleSelect(video)} className="search-item-button">
                {typeof video === 'string' ? (
                  video
                ) : (
                  <p className="search-title">{video.title}</p>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedVideo && (
        <div style={{ marginTop: '1rem' }}>
          <h4>Selected Video:</h4>
          <img src={selectedVideo.img} style={{ width: '300px' }} />
          <p className="search-title">{selectedVideo.title}</p>
          <p className="search-subtitle">{selectedVideo.subtitle}</p>
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

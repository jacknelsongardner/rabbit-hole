// FilterableSquareList.js
import React, { useState } from 'react';
import './SquareList.css';


  




const SearchBar = ({ query, onQueryChange }) => (
    <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={query}
        onChange={e => onQueryChange(e.target.value)}
    />
);



const Video = ({ videoLink }) => {
    // Extract the video ID from a YouTube URL if it's a YouTube link
    
    const videoUrl = videoLink;
  
    return (
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        maxWidth: '400px', 
        height: '300px',
        backgroundColor: '#000', 
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        <iframe
          src={videoUrl}
          title="Video Example"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </div>
    );
  };
  


const VideoList = ({ list, onVideoClick, onPlusClick, onBookMarkClick, onDeleteClick, topic}) => {
    const [query, setQuery] = useState('');
    return (
        <div className="filterable-wrapper" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
        }}>
            {topic && topic!='' && (
                <p style={{ fontSize: '70px', fontWeight: 'bold', textAlign: 'center', color: 'white'}}>{topic}</p>
            )}

            <div className="video-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {list.map(item => (
                    <div key={item.id} className="thumbnail-container" style={{ width: '100%', maxWidth: '500px' }}>
                        <h2 className="video-title">{item.title}</h2>
                        <div style={{ 
                            pointerEvents: 'none', 
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <img src={item.img} style={{ width: '100%', maxWidth: '500px' }}/>
                        </div>
                        <p className="video-subtitle">{item.subtitle}</p>
                        <div className="button-container">
                            <button className="play-button" onClick={() => onVideoClick(item)}>
                                Play
                            </button>
                            <button className="bookmark-button" onClick={() => onBookMarkClick(item)}>
                                Bookmark
                            </button>
                            <button className="delete-button" onClick={() => onDeleteClick(item)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {topic && topic!='' && (
                    <button 
                        className="add-button" 
                        onClick={() => onPlusClick(topic)}
                    >
                        <span style={{ color: 'white', fontSize: '24px' }}>+</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export {  SearchBar, Video, VideoList };

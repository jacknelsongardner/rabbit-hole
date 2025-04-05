// FilterableSquareList.js
import React, { useState } from 'react';
import './SquareList.css';

const initialItems = [
    { id: 1, image: 'https://via.placeholder.com/150', title: 'Apple', subtitle: 'Fruit' },
    { id: 2, image: 'https://via.placeholder.com/150', title: 'Banana', subtitle: 'Yellow fruit' },
    { id: 3, image: 'https://via.placeholder.com/150', title: 'Carrot', subtitle: 'Vegetable' },
    { id: 4, image: 'https://via.placeholder.com/150', title: 'Donut', subtitle: 'Dessert' },
    { id: 5, image: 'https://via.placeholder.com/150', title: 'Eggplant', subtitle: 'Purple veg' },
    { id: 6, image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/02/figs-2056729.jpg?quality=90&webp=true&resize=300,272', title: 'Fig', subtitle: 'Fruit' },
    
    // Add more items as needed
  ];

const videoItems = [
    { id: 1, url: 'https://www.youtube.com/embed/eqogbWHoOHs', title: 'Apple', subtitle: 'Fruit' },
    { id: 2, url: 'https://www.youtube.com/embed/eqogbWHoOHs', title: 'Banana', subtitle: 'Yellow fruit' },
    { id: 3, url: 'https://www.youtube.com/embed/eqogbWHoOHs', title: 'Carrot', subtitle: 'Vegetable' },
    { id: 4, url: 'https://www.youtube.com/embed/eqogbWHoOHs', title: 'Donut', subtitle: 'Dessert' },
    // Add more items as needed
];
  




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
  


const VideoList = ({ list = videoItems, onVideoClick, onPlusClick, onBookMarkClick, onDeleteClick, topic}) => {
    const [query, setQuery] = useState('');
    return (
        <div className="filterable-wrapper" style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        }}>
            <div className="video-list">
                {list.map(item => (
                    <div key={item.id} className="video-container">
                        <div style={{ 
                            pointerEvents: 'none', 
                            width: '100%',
                            maxWidth: '600px',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Video videoLink={item.url} />
                        </div>
                        <div className="button-container">
                            <button onClick={() => onVideoClick(item)}>
                                Play
                            </button>
                            <button onClick={() => onBookMarkClick(item)}>
                                Bookmark
                            </button>
                            <button onClick={() => onDeleteClick(item)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                <button 
                    className="add-button" 
                    onClick={() => onPlusClick(topic)}
                >
                    <span style={{ color: 'white', fontSize: '24px' }}>+</span>
                </button>
            </div>
        </div>
    );
};

export {  SearchBar, Video, VideoList };

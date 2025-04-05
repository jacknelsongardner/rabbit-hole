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
  
const SquareListItem = ({ item, onClick }) => (
    <div className="square-item" key={item.id} onClick={() => onClick(item)}>
        <img src={item.image} alt={item.title} className="square-image" />
        <div className="square-text">
            <div className="square-title">{item.title}</div>
            <div className="square-subtitle">{item.subtitle}</div>
        </div>
    </div>
);

const VideoListItem = ({ item, onClick }) => (
    <div className="square-item" key={item.id} onClick={() => onClick(item)}>
        <div className="square-image">
            <div style={{ pointerEvents: 'none' }}>
                <iframe
                    src={item.url}
                    title={item.title}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ pointerEvents: 'none' }}
                    loading="lazy"
                />
            </div>
        </div>
        <div className="square-text">
            <div className="square-title">{item.title}</div>
            <div className="square-subtitle">{item.subtitle}</div>
        </div>
    </div>
);



const SearchBar = ({ query, onQueryChange }) => (
    <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={query}
        onChange={e => onQueryChange(e.target.value)}
    />
);

const SquareList = ({ list = initialItems, filterFunction = null, onClick}) => {
    const [query, setQuery] = useState('');

    const filteredItems = filterFunction
        ? list.filter(item => filterFunction(item, query))
        : list;

    return (
        <div className="filterable-wrapper">
            <div className="square-list">
                {filteredItems.map(item => (
                    <SquareListItem key={item.id} item={item} onClick={onClick}/>
                ))}
            </div>
        </div>
    );
};


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
  


const VideoList = ({ list = videoItems, onVideoClick, onPlusClick, topic}) => {
    const [query, setQuery] = useState('');

    return (
        <div className="filterable-wrapper">
            <div className="video-list">
                {list.map(item => (
                    <div key={item.id} className="video-item"> 
                        <VideoListItem item={item} onClick={onVideoClick} />
                        
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

export { SquareList, SquareListItem, SearchBar, Video, VideoList };

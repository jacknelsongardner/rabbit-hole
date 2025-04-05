import logo from './logo.svg';
import './App.css';

import { SquareList, SearchBar, Video, VideoList} from './SquareList.js';
import SideBar from './SideBar.js';
import Popup from './Popup.js';

import React, { useState } from 'react';

const newItems = [
  { id: 1, image: 'https://via.placeholder.com/150', title: 'Apple', subtitle: 'Fruit' },
  { id: 2, image: 'https://via.placeholder.com/150', title: 'Banana', subtitle: 'Yellow fruit' },
  { id: 3, image: 'https://via.placeholder.com/150', title: 'Carrot', subtitle: 'Vegetable' },
  { id: 4, image: 'https://via.placeholder.com/150', title: 'Donut', subtitle: 'Dessert' }
];

const FruitPage = ({videos, setVideos}) => {
  const [query, setQuery] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupChildren, setPopupChildren] = useState(<div></div>);


  const onPlusClick = (item) => {
    setPopupVisible(true);
    setPopupChildren(
      <div>
      <h1>{item.name}</h1>
      <Video url={item.url} />
      <p>{item.subtitle}</p>
      </div>
    );
  };


return (
    <div style={{ margin: '0 300px' }}>

            {/* Only render Popup when popupVisible is true */}
            {popupVisible && (
                    <Popup isVisible={popupVisible} setIsVisible={setPopupVisible}>
                    {popupChildren}
                    </Popup>
            )}

            <div>
                <h1 style={{ textAlign: 'center' }}>Select a food</h1>
                <VideoList list={videos} onVideoClick={(url) => console.log(url)} onPlusClick={onPlusClick}></VideoList>
            </div>
            
    </div>
);
}

//<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    //<h1 style={{ textAlign: 'center' }}>Select a food</h1>
                    //<SearchBar query={query} onQueryChange={setQuery} />
                    //<SquareList list={newItems.filter(item => searchFilter(item, query))} onClick={onItemClick} />
            //</div>

            //const searchFilter = (item, query) =>
              //item.title.toLowerCase().includes(query.toLowerCase()) ||
              //item.subtitle.toLowerCase().includes(query.toLowerCase());
          

export default FruitPage;

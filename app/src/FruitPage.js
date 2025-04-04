import logo from './logo.svg';
import './App.css';

import { SquareList, SearchBar } from './SquareList.js';
import SideBar from './SideBar.js';
import Popup from './Popup.js';

import React, { useState } from 'react';

const newItems = [
  { id: 1, image: 'https://via.placeholder.com/150', title: 'Apple', subtitle: 'Fruit' },
  { id: 2, image: 'https://via.placeholder.com/150', title: 'Banana', subtitle: 'Yellow fruit' },
  { id: 3, image: 'https://via.placeholder.com/150', title: 'Carrot', subtitle: 'Vegetable' },
  { id: 4, image: 'https://via.placeholder.com/150', title: 'Donut', subtitle: 'Dessert' },
  { id: 5, image: 'https://media.self.com/photos/5b6b0b0cbb7f036f7f5cbcfa/4:3/w_4116,h_3087,c_limit/apples.jpg', title: 'Eggplant', subtitle: 'Purple veg' },
  { id: 6, image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/02/figs-2056729.jpg?quality=90&webp=true&resize=300,272', title: 'Fig', subtitle: 'Fruit' },
  { id: 7, image: 'https://via.placeholder.com/150', title: 'Grape', subtitle: 'Fruit' },
  { id: 8, image: 'https://via.placeholder.com/150', title: 'Honeydew', subtitle: 'Fruit' },
  { id: 9, image: 'https://via.placeholder.com/150', title: 'Iceberg Lettuce', subtitle: 'Vegetable' },
  { id: 10, image: 'https://via.placeholder.com/150', title: 'Jalapeño', subtitle: 'Spicy pepper' },
  { id: 11, image: 'https://via.placeholder.com/150', title: 'Kiwi', subtitle: 'Fruit' },
  { id: 12, image: 'https://via.placeholder.com/150', title: 'Lemon', subtitle: 'Citrus fruit' }, 
  { id: 13, image: 'https://via.placeholder.com/150', title: 'Mango', subtitle: 'Tropical fruit' },
  { id: 14, image: 'https://via.placeholder.com/150', title: 'Nectarine', subtitle: 'Stone fruit' },
  { id: 15, image: 'https://via.placeholder.com/150', title: 'Orange', subtitle: 'Citrus fruit' },
  { id: 16, image: 'https://via.placeholder.com/150', title: 'Papaya', subtitle: 'Tropical fruit' },
  { id: 17, image: 'https://via.placeholder.com/150', title: 'Quince', subtitle: 'Fruit' },
  { id: 18, image: 'https://via.placeholder.com/150', title: 'Raspberry', subtitle: 'Berry' },
  { id: 19, image: 'https://via.placeholder.com/150', title: 'Strawberry', subtitle: 'Berry' },
  { id: 20, image: 'https://via.placeholder.com/150', title: 'Tomato', subtitle: 'Fruit' },
  { id: 21, image: 'https://via.placeholder.com/150', title: 'Ugli Fruit', subtitle: 'Citrus fruit' },
  { id: 22, image: 'https://via.placeholder.com/150', title: 'Vanilla Bean', subtitle: 'Spice' },
  { id: 23, image: 'https://via.placeholder.com/150', title: 'Watermelon', subtitle: 'Fruit' },
  { id: 24, image: 'https://via.placeholder.com/150', title: 'Xigua', subtitle: 'Fruit' },
  { id: 25, image: 'https://via.placeholder.com/150', title: 'Yam', subtitle: 'Vegetable' },
  { id: 26, image: 'https://via.placeholder.com/150', title: 'Zucchini', subtitle: 'Vegetable' },
  { id: 27, image: 'https://via.placeholder.com/150', title: 'Avocado', subtitle: 'Fruit' },
  { id: 28, image: 'https://via.placeholder.com/150', title: 'Blueberry', subtitle: 'Berry' },
  { id: 29, image: 'https://via.placeholder.com/150', title: 'Cucumber', subtitle: 'Vegetable' },
  { id: 30, image: 'https://via.placeholder.com/150', title: 'Dragonfruit', subtitle: 'Tropical fruit' },
  { id: 31, image: 'https://via.placeholder.com/150', title: 'Elderberry', subtitle: 'Berry' },
  { id: 32, image: 'https://via.placeholder.com/150', title: 'Fennel', subtitle: 'Vegetable' },
  { id: 33, image: 'https://via.placeholder.com/150', title: 'Ginger', subtitle: 'Root' },
  { id: 34, image: 'https://via.placeholder.com/150', title: 'Huckleberry', subtitle: 'Berry' },
  { id: 35, image: 'https://via.placeholder.com/150', title: 'Indian Fig', subtitle: 'Cactus fruit' },
  { id: 36, image: 'https://via.placeholder.com/150', title: 'Jackfruit', subtitle: 'Tropical fruit' },
  { id: 37, image: 'https://via.placeholder.com/150', title: 'Kale', subtitle: 'Leafy green' },
  { id: 38, image: 'https://via.placeholder.com/150', title: 'Lime', subtitle: 'Citrus fruit' },
  { id: 39, image: 'https://via.placeholder.com/150', title: 'Mulberry', subtitle: 'Berry' },
  { id: 40, image: 'https://via.placeholder.com/150', title: 'Nori', subtitle: 'Seaweed' },
  { id: 41, image: 'https://via.placeholder.com/150', title: 'Okra', subtitle: 'Vegetable' },
  { id: 42, image: 'https://via.placeholder.com/150', title: 'Pineapple', subtitle: 'Tropical fruit' },
  { id: 43, image: 'https://via.placeholder.com/150', title: 'Quinoa', subtitle: 'Grain' },
  { id: 44, image: 'https://via.placeholder.com/150', title: 'Radish', subtitle: 'Vegetable' },
  { id: 45, image: 'https://via.placeholder.com/150', title: 'Spinach', subtitle: 'Leafy green' },
  { id: 46, image: 'https://via.placeholder.com/150', title: 'Turnip', subtitle: 'Root vegetable' },
  { id: 47, image: 'https://via.placeholder.com/150', title: 'Ube', subtitle: 'Purple yam' },
  { id: 48, image: 'https://via.placeholder.com/150', title: 'Vidalia Onion', subtitle: 'Sweet onion' },
  { id: 49, image: 'https://via.placeholder.com/150', title: 'Walnut', subtitle: 'Nut' },
  { id: 50, image: 'https://via.placeholder.com/150', title: 'Yellow Pepper', subtitle: 'Vegetable' },
  { id: 51, image: 'https://via.placeholder.com/150', title: 'Zest', subtitle: 'Citrus peel' }
];

const FruitPage = () => {
  const [query, setQuery] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupChildren, setPopupChildren] = useState(<div></div>);

  const onItemClick = (item) => {
    setPopupVisible(true);
    setPopupChildren(
      <div>
      <h1>{item.title}</h1>
      <img 
        src={item.image} 
        alt={item.title} 
        style={{
        width: '400px',
        height: '400px',
        objectFit: 'cover'
        }} 
      />
      <p>{item.subtitle}</p>
      </div>
    );
  };

  const searchFilter = (item, query) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(query.toLowerCase());

return (
    <div style={{ margin: '0 300px' }}>

            {/* Only render Popup when popupVisible is true */}
            {popupVisible && (
                    <Popup isVisible={popupVisible} setIsVisible={setPopupVisible}>
                    {popupChildren}
                    </Popup>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 style={{ textAlign: 'center' }}>Select a food</h1>
                    <SearchBar query={query} onQueryChange={setQuery} />
                    <SquareList list={newItems.filter(item => searchFilter(item, query))} onClick={onItemClick} />
            </div>
    </div>
);
}

export default FruitPage;

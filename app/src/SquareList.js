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
  
const SquareListItem = ({ item, onClick }) => (
    <div className="square-item" key={item.id} onClick={() => onClick(item)}>
        <img src={item.image} alt={item.title} className="square-image" />
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

export { SquareList, SquareListItem, SearchBar };

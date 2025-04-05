
import './BookBar.css';  // Import the CSS file for styling

const BookBar = ({ items, onItemClick, setItems}) => {
    
    const handleClick = (item) => {
        onItemClick(item);
    };

    const handleDelete = (item) => {
        setItems((prevItems) => prevItems.filter((i) => i !== item));
    }

    return (
        <div className="bookbar" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Bookmarks</p>
            <ul style={{ width: '80%', margin: '0 auto' }}>
                {items.map((item, index) => (
                    <div key={index}>
                        <li 
                            
                            className="sidebar-item" 
                            style={{ fontSize: '18px' }}
                        >
                            <span style={{ float: 'left' }} onClick={() => handleClick(item)} >
                                {item.title}
                            </span>
                            <button 
                                onClick={() => handleDelete(item)} 
                                className="delete-button" 
                                style={{ fontSize: '18px' }}
                            >
                                X
                            </button>
                        </li>
                    </div>
                ))}
                
            </ul>
        </div>
    );
};

export default BookBar;


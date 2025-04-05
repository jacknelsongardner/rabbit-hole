
import './BookBar.css';  // Import the CSS file for styling

const BookBar = ({ items, onItemClick, setLoggedIn, setItems}) => {
    
    const handleClick = (item) => {
        if (onItemClick) {
            onItemClick(item);
        }
    };

    var sidebarClass = '';


    const handleDelete = (item) => {
        setItems((prevItems) => prevItems.filter((i) => i !== item));
    }

    const handleSignOut = () => {
        setLoggedIn(); // Assuming loggedIn is a function to update login state
    };

    return (
        <div className="bookbar" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Bookmarks</p>
            <ul style={{ width: '80%', margin: '0 auto' }}>
            {items.map((item, index) => (
            <div key={index}>
            <li onClick={() => handleClick(item)} className="sidebar-item" style={{ fontSize: '18px' }}>
            <span style={{ float: 'left' }}>{item}</span>
            <button onClick={() => handleDelete(item)} className="delete-button" style={{ fontSize: '18px' }}>
            X
            </button>
            </li>
            </div>
            ))}
            <li className="sidebar-item">
            
            </li>
            </ul>
        </div>
    );
};

export default BookBar;


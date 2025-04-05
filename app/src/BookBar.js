
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
        <div className="bookbar " >
            <ul>
            {items.map((item, index) => (
            <div key={index}>
            <li onClick={() => handleClick(item)} className="sidebar-item">
            <span style={{ float: 'left' }}>{item}</span>
            <button onClick={() => handleDelete(item)} className="delete-button">
                X
            </button>
            </li>
            </div>
            ))}
            <li className="sidebar-item">
            <button onClick={handleSignOut} className="signout-button">
            Sign Out
            </button>
            </li>
            </ul>
        </div>
        );
};

export default BookBar;


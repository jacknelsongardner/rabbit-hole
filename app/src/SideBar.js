
import './SideBar.css';  // Import the CSS file for styling

const SideBar = ({ items, onItemClick, setLoggedIn }) => {
    const handleClick = (item) => {
        if (onItemClick) {
            onItemClick(item);
        }
    };

    const handleSignOut = () => {
        setLoggedIn(); // Assuming loggedIn is a function to update login state
    };

    return (
        <div className="sidebar">
            <ul>
                {items.map((item, index) => (
                    <li key={index} onClick={() => handleClick(item)} className="sidebar-item">
                        {item}
                    </li>
                ))}
            </ul>
            <button onClick={handleSignOut} className="signout-button">
                Sign Out
            </button>
        </div>
    );
};

export default SideBar;


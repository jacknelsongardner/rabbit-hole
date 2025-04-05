import './SideBar.css';  // Import the CSS file for styling

const SideBar = ({ items, onItemClick, setLoggedIn, setItems}) => {
    
    const handleClick = (item) => {
        if (onItemClick) {
            onItemClick(item);
        }
    };

    const handleAddThread = () => {
        const threadName = `Thread ${Object.keys(items).length + 1}`;
        setItems((prevItems) => ({
            ...prevItems,
            [threadName]: []
        }));
    };

    const handleDelete = (item) => {
        setItems((prevItems) => {
            const newItems = { ...prevItems };
            delete newItems[item];
            return newItems;
        });
    }

    const handleSignOut = () => {
        setLoggedIn(); // Assuming loggedIn is a function to update login state
    };

    return (
        <div className="sidebar " style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Threads</p>
            <button 
                onClick={handleAddThread} 
                className="add-button"
                style={{ 
                    fontSize: '18px', 
                    margin: '10px',
                    padding: '5px 15px'
                }}
            >
                + Add Thread
            </button>
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
                <button onClick={handleSignOut} className="signout-button">
                    Sign Out
                </button>
            </li>
            </ul>
        </div>
    );
};

export default SideBar;

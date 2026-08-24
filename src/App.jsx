import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

function UserProfile({name, email, username}){
    return (
    <div>
      <h2>{name}</h2>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Email:</strong> {email}</p>
    </div>
    );
}

function App(){
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    async function fetchData(){
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok){
          throw new Error(`Https error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err){
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  if (loading) return <div style={{ padding: '20px' }}><h2>User Details</h2>Loading user profile...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  if (!users) {
    return <p>No user data available.</p>;
  }
  const filterUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <>
    <h2>User Details</h2>
    <input 
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        />
    {/* {users.map(each => (
        <UserProfile 
            key={each.id}
            name={each.name}
            username={each.username}
            email={each.email}
        />
    ))} */}
    {filterUsers.length === 0 ? (
            <p>No Users Found with this name</p>
        ) : filterUsers.map(each => ( 
        <UserProfile 
            key={each.id}
            name={each.name}
            username={each.username}
            email={each.email}
        />
    ))}
    </>
  );
}

export default App

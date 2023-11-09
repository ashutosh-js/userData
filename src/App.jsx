// App.js
import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import SearchInput from './components/SearchInput';
import UserList from './components/UserList'; 
import UserData from './components/UserData'; 
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [allUsers, setAllUsers] = useState([]); 
  const [searchResults, setSearchResults] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/users');

        setAllUsers(response.data);
        setSearchResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
        setErrorMessage('Error fetching user data. Please try again.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterUsers = () => {
      if (name === '') {
        setSearchResults(allUsers);
        return;
      }

      const filteredUsers = allUsers.filter(user =>
        user.login.toLowerCase().includes(name.toLowerCase())
      );

      setSearchResults(filteredUsers);
    };

    const debounce = setTimeout(() => {
      filterUsers();
    }, 300);

    return () => clearTimeout(debounce);
  }, [name, allUsers]);
  

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <>
      <SearchInput name={name} setName={setName} />
      {errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : (
        selectedUser ? (
          <UserData selectedUser={selectedUser} />
        ) : (
          <UserList searchResults={searchResults} handleUserClick={handleUserClick} loading={loading} />
        )
      )}
    </>
  );
}

export default App;

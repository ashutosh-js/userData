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
    const filterUsers = async () => {
      try {
        if (name === '') {
          setSearchResults(allUsers);
          return;
        }

        setLoading(true);


        const filterResponse = await axiosInstance.get(`/search/users?q=${name}&per_page=100`);

        console.log('Filter response:', filterResponse.data.items);

        setSearchResults(filterResponse.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error filtering user data:', error);
        setSearchResults([]);
        setLoading(false);
        setErrorMessage('Error filtering user data. Please try again.');
      }
    };

    const debounce = setTimeout(() => {
      filterUsers();
    }, 1000);

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

import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get('http://localhost:8000/api/bank/');
      setUsers(response.data);
    })();
  }, [])

  return (
    <div className="App">
     {users.map(user => {
       return <> 
        <p>User Id : {user.id}</p>
        <p>User cash : {user.cash}</p>
        <p>User credit : {user.credit}</p>
        <p>isActive : {user.isActive}</p>
        <hr></hr>
       </>
     })}
    </div>
  );
}

export default App;

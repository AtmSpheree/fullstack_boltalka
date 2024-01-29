import '../../css/App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../Home/Home'
import Login from '../Login/Login'
import Register from "../Register/Register";
import { useState, useEffect } from 'react';
import '../../css/Header.css';

function App(props) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token === undefined || token === null) {
      navigate('/login');
    }
  }, [token]);

  return (<div>
    <header id="header">boltalka</header>
    <Routes>
      <Route path="/" element={<Home setToken={setToken} navigate={navigate} token={token}/>}/>
      <Route path="/login" element={<Login setToken={setToken} navigate={navigate} token={token}/>}/>
      <Route path="/register" element={<Register navigate={navigate}/>}></Route>
    </Routes>
    </div>
  )
}

export default App;

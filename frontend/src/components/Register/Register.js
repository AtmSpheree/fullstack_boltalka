import { useState, useEffect } from 'react';
import '../../css/App.css';

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    fetch("http://localhost:8000/api/user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      }).then(response => {
      if (response.ok) {
        props.navigate('/login')
        return response.json()
      } else {
        throw Error(`Something went wrong: code ${response.status}`);
      }
    }).catch(error => {
        console.log(error);
    })
  }

  const clickHandler = e => {
    e.preventDefault();
    props.navigate('/login');
  }

  return (<form className="main_form_type" onSubmit={submitHandler}>
      <p style={{margin: 0}}>Регистрация</p>
      <div className="main_form_input_type">
        <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} required/>
        <label>Username</label>
      </div>
      <div className="main_form_input_type">
        <input type="text" name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
        <label>Password</label>
      </div>
    <input className="form_submit_button" type="submit" name="submit" value="Зарегистрироваться"/>
      <a href={"/"} onClick={clickHandler}>Вход</a>
    </form>
  );
}

export default Register;
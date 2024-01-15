import { useState, useEffect } from 'react';

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    fetch("http://localhost:8000/api/register",
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

  return (<form onSubmit={submitHandler}>
      <p style={{margin: 0}}>Регистрация</p>
      <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
      <input type="text" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
    <input type="submit" name="submit" value="Зарегистрироваться"/><br/>
      <a href={"/"} onClick={clickHandler}>Вход</a>
    </form>
  );
}

export default Register;
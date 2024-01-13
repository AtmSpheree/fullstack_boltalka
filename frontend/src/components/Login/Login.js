import { useState, useEffect } from "react";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAccess, setIsAccess] = useState(true);

    useEffect(() => {
        if (props.token) {
            props.navigate('/');
        }
    }, []);

    const submitHandler = e => {
        e.preventDefault();
        setIsAccess(true);
        fetch("http://localhost:8000/api/login",
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
                return response.json()
            } else if (response.status === 400) {
                throw Error("Unable to log in with provided credentials.");
            } else {
                throw Error(`Something went wrong: code ${response.status}`);
            }
        }).then(({token}) => {
            localStorage.setItem("token", token);
            props.setToken(token);
            props.navigate('/');
        }).catch(error => {
            if (error.message === "Unable to log in with provided credentials.") {
                setIsAccess(false);
            } else {
                console.log(error);
            }
        })
    };

    return (<form onSubmit={submitHandler}>
        <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
        <input type="text" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
        <input type="submit" name="submit" value="Войти"/><br/>
        {!isAccess? <p>Неверные учётные данные</p> : <p></p>}
    </form>
    );
}

export default Login;
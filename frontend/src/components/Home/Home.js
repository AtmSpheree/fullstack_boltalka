import { useEffect, useState } from "react";
import Dialogs from "./Dialogs";

function Home(props) {
    const [dialogs, setDialogs] = useState([]);
    const [updateDialogs, setUpdateDialogs] = useState(true);
    const [username, setUsername] = useState(null);

    useEffect(() => {
      if (username === null) {
        fetch("http://localhost:8000/api/user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "Authorization": `Bearer ${props.token}`
            }
          }).then(response => {
          if (response.ok) {
            return response.json()
          } else if (response.status === 401) {
            throw Error("Unauthorized.");
          } else {
            throw Error(`Something went wrong: code ${response.status}`);
          }
        }).then(({success, username}) => {
          setUsername(username);
        }).catch(error => {
          if (error.message === "Unauthorized.") {
            localStorage.removeItem("token");
            props.setToken(undefined);
            props.navigate('/login');
          } else {
            console.log(error);
          }
        })
      }
    }, [username])

    useEffect(() => {
        if (updateDialogs) {
          fetch("http://localhost:8000/api/dialogs",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${props.token}`
              }
            }).then(response => {
            if (response.ok) {
              return response.json()
            } else if (response.status === 401) {
              throw Error("Unauthorized.");
            } else {
              throw Error(`Something went wrong: code ${response.status}`);
            }
          }).then(({success, dialogs}) => {
            setDialogs(dialogs);
          }).catch(error => {
            if (error.message === "Unauthorized.") {
              localStorage.removeItem("token");
              props.setToken(undefined);
              props.navigate('/login');
            } else {
              console.log(error);
            }
          })
          setUpdateDialogs(false);
        }
    }, [updateDialogs]);

    const onClickHandlerLogout = e => {
        e.preventDefault();
        localStorage.removeItem("token");
        props.setToken(undefined);
        props.navigate('/login');
    }

    const onClickHandlerCreateDialog = e => {
      e.preventDefault();
      fetch("http://localhost:8000/api/create_dialog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${props.token}`
          }
        }).then(response => {
        if (response.ok) {
          setUpdateDialogs(true);
          return response.json()
        } else if (response.status === 401) {
          throw Error("Unauthorized.");
        } else {
          throw Error(`Something went wrong: code ${response.status}`);
        }
      }).catch(error => {
        if (error.message === "Unauthorized.") {
          localStorage.removeItem("token");
          props.setToken(undefined);
          props.navigate('/login');
        } else {
          console.log(error);
        }
      })
    }

    return (<div>
        <div>Username: {username}</div>
        <button onClick={onClickHandlerLogout}>Logout</button><br/>
        <button onClick={onClickHandlerCreateDialog}>Создать новый диалог</button>
        <Dialogs dialogs={dialogs} setUpdateDialogs={setUpdateDialogs} setToken={props.setToken}
                 navigate={props.navigate} token={props.token} username={username}/>
    </div>);
}

export default Home;
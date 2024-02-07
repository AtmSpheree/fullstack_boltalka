import { useEffect, useState } from "react";
import Dialogs from "./Dialogs";
import '../../css/Home.css'
import Messages from "./Messages";

function Home(props) {
    const [dialogs, setDialogs] = useState([]);
    const [selectedDialog, setSelectedDialog] = useState(null);
    const [messages, setMessages] = useState([]);
    const [updateDialogs, setUpdateDialogs] = useState(true);
    const [username, setUsername] = useState(null);

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

    useEffect(() => {
      if (dialogs.length !== 0) {
        setSelectedDialog(dialogs[0].id);
      } else {
        setSelectedDialog(null);
      }
    }, [dialogs]);

    useEffect(() => {
      if (dialogs.filter((Dialog) => Dialog.id === selectedDialog).length !== 0) {
        setMessages(dialogs.filter((Dialog) => Dialog.id === selectedDialog)[0].messages.reverse());
      } else {
        setMessages([]);
      }
    }, [selectedDialog, dialogs])

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

    const onClickHandlerLogout = e => {
        e.preventDefault();
        localStorage.removeItem("token");
        props.setToken(undefined);
        props.navigate('/login');
    }

    const onClickHandlerCreateDialog = e => {
      e.preventDefault();
      fetch("http://localhost:8000/api/dialog",
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

    const onClickHandlerDeleteDialog = e => {
      e.preventDefault();
      fetch(`http://localhost:8000/api/dialog/${selectedDialog}`,
        {
          method: "DELETE",
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

    return (<div className="home_wrapper">
        <div className="left_user_data_panel">
          <div>Username: <b>{username}</b></div>
          <button onClick={onClickHandlerLogout}>Logout</button>
          <button onClick={onClickHandlerCreateDialog}>Создать новый диалог</button>
          {dialogs.length !== 0 && <button onClick={onClickHandlerDeleteDialog}>Удалить диалог</button>}
          <Dialogs dialogs={dialogs} setToken={props.setToken}
                   navigate={props.navigate} token={props.token} setSelectedDialog={setSelectedDialog}/>
        </div>
        <Messages setToken={props.setToken} selectedDialog={selectedDialog} setUpdateDialogs={setUpdateDialogs}
                  messages={messages} navigate={props.navigate} token={props.token} username={username}/>
    </div>);
}

export default Home;
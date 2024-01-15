import {useEffect, useState} from "react";
import Messages from "./Messages";

function Dialogs(props) {
  const [selectedDialog, setSelectedDialog] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (props.dialogs.length !== 0) {
      setSelectedDialog(props.dialogs[0].id);
    }
  }, [props.dialogs]);

  useEffect(() => {
    if (props.dialogs.filter((Dialog) => Dialog.id === selectedDialog).length !== 0) {
      setMessages(props.dialogs.filter((Dialog) => Dialog.id === selectedDialog)[0].messages.reverse());
    } else {
      setMessages([]);
    }
  }, [selectedDialog, props.dialogs])

  const onClickHandlerDeleteDialog = e => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/delete_dialog/${selectedDialog}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Authorization": `Bearer ${props.token}`
        }
      }).then(response => {
      if (response.ok) {
        props.setUpdateDialogs(true);
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

  const submitHandler = e => {
    e.preventDefault();
    fetch("http://localhost:8000/api/send_message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Authorization": `Bearer ${props.token}`
        },
        body: JSON.stringify({
          dialog: selectedDialog,
          message: message,
        })
      }).then(response => {
      if (response.ok) {
        props.setUpdateDialogs(true);
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
    {props.dialogs.length !== 0? <div>
        <button onClick={onClickHandlerDeleteDialog}>Удалить диалог</button><br/>
        <select value={selectedDialog} onChange={e => setSelectedDialog(Number(e.target.value))}>
    {props.dialogs.map(Dialog => (<option key={Dialog.id} value={Dialog.id}>Dialog #{Dialog.id}</option>))}
    </select><br/>
      <form onSubmit={submitHandler}>
        <input type="text" name="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Соообщеие"/><br/>
        <input type="submit" name="submit" value="Отправить"/>
      </form>
      {messages.length !== 0?
        <Messages messages={messages} username={props.username}/> : <div>У вас пока что нет сообщений</div>
      }
  </div>
    : <div>У вас пока что нет диалогов.</div>}</div>);
}

Dialogs.defaultProps = {"dialogs": []}

export default Dialogs;
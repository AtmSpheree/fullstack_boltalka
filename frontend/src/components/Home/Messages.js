import {useState} from "react";
import "../../css/Messages.css";

function Messages(props) {
  const [message, setMessage] = useState("");

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
          dialog: props.selectedDialog,
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

  if (props.selectedDialog !== null) {
    return (<div className="right_messages_panel">
      <div className="messages_box">
        {props.messages.map((Message, index) => {if (index % 2 === 0) {
          return <p key={index}>Bot: {Message}</p>
        } else {
          return <p key={index}>{props.username}: {Message}</p>}
        })}
      </div>
      <form onSubmit={submitHandler} className="send_message_box">
        <input type="text" name="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Соообщение" className="input_message"/><br/>
        <input type="submit" name="submit" value="Отправить" className="submit_message"/>
      </form>
    </div>)
  } else {
    return <div className="right_messages_panel"></div>
  }
}

Messages.defaultProps = {"messages": []}

export default Messages;
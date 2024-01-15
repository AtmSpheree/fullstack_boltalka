function Messages(props) {
  return (<div>
    {props.messages.map((Message, index) => {if (index % 2 === 0) {
      return <p key={index}>Bot: {Message}</p>
    } else {
      return <p key={index}>{props.username}: {Message}</p>}
    })}
  </div>)
}

Messages.defaultProps = {"messages": []}

export default Messages;
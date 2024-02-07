import {useEffect} from "react";
import '../../css/Dialogs.css';

function Dialogs(props) {

  function onClickItemHandler(e) {
    let number = null;
    for (let i = 0; i < e.target.parentNode.children.length; i++) {
      if (e.target.parentNode.children[i] === e.target) {
        number = i;
      }
      e.target.parentNode.children[i].className = "dialog";
    }
    e.target.className = "dialog dialog_selected";
    props.setSelectedDialog(Number(props.dialogs[number].id))
  }

  return (<div>
    {props.dialogs.length !== 0?
      <div className="dialogs_container">
        {props.dialogs.map(function(Dialog, num) {
          if (num === 0) {
            return <div className="dialog dialog_selected" key={Dialog.id} onClick={onClickItemHandler}>Dialog #{Dialog.id}</div>
          } else {
            return <div className="dialog" key={Dialog.id} onClick={onClickItemHandler}>Dialog #{Dialog.id}</div>
          }
        })}
      </div>
      : <div>У вас пока что нет диалогов.</div>}
    </div>);
}

Dialogs.defaultProps = {"dialogs": []}

export default Dialogs;
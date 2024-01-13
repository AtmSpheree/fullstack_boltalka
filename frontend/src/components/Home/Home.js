import { useEffect, useState } from "react";

function Home(props) {
    const [dialogs, setDialogs] = useState([]);

    const onClickHandler = e => {
        e.preventDefault();
        localStorage.removeItem("token");
        props.setToken(undefined);
        props.navigate('/login');
    }

    return (<div>
        <button onClick={onClickHandler}>Logout</button>
    </div>);
}

export default Home;
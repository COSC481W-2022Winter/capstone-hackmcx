import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from "axios";
import CreatePost from './CreatePost';

function App(){
  const [example, setExample] = useState('-_-');
  useEffect(async () => {
    await axios.get('http://localhost:3003/example').then((response) => {
      setExample(response.data[0].CURRENT_TIMESTAMP)
    }).catch((any) => console.log(any))
  }, [example])
  return (
    <div className="App">
	<CreatePost/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{example}</p>
      </header>
    </div>
  );
}

export default App;

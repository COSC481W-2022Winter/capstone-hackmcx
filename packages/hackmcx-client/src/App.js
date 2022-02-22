import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from "axios";
import PostPage from './PostPage';

function App(){
  const [example, setExample] = useState('-_-');
  useEffect(async () => {
    await axios.get('http://localhost:3003/example').then((response) => {
      setExample(response.data[0].CURRENT_TIMESTAMP)
    }).catch((any) => console.log(any))
  }, [example])
  return (
    <PostPage />
  );
}

export default App;

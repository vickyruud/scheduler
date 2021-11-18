import { useState } from "react";


export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial]);
  
  function transition (newMode, replace = false) {
    //sets new mode and adds the mode to history array when replace is false
    if(!replace) {
      setHistory([...history, newMode])      
    }
    setMode(newMode);
    
  }

  function back (){

    //checks the length of the history array
    if(history.length > 1) {
      //remove the last item
      history.pop();
      //sets the mode as the last item in history
      setMode(history[history.length - 1]);
    } 
  }

  
  return { mode, transition, back }
  





}
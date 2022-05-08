import React,{useState} from "react";
import {View,Text,StyleSheet} from "react-native"
import Onboard from "./components/onboardScreen" 
import Home from "./components/homeScreen";

const App=()=>{
const[showOnBoard, setShowOnBoard] = useState(true);
const handleOnBoardDone=()=>{
  setShowOnBoard(false);
}


return(
 <>
 {showOnBoard && <Onboard handleDone = {handleOnBoardDone}/>}
 {!showOnBoard && <Home/>}
 </>
)
}

export default App;
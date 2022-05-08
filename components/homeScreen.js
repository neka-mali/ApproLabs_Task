import React from "react";
import {SafeAreaView,View, Text,ImageBackground} from "react-native"
const Home=()=>{
    return (
<View>
    <ImageBackground source = {require('../assets/images/bg.png')}>
    <Text> Welcome to Home Screen</Text>
    </ImageBackground>
</View>
    )
}

export default Home;
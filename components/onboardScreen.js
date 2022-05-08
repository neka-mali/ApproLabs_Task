/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
 
   StyleSheet,
   Text,
   SafeAreaView,
   ImageBackground,
   Image,
   View, StatusBar
 } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
 

 import colors from '../assets/colors/colors';
 const data = [
   {
     title: 'Track your savings',
     text: 'Start Now !',
     image: require('../assets/images/pic1.png'),
 
   },
   {
     title: 'Investing is fun',
     text: 'Make money while you sleep !',
     image: require('../assets/images/pic2.png'),
 
   },
   {
     title: 'Turn rupees to Dreams',
     text: "Get Started",
     image: require('../assets/images/pic3.png'),
 
   },
 ];
 
 
 const Onboard = (props) => {
 const bgImg = require('../assets/images/bg.png')
   const renderItem = ({ item }) => {
     return (
       <View>
         <Image style={styles.image} source={item.image} />
         <View>
           <Text style={styles.title}>{item.title}</Text>
           <Text style={styles.text}>{item.text}</Text>
         </View>
       </View>
     )
   };
 
   const keyExtractor = (item) => item.title;
 
   const renderDoneButton = () => {
        return (
           <LinearGradient
          colors={['#A5C8FF', '#23286B']}
          // style={styles.linearGradient}
           start={{x: 0, y: 0.5}}
           end={{x: 1, y: 0.5}}
           style={styles.doneButtonWrapper}
           >
           
          <Text style = {styles.doneButtonText}> Done</Text>
           </LinearGradient>
     )
   }
   const renderNextButton = () => {
     return (
       <View style = {styles.rightTextWrapper}>
         <Text style ={styles.rightText}>
           Next
         </Text>
       </View>
     )
   }
   const renderPrevButton = () => {
     return (
       <View style = {styles.leftTextWrapper}>
         <Text style = {styles.leftText}>
           Prev
         </Text>
       </View>
     )
   }

   const handleDone=()=>{
       props.handleDone()
   }
   return (
     <View style={{ flex: 1 }}>
       <StatusBar
         backgroundColor="grey"
         barStyle="light-content"
         hidden={false}
         translucent={true}
       />
       <AppIntroSlider
         keyExtractor={keyExtractor}
         renderItem={renderItem}
         data={data}
         renderDoneButton={renderDoneButton}
         renderNextButton={renderNextButton}
         renderPrevButton={renderPrevButton}
         showPrevButton
         dotStyle={styles.dotStyle}
         activeDotStyle = {styles.activeDotStyle}
         onDone={handleDone}
       />
 
     </View>
   )
 }
 
 const styles = StyleSheet.create({
   image: {
     marginVertical: 30,
     resizeMode: "contain",
     width: 420,
     height: 600,
   },
 
   slide: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: colors.white,
   },
 
   title: {
     fontSize: 24,
     color: colors.black,
     textAlign: 'center',
     fontFamily: 'OpenSans-Bold',
     marginHorizontal: 40,
   },
   text: {
     fontSize: 14,
     color: colors.gray,
     textAlign: 'center',
     fontFamily: 'OpenSans-SemiBold',
     marginHorizontal: 50,
     marginTop: 10,
   },
   dotStyle: {
     backgroundColor: colors.blueFaded,
   },
   activeDotStyle: {
     backgroundColor: colors.blue,
   },
   rightTextWrapper: {
     width: 40,
     height: 40,
     marginRight: 20,
     justifyContent: 'center',
     alignItems: 'center',
     textAlign: 'center',
   },
   rightText: {
     color: colors.blue,
     fontFamily: 'OpenSans-SemiBold',
     fontSize: 14,
   },
   leftTextWrapper: {
     width: 40,
     height: 40,
     marginLeft: 20,
     justifyContent: 'center',
     alignItems: 'center',
     textAlign: 'center',
   },
   leftText: {
     color: colors.blue,
     fontFamily: 'OpenSans-SemiBold',
     fontSize: 14,
   },
   doneButtonWrapper: {
     flex: 1,
     paddingLeft: 35,
     paddingRight: 50,
     paddingVertical: 10,
     borderRadius: 25,
     marginRight: -40,
   },
   doneButtonText: {
     fontSize: 14,
     fontFamily: 'OpenSans-SemiBold',
     textAlign: 'center',
     color: colors.blue,
   },
   bgImgStyle:{
     width : "80%",
     height:"80%",
     resizeMode : "contain"
   }
 });
 
 
 
 export default Onboard;
 
 
 
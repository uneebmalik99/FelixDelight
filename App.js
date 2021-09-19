import React ,{ useEffect, useState }from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from './src/navigation/DrawerContent';
import Contactus from './src/screens/Contactus';
import Home from './src/screens/Home';
import Offerdetails from './src/screens/Offerdetails'
import { View,Modal,SafeAreaView, PermissionsAndroid, RefreshControl, Text, TouchableOpacity, TextInput, StyleSheet, Platform, BackHandler, Image, ScrollView,ImageBackground, StatusBar } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { deviceHeight, deviceWidth } from './src/constance/AppConstance';
import AppColors from './src/Colors/AppColors';


const Stack = createStackNavigator();



const Drawer = createDrawerNavigator();
const AppDrawer = () =>{
  return(
    <Drawer.Navigator
    drawerPosition='right'
    drawerType='front'
     drawerContent={props => <DrawerContent {...props} />
    }
    >
            <Drawer.Screen name="Home" component={Home} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

      <Drawer.Screen name="Contactus" component={Contactus} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />


    </Drawer.Navigator>
  );
}


const App = () => {
  const [splash ,setsplash] = useState(true)
  useEffect(() => {

setTimeout(() => {
  setsplash(false)
}, 1800);



  } ,[]);
 return (
<>
{ splash ==  true ? 
<SafeAreaView style={{height:deviceHeight ,justifyContent:'center', alignItems:'center', backgroundColor:AppColors.themecolor, width:deviceWidth}}>

<View>
<Image style={{width:deviceWidth*0.38 ,alignSelf:'center', height:deviceHeight*0.2}} resizeMethod='resize' resizeMode='stretch' source={require('./src/Images/Logo.png')} />
<Image style={{width:deviceWidth*0.29 ,marginTop:5, alignSelf:'center', height:deviceHeight*0.04}} resizeMethod='resize' resizeMode='stretch' source={require('./src/Images/Felixdelight.jpeg')} />

  </View>

</SafeAreaView>

:




   <NavigationContainer>
   <Stack.Navigator 
   >
     

<Stack.Screen name='AppDrawer1' component={AppDrawer} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />





<Stack.Screen name='Offerdetails' component={Offerdetails} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />
 

   </Stack.Navigator>
   </NavigationContainer>
}
 </>
 
 );
}

export default App;
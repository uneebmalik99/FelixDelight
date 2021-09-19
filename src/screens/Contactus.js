import React, { Component,useEffect, useState } from 'react';
import { View, Text,StatusBar, TouchableOpacity, TextInput, StyleSheet, Platform, BackHandler, Image, ScrollView,ImageBackground, SafeAreaView } from 'react-native';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppColors from '../Colors/AppColors';
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Contactus = ({navigation}) => {


    const [phone , setphone] = useState('')
    const [email , setemail] = useState('')


    useEffect(() => {
        // Update the document title using the browser API
      

        CallingContactusApi() 
         

    
    },[ ]);

   const  CallingContactusApi = () => {
      
    fetch('https://felixdelight.com/api/contactus', {
        method: 'GET',
        headers: {
           
        //    'Content-Type': 'multipart/form-data',
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {

            if(responseJson != '' || responseJson != null){
            console.log(JSON.stringify(responseJson[0].phone));

            setphone(responseJson[0].phone)
            setemail(responseJson[0].email)
            }
 
        })
        .catch((error) => {
            console.warn(error)
        });
            
    }


    return (
        <SafeAreaView  style={[styles.container, { backgroundColor: '#00090E' }]}>

            <StatusBar    barStyle="light-content"    backgroundColor="#00090E" />
        
      
       
        <Appbar style={styles.appbar}>

            <TouchableOpacity 
                    style={{alignContent:"flex-start", alignItems:"flex-start"}}
            onPress={()=> {       navigation.openDrawer();

            }}
            >
                 <MaterialCommunityIcons  name='menu' size={30} color={AppColors.themecolor} />

                  
                </TouchableOpacity>
  
          <Text style={styles.header_txt}>
              Contact Us
        </Text>
         
        <View>

        </View>

            </Appbar>

            <View style={styles.body}>
            
            <Text style={{color:AppColors.themecolor, fontSize:16}}>Phone</Text>
            
            <Text style={{color:AppColors.themecolor,marginLeft:60, marginTop:10,fontSize:16}}>{phone}</Text>

            <Text style={{color:AppColors.themecolor, marginTop:30,fontSize:16}}>Email</Text>
           
            <Text style={{color:AppColors.themecolor,marginLeft:60,marginTop:10, fontSize:16}}>{email}</Text>

            </View>



        </SafeAreaView>
            );
  }
  
  export default Contactus;
  
    
 const styles = StyleSheet.create({
    container:{
       flex:1, 
       height:deviceHeight,
       width:deviceWidth
    },
    appbar:{
       backgroundColor:'black',
       width:deviceWidth,
       justifyContent:'space-between',
       backgroundColor:'black',
       elevation:0,
       paddingHorizontal:10,
       height:deviceHeight*0.08,
       borderBottomColor:AppColors.themecolor,
       borderBottomWidth:0.4,
    },
    body:{
       flex:1,
       backgroundColor:'black', 
       padding:20,
    },
    header_txt:{
       color:AppColors.themecolor,
       fontSize:22,
       fontWeight:'bold'
    },
    pinned_item:{
       backgroundColor:'black',
       marginTop:10,
       borderRadius:10,
       paddingHorizontal:10,
       height:deviceHeight*0.15,
       flexDirection:'row'

    },
    list_item:{

       backgroundColor:'black',
       marginTop:10,
       borderRadius:10,
       paddingHorizontal:10,
       height:deviceHeight*0.15,
       flexDirection:'row'
    },


})
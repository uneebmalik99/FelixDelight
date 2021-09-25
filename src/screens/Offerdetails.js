import React, { Component,useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet, Platform, BackHandler, Image, ScrollView,ImageBackground, SafeAreaView, StatusBar, Linking } from 'react-native';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Appbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppColors from '../Colors/AppColors';
import { FlatList } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import {getDistance, getPreciseDistance} from 'geolib';
import Slideshow from 'react-native-image-slider-show';

const Offerdetails = ({route, navigation}) => {

    const {id} = route.params
    const [modalVisible , setmodalVisible] = useState(false)
    const [ Details , setDetails] = useState([
        
    ])
    const [imgmodel , setimgmodel] = useState(false)

    const [images, setimages] = useState([])
    
    useEffect(() => {
        CallingSpecficDealApi()
    
    },[ ]);

  

    const  CallingSpecficDealApi = () => {
      
        fetch('https://admin.felixdelight.com/api/specificDeal/'+id, {
            method: 'GET',
            headers: {
               
            //    'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson[0]));
                setDetails(responseJson[0])
                let img = responseJson[0].images;
                var a =[];
                for(var i =0 ; i< img.length ; i++){
                   var element = img[i].image
                   var b ={};
                   b.url = element
                   a.push(b)
                }
                console.log(a);
                setimages(a)

     
            })
            .catch((error) => {
                console.warn(error)
            });
                
        }

 






   


    return (

        
        <SafeAreaView  style={[styles.container, { backgroundColor: '#00090E' }]}>
<StatusBar barStyle="light-content"  backgroundColor="#00090E" />

        <Modal
        visible={imgmodel}
        >
            <View style={{ justifyContent:'center',backgroundColor:'black', height:deviceHeight}}>
                <View style={{backgroundColor:'black'}}>
                <Slideshow 
                height={deviceHeight*0.65}
                   dataSource={images}/>
        
            <TouchableOpacity 
            onPress={()=> {setimgmodel(false)}}
            style={{alignSelf:'center', marginTop:10}}
            >
                <MaterialCommunityIcons color='red'  name='close-circle-outline' size={40}/>
            </TouchableOpacity>
                    </View>
            </View>
        </Modal>




      
       

        <Appbar style={styles.appbar}>

            <TouchableOpacity 
                    style={{alignContent:"flex-start", alignItems:"flex-start"}}
            onPress={()=> {       navigation.goBack(); }}
            >
                 <Ionicons  name='chevron-back-outline' size={30} color={AppColors.themecolor} />

                  
                </TouchableOpacity>
  
          <Text style={styles.header_txt}>
              Offer Details
        </Text>
         
        <View>

        </View>

            </Appbar>

       
        <View style={styles.body}>

        <ScrollView >

        <View>
        <Slideshow 
        onPress={()=> {setimgmodel(true)}}
           dataSource={images}/>
        </View>
        
        <View style={{backgroundColor:'black', flexDirection:'row', height:deviceHeight*0.045, width:'100%'}}>
           <View style={{width:'40%',borderColor:AppColors.themecolor,borderRightWidth:0.7, justifyContent:'center',alignItems:'center', height:'100%',}}>
           <Text style={{color:AppColors.themecolor}}>{Details.timingfrom} - {Details.timingto}</Text>

           </View>  

           <View style={{width:'30%',borderColor:AppColors.themecolor,borderRightWidth:0.7,justifyContent:'center',alignItems:'center', height:'100%',}}>
           <Text style={{color:AppColors.themecolor}}>{Details.type}</Text>

           </View>  

                   <View style={{width:'30%',justifyContent:'center',alignItems:'center', height:'100%',}}>
           <Text style={{color:AppColors.themecolor}}> <Text>{Details.price}</Text> {Details.currency  ? Details.currency[0].currency_name:null}</Text>

           </View>    
        </View>
        <View style={{backgroundColor:'black',justifyContent:'center',alignItems:'center', flexDirection:'row',borderTopWidth:0.7, borderBottomWidth:0.7 ,borderColor:AppColors.themecolor, height:deviceHeight*0.04, width:'100%'}}>
           <Text style={{color:AppColors.themecolor}}>{Details.address}</Text>
        </View>

        <View style={{paddingHorizontal:25,alignItems:'center', flexDirection:'row', justifyContent:'space-between', marginTop:20,}}>
            <Text style={{fontSize:20,fontWeight:'500', color:AppColors.themecolor}}>{Details.name}</Text>
           <TouchableOpacity 
           onPress={()=> Linking.openURL(Details.direction)}
           style={{ borderRadius:500/2,paddingHorizontal:20,paddingVertical:10, backgroundColor:AppColors.themecolor}}>
               <Text style={{fontWeight:'700'}} >
                   Directions
               </Text>
           </TouchableOpacity>
        </View>


        <View style={{paddingHorizontal:25,marginTop:20,}}>
            <Text style={{fontSize:16,fontWeight:'500', color:AppColors.themecolor}}>Description</Text>
               <Text style={{ borderWidth:0.7,color:AppColors.themecolor, borderColor:AppColors.themecolor,borderRadius:10,marginTop:10, paddingHorizontal:10,paddingVertical:10,}} >
                   {Details.description}
               </Text>
        </View>
            
        </ScrollView>


        </View>

        </SafeAreaView>
    );
  }
  
  export default Offerdetails;
  
 const styles = StyleSheet.create({
     container:{
        flex:1, 
        height:deviceHeight,
        width:deviceWidth,
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
        backgroundColor:'black'
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
     modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f7021a',
        padding: 100
     },
     text: {
        color: '#3f2949',
        marginTop: 10
     }


 })
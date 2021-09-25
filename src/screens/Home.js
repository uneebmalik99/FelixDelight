import React, { Component,useEffect, useState } from 'react';
import { View,Modal,PermissionsAndroid, RefreshControl, Text, TouchableOpacity, TextInput, StyleSheet, Platform, BackHandler, Image, ScrollView,ImageBackground, SafeAreaView, StatusBar } from 'react-native';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Appbar, Portal, Provider } from 'react-native-paper';
import AppColors from '../Colors/AppColors';
import { FlatList } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import {getDistance, getPreciseDistance} from 'geolib';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Home = ({navigation}) => {



    const [ List , setList] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);
    const [placeholder , setplaceholder] = useState(true)
    const [currenttime , setcurrenttime] = useState('')
    const [filter , setfilter] = useState(false)
    const [ List2 , setList2] = useState([])
    const [LocationStatus , setLocationStatus] = useState('')
    const [sorttext , setsorttext] = useState('All')
    const [banner , setbanner] = useState('')
    const [sortmodal , setsortmodal] = useState(false)
    const [latitude , setlatitude] =useState('')
    const [longitude , setlongitude] =useState('')
    const [ pinned , setpinned] = useState([ ])



    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'Felix Deligth needs current location of user to get deals Near by.',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
          } else {
            // setLocationStatus('Permission Denied');
            alert('no location bu user ')
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
   
    const getOneTimeLocation = () => {
      Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
          // setLocationStatus('You are Here');

          //getting the Longitude from the location json
          const currentLongitude = 
            JSON.stringify(position.coords.longitude);
        setlongitude(currentLongitude)

          //getting the Latitude from the location json
          const currentLatitude = 
            JSON.stringify(position.coords.latitude);
                setlatitude(currentLatitude)

          //Setting Longitude state
          
          //Setting Longitude state
        },
        (error) => {
          setLocationStatus(error.message);
        },
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 1000
        },
      );
    };

    useEffect(() => {
        
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    setcurrenttime(
       hours + ':' + min 
    );
    // alert(currenttime)
        // Update the document title using the browser API

        requestLocationPermission();
       
        CallingPinnedApi() 
        CallingDealsApi() 
        CallingBannerApi()   

      
    },[ ]);

    const  CallingPinnedApi = (isCallingtrue) => {
        
      fetch('https://admin.felixdelight.com/api/pinned', {
          method: 'GET',
          headers: {
            
          //    'Content-Type': 'multipart/form-data',
          },
      })
          .then((response) => response.json())
          .then((responseJson) => {
              console.log(JSON.stringify(responseJson));
              setpinned(responseJson)
  
          })
          .catch((error) => {
              console.warn(error)
          });
              
    }

    const  CallingDealsApi = (isCallingtrue) => {
      
        fetch('https://admin.felixdelight.com/api/alldeals', {
            method: 'GET',
            headers: {
               
            //    'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson));
                if(isCallingtrue == true ){
                  setList(responseJson)
                  setList2(responseJson)
                  setRefreshing(false)
                  setplaceholder(false)

                }else{
                  setList(responseJson)
                  setList2(responseJson)
                  setplaceholder(false)

                }
               

     
            })
            .catch((error) => {
                console.warn(error)
            });
                
    }

    const  CallingBannerApi = (isCallingtrue) => {
      
            fetch('https://admin.felixdelight.com/api/banner', {
                method: 'GET',
                headers: {
                   
                //    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(JSON.stringify(responseJson));
                    // setpinned(responseJson)
                    setbanner(responseJson[0].banner)
         
                })
                .catch((error) => {
                    console.warn(error)
                });
                    
    }

    const onRefresh = React.useCallback(() => {
     setplaceholder(true)
          setRefreshing(true);

          CallingBannerApi(true);
          CallingPinnedApi(true);
          CallingDealsApi(true);

          // wait(2000).then(() => setRefreshing(false));
    }, []);
       
    const filternow = (value) =>{
        if(value == '0'){


           let newarray= List.filter(function (item){
                let time = currenttime.replace(':','')
                let TF = item.timingfrom;
                TF= TF.replace(':','')
                let TT = item.timingto;
                TT= TT.replace(':','')
                console.log(time , TF , TT);
                if(time > TF && time < TT){
                    return item
                }
            })
            setfilter(true)

            setList(newarray)

    
        }else{
            setfilter(false)
            setList(List2)

        }
        
    }

    const sorting = (value) =>{

        if(value == '0'){
            
          setList(List2)

        }else if(value == '1'){

            let newarray = [...List]
  
            newarray.sort((a, b) =>{
              if(a.distance < b.distance){
                return -1
              }else{
                return 1
              }
            } )
          setList(newarray)

        }else if(value == '2'){


            let newarray = [...List]
  
            newarray.sort((a, b) =>{
              if(a.name < b.name){
                return -1
              }else{
                return 1
              }
            } )
          setList(newarray)

        }else if(value == '3'){

          // points.sort(function(a, b){return a - b});


            let newarray = [...List]
  
            newarray.sort(
              function(a, b){return a.price - b.price});
          setList(newarray)
          console.log(JSON.stringify(List));

        }else if(value == '4'){

            let newarray = [...List]
  
            newarray.sort(
              function(a, b){return b.price - a.price});
          setList(newarray)
          console.log(JSON.stringify(List));

        }





        
    }
   
    const renderList = ({ item, index }) => {
       
            var pdis = getPreciseDistance(
              {latitude:latitude, longitude: longitude},
              {latitude: item.latitude, longitude: item.longitude},
            );
            var d = pdis / 1000;

            
            item.distance = d


            console.log(JSON.stringify(List));
              // let newarray= [...List];
              // let index1 = List.findIndex(obj => obj.id = item.id)
              // if(!!index1) {
              //   newarray[index1].distance = d;
              //   setList(newarray)
              // }
           
            // alert(
            //   `Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`
            // );
          
        
        

        return(
            <TouchableOpacity 
            onPress={()=> {navigation.navigate('Offerdetails',{id:item.id})}}
            style={styles.list_item}>
            
            <View style={{width:'35%',paddingVertical:10,}}>
                {item.images.length > 0?
                <Image style={{width:'99%',borderRadius:8, height:'99%'}}resizeMethod='resize' resizeMode='stretch' source={{uri : item.images[0].image}}/>
                    :
                    <Image style={{width:'99%', borderRadius:8,
                   height:'99%'}}resizeMethod='resize' resizeMode='stretch' source={require('../Images/Logo.png')}/>

                    }
            </View>

            <View style={{width:'65%',paddingLeft:5, }}>
                <View style={{flexDirection:'row', width:'100%', height:'70%'}}>
                   <View style={{height:'90%',alignSelf:'flex-end',justifyContent:"space-between",  width:'55%'}}>
                       <Text style={{fontSize:16,color:AppColors.themecolor,  fontWeight:'400'}}>

                       {item.name.length > 15 ? item.name.substring(0,15) +'...' : item.name}

                       </Text>
                       <Text style={{fontSize:12, color:AppColors.themecolor}}>
                       {item.type.length >5 ? item.type.substring(0,5) +'...' : item.type}

                       </Text>
                       <Text style={{fontSize:12, color:AppColors.themecolor}}>
                        {item.timingfrom} - {item.timingto}
                       </Text>
                       <Text style={{fontSize:12, color:AppColors.themecolor}}>{d.toFixed(1)} km</Text>

                    </View> 

                    <View style={{height:'100%', width:'45%'}}>

                <View style={{height:'30%', }}> 
                </View>

                <View style={{width:'95%',justifyContent:'center',alignItems:'center', height:'70%'}}>
                <Text style={{alignSelf:'center', textAlign:'center', fontSize:24, color:AppColors.themecolor, fontWeight:'700'}}><Text>{item.price}</Text> {item.currency[0].currency_name}</Text>

                </View>    
                </View>    
                </View> 

                <View style={{ width:'90%', marginTop:4, height:'15%'}}>
                    <Text style={{color:AppColors.themecolor, }}>
                        
                        {item.address.length > 20 ? item.address.substring(0,20) +'...' : item.address}
                    </Text>
                </View>    
            </View>
            </TouchableOpacity>


        )
    }



    return (

      

        <SafeAreaView  style={[styles.container, { backgroundColor: '#00090E' }]}>

<StatusBar barStyle="light-content"  backgroundColor="#00090E" />


        <Modal transparent
        visible={sortmodal}
        height={deviceHeight}
        style={{justifyContent:'center'}}
        >
            <View style={{justifyContent:'center', width:deviceWidth, paddingHorizontal:25, height:deviceHeight}}>
            <View style={{borderRadius:20, paddingHorizontal:30,paddingVertical:20, backgroundColor:'white', }}>
                <TouchableOpacity 
                  onPress={()=> {setsortmodal(false), sorting('0'), setsorttext('All')}}
                style={{width:'40%',  paddingVertical:10, justifyContent:'center', }}>
                    <Text>All</Text>
                 </TouchableOpacity>

                 <TouchableOpacity
                  onPress={()=> {setsortmodal(false), sorting('1') , setsorttext('Near by')}}
                  style={{width:'40%',paddingVertical:10,justifyContent:'center', }}>
                    <Text>Near by</Text>
                 </TouchableOpacity>

                 <TouchableOpacity 
                  onPress={()=> {setsortmodal(false), sorting('2'),setsorttext('Alphabetical') }}
                  style={{width:'40%',paddingVertical:10,justifyContent:'center', }}>
                    <Text>Alphabetical</Text>
                 </TouchableOpacity>


                 <TouchableOpacity
                  onPress={()=> {setsortmodal(false), sorting('3'),setsorttext('Lowest Price')}}
                  style={{width:'40%',  paddingVertical:10, justifyContent:'center', }}>
                    <Text>Lowest Price</Text>
                 </TouchableOpacity>


                 <TouchableOpacity
                  onPress={()=> {setsortmodal(false), sorting('4') ,setsorttext('Highest Price')}}
                  style={{width:'40%', paddingVertical:10, justifyContent:'center', }}>
                    <Text>Highest Price</Text>
                 </TouchableOpacity>


                <TouchableOpacity 
                  onPress={()=> {setsortmodal(false)}}
                  style={{width:'45%',marginTop:15,alignSelf:'center', paddingHorizontal:20,paddingVertical:10, borderRadius:20,justifyContent:'flex-end', alignItems:'center', backgroundColor:AppColors.themecolor}}>
                    <Text style={{color:'white'}}>Cancel</Text>
                </TouchableOpacity>
            </View>

            </View>


            </Modal>



       
        <Appbar style={styles.appbar}>

            <TouchableOpacity 
                    style={{alignContent:"flex-start", alignItems:"flex-start"}}
            onPress={()=> {       navigation.openDrawer();

            }}
            >
                 <MaterialCommunityIcons  name='menu' size={30} color={AppColors.themecolor} />

                  
                </TouchableOpacity>
  
          <Image style={{width:'40%',alignSelf:'center', height:'80%'}} source={require('../Images/headertext.png')}/>
         
        <View>

        </View>

            </Appbar>

        <View style={{height:deviceHeight*0.035,width:'100%',flexDirection:'row', justifyContent:'space-between', backgroundColor:'#F4F6F7'}}>
            <View style={{justifyContent:'center',alignItems:'center', height:'100%', width:'50%'}}>

            {filter == false ?
                <Text 
                onPress={()=> {filternow('0')}}
                style={{fontWeight:'bold', width:'60%',textAlign:'center',}}> NOW</Text>
               : <Text 
               onPress={()=> {filternow('1')}}
               style={{ width:'60%',textAlign:'center', }}> All</Text>
            }
            </View>
            <View style={{width:1, height:'85%',alignSelf:'center', backgroundColor:'grey'}}>
            </View>
            <View style={{justifyContent:'center',alignItems:'center', height:'100%', width:'50%'}}>
            <TouchableOpacity
            style={{flexDirection:'row',justifyContent:'center', width:'90%'}}
            onPress={()=> { setsortmodal(true)}}>
            <Text  style={{ textAlign:'center',alignSelf:'center' }}>Sorting: <Text>{sorttext}</Text> </Text>
            <MaterialCommunityIcons  color='grey' size={30} name='menu-down'/>
                </TouchableOpacity>
            </View>   
        </View>

        <View style={styles.body}>


       
       {placeholder == true ?
        <SkeletonPlaceholder style={{paddingHorizontal:10,}}>
            <View style={{backgroundColor:'grey' ,alignSelf:'center', height:deviceHeight*0.15,marginTop:10,borderRadius:10, width:'90%'}}>

            </View>
            <View style={{backgroundColor:'grey' ,alignSelf:'center', height:deviceHeight*0.15,marginTop:10,borderRadius:10, width:'90%'}}>

            </View>
            <View style={{backgroundColor:'grey' ,alignSelf:'center', height:deviceHeight*0.15,marginTop:10,borderRadius:10, width:'90%'}}>

            </View>
            <View style={{backgroundColor:'grey' ,alignSelf:'center', height:deviceHeight*0.15,marginTop:10,borderRadius:10, width:'90%'}}>

            </View>

    </SkeletonPlaceholder>
      : 

        <ScrollView 
        
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }

        style={{paddingHorizontal:20, marginTop:5,}}>


        {pinned.map((item, index) => {
            var pdis = getPreciseDistance(
                {latitude:latitude, longitude: longitude},
                {latitude: item.latitude, longitude: item.longitude},
              );
              var dis = pdis / 1000;

        return (
            <TouchableOpacity
            onPress={()=> {navigation.navigate('Offerdetails',{id:item.deal_id})}}

            style={styles.pinned_item}>
            
            <View style={{width:'35%',paddingVertical:13, }}>
            {item.images.length > 0?
                <Image style={{width:'99%',borderRadius:8, height:'99%'}}resizeMethod='resize' resizeMode='stretch' source={{uri : item.images[0].image}}/>
                    :
                    <Image style={{width:'99%', borderRadius:8,
                   height:'99%'}}resizeMethod='resize' resizeMode='stretch' source={require('../Images/Logo.png')}/>

                    }
                                </View>

            <View style={{width:'65%',paddingLeft:10,}}>
                <View style={{flexDirection:'row', width:'100%', height:'70%'}}>
                   <View style={{height:'90%',alignSelf:'flex-end',justifyContent:'space-between', width:'55%'}}>
                       <Text style={{fontSize:16,color:AppColors.themecolor,  fontWeight:'400'}}>{item.name}</Text>
                       <Text style={{color:AppColors.themecolor, fontSize:12}}>{item.type}</Text>
                       <Text style={{color:AppColors.themecolor, fontSize:12}}>{item.timingfrom} - {item.timingto} </Text>
                       <Text style={{color:AppColors.themecolor, fontSize:12}}>{dis} km</Text>

                    </View> 

              <View style={{height:'100%', width:'45%'}}>

                        <View style={{height:'30%',alignItems:'center' }}> 
                        <MaterialCommunityIcons name='pin' size={22} color='orange'/>
                        </View>

                        <View style={{width:'95%',justifyContent:'center',alignItems:'center', height:'70%'}}>
                       <Text style={{alignSelf:'center', color:AppColors.themecolor, textAlign:'center', fontSize:24, fontWeight:'700'}}><Text>{item.price}</Text> {item.currency[0].currency_name} </Text>

                       </View>    
                    </View>   
                </View> 

                <View style={{ width:'90%',marginTop:4, height:'15%'}}>
                    <Text style={{color:AppColors.themecolor, }}>
                        
                    {item.address.length > 20 ? item.address.substring(0,20) +'...' : item.address}
                    </Text>
                </View>    
            </View>
            </TouchableOpacity>


        )
  })}

           
<View>
                                <FlatList
                                    
                                    data={List}
                                    renderItem={renderList}
                                    keyExtractor={(item, index) => index}
                                    extraData={List}
                                    
                                />
                                 </View>

          <View style={{height:15,}}>

           </View>

            
        </ScrollView>

}

{/* {banner != '' || banner != null ?
<View style={{backgroundColor:'green', height:90,paddingVertical:5, }}>
  <Image  style={{width:600, height:80}} source={{uri:banner}}/>
  </View>
: null} */}
                {banner != ''  || banner != null ?
            <View style={{height:deviceHeight*0.09 ,
              justifyContent: 'flex-end', 
              marginBottom: 0}}>
                <Image  source={{uri:banner}} style={{width:deviceWidth ,alignSelf:'center', height:deviceHeight*0.09}} resizeMethod='resize' resizeMode='stretch' /> 
            </View>
            :null}


          
          
        </View>

        </SafeAreaView>

    );
  }
  
  export default Home;
  
 const styles = StyleSheet.create({
     container:{
        flex:1, 
        height:deviceHeight,
        width:deviceWidth
     },
     appbar:{
        width:deviceWidth,
        justifyContent:'space-between',
        backgroundColor:'black',
        paddingHorizontal:10,
        height:deviceHeight*0.08
     },
     body:{
        flex:1,
        backgroundColor:AppColors.themecolor,
        height:deviceHeight,
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
        // height:Platform.OS == 'ios'? deviceHeight*0.15 : deviceHeight*0.18,
        flexDirection:'row',
        height:130,


     },
     list_item:{

        backgroundColor:'black',
        marginTop:10,
        borderRadius:10,
        paddingHorizontal:10,
        // height:Platform.OS == 'ios'? deviceHeight*0.16 : deviceHeight*0.17,
        height:130,

        flexDirection:'row'
     },


 })
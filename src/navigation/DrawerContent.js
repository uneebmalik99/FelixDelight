import React from 'react';
import { View,Text,Linking, Image,StyleSheet } from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import AppColors from '../Colors/AppColors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import { SafeAreaView } from 'react-native-safe-area-context';

export function DrawerContent(props) {


    return(
        <View style={{height:deviceHeight,paddingBottom:15, backgroundColor:AppColors.themecolor}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent1}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',width:'100%',alignSelf:'center',paddingHorizontal:10, marginTop: 15}}>
                           <View style={{justifyContent:'center', width:'20%'}}>
                           <Image 
                            style={{width:'95%',alignSelf:'center', height:45}} resizeMode='stretch' resizeMethod='resize'
                                source={require('../Images/Logo.png')}
                            />
                             </View>
                           
                            <View style={{width:'70%',marginLeft:5, justifyContent:'center',alignItems:'center', }}>
                            <Image 
                            style={{width:'100%',alignSelf:'center', height:30 ,}}resizeMethod='resize' resizeMode='stretch'
                                source={require('../Images/Felixdelight.jpeg')}
                            />
                              </View>
                        </View>

                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                        style={{backgroundColor:'white',borderRadius:25, paddingHorizontal:5}}
                            icon={({color, size}) => (
                                <Icon 
                                name="home" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            style={{backgroundColor:'white',borderRadius:25, paddingHorizontal:5}}

                            icon={({color, size}) => (
                                <MaterialIcons 
                                name="contact-page" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Contact Us"
                            onPress={() => {props.navigation.navigate('Contactus')}}
                        />
                      
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {props.navigation.navigate('SettingsScreen')}}
                        /> */}
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-check-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        /> */}
                    </Drawer.Section>
                   
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <View style={{alignSelf:'center'}}>
                    <Text style={{fontSize:15}}>Developed by <Text style={{color:'blue', fontWeight:'400'}}   onPress={()=> Linking.openURL('https://www.upwork.com/freelancers/~014512981757da15ed')} >Uneeb</Text></Text>
                </View>
            </Drawer.Section>
    
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent1: {
     height:deviceHeight,
      backgroundColor:AppColors.themecolor
    },
    userInfoSection: {
      paddingLeft: 15,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 35,
      paddingHorizontal:10,
      
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopWidth: 0
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
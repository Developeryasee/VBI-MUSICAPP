//import liraries
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { Component ,useRef,useEffect,useState} from 'react';
import { View, Text, StyleSheet,Dimensions,Animated,TouchableOpacity} from 'react-native';

import AllSong from '../MusicContainer/Allsongs';
// import Playlist from '../MusicContainer/Playlist';
import Icons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
// create a component
const Tab = createBottomTabNavigator();

const Playlist=()=>{
  return(
    <View style={{flex:1,backgroundColor:'red'}}>

    </View>
  )
}
const Album=()=>{
  return(
    <View style={{flex:1,backgroundColor:'pink'}}>

    </View>
  )
}
const TabBar = [
    {
      route: 'Home', label: 'Home', activeIcon: 'home', inactiveIcon: 'home', component: AllSong, tabBarcolor: 'red'
    },
    {
      route: 'Playlist', label: 'Playlist', activeIcon: 'playlist-plus', inactiveIcon: 'playlist-plus', component: Playlist, tabBarcolor: 'yellow'
  
    },
    {
      route: 'Album', label: 'Album',activeIcon: 'album', inactiveIcon: 'album', component: Album, tabBarcolor: 'orange'
  
    },
    {
      route: 'save', label: 'save',activeIcon: 'save', inactiveIcon: 'save', component: Album, tabBarcolor: 'orange'
  
    },
    
  ]
  const { width } = Dimensions.get('window')
  const MARGIN = 0;
  const TAB_BAR_WIDTH = ( (width)) - 2 ;
  
  const TAB_WIDTH = ((TAB_BAR_WIDTH) / TabBar.length)
  function MyTabBar({ state, descriptors, navigation }) {
    const animation = useRef(new Animated.Value(1)).current;
  
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300 / 2 - 2]
    })
    const { visible } = useSelector((state) => state.sample)
    
  
    const [translateX] = useState(new Animated.Value(0))
    const [tabwith, settabwidth] = useState(TAB_BAR_WIDTH)
    const [intab, setintab] = useState(TAB_WIDTH)
    const [margin, setmargin] = useState(MARGIN)
    const translateTab = (index, width) => {
      Animated.spring(translateX, {
        toValue: index * width+(index)/4,
        useNativeDriver: true,
  
      }).start();
    }
   
    useEffect(() => {
      
      
      translateTab(state.index, intab)
      if (visible===true) 
        {
        Animated.spring(animation, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0
        }).start();
  
      } else {
        Animated.spring(animation, {
          toValue: 1,
          useNativeDriver: true,
          bounciness: 0
        }).start();
      }
 
  
    }, [state.index,visible])//visible
  
  
  
    return (
    <>
    
    <Animated.View style={{ ...styles.tabBarContainer, width: TAB_BAR_WIDTH,  }}>
                  <Animated.View style={{ ...styles.slidingBarContainer, width: TAB_WIDTH,}}>
                    <Animated.View style={[{ transform: [{ translateX }], }]}>
  
                      <View style={styles.sildingBar}>
  
                      </View>
                    </Animated.View>
  
  
                  </Animated.View>
                  {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                      options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                          ? options.title
                          : route.name;
  
                    const isFocused = state.index === index;
  
                    const onPress = () => {
                      const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                      });
  
                      if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                      }
                    };
  
                    const onLongPress = () => {
                      navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                      });
                    };
                    // console.log(options);
                    const tabBarIcon = options.tabBarIcon
                    // console.log(tabBarIcon.activeIcon);
                    return (
                      <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, alignItems: 'center' }}
                      >
                        <TabIcon tabBarIcon={tabBarIcon} isFocused={isFocused} label={label} index={state.index} />
  
  
                        <Text style={{ color: isFocused ? '#673ab7' : '#222', fontFamily: isFocused ?'Montserrat-Bold':'Montserrat-Light' }}>
                          {label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </Animated.View>
    </>
      
  
    );
  }

  const TabIcon = ({ isFocused, tabBarIcon, label, index }) => {
    const [translateY] = useState(new Animated.Value(0))
    const translateIcon = (val) => {
      Animated.spring(translateY, {
        toValue: val,
        useNativeDriver: true,
  
      }).start();
  
  
    }
    useEffect(() => {
      if (isFocused) {
  
        translateIcon(-14)
      } else {
        translateIcon(0)
  
      }
  
    }, [index])
    return (
  
      <>
        {
          label === "Album" || label==="Playlist"? <>
            <Animated.View >
              <MaterialCommunityIcons
                name={
                  isFocused ?
  
                    tabBarIcon.activeIcon :
                    tabBarIcon.inactiveIcon
                }
                size={26}
                color={
                  isFocused ?
  
                  '#000' :
                    '#000'
                }
              />
            </Animated.View>
  
          </> : <>
            <Animated.View >
              <Icons
                name={
                  isFocused ?
  
                    tabBarIcon.activeIcon :
                    tabBarIcon.inactiveIcon
                }
                size={26}
                color={
                  isFocused ?
  
                    '#000' :
                    '#000'
                }
              />
            </Animated.View>
  
          </>
        }
      </>
    )
  }  
const BottomNavigationScreen = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
          }}
            tabBar={props => <MyTabBar {...props} />}
          >
            {
              TabBar.map((_, index) => {
                return (
                  <Tab.Screen
                    key={index}
                    name={_.route}
                    component={_.component}
                    options={{
                      tabBarColor: _.tabBarcolor,
                      tabColor: _.tabBarcolor,
                      tabBarIcon: {
                        activeIcon: _.activeIcon,
                        inactiveIcon: _.inactiveIcon,
    
                      },
                      visible: true
    
                    }}
    
                  />
                )
              })
            }
          </Tab.Navigator>
    );
};

// define your styles
export default BottomNavigationScreen;
const styles = StyleSheet.create({
    tabBarContainer: {
      flexDirection: 'row',
      width: TAB_BAR_WIDTH,
      height: 65,
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 10,
      justifyContent: 'space-around',
    },
    slidingBarContainer: {
      width: TAB_WIDTH,
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      
    },
    sildingBar: {
      width: 70,
      height: 58,
      backgroundColor:'#fff',
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 10,
      elevation: 5,
      borderBottomLeftRadius:6,
      borderBottomRightRadius:6,

    }
  })
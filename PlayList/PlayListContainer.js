// import React, { useEffect, useRef, useState } from 'react';
// import {
//     Animated,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     View,
//     TouchableOpacity
// } from 'react-native';
// // import SongListModule from './SongListModules';
// import LinearGradient from 'react-native-linear-gradient';
// import { selectAllItem } from '../reducer/getSongReducer';
// import { useDispatch, useSelector } from 'react-redux';
// import SongListModule from '../SongList/SongListModules';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import PlayListModule from './PlayListModules';
// const headerHeight = 100;
// let scrollValue = 0;
// let headerVisible = true;
// let focused = false;
// export default function PlayListContainer({navigation}) {

//     const getPlayList=async()=>{
//         const data= await AsyncStorage.getItem('playListData')
//         if (data!=null) {
//             var parse=JSON.parse(data);
//             dispatch({type:'playListData',payload:parse})
//         }
//     }
//     useEffect(()=>{
//         getPlayList();
//     },[])
//     const dispatch = useDispatch();
//     const songList = useSelector(selectAllItem)
//     const [search, setsearch] = useState('')
//     const animation = useRef(new Animated.Value(1)).current;
//     const translateY = animation.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0, headerHeight / 2 - 2],
//     });
//     const inputTranslateY = animation.interpolate({
//         inputRange: [0, 1],
//         outputRange: [headerHeight / 4, 0],
//     });
//     const opacity = animation;
//     const onScroll = (e) => {
//         if (focused) return;
//         const y = e.nativeEvent.contentOffset.y;
//         if (y > scrollValue && headerVisible && y > headerHeight / 2) {
//             dispatch({ type: "visible", payload: false })
//             headerVisible = false;

//         }
//         if (y < scrollValue && !headerVisible) {
//             dispatch({ type: "visible", payload: true })

//             headerVisible = true;
//         }
//         scrollValue = y;
//     };
//     async function save(key, value) {
//         await AsyncStorage.setItem(key, value);
//         getPlayList();
//         alert("PlayList Added Successfully")
  
//       }

//     const createPlayList=async()=>{
//         const date=new Date();

//         const DateTime=date.getDate()+"/"+date.getMonth()+1+"/"+date.getFullYear()+"-"+date.getHours()+":"+date.getMinutes();
//         const data= await AsyncStorage.getItem('playListData')
//         if (data!=null) {
//             var parse=JSON.parse(data);
//             parse.push(
//                 {
//                     "id":parse.length+1,
//                     "title":"Playlist "+(parse.length+1).toString(),
//                     "date":DateTime,
//                     "songs":[]

//                 }
//             )
//               const jsonString=JSON.stringify(parse);
//               save("playListData",jsonString)
//         }else{
//             const PlayListData=[{
//                 "id":1,
//                 "title":"Playlist 1",
//                 "date":DateTime,
//                 "songs":[]
//             }]
//             const jsonString=JSON.stringify(PlayListData);
//             save("playListData",jsonString)
//         }
//     }
//     return (
//         <View style={styles.container}>

//             <View style={styles.createPlaylist}>
//                     <TouchableOpacity
//                     onPress={createPlayList}
                    
//                     >
//                     <LinearGradient
//                     colors={['#F97B5A', '#F94D71']}
//                     start={{ x: 0.2, y: 0.2 }}
//                     style={{
//                         height: 50,
//                         marginHorizontal: 10,
//                         backgroundColor: '#fff',
//                         borderRadius: 10,
//                         marginVertical: 5,
//                         justifyContent:'center',
//                         alignItems:'center'
//                     }}
//                 >
//                     <Text style={styles.createPlaylistText}>Create PlayList</Text>

//                 </LinearGradient>
//                     </TouchableOpacity>
//             </View>
//             <View style={styles.container}>
//                 <PlayListModule
//                     onScroll={(e) => {
//                         onScroll(e);
//                     }}
//                     navigation={navigation}
//                 />
//             </View>

//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     createPlaylist: {
//         width: '100%',
//         height: 70,
//         justifyContent:'center'

//     },
//     createPlaylistText:{
//         fontFamily:'Montserrat-Bold',
//         color:'#fff',
//         fontSize:15
//     }

// });
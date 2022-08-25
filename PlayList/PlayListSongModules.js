// //import liraries
// import React, { Component, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import Icons from 'react-native-vector-icons/Ionicons'
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // create a component
// var scrollview = 0
// const height = 60;
// const PlayListSongModule = (props) => {
//     const dispatch = useDispatch();
    
//     const { visible } = useSelector((state) => state.sample)
//     const [input, setinput] = useState("");
//     const [name, setname] = useState("");
//     // const { playListSongData } = useSelector((state) => state.sample)
//     const { playListData } = useSelector((state) => state.sample)
//     const getPlayList = async () => {
//         const data = await AsyncStorage.getItem('playListData')
//         if (data != null) {
//             var parse = JSON.parse(data);
//             dispatch({ type: 'playListData', payload: parse })
//         }
//     }
//     const onScroll = e => {
//         if (false) return;
//         const scrollOffsetY = e.nativeEvent.contentOffset.y;
//         if (scrollOffsetY > scrollview && visible && scrollOffsetY > height / 2) {

//             dispatch({ type: "visible", payload: false })
//         }
//         if (scrollOffsetY < scrollview && !visible) {
//             dispatch({ type: "visible", payload: true })
//         }

//         scrollview = scrollOffsetY
//     }
//     async function Deletesave(key, value) {
//         await AsyncStorage.setItem(key, value);
//         getPlayList();
//         alert("Song Deleted Successfully")

//     }
// const Delete=(id)=>{
//         const filteredData = playListData[props.id-1].songs.filter((item) => item.id !== id)
//         // console.log(filteredData);
//         playListData[props.id-1].songs = filteredData
//         const jsonString = JSON.stringify(playListData);
//         Deletesave("playListData", jsonString)
// }
//     const renderItem = ({ item }) =>
//     (
//         <View style={styles.item} 
       
//         >
    
//             <View style={styles.ImageContainer}>
//                 <Image
//                     source={{uri:item.thumbnail}}
//                     style={styles.image}
//                     resizeMode='contain'
//                 />
//             </View>
//             <View style={styles.titleContainer}>
//             <View style={styles.textContainer}>
//                             <Text style={styles.title}
//                                 numberOfLines={1}
//                             >Name: {item.title}</Text>
//                         </View>
//                         <Text style={styles.date}
//                         >Album Id : {item.albumid}</Text>


//             </View>
         
//                         <TouchableOpacity
//                                 onPress={() => {
//                                     // setinput(item.id)
//                                     Delete(item.id)
//                                 }}
//                             >
//                                 <Icons
//                                     name='trash'
//                                     color={"red"}
//                                     size={25}
//                                     style={{
//                                         marginLeft: 10
//                                     }}
//                                 />
//                             </TouchableOpacity>
//         </View>


//     )

//     return (
//         <>
//             {
//                 playListData[props.id-1].songs.length===0?<>
                
//                     <View style={styles.container}>
//                         <Text style={styles.noSongData}>
//                                 Please Add Songs in Your Playlist 
//                         </Text>
//                     </View>
//                 </>:<>
//                 <FlatList
//                 data={playListData[props.id-1].songs}
//                 key={"*"}
//                 keyExtractor={item => item.id}
//                 onScroll={onScroll}
//                 initialNumToRender={20}
//                 renderItem={renderItem}
//             />
//                 </>
//             }
           
//         </>

//     );
// };

// // define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//     }, item: {
//         height: 100,
//         marginHorizontal: 5,
//         backgroundColor: '#fff',
//         shadowColor: 'black',
//         shadowOpacity: 0.26,
//         borderRadius: 10,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 10,
//         elevation: 5,
//         marginVertical: 5,
//         padding: 5,
//         flexDirection: 'row'
//     },
//     title: {
//         fontFamily: 'Montserrat-Bold',
//         fontSize: 15, color: '#000',
//     },
//     date: {
//         fontFamily: 'Montserrat-Light',
//         fontSize: 14, color: '#000',
//         marginLeft: 10
//     },
//     notFoundText: {
//         fontFamily: 'Montserrat-Bold',
//         fontSize: 20, color: '#000',
//     },
//     input: {
//         flex: 1,
//         padding: 0,
//         paddingHorizontal: 15,
//         fontSize: 15,
//         fontFamily: 'Montserrat-light',
//         color: '#000'
//     },
//     ImageContainer: {
//         width: 100,
//         height: 90,
//     },
//     image: {
//         flex: 1,
//         borderRadius: 10,

//     },
//     titleContainer: {
//         flex: 1, justifyContent: 'center'
//     },
//     textContainer: {
//         flexDirection: 'row', alignItems: 'center', paddingLeft: 10,
//     },
//     noSongData:{
//         fontFamily:'Montserrat-Bold',
//         fontSize:15,
//         color:'#000',
//     }
// });

// //make this component available to the app
// export default PlayListSongModule;

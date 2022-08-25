// //import liraries
// import React, { Component, useState } from 'react';
// import { View, Text, StyleSheet,TextInput,TouchableOpacity} from 'react-native';
// import Icons from 'react-native-vector-icons/Ionicons'
// import LinearGradient from 'react-native-linear-gradient';
// import PlayListModule from './PlayListModules';
// import PlayListSongModule from './PlayListSongModules';
// import { useDispatch, useSelector } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // create a component
// const PlayListDetail = ({route,navigation}) => {
//     const dispatch = useDispatch();

//     const { id, title } = route.params;
//     const getPlayList = async () => {
//         const data = await AsyncStorage.getItem('playListData')
//         if (data != null) {
//             var parse = JSON.parse(data);
//             dispatch({ type: 'playListData', payload: parse })
//         }
//     }
//     // console.log(id,title);
//     const [name,setname]=useState(title)
//     const [input, setinput] = useState(true);
//     const AddSong=(id,name)=>{
//         // console.log(id,name);
//         navigation.navigate('AddSong',{
//             ids:id,
//             names:name
//         })
//     }
//     const { playListData } = useSelector((state) => state.sample)
//     async function save(key, value) {
//         await AsyncStorage.setItem(key, value);
//         getPlayList();
//         setinput(true)
//         alert("PlayList Edited Successfully")

//     }
//     async function suffledsave(key, value) {
//         await AsyncStorage.setItem(key, value);
//         getPlayList();
//         setinput(true)
//         alert("Songs Suffled Successfully")

//     }
//     const editName = () => {
//         const objIndex = playListData.findIndex((obj => obj.id == id));
//         playListData[objIndex].title = name
//         const jsonString = JSON.stringify(playListData);
//         // console.log(jsonString);
//         save("playListData", jsonString)

//     }

//     const suffleData=()=>{
//         if ( playListData[id-1].songs.length>0) {
//             let shuffled = playListData[id-1].songs
//         .map(value => ({ value, sort: Math.random() }))
//         .sort((a, b) => a.sort - b.sort)
//         .map(({ value }) => value)
//         const objIndex = playListData.findIndex((obj => obj.id == id));
//         playListData[objIndex].songs = shuffled
//         const jsonString = JSON.stringify(playListData);
//         suffledsave("playListData", jsonString)
//         }
        
//     }
//     return (
//         <View style={styles.container}>
//             <View style={styles.headerContainer}>
//                 {
//                     input?<>
//                         <Text style={styles.headertext}>{name} - </Text>
                        
//                     <Icons
//                     name='pencil'
//                     size={20}
//                     color="#000"
//                     onPress={()=>{
//                         setinput(false)
//                     }}
//                     />
//                     </>:<>
//                     <View style={styles.inputContainer}>
//                     <TextInput
//                             style={styles.input}
//                             placeholder="Enter Playlist Name"
//                             placeholderTextColor='#9e9e9e'
//                             value={name}
//                             onChangeText={(txt) => {
//                                 setname(txt)
//                             }}
//                             onSubmitEditing={() => {
//                                 if (name === "") {
//                                     setinput(true)
//                                     setname(title)
//                                 } else {
//                                     setinput(true)
//                                     editName()
//                                 }

//                             }}
//                             onBlur={()=>{
//                                 if (name === "") {
//                                     setinput(true)
//                                     setname(title)
//                                 } else {
//                                     setinput(true)
//                                     editName()
//                                 }
//                             }}


//                         />
//                     </View>
                  
                    
//                     </>
//                 }
                    
//             </View>
//             <View style={styles.TopButtonsContainer}>
//                     <TouchableOpacity
//                     onPress={suffleData}
                    
//                     >
//                     <LinearGradient
//                     colors={['#F97B5A', '#F94D71']}
//                     start={{ x: 0.2, y: 0.2 }}
//                     style={{
//                         height: 40,
//                         width:100,
//                         marginHorizontal: 10,
//                         backgroundColor: '#fff',
//                         borderRadius: 10,
//                         marginVertical: 5,
//                         justifyContent:'center',
//                         alignItems:'center'
//                     }}
//                 >
//                     <Text style={styles.suffle}>Suffle</Text>

//                 </LinearGradient>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                     // onPress={createPlayList}
//                     onPress={()=>{
//                         AddSong(id,name)
//                     }}
//                     >
//                     <LinearGradient
//                     colors={['#F97B5A', '#F94D71']}
//                     start={{ x: 0.2, y: 0.2 }}
//                     style={{
//                         height: 40,
//                         width:100,
//                         marginHorizontal: 10,
//                         backgroundColor: '#fff',
//                         borderRadius: 10,
//                         marginVertical: 5,
//                         justifyContent:'center',
//                         alignItems:'center'
//                     }}
//                 >
//                     <Text style={styles.suffle}>Add Song</Text>

//                 </LinearGradient>
//                     </TouchableOpacity>
//             </View>
//             <View style={styles.SongListContainer}>
//             <PlayListSongModule
//                     navigation={navigation}
//                     id={id}
//                 />
//             </View>
//         </View>
//     );
// };

// // define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding:15,
//         backgroundColor: '#fff',
//     },
//     headerContainer:{
//         flexDirection:'row'
//     },
//     headertext:{
//         fontFamily:'Montserrat-Bold',
//         fontSize:18,
//         color:'#000'
//     },
//     input: {
//         flex: 1,
//         padding: 0,
//         paddingHorizontal: 15,
//         fontSize: 15,
//         fontFamily: 'Montserrat-light',
//         color: '#000'
//     },
//     inputContainer:{
//         backgroundColor: '#eee',
//      borderRadius: 3,flexDirection:'row',
//      flex:1
//     },
//     TopButtonsContainer:{
//             width:'100%',
//             height:60,
//             marginTop:10,
//             flexDirection:'row',
//             alignItems:'center',
//             justifyContent:'flex-end'
//     },
//     suffle:{
//         fontFamily:'Montserrat-Bold',
//         color:'#fff'
//     },
//     Add:{
//         fontFamily:'Montserrat-Bold',
//         color:'#fff'
//     },
//     SongListContainer:{
//         flex:1,
//     }
// });

// //make this component available to the app
// export default PlayListDetail;

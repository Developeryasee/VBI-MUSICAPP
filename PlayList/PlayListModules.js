//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
// create a component
var scrollview = 0
const height = 60;
const PlayListModule = (props) => {
    const dispatch = useDispatch();
    const getPlayList = async () => {
        const data = await AsyncStorage.getItem('playListData')
        if (data != null) {
            var parse = JSON.parse(data);
            dispatch({ type: 'playListData', payload: parse })
        }
    }
    const { visible } = useSelector((state) => state.sample)
    const [input, setinput] = useState("");
    const [name, setname] = useState("");
    const { playListData } = useSelector((state) => state.sample)
    const onScroll = e => {
        if (playListData.length<7) {
        props.onScroll(e);
            
        }
        if (false) return;
        const scrollOffsetY = e.nativeEvent.contentOffset.y;
        if (scrollOffsetY > scrollview && visible && scrollOffsetY > height / 2) {

            dispatch({ type: "visible", payload: false })
        }
        if (scrollOffsetY < scrollview && !visible) {
            dispatch({ type: "visible", payload: true })
        }

        scrollview = scrollOffsetY
    }
    async function save(key, value) {
        await AsyncStorage.setItem(key, value);
        getPlayList();
        setinput("")
        setname("")
        alert("PlayList Edited Successfully")

    }

    const editName = (id) => {
        const objIndex = playListData.findIndex((obj => obj.id == id));
        playListData[objIndex].title = name
        const jsonString = JSON.stringify(playListData);
    
        save("playListData", jsonString)

    }

    const moveDetail=(id,title)=>{
        props.navigation.navigate('PlayListDetail',{
            id:id,
            title:title
        })
    }
    const renderItem = ({ item }) =>
    (
        <TouchableOpacity style={styles.item} 
        onPress={()=>{
            moveDetail(item.id,item.title)
        }}
        >
    
            <View style={styles.ImageContainer}>
                <Image
                    source={require('./../assests/playlist.png')}
                    style={styles.image}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.titleContainer}>
                {
                    input === item.id ? <>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter Playlist Name"
                            placeholderTextColor='#9e9e9e'
                            value={name}
                            onChangeText={(txt) => {
                                setname(txt)
                            }}
                            onSubmitEditing={() => {
                                if (name === "") {
                                    setinput("")
                                    setname("")
                                } else {
                                    editName(item.id)
                                }

                            }}
                            onBlur={()=>{
                                if (name === "") {
                                    setinput("")
                                    setname("")
                                } else {
                                    editName(item.id)
                                }

                            }}


                        />
                    </> : <>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}
                                numberOfLines={1}
                            >Name: {item.title}</Text>

                            
                        </View>
                        <Text style={styles.date}
                        >Created At : {item.date}</Text>
               
                    </>
                }


            </View>
            {
                input != item.id ?<>
                
                <TouchableOpacity
                                onPress={() => {
                                    setinput(item.id)
                                }}
                            >
                                <Icons
                                    name='pencil'
                                    color={"#000"}
                                    size={20}
                                    style={{
                                        marginLeft: 10
                                    }}
                                />
                            </TouchableOpacity>
                </>:null
            }
        
            
        </TouchableOpacity>


    )

    return (
        <>
        {
            playListData.length>0?<>
            
            <FlatList
                data={playListData}
                key={"*"}
                keyExtractor={item => item.id}
                onScroll={onScroll}
                initialNumToRender={20}
                renderItem={renderItem}
            />
            </>:<>
                <View style={styles.container}>
                        <Text style={styles.title}>
                            Please Create Your PlayList
                        </Text>
                </View>
            </>
        }
            
        </>

    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }, item: {
        height: 100,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        marginVertical: 5,
        padding: 5,
        flexDirection: 'row'
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 15, color: '#000',
    },
    date: {
        fontFamily: 'Montserrat-Light',
        fontSize: 14, color: '#000',
        marginLeft: 10
    },
    notFoundText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20, color: '#000',
    },
    input: {
        flex: 1,
        padding: 0,
        paddingHorizontal: 15,
        fontSize: 15,
        fontFamily: 'Montserrat-light',
        color: '#000'
    },
    ImageContainer: {
        width: 100,
        height: 90,
    },
    image: {
        flex: 1,
        width: 90,
        height: 90,
        borderRadius: 10,

    },
    titleContainer: {
        flex: 1, justifyContent: 'center'
    },
    textContainer: {
        flexDirection: 'row', alignItems: 'center', paddingLeft: 10,
    }
});

//make this component available to the app
export default PlayListModule;

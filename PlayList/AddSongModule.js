//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getSong, selectAllItem, } from '../reducer/getSongReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
var scrollview = 0
const height = 60;
const AddSongModule = (props) => {
    const dispatch = useDispatch();
    const getPlayList=async()=>{
        const data= await AsyncStorage.getItem('playListData')
        if (data!=null) {
            var parse=JSON.parse(data);
            dispatch({type:'playListData',payload:parse})
        }
    }
    const { show } = useSelector((state) => state.sample)
    const { filterData } = useSelector((state) => state.sample)
    const { visible } = useSelector((state) => state.sample)
    const songList = useSelector(selectAllItem)
    const onScroll = e => {
        props.onScroll(e);
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
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    useEffect(() => {
        dispatch(getSong())
    }, [])

    function songExists(data,id) {
        return data.some(function(el) {
          return el.id === id;
        }); 
      }

      async function save(key, value) {
        await AsyncStorage.setItem(key, value);
        getPlayList();
        alert("Song Added Successfully")
  
      }

    const AddSongToPlaylist=async(item)=>{
        // console.log(item);
        const data= await AsyncStorage.getItem('playListData');
        if (data!=null) {
            var parse=JSON.parse(data);
            // console.log(parse[props.id-1].songs);

            if (parse[props.id-1].songs.length===0) {
                parse[props.id-1].songs = [item]
                const jsonString=JSON.stringify(parse);
                save("playListData",jsonString)
            } else {
                if (songExists(parse[props.id-1].songs,item.id)) {
                    alert('Song was Already Exists');
                    return;
                  }
                  const newsong=parse[props.id-1].songs
                  newsong.push(item)
                  parse[props.id-1].songs =newsong
                  const jsonString=JSON.stringify(parse);
                  save("playListData",jsonString)
            } 
            
        }
        

    }
    const renderItem = ({ item }) =>
    (
        <View style={styles.item} >

            <View style={{
                width: 100,
                height: 90,

            }}>
                <Image
                    source={{
                        uri: item.thumbnail
                    }}
                    style={{
                        flex: 1,
                        borderRadius: 10,

                    }}
                    resizeMode='contain'
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 10, }}>

                <Text style={styles.title}
                    numberOfLines={1}
                >Title : {item.title.length < 20
                    ? `${item.title}`
                    : `${item.title.substring(0, 20)}...`}</Text>
                <Text style={styles.album}
                >Album Id : {item.albumid}</Text>
                <TouchableOpacity style={{ width: 100,borderRadius:10,alignSelf:'flex-end',justifyContent:'center',alignItems:'center', height: 40, backgroundColor: 'red' }}
                onPress={()=>{
                    AddSongToPlaylist(item)
                }}
                >
                    <Text style={{...styles.album,color:'#fff',fontFamily:'Montserrat-Bold'}}>
                        Add to list
                    </Text>
                </TouchableOpacity>
            </View>


        </View>


    )

    return (
        <>
            {
                show ? <>
                    <FlatList
                        data={songList}
                        contentContainerStyle={{ paddingTop: 100 }}
                        key={"#"}
                        keyExtractor={item => item.id}
                        onScroll={onScroll}
                        initialNumToRender={20}
                        renderItem={renderItem}
                    />
                </> : <>
                    {
                        filterData.length === 0 ? <>
                            <View style={styles.container}>
                                <Text style={styles.notFoundText}>
                                    No Music's Found
                                </Text>
                            </View>

                        </> : <>
                            <FlatList
                                data={filterData}
                                key={"*"}
                                contentContainerStyle={{ paddingTop: 100 }}
                                keyExtractor={item => item.id}
                                onScroll={onScroll}
                                initialNumToRender={20}
                                renderItem={renderItem}
                            />

                        </>
                    }

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
    album: {
        fontFamily: 'Montserrat-Light',
        fontSize: 14, color: '#000',
    },
    notFoundText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20, color: '#000',
    }
});

//make this component available to the app
export default AddSongModule;

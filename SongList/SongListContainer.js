import React, { useRef, useState } from 'react';
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import SongListModule from './SongListModules';
import LinearGradient from 'react-native-linear-gradient';
import { selectAllItem } from '../reducer/getSongReducer';
import { useDispatch,useSelector } from 'react-redux';
const headerHeight = 100;
let scrollValue = 0;
let headerVisible = true;
let focused = false;
export default function SongListContainer() {
    const dispatch=useDispatch();
    const songList = useSelector(selectAllItem)
    const [search,setsearch]=useState('')
    const animation = useRef(new Animated.Value(1)).current;
    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, headerHeight / 2 - 2],
    });
    const inputTranslateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [headerHeight / 4, 0],
    });
    const opacity = animation;
    const onScroll = (e) => {
        if (focused) return;
        const y = e.nativeEvent.contentOffset.y;
        if (y > scrollValue && headerVisible && y > headerHeight / 2) {
            Animated.spring(animation, {
                toValue: 0,
                useNativeDriver: true,
                bounciness: 0,
            }).start();
            headerVisible = false;
        }
        if (y < scrollValue && !headerVisible) {
            Animated.spring(animation, {
                toValue: 1,
                useNativeDriver: true,
                bounciness: 0,
            }).start();
            headerVisible = true;
        }
        scrollValue = y;
    };

    const searchData=(text)=>{
        if (text.length===0) {
            setsearch(text)
            dispatch({type:"show",payload:true})
            
        }else{
            setsearch(text)
            let filterData=songList.filter(item => item.title.includes(text));
            dispatch({type:"show",payload:false})
            dispatch({type:"filterData",payload:filterData})
        }
     
    }
    return (
        <View style={styles.container}>
            <SongListModule
                onScroll={(e) => {
                    onScroll(e);
                }}
               
            />
            <View style={[styles.header]}>
                <Animated.View
                    style={[styles.searchContainer, { transform: [{ translateY }] }]}>
                    <Animated.View
                        style={[
                            styles.inputContainer,
                            { opacity, transform: [{ translateY: inputTranslateY }] },
                        ]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search Songs.."
                            placeholderTextColor='#9e9e9e'
                            value={search}
                            onChangeText={(txt)=>{
                                        searchData(txt)
                            }}
                            onFocus={() => (focused = true)}
                            onBlur={() => (focused = false)}
                        />
                    </Animated.View>
                </Animated.View>
                <Animated.View style={[styles.firstContainer]}>
                    <LinearGradient
                        colors={['#F97B5A', '#F94D71']}
                        start={{ x: 0.2, y: 0.2 }}
                        style={styles.firstContainer}
                    >
                        <Text style={styles.headerText}>All Songs</Text>

                    </LinearGradient>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
    },

    header: {
        height: headerHeight / 2,
        width: '100%',
        position: 'absolute',
    },
    firstContainer: {
        height: headerHeight / 2,
        backgroundColor: '#fff',
        elevation: 2,
        justifyContent: 'center',
    },
    searchContainer: {
        height: headerHeight / 2,
        backgroundColor: '#fff',
        width: '100%',
        position: 'absolute',
        elevation: 2,
        padding: 10,
        paddingHorizontal: 10,
        overflow: 'hidden',
    },
    name: {
        fontSize: 20,
        color: '#000',
        fontFamily: 'Montserrat-Bold'
    },
    inputContainer: {
        flex: 1,
        backgroundColor: '#eee',
        borderRadius: 3,
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        padding: 0,
        paddingHorizontal: 15,
        fontSize: 15,
        fontFamily: 'Montserrat-light', 
        color:'#000'
    },
    headerText: {
        fontFamily: 'Montserrat-Bold', 
        fontSize: 20, color: '#fff', 
        marginLeft: 5, 
        marginLeft: 15
    }
});
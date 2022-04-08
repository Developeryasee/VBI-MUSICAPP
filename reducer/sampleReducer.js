

const initstate={
    visible:true,
    show:true,
    filterData:[],
    showAlbum:true,
    filterAlbumData:[],
    playListData:[],
    playListSongData:[]
}


export const SampleReducer=(state=initstate,action)=>{
    if(action.type==="visible"){
        return{
            ...state,
            visible:action.payload
        }
    }
    if(action.type==="show"){
        return{
            ...state,
            show:action.payload
        }
    }
    if(action.type==="filterData"){
        return{
            ...state,
            filterData:action.payload
        }
    }
    if(action.type==="showAlbum"){
        return{
            ...state,
            showAlbum:action.payload
        }
    }
    if(action.type==="filterAlbumData"){
        return{
            ...state,
            filterAlbumData:action.payload
        }
    }
    if(action.type==="playListData"){
        return{
            ...state,
            playListData:action.payload
        }
    }
    if(action.type==="playListSongData"){
        return{
            ...state,
            playListSongData:action.payload
        }
    }
 
   
   
    return state
   
}
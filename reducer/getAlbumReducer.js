import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { apiConfig } from '../config/apiConfig';



const dataAdapter = createEntityAdapter();
const initialState = dataAdapter.getInitialState({
    status: 'idle',
    error: null,
    productList: null

})

export const getAlbum = createAsyncThunk('getAllAlbum/getAlbum', async (item) => {
    
    const response = await fetch(apiConfig.getAllbumTitle, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
    })
    return response.json();



})



export const getAlbumSlices = createSlice({
    name: 'getAllAlbum',
    initialState,
    reducers: {
        searchTerm: (state, action) => {

            state.searchTerm = action.payload;
        }

    },
    extraReducers: {
        [getAlbum.pending]: (state, action) => {

            state.status = 'loading'
        },
        [getAlbum.fulfilled]: (state, action) => {

            state.status = 'succeeded'
            state.productList = action.payload;

            dataAdapter.removeAll(state);
            const arr=[]
            // console.log(action.payload);
            for (let i = 0; i < action.payload.length; i++) {
                // const element = array[i];
                arr.push({
                    id:action.payload[i].id,
                    title:action.payload[i].title,
                    
                })
                
            }
            arr.map((node) => dataAdapter.addOne(state, node));

            // console.log(action.payload);


          
        },
        [getAlbum.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
});



export default getAlbumSlices.reducer;
export const { selectAll: selectAllAlbum, selectEntities: select } = dataAdapter.getSelectors((state) => state.getAllAlbum);


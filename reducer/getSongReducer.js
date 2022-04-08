import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { apiConfig } from '../config/apiConfig';



const dataAdapter = createEntityAdapter();
const initialState = dataAdapter.getInitialState({
    status: 'idle',
    error: null,
    productList: null

})

export const getSong = createAsyncThunk('getAllsong/getSong', async (item) => {
    
    const response = await fetch(apiConfig.getAllsong, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
    })
    return response.json();



})



export const getSongSlices = createSlice({
    name: 'getAllsong',
    initialState,
    reducers: {
        searchTerm: (state, action) => {

            state.searchTerm = action.payload;
        }

    },
    extraReducers: {
        [getSong.pending]: (state, action) => {

            state.status = 'loading'
        },
        [getSong.fulfilled]: (state, action) => {

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
                    thumbnail:action.payload[i].thumbnailUrl,
                    albumid:action.payload[i].albumId
                })
                
            }
            arr.map((node) => dataAdapter.addOne(state, node));

            // console.log(action.payload);


          
        },
        [getSong.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
});



export default getSongSlices.reducer;
export const { selectAll: selectAllItem, selectEntities: select } = dataAdapter.getSelectors((state) => state.getAllsong);


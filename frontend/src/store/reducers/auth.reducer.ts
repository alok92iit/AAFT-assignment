import { createSlice } from "@reduxjs/toolkit"



const initialState={
    user:null,
    token:"",
    authenticated:false
}


const auth=createSlice({
    name:"auth",
    initialState,
    reducers:{
        SET_USER: (state, { payload }) => {
            state.user = payload
        },
        SET_TOKEN: (state, { payload }) => {
            state.token = payload
            state.authenticated=true
        },
        LOGOUT:()=>initialState
    }
})

export const {SET_USER,SET_TOKEN,LOGOUT}=auth.actions

export default auth.reducer
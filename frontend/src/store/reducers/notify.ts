import { createSlice } from '@reduxjs/toolkit'



const initialState={
    toasterVisible:false,
    modalState:false,
    loaderState:true,
    modalBody:null,
    moduleComplete:false
}

export const notify=createSlice({
    name:"notify",
    initialState,
    reducers:{
        SET_NOTIFY:(state,{payload})=>{
            state.toasterVisible=payload
        },
        SET_MODAL:(state,{payload})=>{
            if((typeof payload)==(typeof {})){
                state.modalState=payload.modalState,
                state.modalBody=payload.modalState?payload.modalBody:null 
            }
            else{
                state.modalState=payload

            }
            // console.log(payload)
        },
        SET_LOADER:(state,{payload})=>{
            state.loaderState=payload
        },
        SET_MODULE_COMPLETE:(state,{payload})=>{
            state.moduleComplete=payload
        }
    
    }
})

export const {SET_NOTIFY,SET_MODAL,SET_LOADER,SET_MODULE_COMPLETE} =notify.actions;
export default notify.reducer
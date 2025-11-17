import { createSlice } from "@reduxjs/toolkit";

// Define the shape of your state
interface TableState {
  users: any[]; 
  leads:any[],
  leadsInfo:any[]
}

// Define the initial state
const initialState: TableState = {
  users: [],
  leads:[],
  leadsInfo:[],
};

const initialStateWithContent:any=initialState
delete initialStateWithContent.content

// Create the slice
const tableRecords = createSlice({
  name: "tableRecords", // Updated name for clarity
  initialState,
  reducers: {
    
    SET_USERS: (state, action) => {
      // Replace `any[]` with the actual type if available
      // console.log("k;jhgvfcdxchjvkl;jhvg",action.payload)
      state.users = action.payload;
    },
    SET_LEADS:(state,{payload})=>{
      state.leads=payload
    },
    SET_LEADINFO:(state,{payload})=>{
      state.leadsInfo=payload
    },
    
    
    

    CLEAR_RECORDS: () => initialStateWithContent, // Reset to initial state
  },
});

// Export actions and reducer
export const { SET_USERS,CLEAR_RECORDS,SET_LEADS,SET_LEADINFO} = tableRecords.actions;
export default tableRecords.reducer;

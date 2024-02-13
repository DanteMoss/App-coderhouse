import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:"auth",
    initialState:{
      user: null,
      token: null,
      profilePicture: null,
      localId: null,
      userData: {

      }
    },
    reducers:{
      setUser: (state, action) => {
        state.user = action.payload.email,
        state.token = action.payload.idToken,
        state.localId = action.payload.localId
      },
      clearUser : state => {
        state.user = null,
        state.token = null
      },
      setProfilePicture: (state, action) => {
        state.profilePicture = action.payload
      },
      logout: (state) => {
        state.user = null,
        state.token = null,
        state.profilePicture = null,
        state.localId = null
      },
      setUserData: (state, action) => {
        console.log("Action Payload: ", action.payload)
        state.userData = action.payload
      }
    }   
})

export const { 
  setUser, 
  clearUser,
  setProfilePicture,
  logout,
  setUserData
} = authSlice.actions

export default authSlice.reducer
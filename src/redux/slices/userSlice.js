import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {instance} from "../../application"

export const authenticateUser = createAsyncThunk("user/authenticateUser",
 async(values) => {
    try {
        const route = `/users/${values.isLogin ? "login":"register"}`
        const {data} = await instance.post(route, values.formValues);
        localStorage.setItem("token",data.token);
        localStorage.setItem("refresh_token",data.refreshToken);
        return data
    } catch (error) {
        console.log("error",error);
    }
})


const UserSlice = createSlice({
    name:"user",
    initialState:{
        loading:false,
        userData:null,
        error:null,
        message:"",
    },
    reducers:{
        logoutUser:(state) => {
        state.userData = null;
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
     }
    },

    extraReducers:(builder)=> {
        builder.addCase(authenticateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authenticateUser.fulfilled, (state,action) => {
            state.loading = false;
            state.userData = action.payload.user;
        });
        builder.addCase(authenticateUser.rejected, (state) => {
            state.loading = false;
            state.error = "something went wrong";
        });
    },
});
export const {logoutUser} = UserSlice.actions;
export const userReducer = UserSlice.reducer;
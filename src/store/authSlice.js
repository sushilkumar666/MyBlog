import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    auth: {
        status: false,
        authData: null
    }
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.auth.status = true;
            state.auth.authData = action.payload;
            // console.log('store login functin is called' + JSON.stringify(state.auth.authData))
        },

        logout: (state, action) => {
            state.auth.status = false;
            state.auth.authData = null;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        token: '',
        isLogged: false,
    },
    reducers: {
        login(state, { payload }){
            return { 
                ...state, 
                name: payload.user.name, 
                isLogged: true, 
                token: payload.token 
            }
        },
        logout(state){
            return {
                ...state, 
                name: '', 
                isLogged: false, 
                token: ''
            }
        }
    }

})

export const { login, logout } = slice.actions

export const selectUser = state => state.user;

export default slice.reducer
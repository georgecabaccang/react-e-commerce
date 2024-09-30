import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
    _id?: string;
    email: string;
    password?: string;
    isSignedIn?: boolean;
    token: string;
}

const initialState: IUser = {
    _id: "",
    email: "",
    isSignedIn: false,
    token: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        signIn: (state, action: PayloadAction<IUser>) => {
            console.log(action.payload.token);
            localStorage.setItem("userToken", action.payload.token);
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.isSignedIn = true;
        },
        signOut: () => {
            localStorage.removeItem("userToken");
            return initialState;
        },
    },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;

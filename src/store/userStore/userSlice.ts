import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
    _id?: string;
    email: string;
    password?: string;
    isSignedIn?: boolean;
}

const initialState: IUser = {
    _id: "",
    email: "",
    isSignedIn: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userSignedIn: (state, action: PayloadAction<IUser>) => {
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.isSignedIn = true;
        },
        signOut: () => initialState,
    },
});

export const { userSignedIn, signOut } = userSlice.actions;
export default userSlice.reducer;

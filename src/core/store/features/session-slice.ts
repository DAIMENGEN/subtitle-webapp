import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type SessionStore = {
    roomId?: string;
}

const initialState: SessionStore = {};

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setRoomId(state, action: PayloadAction<string>) {
            state.roomId = action.payload;
        },
    }
});

export const {
    setRoomId,
} = sessionSlice.actions;
export default sessionSlice.reducer;
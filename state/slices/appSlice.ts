import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IState {
    isIntro: boolean,
    isIntroOpening: boolean
}

const initialState: IState = {
    isIntro: true,
    isIntroOpening: false
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setIsIntro: (state, action: PayloadAction<boolean>) => {
            state.isIntro = action.payload;
        },
        setIsIntroOpening: (state, action: PayloadAction<boolean>) => {
            state.isIntroOpening = action.payload;
        }
    }
});

export const { setIsIntro, setIsIntroOpening } = appSlice.actions;
export default appSlice.reducer;
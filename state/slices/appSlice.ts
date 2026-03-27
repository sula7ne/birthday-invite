import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IState {
    isIntro: boolean,
    isIntroOpening: boolean,
    isBeated: boolean
}

const initialState: IState = {
    isIntro: true,
    isIntroOpening: false,
    isBeated: false
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
        },
        setIsBeated: (state, action: PayloadAction<boolean>) => {
            state.isBeated = action.payload;
        }
    }
});

export const { setIsIntro, setIsIntroOpening, setIsBeated } = appSlice.actions;
export default appSlice.reducer;
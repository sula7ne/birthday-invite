import appReducer from "@/state/slices/appSlice";
import { configureStore } from "@reduxjs/toolkit";
import guestsReducer from "@/state/slices/guestsSlice";

export const store = configureStore({
    reducer: {
        guests: guestsReducer, 
        app: appReducer, 
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
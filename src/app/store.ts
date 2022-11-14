import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import routesReducer from "./state/routesSlice";

export const store = configureStore({
  reducer: {
    routes: routesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

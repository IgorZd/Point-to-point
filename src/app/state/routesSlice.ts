import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import { View } from '../../routes';

import { RoutesData } from '../../routes/types';
import { RootState } from '../store';

const initialState: RoutesData = {
  nextKey: -1,
  list: [],
};

export const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    requestPush: (state, action: PayloadAction<any>) => {
      //console.log(action);
      const key = state.nextKey + 1;
      state.nextKey = key;
      state.list = [{ route: action.payload, key }, ...state.list];
    },
    removeRequest: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((route) => route.key !== action.payload);
    },
  },
});

export const { requestPush, removeRequest } = routesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
/*export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};*/

export const selectRoutesList = (state: RootState) => {
  return state.routes.list;
};

export default routesSlice.reducer;

import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'

import searchCityReducer from '../store/searchSlice'
import createSagaMiddleware from 'Redux-Saga'
import saga from '../store/sagas/saga'
let sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

export const rootReducer = combineReducers({
  searchCity: searchCityReducer
});

export type RootState = ReturnType<typeof rootReducer>

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

sagaMiddleware.run(saga)
export default store

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { Axios } from 'axios'
import type { AppState, AppThunk } from './store'

export interface CityLabel {
  description: any
  label: string
}

export interface CityDetail {
  lat?: number | any, 
  lng?: number | any,
  lon?: number | any,
  label?: string
}

export interface SearchCityState {
  query: string,
  cities: CityLabel[],
  currentCity: CityDetail,
  status: 'idle' | 'loading' | 'failed'
}


const initialState: SearchCityState = {
  query: '',
  cities: [],
  currentCity: { label: '', lat: 0, lng: 0 },
  status: 'idle',
}

export const searchSlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setCities: (state, action: PayloadAction<CityLabel[]>) => {
      state.cities = action.payload
    },
    setCurrentCity: (state, action: PayloadAction<CityDetail>) => {
      state.currentCity = action.payload
    },
  },
})

export const { setSearchQuery, setCities, setCurrentCity } = searchSlice.actions
export const selectCities = (state: AppState) => state.searchCity.cities
export const currentCity = (state: AppState) => state.searchCity.currentCity
export const searchQuery = (state: AppState) => state.searchCity.query
export default searchSlice.reducer

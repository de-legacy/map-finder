import { call, takeEvery, put, SagaReturnType, ActionPattern, all } from 'redux-saga/effects';
import Axios from 'axios';
import { setCities, setCurrentCity } from '../searchSlice';
import { sagaActions } from './actions';

interface apiProps {
  url: string;
  method?: string;
  data?: unknown;
}

let callAPI = async ({ url, method, data }: apiProps): Promise<SagaReturnType<typeof Axios>> => {
  return await Axios({
    url,
    method,
    data,
  });
};

export function* fetchCityLabel(action: any): Generator<any, any, any> {
  try {
    let result = yield call(() =>
      callAPI({
        url: `/api/search_city?city=${action?.payload}`,
      })
    );

    yield put(setCities(result?.data.data));
  } catch (e) {
    yield put({ type: 'SEARCH_CITY_FAILED' });
  }
}

export function* fetchCityDetail(action: any): Generator<any, any, any> {
  try {
    let result = yield call(() =>
      callAPI({
        url: `/api/geocode?address=${action?.payload}`
      })
    );

    yield put(setCurrentCity({ label: action?.payload, lat: result?.data?.data?.lat, lng: result?.data?.data?.lng }));
  } catch (e) {
    yield put({ type: 'GEOCODE_CITY_FAILED' });
  }
}


export default function* rootSaga() {
  yield all(
    [
      takeEvery<ActionPattern<any>>(sagaActions.FETCH_CITY_LABEL, fetchCityLabel),
      takeEvery<ActionPattern<any>>(sagaActions.FETCH_GEOCODE_CITY, fetchCityDetail)
    ]
  )
}
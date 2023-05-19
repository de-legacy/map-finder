import React, { useContext } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux'
import { sagaActions } from '../../store/sagas/actions';
import { RootState } from '../../store/store';
import styles from '../../styles/Home.module.css'
import { MyContext } from '../../hooks';



export default function CitySearch() {
  const dispatch = useDispatch()
  const { theme, setTheme } = useContext(MyContext)
  const cities = useSelector((state: RootState) => state.searchCity.cities)

  const label = cities && cities.map(city => city.description)
  const [value, setValue] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    dispatch({ type: sagaActions.FETCH_CITY_LABEL, payload: inputValue })
    const delay = setTimeout(() => {
      dispatch({ type: sagaActions.FETCH_CITY_LABEL, payload: inputValue })
    }, 500);

    return () => {
      clearTimeout(delay)
    }
  }, [inputValue])


  return (
    <header className={styles.search} style={{ background: theme === 'dark' ? '#9b9b9b' : '#fff' }}>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
          dispatch({ type: sagaActions.FETCH_GEOCODE_CITY, payload: newValue })
          setTheme((prev: string) => prev === 'light' ? 'dark' : 'light')
          // setTheme('dark')
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="city-list"
        options={label}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="City" />}
      />
    </header>
  )
}

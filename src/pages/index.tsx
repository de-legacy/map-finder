import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useMemo, useState } from 'react';
import CitySearch from '../components/city_search';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Maps from '../components/maps';
import { MyContext } from '../hooks';


const IndexPage: NextPage = () => {
  const currentCity = useSelector((state: RootState) => state.searchCity.currentCity)
  const [theme, setTheme] = useState('light')
  const [start, setStart] = useState(9)

  const slowFunc = (start = 1 as number) => {
    for (let index = start; index < 10000; index++) {
      console.log(index)
    }

    return start * 5
  }

  const resultOptSlow = useMemo(() => {
    return slowFunc(start)
  }, [start])

  // const resultOptSlow = slowFunc(start)

  useEffect(() => {
    console.log('theme changed')

  }, [theme])
  

  return (
    <MyContext.Provider value={{ theme, setTheme }}>
      <div className={styles.container}>
        <Head>
          <title>Map Finder</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>{resultOptSlow}</h1>
        <input type="text" onChange={(e) => { setStart(+e.target.value) }} />
        <button onClick={() => { setTheme(prev => prev === 'light' ? 'dark' : 'light') }}>Alert</button>
        <CitySearch />

        <div style={{ height: '90vh', width: '100%' }}>
          <Maps lat={+currentCity?.lat} lng={+currentCity?.lng} />
        </div>
      </div>
    </MyContext.Provider>
  )
}

export default IndexPage

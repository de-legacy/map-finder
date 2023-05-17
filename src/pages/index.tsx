import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import GoogleMapReact from 'google-map-react';
import React from 'react';
import CitySearch from '../components/city_search';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Maps from '../components/maps';



const IndexPage: NextPage = () => {
  const currentCity = useSelector((state: RootState) => state.searchCity.currentCity)

  return (
    <div className={styles.container}>
      <Head>
        <title>Map Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.search}>
        <CitySearch />
      </header>

      <div style={{ height: '90vh', width: '100%' }}>
        <Maps lat={+currentCity?.lat} lng={+currentCity?.lng} />
      </div>
    </div>
  )
}

export default IndexPage

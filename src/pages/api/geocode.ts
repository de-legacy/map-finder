import type { NextApiHandler } from 'next'
import axios from 'axios'

const searchCityHandler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=AIzaSyAhmXUwRcyYoKGXhC_2vq_znWdquVdRoeQ`

   try {
    const resp = await axios.get(url)
    res.status(200).json({data: resp.data.results[0].geometry.location });
   } catch(error) {
    res.status(400).json({message: error });
   }
  }
}

export default searchCityHandler
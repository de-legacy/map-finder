import type { NextApiHandler } from 'next'
import axios from 'axios'

const searchCityHandler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.city}&types=geocode&language=id&key=AIzaSyAhmXUwRcyYoKGXhC_2vq_znWdquVdRoeQ`

   try {
    const resp = await axios.get(url)
    res.status(200).json({data: resp.data.predictions });
   } catch(error) {
    res.status(400).json({message: 'Bad Request' });
   }
  }
}

export default searchCityHandler
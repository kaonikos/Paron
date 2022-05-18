import { http } from '../index';

class DirectionsService {

	getDriverRoute = async (start,end) => {
		const result = await http.get(`/driving-traffic/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_PUBLIC_ACCESS_TOKEN}`)
		return result.data
	}
}

export default new DirectionsService();
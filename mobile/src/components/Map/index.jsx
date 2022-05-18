import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';// eslint-disable-line import/no-webpack-loader-syntax
import DirectionsService from '../../services/mapService/directions'
import './styles.css'
import {Geolocation} from "@capacitor/geolocation";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PUBLIC_ACCESS_TOKEN

const Map = () => {

	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(23.77);
	const [lat, setLat] = useState(38.04);
	const [zoom, setZoom] = useState(10);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom
		});
	});

	useEffect(() => {
		if (!map.current) return; // wait for map to initialize
		map.current.on('move', () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});
		map.current.on('load', () => {
			// make an initial directions request that
			// starts and ends at the same location
			DirectionsService.getDriverRoute([23.776351,37.992380],[23.776351,37.992380]);

			// Add starting point to the map
			map.current.addLayer({
				id: 'point',
				type: 'circle',
				source: {
					type: 'geojson',
					data: {
						type: 'FeatureCollection',
						features: [
							{
								type: 'Feature',
								properties: {},
								geometry: {
									type: 'Point',
									coordinates: [23.776351,37.992380]
								}
							}
						]
					}
				},
				paint: {
					'circle-radius': 10,
					'circle-color': '#3887be'
				}
			});
			// this is where the code from the next step will go
		});
	});

	const handleClick = () => {
		Geolocation.getCurrentPosition()
			.then(res => {
				const start = [res.coords.longitude,res.coords.latitude];
				DirectionsService.getDriverRoute(start,[23.776351,37.992380])
					.then(res => {
						console.log(res)
						const data = res.routes[0]
						const route = data.geometry.coordinates;
						const geojson = {
							type: 'Feature',
							properties: {},
							geometry: {
								type: 'LineString',
								coordinates: route
							}
						};
						if (map.current.getSource('route')) {
							map.current.getSource('route').setData(geojson);
						}
						// otherwise, we'll make a new request
						else {
							map.current.addLayer({
								id: 'route',
								type: 'line',
								source: {
									type: 'geojson',
									data: geojson
								},
								layout: {
									'line-join': 'round',
									'line-cap': 'round'
								},
								paint: {
									'line-color': '#3887be',
									'line-width': 5,
									'line-opacity': 0.75
								}
							});
						}
					})
			})
	}

	return (
		<div className="map">
			<div className="sidebar" onClick={handleClick} id="mode">
				<p id="mode">Click to Start Navigation</p>
			</div>

			<div ref={mapContainer} className="map-container" />
		</div>
	);

}

export default Map

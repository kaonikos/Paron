import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';// eslint-disable-line import/no-webpack-loader-syntax
import DirectionsService from '../../services/mapService/directions'
import './styles.css'
import {Geolocation} from "@capacitor/geolocation";
import {useSelector} from "react-redux";
// import MapboxDirections from '@mapbox/mapbox-gl-directions/src/directions.js';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PUBLIC_ACCESS_TOKEN

const Map = () => {

	const darkMode = useSelector((state) => state.darkMode)

	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(23.77);
	const [lat, setLat] = useState(38.04);
	const [zoom, setZoom] = useState(10);
	const [location, setLocation] = useState([])
	const [steps, setSteps] = useState([])

	useEffect(() => {
			if (map.current) return; // initialize map only once
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				// style: 'mapbox://styles/mapbox/dark-v11',
				style: darkMode ? 'mapbox://styles/tipota/cl41gf8j9001i15l4fmr65tk2' : 'mapbox://styles/tipota/cl41gfh3x000u15pk7o6qx356',
				center: [lng, lat],
				zoom: zoom
			});
		},[darkMode]
	);

	useEffect(() => {
			if (!map.current) return; // wait for map to initialize
			map.current.on('move', () => {
				setLng(map.current.getCenter().lng.toFixed(4));
				setLat(map.current.getCenter().lat.toFixed(4));
				setZoom(map.current.getZoom().toFixed(2));
			});
			map.current.addControl(
				new MapboxDirections({
					accessToken: mapboxgl.accessToken,
					unit: 'metric',
				}),
				'top-left'
			);
			map.current.on('load', () => {
				Geolocation.getCurrentPosition()
					.then(res => {
						setLocation([res.coords.longitude, res.coords.latitude])

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
												coordinates: [res.coords.longitude, res.coords.latitude]
											}
										},
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
					})
			});
		}, [map]
	);

	const handleClick = () => {
			DirectionsService.getDriverRoute(location,[23.776351,37.992380])
				.then(res => {
					console.log(res)
					const data = res.routes[0]
					const route = data.geometry.coordinates;
					const directions = {
						type: 'Feature',
						properties: {},
						geometry: {
							type: 'LineString',
							coordinates: route
						}
					};
					if (map.current.getSource('route')) {
						map.current.getSource('route').setData(directions);
					}
					else {
						map.current.addLayer({
							id: 'route',
							type: 'line',
							source: {
								type: 'geojson',
								data: directions
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
					const instructions = document.getElementById('instructions');
					const steps = data.legs[0].steps;
					console.log(steps)

					let tripInstructions = '';
					for (const step of steps) {
						tripInstructions += `<li>${step.maneuver.instruction}</li>`;
					}
					instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
						data.duration / 60
					)} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;
				})
	}

	return (
		<div className="map">
			<div className="sidebar" onClick={handleClick} id="mode">
				<p id="mode">Click to Start Navigation</p>
			</div>
			{/*<div id="instructions"></div>*/}
			<div ref={mapContainer} className="map-container" />
		</div>
	);

}

export default Map

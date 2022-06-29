import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';// eslint-disable-line import/no-webpack-loader-syntax
import './styles.css'
import {Geolocation} from "@capacitor/geolocation";
import {useSelector} from "react-redux";
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
    const [toggleDirections, setToggleDirections] = useState(false)
    // const [directions, setDirections] = useState(new MapboxDirections({
    //     accessToken: mapboxgl.accessToken,
    //     unit: 'metric',
    //     profile: 'mapbox/driving-traffic',
    //     alternatives: true,
    //     congestion: true,
    //     controls: {
    //         profileSwitcher: false,
    //         instructions: true
    //     },
    //     interactive: false,
    //     steps: false,
    //     voice_instructions: true,
    // }))

    useEffect(() => {
            if (map.current) return; // initialize map only once
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
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

            map.current.on('load', () => {
                Geolocation.getCurrentPosition()
                    .then(res => {
                        setLocation([res.coords.longitude, res.coords.latitude]);
                        const temp = new MapboxDirections({
                            accessToken: mapboxgl.accessToken,
                            unit: 'metric',
                            profile: 'mapbox/driving-traffic',
                            alternatives: true,
                            congestion: true,
                            controls: {
                                profileSwitcher: false,
                                instructions: true
                            },
                            interactive: false,
                            steps: false,
                            voice_instructions: true,
                        })
                        temp.setOrigin([res.coords.longitude, res.coords.latitude])
                        temp.setDestination([23.776351,37.992380])
                        map.current.addControl(
                            temp,
                            'top-left',
                        );
                        const marker = new mapboxgl.Marker()
                        marker.setLngLat([res.coords.longitude, res.coords.latitude])
                        marker.addTo(map.current);
                    })

            });
        }, [map]
    );

    useEffect(
        () => {
            if (!map.current) return;
            const element = document.getElementsByClassName("mapbox-directions-instructions");
            if (element.length) {
                element[0].hidden = toggleDirections
            }
        }, [toggleDirections]
    )

    // useEffect(
    //     () => {
    //         if (!map.current) return;
    //         if (location.length !== 0) {
    //             const marker = new mapboxgl.Marker()
    //             marker.setLngLat([location[0], location[1]])
    //             marker.addTo(map.current);
    //         }
    //     },[location]
    // )

    return (
        <div className="map">
            <div className="toggle-directions" id="mode" onClick={() => setToggleDirections(!toggleDirections)}>
                <p id="mode">Toggle Directions</p>
            </div>
            <div ref={mapContainer} className="map-container" />
            {/*<div className="default-trip" id="mode" onClick={defaultDirections}>*/}
            {/*    <p id="mode">Default Trip</p>*/}
            {/*</div>*/}
        </div>
    );

}

export default Map

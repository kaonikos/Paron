import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';// eslint-disable-line import/no-webpack-loader-syntax
import DirectionsService from '../../services/mapService/directions'
import './styles.css'
import {Geolocation} from "@capacitor/geolocation";
import {useSelector} from "react-redux";
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import {CustomControlGroup} from './customGeolocation'

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

    const directions = new MapboxDirections({
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

    class ToggleControl extends mapboxgl.GeolocateControl {
        _onSuccess(position) {
            console.log(map)
            this.map.flyTo({
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 17,
                bearing: 0,
                pitch: 0
            });
        }

        onAdd(map, cs) {
            this.map = map;
            this.container = document.createElement('div');
            this.container.className = `mapboxgl-ctrl`;
            const button = this._createButton('monitor_button')
            this.container.appendChild(button);
            return this.container;
        }

        _createButton(className) {
            const el = window.document.createElement('button')
            el.className = className;
            el.textContent = 'Use my location';
            el.addEventListener('click', () => {
                this.trigger();
            });
            this._setup = true;
            return el;
        }
    }

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
                        setLocation([res.coords.longitude, res.coords.latitude])
                        directions.setOrigin([res.coords.longitude, res.coords.latitude])
                        directions.setDestination([23.776351,37.992380])
                    })
            });

            Geolocation.getCurrentPosition()
                .then(res => {
                    setLocation([res.coords.longitude, res.coords.latitude])
                })

            // map.current.addControl(
            //     new mapboxgl.GeolocateControl({
            //         positionOptions: {
            //             enableHighAccuracy: true
            //         },
            //         // When active the map will receive updates to the device's location as it changes.
            //         trackUserLocation: true,
            //         // Draw an arrow next to the location dot to indicate which direction the device is heading.
            //         showUserHeading: true
            //     })
            // );
            const toggleControl = new ToggleControl({
                // positionOptions: {
                //     enableHighAccuracy: true
                // },
                // // When active the map will receive updates to the device's location as it changes.
                // trackUserLocation: true,
                // // Draw an arrow next to the location dot to indicate which direction the device is heading.
                // showUserHeading: true
            })
            map.current.addControl(toggleControl, 'top-right')
            toggleControl.on('geolocate', () => {
                console.log(map)
                toggleControl._onSuccess(location,map.current)
            });

            map.current.addControl(
                directions,
                'top-left',
            );
        }, [map]
    );

    useEffect(
        () => {
            if (!map.current) return; // wait for map to initialize
            const element = document.getElementsByClassName("mapbox-directions-instructions");
            if (element.length) {
                element[0].hidden = toggleDirections
            }
        }, [toggleDirections]
    )

    const defaultDirections = () => {
        Geolocation.getCurrentPosition()
            .then(res => {
                setLocation([res.coords.longitude, res.coords.latitude])
                directions.setOrigin([res.coords.longitude, res.coords.latitude])
                directions.setDestination([23.776351,37.992380])
                // map.current.addControl(
                //     directions,
                //     'top-left'
                // );
            })
    }

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

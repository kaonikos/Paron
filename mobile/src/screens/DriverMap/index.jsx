import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';// eslint-disable-line import/no-webpack-loader-syntax
import './styles.css'
import {Geolocation} from "@capacitor/geolocation";
import {useDispatch, useSelector} from "react-redux";
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import {passengers} from '../../assets/data/passengers'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Actions} from "../../reducer/actions";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PUBLIC_ACCESS_TOKEN

const Map = () => {

    const dispatch = useDispatch();

    const setDisplayedScreen = (payload) => dispatch({ type: Actions.SetDisplayedScreen, payload });

    const darkMode = useSelector((state) => state.darkMode)

    const mapContainer = useRef(null);
    const map = useRef(null);

    const [disabled, setDisabled] = useState(false)
    const [lng, setLng] = useState(23.77);
    const [lat, setLat] = useState(38.04);
    const [zoom, setZoom] = useState(10);
    const [location, setLocation] = useState([])
    const [toggleDirections, setToggleDirections] = useState(false)
    const [counter, setCounter] = useState(0)
    const [locationMarker, setLocationMarker] = useState(null)
    const [markers, setMarkers] = useState([{id: 0, value:new mapboxgl.Marker()}])
    const [directions, setDirections] = useState(new MapboxDirections({
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
        // steps: false,
        // voice_instructions: true,
    }))

    const popupContent = (passenger) => {
        return '<div class="popup-content">' +
            '<img src="' + passenger.picture +'" alt="picture"/>' +
            '<p id="mode"><strong>Name:</strong> ' + passenger.first_name + ' ' + passenger.last_name +'</p>' +
            // '<h4>'+ passengers[0].last_name + '</h4>' + '<br/>' +
            '<p id="mode"><strong>School:</strong> '+ passenger.school + '</p>' +
            '</div>'
    }

    useEffect(() => {
            if (map.current) return;
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: darkMode ? 'mapbox://styles/tipota/cl41gf8j9001i15l4fmr65tk2' : 'mapbox://styles/tipota/cl41gfh3x000u15pk7o6qx356',
                center: [lng, lat],
                zoom: zoom
            });
        },[darkMode]
    );

    useEffect(() => {
            if (!map.current) return;
            map.current.on('move', () => {
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4));
                setZoom(map.current.getZoom().toFixed(2));
            });

            // map.current.on('load', () => {
            //
            // });
            Geolocation.getCurrentPosition()
                .then(res => {
                    const temp = [res.coords.longitude, res.coords.latitude]
                    setLocation([...temp]);
                    directions.setOrigin([res.coords.longitude, res.coords.latitude])
                    directions.setDestination([23.776351,37.992380])
                })
            map.current.addControl(
                directions,
                'top-left',
            );
        }, [map]
    );

    const updateLocation = async () => {
        await Geolocation.getCurrentPosition()
            .then(res => {
                const temp = [res.coords.longitude, res.coords.latitude]
                setLocation([...temp]);
            })
    }

    useEffect(() => {
            if (!map.current) return;
            console.log(counter)
            if (counter !== 0) {
                setTimeout(() => {
                    setCounter(prev => {
                        if (prev === 0) {
                            return 0
                        } else {
                            return prev + 1
                        }

                    })
                },1000)
                updateLocation()
            }
        },[map,counter]
    )

    useEffect(
        () => {
            if (!map.current) return;
            if (location.length !== 0) {
                if (locationMarker) {
                    locationMarker.setLngLat([location[0], location[1]])
                    map.current.flyTo({
                        center: [location[0], location[1]],
                        essential: true,
                        zoom: 16
                    })
                    if (counter === 5) {
                        onreachingSite()
                    }
                }
                const distance = calculateDistance(37.992380,23.776351, location[1], location[0] )
                if (distance < 0.05) {
                    const marker = markers.find(item => item.id === 0).value
                    setCounter(0)
                    marker.remove()
                    map.current.flyTo({
                        center: [location[0], location[1]],
                        essential: true,
                        zoom: 20
                    })
                }
            }
        },[location]
    )

    useEffect(
        () => {
            if (!map.current) return;
            const element = document.getElementsByClassName("mapbox-directions-instructions");
            if (element.length) {
                element[0].hidden = toggleDirections
            }
        }, [toggleDirections]
    )

    const onreachingSite = () => {
        setLocation([23.776351,37.992380])
        setDisabled(true)
        // map.current.removeControl(directions)
        passengers.map((passenger, index) => {
            const marker = {id: index, value:new mapboxgl.Marker()}
            marker.value.setLngLat(passenger.location)
            marker.value.addTo(map.current);
            const div = window.document.createElement('div');
            div.innerHTML = popupContent(passenger)
            marker.value.setPopup(new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: true
            }).setDOMContent(div))
            setMarkers([...markers,marker])
        })
    }

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p))/2;

        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }

    const toggleNavigation = () => {
        if (!disabled) {
            const marker = markers.find(item => item.id === 0).value
            if (counter === 0) {
                marker.setLngLat([location[0], location[1]])
                marker.addTo(map.current);
                setLocationMarker(marker)
                setCounter(counter +1)
            } else {
                setCounter(0)
                marker.remove()
            }
        }
    }

    return (
        <div className="map">
            <div className="toggle-directions" onClick={() => setToggleDirections(!toggleDirections)}>
                <p id="mode">Toggle Directions</p>
            </div>
            <div ref={mapContainer} className="map-container" />
            <div className="default-trip" onClick={toggleNavigation} style={counter !== 0 ? {transform: 'scale(1)', animation: 'pulse 2s infinite'} : {}}>
                <p id="mode">{counter !== 0 ? 'Stop Navigation' : 'Start Navigation'}</p>
            </div>
            <FontAwesomeIcon id='back-button' icon={faArrowLeft} onClick={() => {
                setDisplayedScreen('home')
            }}/>
        </div>
    );

}

export default Map

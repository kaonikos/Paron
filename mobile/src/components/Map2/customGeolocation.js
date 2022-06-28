import * as MapboxGL from "mapbox-gl";

export class CustomControlGroup {
	constructor(
		_user_zoom,
	_userLocation = null,
	_map = null,
	_container = null,
	_custom_geolocation = null
) {}
insertControls() {
	this._container = document.createElement("div");
	this._container.classList.add("mapboxgl-ctrl");
	this._container.classList.add("mapboxgl-ctrl-group");
	this._container.classList.add("mapboxgl-ctrl-custom");

	if (this._userLocation) {
		this._custom_geolocation = document.createElement("button");
		this._custom_geolocation.classList.add("mapboxgl-ctrl-icon");
		this._custom_geolocation.classList.add(
			"mapboxgl-ctrl-custom-geolocation"
		);
		this._custom_geolocation.setAttribute("aria-label", "Find My Location");
		this._custom_geolocation.addEventListener("click", (e) => {
			this._map.flyTo(
				{
					center: [this._userLocation.lon, this._userLocation.lat],
					zoom: this._user_zoom,
					bearing: 0
				},
				e
			);
		});
		this._container.appendChild(this._custom_geolocation);
	}

}
onAdd(map) {
	this._map = map;
	this._container = document.createElement("div");
	this._container.id = "custom-control-group";
	this._container.classList =
		"mapboxgl-ctrl mapboxgl-ctrl-group custom-control-group";
	this.insertControls();
	return this._container;
}
onRemove() {
	this._container.parentNode.removeChild(this._container);
	this._map = undefined;
}
}
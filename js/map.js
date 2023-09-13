const defaultCoordinates = [52.2297, 21.0122];
const map = L.map('map').setView(defaultCoordinates, 6);
let layers = [];
function findInCountriesJson(name) {
	return countriesObject[name] ?? null;
}

function countriesSelect2Format() {
	let jsonCountry = [{
		id: '',
		text: '--- Set country ---'
	}];
	for (e in countriesObject) {
		const obj = {
			id: countriesObject[e].country_name,
			text : countriesObject[e].country_name,
		};
		jsonCountry.push(obj);
	}
	jsonCountry.sort((a,b) => a.text > b.text ? 1 : -1);
	return jsonCountry;
}

function initScripts()
{
	initMap();
	$('#select2').select2({
	  data: countriesSelect2Format()
	});
}


function initMap()
{
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
	}).addTo(map);
}

function setCountry()
{
	$(document).on('change', '#select2', function () {
		if (layers.length > 0) {
			for (l in layers) {
				map.removeLayer(layers[l]);
			}
		}
		let country = findInCountriesJson($(this).val());
		if (country) {
			map.setView([country.lat, country.lng], 6);
			let layer = L.marker([country.lat, country.lng]);
			layer.addTo(map)
				.bindPopup(country.capital_name + ' - ' + 'capital of ' + country.country_name)
				.openPopup();
			layers.push(layer);
		} else {
			map.setView(defaultCoordinates, 6);
		}
	});
}

$(document).ready(function() {
	initScripts();
	setCountry();
});
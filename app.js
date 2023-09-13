// const countries_select2_format = require('./countries_with_capitals.json');

function countriesSelect2Format() {
    $.getJSON("https://drive.google.com/file/d/1F7TXb2cxs7zw6saegnA9kGg6s1NMXuS1/view?usp=drive_link", function (data) {
	  console.log(data);
	})
}

function initScripts()
{
	initMap();
	$('#select2').select2({
	  data: [
	  	{
	      "id": 1,
	      "text": "Option 1"
	    },
	    {
	      "id": 2,
	      "text": "Option 2"
	    }
	  ]
	});
}


function initMap()
{
	// Utwórz mapę i ustaw początkowy widok
    var map = L.map('map').setView([0, 0], 2);

    // Dodaj kafelki z OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Wczytaj dane GeoJSON z pliku
    fetch('https://drive.google.com/file/d/1o29UjyYoEgCVTCrFR9D0RZjZNUV5xaU6/view?usp=drive_link')
        .then(response => response.json())
        .then(data => {
            // Wybierz tylko Polskę z danych
            var polandGeoJSON = data.find(country => country.name.commo === 'Poland');
            
            // Dodaj granice Polski do mapy
            L.geoJSON(polishBorders).addTo(map);
            
            // Dopasuj widok do granic Polski
            map.fitBounds(L.geoJSON(polishBorders).getBounds());
        });
}

function setCountry()
{

}

$(document).ready(function() {
	initScripts();
	countriesSelect2Format();
});
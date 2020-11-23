
//making  map
const mymap = L.map('iss').setView([0, 0], 6);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const tileUrl = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);

//making a marker with icon
var myIcon = L.icon({
    iconUrl: 'international-space-station.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});

const marker= L.marker([0, 0], {icon: myIcon}).addTo(mymap);


const url= "https://api.wheretheiss.at/v1/satellites/25544";

let firstTime = true;
async function getData(){
	const response = await fetch(url);
	const data =  await response.json();
	console.log(data);
	const {latitude, longitude, velocity} = data;

	mymap.setView([latitude, longitude], mymap.getZoom());
	marker.setLatLng([latitude, longitude]);

	document.getElementById('lat').textContent = latitude.toFixed(2);
	document.getElementById('lon').textContent = longitude.toFixed(2);
	document.getElementById('vel').textContent = velocity.toFixed(2);

}

getData();

setInterval(getData, 1000);
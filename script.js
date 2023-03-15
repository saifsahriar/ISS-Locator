

document.getElementById("loading").innerHTML = " we are loading sir....";

//mapping the ISS
const mymap = L.map('mapId').setView([0, 0], 2);  // 51.505, -0.09  these was the given default data and is now irrelevant
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);


// mapping the ISS using custom icon
const icon = L.icon({
    iconUrl: 'Circle.png',   // this rainbow icon as the ISS icon is irrelevant, i know, but this is the result of my laziness
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});
const marker = L.marker([0, 0], { icon: icon }).addTo(mymap);

let firstTime = true;
let removeOnce = true;


//locating the ISS
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    document.getElementById("d1").innerHTML = data.latitude.toFixed(2);
    document.getElementById("d2").innerHTML = data.longitude.toFixed(2);
    if (removeOnce) {
        document.getElementById("loading").remove();
        removeOnce = false;
    }

    // these consoles are just for my convenience
    console.log(data);
    const { latitude, longitude } = data;

    //locating the ISS at the particular latitude and longitude
    marker.setLatLng([latitude, longitude]);
    if (firstTime) {
        mymap.setView([latitude, longitude], 2);
        firstTime = false;
    }

    //just for my convenience
    console.log(latitude);
    console.log(longitude);
}

getISS();
getISS().catch(error => {
    console.log("error happened");
    console.error(error);
});

setInterval(getISS, 3000);

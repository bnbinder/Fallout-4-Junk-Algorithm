// App.js
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapImage from './map.png';
import { markerData } from './fallout4.js';
function MapComponent() {
    useEffect(() => {

        /*var map = L.map('map', {
            crs: L.CRS.Simple
        });
        var bounds: [number, number][]
        //var bounds = L.latLngBounds(map.unproject([61953, 63758], 6), map.unproject([3583, 1775], 6));
        bounds = [[0, 0], [500, 500]];
        var image = L.imageOverlay(mapImage, bounds).addTo(map);

        map.fitBounds(bounds);
*/
        var map = L.map('map', {
		scrollWheelZoom: 'center',
        maxZoom: 6,
		minZoom: 1,
		crs: L.CRS.Simple
	})
	map.zoomControl.setPosition('bottomright');
    var yOffset = -5000
    var bounds = L.latLngBounds(map.unproject([61953, 63758], 6), map.unproject([3583, 1775-yOffset], 6));
	map.setMaxBounds(bounds);
	map.setView(map.unproject([32768, 32768], 6), 1);
     var image = L.imageOverlay(mapImage, bounds).addTo(map);

    function mapRange(x: number, oldMin: number, oldMax: number, newMin: number, newMax: number) {
            return ((x - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
        }
        /*
                var lng = Math.abs(data.locations[0].longitude)
                var lat = data.locations[0].latitude
        
                var lngt = Math.abs(data.locations[1].longitude)
                var latt = data.locations[1].latitude
                //var X = mapRange(data.locations[1].longitude * 377895 + 257494, -100000, 100000, 0, 600);
                //var Y = mapRange(data.locations[1].latitude * 379630 - 288321, -100000, 100000, 0, 600);
                var num = 130
                var numt = 1.1
                var X = ((lng + numt) / (numt*2)) * num
                var Y = ((lat + numt) / (numt*2)) * num
        
                var Xt = ((lngt + numt) / (numt*2)) * num
                var Yt = ((latt + numt) / (numt*2)) * num
        
                console.log(data.locations[1].title)
        
                var sol = L.latLng([Y, X]);
                L.marker(sol).addTo(map);
        
                //var solt = L.latLng([Yt, Xt]);
                //L.marker(solt).addTo(map);
        */
       /*
       var cX = 2560 + (42 * 256);
        var cY = 2560 + (43 * 256);
        var testX = ((-10420.6055 / 4096) * 256) + cX;
        var testY = cY - ((12619.6797 / 4096) * 256);
       
       */
       //var sol = L.latLng([ mapRange(markerData[index].y, 3583, 73758, 0, 500), mapRange(markerData[index].x, 3583, 62140, 0, 500)]);
        //var m = L.marker(map.unproject([], 1), {
        for(var i = 0; i < markerData.length; i++)
        {
        var index = 6
        var mx = markerData[i].x;
		var my = markerData[i].y;
        var m = L.marker(map.unproject([mx, my], map.getMaxZoom()), {
			
		})
		m.addTo(map);
    }
       //var sol = L.latLng([testX,testY]);
        //L.marker(sol).addTo(map);
        //m.addTo(map);
        return () => {
            map.remove();
        };
    }, []);

    return (
        <div>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                crossOrigin="" />
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
                integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
                crossOrigin=""></script>
            <div id="map" style={{ height: '500px', width: '100%' }}></div>
        </div>
    );
}

export default MapComponent;

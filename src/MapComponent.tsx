import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapImage from './map.png';
import { markerData, locale } from './fallout4.js';
import { TSMarker } from './TSMarker.js';

function MapComponent({onDataReceived} : any) {

    const handleClick = (str : string) => {
        onDataReceived(str);
    };

    useEffect(() => {

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
    L.imageOverlay(mapImage, bounds).addTo(map);

    for(var i = 0; i < markerData.length; i++)
    {
        var mx = markerData[i].x;
		var my = markerData[i].y;
        var m = new TSMarker([mx,my], map.unproject([mx, my], map.getMaxZoom()), {
            title: locale.en.markerData[i].title ?? "will never happen"
        })
		m
        .addTo(map).bindPopup(locale.en.markerData[i].title)
        .on('click', function(e)
    {
        handleClick(e.target.options.title);
        console.log("hi")
    });
    }

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

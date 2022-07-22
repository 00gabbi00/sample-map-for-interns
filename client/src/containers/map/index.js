import React, {useRef, useEffect, useContext} from 'react';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.js'
import 'leaflet-draw/dist/leaflet.draw.css'

import { MapContext } from '../../context/MapContext';

export default function Map () {

  const {setBounds, setSize, setPage, view, setShapes, color} = useContext(MapContext)


  var map = useRef(null);
  var MapTiler = L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=MvSightfsTCsiOP8lkG3', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank"> &copy; MapTiler <a href="https://www.openstreetmap.org/copyright" target="_blank"> &copy; OpenStreetMap contributors'
  });
  var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
  });
  var drawnItems = new L.featureGroup()

  useEffect(() => {
    if (map.current === undefined || map.current === null){
      // console.log("undefined map current", map.current)
      map.current = L.map('map', {
        center: [14.6019, 121.0355],
        zoom: 7,
        layerControl: true,
        zoomControl: true,
        layers: [OpenStreetMap_HOT],
        // drawControl: true       
      });


      drawnItems.addTo(map.current)
      var drawControl = new L.Control.Draw({
        draw: {
          circle: false,
          marker: false,
          polyline: false,
          circlemarker: false
        },
        edit: {
          featureGroup: drawnItems,
          remove: false,
          edit: false
        }
      });
      map.current.on(L.Draw.Event.CREATED, function(event) {
        var layer = event.layer;
        var shps = []
        drawnItems.addLayer(layer);
        drawnItems.eachLayer(function (l) {
          shps = [...shps, l.getLatLngs()[0]]
          console.log(shps)
        })
        // console.log(drawnItems)
        setSize(shps.length)
        setPage(shps.length-1)
        setBounds(shps)
      });

      L.control.layers({
        "MapTiler": MapTiler,
        "OpenTopoMap": OpenTopoMap,
        "OSM_HOT": OpenStreetMap_HOT
      }).addTo(map.current)
      map.current.addControl(drawControl)

    } 

  }, [])

  useEffect(()=> {
    const fetchData = async(i) => {
      const shapes = await axios(`/api/shapes/${i}`)

      setShapes(shapes.data)
      loadShapes(shapes.data)
    }

    if(view){
      map.current.eachLayer(function(layer) {
        if(layer instanceof L.Polygon){
          map.current.removeLayer(layer)
        }
      })
      fetchData(view)
    }

  }, [view])

  // var layers;
  var layerGroup = new L.FeatureGroup()


  const loadShapes = (x, i) => {
    // layers = layers.concat(x)
    // console.log(layers, x)

    var json;
    if (x.length > 0){
      // eslint-disable-next-line array-callback-return
      x.map((data) => {
        if ('properties' in data){
          json = data.properties[0][0]          
        }

        const updated_json_len = Object.keys(json).length
        var counter = 0
        const table = []
        for (var i in json) {
          if (counter === 0) {
            table.push(`<tr ><th class="header">ATTRIBUTE NAME</th><th class="header">VALUE</th></tr>`)
          }

          counter += 1
          table.push(`<tr><th>${i}</th><td>${json[i]}</td></tr>`)
          if (counter === updated_json_len) {
            var popup = L.popup({maxHeight:500, maxWidth:700}).setContent(`<table>${table}</table>`.replace(/,/g, ''))
          }
              // var popup = L.popup().setContent(`<table><tr><td>${i}</td><td>${updated_json[i]}</td></tr></table>`)
        }

        var poly = new L.geoJSON(data, {
          style: {
            "color": color,
            "weight": 5,
            "opacity": 0.65
          },
        })
        .bindPopup(popup)
        layerGroup.addLayer(poly)

      })
      layerGroup.addTo(map.current)

    }
  }


  return(
    <div id="map" style={{width: '100%', height: '100%'}}/>
  )
}

import 'ol/ol.css'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import { transform, fromLonLat } from 'ol/proj.js'
import {ScaleLine} from 'ol/control.js';
import Target from 'ol-ext/control/Target'
const center = fromLonLat([140.097, 37.856])
import Notification from '../js/notification'

export function initMap (vm) {
  let map01 = null
  let view01 = new View({
    center: center,
    zoom: 8
  })
  map01 = new Map({
    layers: [
      vm.$store.state.layerList01[0].layer
    ],
    target: 'map01',
    view: view01
  })
  vm.$store.commit('setMap01', map01)
  map01 = vm.$store.state.map01
  map01.on('singleclick', function (evt) {
    console.log(transform(evt.coordinate, "EPSG:3857", "EPSG:4326"));
  })
  map01.on('moveend', function () {
    vm.zoom01 = 'zoom=' + String(Math.floor(map01.getView().getZoom() * 100) / 100)
  })
  const target01 = new Target({composite: 'difference'})
  map01.addControl(target01);
  const notification01 = new Notification();
  map01.addControl(notification01);
  const scaleLineControl01 = new ScaleLine();
  map01.addControl(scaleLineControl01)

  vm.$store.commit('setNotifications',{name:'map01', control: notification01})
  // map2-------------------------------------------------------------------------------------
  let map02 = null
  map02 = new Map({
    layers: [
      vm.$store.state.layerList02[0].layer
    ],
    target: 'map02',
    view: view01
  })
  vm.$store.commit('setMap02', map02)
  map02.on('moveend', function () {
    vm.zoom02 = 'zoom=' + String(Math.floor(map02.getView().getZoom() * 100) / 100)
  })
  const target02 = new Target({composite: 'difference'})
  map02.addControl(target02);
  const notification02 = new Notification();
  map02.addControl(notification02);
  const scaleLineControl02 = new ScaleLine();
  map02.addControl(scaleLineControl02)

  vm.$store.commit('setNotifications',{name:'map02', control: notification02})
  // map3-------------------------------------------------------------------------------------
  let map03 = null
  map03 = new Map({
    layers: [
      vm.$store.state.layerList03[0].layer
    ],
    target: 'map03',
    view: view01
  })
  vm.$store.commit('setMap03', map03)
  map03.on('moveend', function () {
    vm.zoom03 = 'zoom=' + String(Math.floor(map03.getView().getZoom() * 100) / 100)
  })
  const target03 = new Target({composite: 'difference'})
  map03.addControl(target03)
  const notification03 = new Notification();
  map03.addControl(notification03);
  const scaleLineControl03 = new ScaleLine();
  map03.addControl(scaleLineControl03)

  vm.$store.commit('setNotifications',{name:'map03', control: notification03})
  // map4-------------------------------------------------------------------------------------
  let map04 = null
  map04 = new Map({
    layers: [
      vm.$store.state.layerList04[0].layer
    ],
    target: 'map04',
    view: view01
  })
  vm.$store.commit('setMap04', map04)
  map04.on('moveend', function () {
    vm.zoom04 = 'zoom=' + String(Math.floor(map04.getView().getZoom() * 100) / 100)
  })
  const target04 = new Target({composite: 'difference'})
  map04.addControl(target04)
  const notification04 = new Notification();
  map04.addControl(notification04);
  const scaleLineControl04 = new ScaleLine();
  map04.addControl(scaleLineControl04)

  vm.$store.commit('setNotifications',{name:'map04', control: notification04})
  //--------------------------------------------------------------------------------------------
}

export function synch (vm) {
  this.synchFlg = !this.synchFlg
  let map01View = this.$store.state.map01.getView()
  if (!this.synchFlg) {
    const viewArr = []
    for (let i = 0; i < 3; i++) {
      viewArr[i] = new View({
        center: map01View.getCenter(),
        zoom: map01View.getZoom()
      })
    }
    this.$store.state.map02.setView(viewArr[0])
    this.$store.state.map03.setView(viewArr[1])
    this.$store.state.map04.setView(viewArr[2])
  } else {
    this.$store.state.map02.setView(map01View)
    this.$store.state.map03.setView(map01View)
    this.$store.state.map04.setView(map01View)
  }
}

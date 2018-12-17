import store from './store'
import 'ol/ol.css'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import { transform, fromLonLat } from 'ol/proj.js'
import {ScaleLine} from 'ol/control.js';
import Target from 'ol-ext/control/Target'
import Notification from '../js/notification'

export function initMap (vm) {
  // マップ作製ループ用の配列を作成
  const maps = [
    {name: 'map01', map:store.state.map01, layer:store.state.layerLists.map01[0].layer},
    {name: 'map02', map:store.state.map02, layer:store.state.layerLists.map02[0].layer},
    {name: 'map03', map:store.state.map03, layer:store.state.layerLists.map03[0].layer},
    {name: 'map04', map:store.state.map04, layer:store.state.layerLists.map04[0].layer}
  ];
  const view01 = new View({
    center: fromLonLat([140.097, 37.856]),
    zoom: 8
  });
  for (let i in maps) {
    // マップ作製
    const map = new Map({
      layers: [maps[i].layer],
      target: maps[i].name,
      view: view01
    });
    // マップをストアに登録
    store.commit('setMap', {name: maps[i].name, map});
    // イベント
    map.on('singleclick', function (evt) {
      console.log(transform(evt.coordinate, "EPSG:3857", "EPSG:4326"));
    });
    map.on('moveend', function () {
      vm.zoom01 = 'zoom=' + String(Math.floor(map.getView().getZoom() * 100) / 100)
    });
    // コントロール追加
    map.addControl(new Target({composite: 'difference'}));
    const notification = new Notification();
    map.addControl(notification);
    store.commit('setNotifications',{name:maps[i].name, control: notification});
    map.addControl(new ScaleLine())
  }
}

export function synch (vm) {
  vm.synchFlg = !vm.synchFlg;
  let map01View = store.state.maps.map01.getView();
  if (!vm.synchFlg) {
    const viewArr = [];
    for (let i = 0; i < 3; i++) {
      viewArr[i] = new View({
        center: map01View.getCenter(),
        zoom: map01View.getZoom()
      })
    }
    store.state.maps.map02.setView(viewArr[0]);
    store.state.maps.map03.setView(viewArr[1]);
    store.state.maps.map04.setView(viewArr[2]);
  } else {
    store.state.maps.map02.setView(map01View);
    store.state.maps.map03.setView(map01View);
    store.state.maps.map04.setView(map01View)
  }
}

export function resize () {
  store.state.maps.map01.updateSize();
  store.state.maps.map02.updateSize();
  store.state.maps.map03.updateSize();
  store.state.maps.map04.updateSize()
}


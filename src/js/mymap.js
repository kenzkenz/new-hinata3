// マップ関係の関数
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
    zoom: 7
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
      vm.zoom[maps[i].name] = 'zoom=' + String(Math.floor(map.getView().getZoom() * 100) / 100)
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

export function watchLayer (map, thisName, newLayerList,oldLayerList) {
  // 逆ループ
  for (let i = newLayerList.value.length - 1; i >= 0; i--) {
    // リストクリックによる追加したレイヤーで リストの先頭で リストの増加があったとき
    const layer = newLayerList.value[i].layer;

    if (newLayerList.value[i].addFlg) {
      if (i === 0 ) {
        if (newLayerList.length > oldLayerList.length) {
          const oldCenter = map.getView().getCenter();
          const center = layer.getProperties().center;
          if (center) {
            map.getView().setCenter(transform(center,"EPSG:4326","EPSG:3857"));
            const div = $('<div>').text('元の位置に戻しますか？ ');

            $('<a>').text('戻す')
            .click(function() {
              map.getView().setCenter(oldCenter);
              store.state.notifications[thisName].hide();
            })
            .appendTo(div);

            $('<a style="margin-left: 10px;">').text('NO')
            .click(function() {
              store.state.notifications[thisName].hide();
            })
            .appendTo(div);
            store.state.notifications[thisName].show(div.get(0),5000)
          }
        }
      }
    }
    map.removeLayer(layer);
    map.addLayer(layer);
    layer.setOpacity(newLayerList.value[i].opacity)
  }
}

export function opacityChange (item) {
  item.layer.setOpacity(item.opacity);
}

export function removeLayer (item, layerList, name) {
  const result = layerList.filter((el) => el.id !== item.id);
  store.commit('updateList', {value: result, name: name});
  // 削除するレイヤーの透過度を１に戻す。再度追加するときのために
  item.layer.setOpacity(1);
  const map = store.state.maps[name];
  map.removeLayer(item.layer)
}

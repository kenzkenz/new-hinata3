import store from './store'
import { transform } from 'ol/proj.js'

export function permalinkEventSet() {
  // 起動時の処理------------------------------------------------------------------------------
  if (window.location.hash !== '') {
     const hash = window.location.hash.replace('#map=', '');
     // 場所、ズームを復帰
     const parts = hash.split('/');
     const map = store.getters.map01
     if (parts.length === 4) {
       const center = [ parseFloat(parts[1]), parseFloat(parts[2]) ]
       const center3857 = transform(center,'EPSG:4326','EPSG:3857')
       map.getView().setCenter(center3857)
       map.getView().setZoom(parseInt(parts[0], 10))
     }
     // パラメータで復帰
     // まずパラメータをオブジェクトにする
     const obj = {}
     if (hash.split('?')[1]){
       const parameter = hash.split('?')[1].split('&');
       for (let i of parameter) {
         obj[i.split('=')[0]] = i.split('=')[1];
       }
     }
    for (let key in obj) {
      if (key==='S') {
        store.commit('updateSplitFlg',obj[key])
      }
    }
  }
  // マップ移動時イベント------------------------------------------------------------------------
  store.state.map01.on('moveend', moveEnd)
}

export function moveEnd () {
  const map = store.getters.map01
  const zoom = map.getView().getZoom()
  const center = map.getView().getCenter()
  const center4326 = transform(center,'EPSG:3857','EPSG:4326')
  const rotation = map.getView().getRotation()
  const hash = '#map=' +
    zoom + '/' +
    Math.round(center4326[0] * 100) / 100 + '/' +
    Math.round(center4326[1] * 100) / 100 + '/' +
    rotation;
  const parameter = '?S=' + store.getters.splitFlg
  const state = {
    zoom: zoom,
    center: center4326,
    rotation: rotation
  };
  window.history.pushState(state, 'map', hash + parameter);
}

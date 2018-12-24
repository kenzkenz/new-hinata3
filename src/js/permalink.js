import store from './store'
import { transform } from 'ol/proj.js'
import * as Layers from '../js/layers'
// import rison from 'rison'
export function permalinkEventSet () {

  // console.log(rison.encode_object({supportsObjects: true, ints: 435}))

  // 起動時の処理------------------------------------------------------------------------------
  if (window.location.hash !== '') {
     const hash = decodeURIComponent(window.location.hash.replace('#', ''));
     // 場所、ズームを復帰
     const parts = hash.split('/');
     const map = store.state.maps.map01;
     if (parts.length === 3) {
       const center = [ parseFloat(parts[1]), parseFloat(parts[2]) ];
       const center3857 = transform(center,'EPSG:4326','EPSG:3857');
       map.getView().setCenter(center3857);
       map.getView().setZoom(parseInt(parts[0], 10))
     }
     // パラメータで復帰
     // まずパラメータをオブジェクトにする
     const obj = {};
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
      if (key==='L') {
        // 初期レイヤーをリセット
        store.commit('updateList', {value: [], name: 'map01'});
        store.commit('updateList', {value: [], name: 'map02'});
        store.commit('updateList', {value: [], name: 'map03'});
        store.commit('updateList', {value: [], name: 'map04'});
        store.state.maps.map01.removeLayer(store.state.maps.map01.getLayers().getArray()[0]);
        store.state.maps.map02.removeLayer(store.state.maps.map02.getLayers().getArray()[0]);
        store.state.maps.map03.removeLayer(store.state.maps.map03.getLayers().getArray()[0]);
        store.state.maps.map04.removeLayer(store.state.maps.map04.getLayers().getArray()[0]);
        // const urlLayerListArr = rison.decode(obj[key])
        const urlLayerListArr = JSON.parse(obj[key]);
        for (let i = 0; i < urlLayerListArr.length; i++) {
          // 逆ループ
          for (let j = urlLayerListArr[i].length - 1; j >= 0; j--) {
            const saiki =function (layers){
              for (let node of layers) {
                if (node.children) {
                  saiki(node.children)
                } else {
                  if (urlLayerListArr[i][j].id === node.data.id) {
                    let name;
                    switch (i) {
                      case 0:
                        name = 'map01';
                        break;
                      case 1:
                        name = 'map02';
                        break;
                      case 2:
                        name = 'map03';
                        break;
                      case 3:
                        name = 'map04';
                        break
                    }
                    store.commit('unshiftLayerList', {
                      value: {
                        id: node.data.id,
                        name: node.text,
                        layer: node.data.layer,
                        opacity: urlLayerListArr[i][j].o,
                        summary: node.data.summary
                      },
                      name: name
                    })
                  }
                }
              }
            };
            saiki(Layers.Layers)
          }
        }
      }
    }
  }
  // マップ移動時イベント------------------------------------------------------------------------
  store.state.maps.map01.on('moveend', moveEnd)
}

export function moveEnd () {
  const map = store.state.maps.map01;
  const zoom = map.getView().getZoom();
  const center = map.getView().getCenter();
  const center4326 = transform(center,'EPSG:3857','EPSG:4326');
  const rotation = map.getView().getRotation();
  const hash = '#' +
    zoom + '/' +
    Math.round(center4326[0] * 100000) / 100000 + '/' +
    Math.round(center4326[1] * 100000) / 100000;
    // rotation;
  let parameter = '?S=' + store.state.splitFlg;
  parameter += '&L=' + store.getters.layerLists;
  // parameter += '&L=' + rison.encode(store.getters.layerLists)
  // parameterだけエンコードする。起動時にwindow.location.hashでハッシュ値を取得するため
  parameter = encodeURIComponent(parameter);
  const state = {
    zoom: zoom,
    center: center4326,
    rotation: rotation
  };
  window.history.pushState(state, 'map', hash + parameter);
}

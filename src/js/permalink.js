import store from './store'
import { transform } from 'ol/proj.js'
import layers from './layers.js'
export function permalinkEventSet() {
  // 起動時の処理------------------------------------------------------------------------------
  if (window.location.hash !== '') {
     const hash = decodeURIComponent(window.location.hash.replace('#map=', ''))
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
      if (key==='L') {
        // 初期レイヤーをリセット
        store.commit('updateList', {value: [], name: 'map01Dialog'})
        store.commit('updateList', {value: [], name: 'map02Dialog'})
        store.commit('updateList', {value: [], name: 'map03Dialog'})
        store.commit('updateList', {value: [], name: 'map04Dialog'})
        store.getters.map01.removeLayer(store.getters.map01.getLayers().getArray()[0])
        store.getters.map02.removeLayer(store.getters.map02.getLayers().getArray()[0])
        store.getters.map03.removeLayer(store.getters.map03.getLayers().getArray()[0])
        store.getters.map04.removeLayer(store.getters.map04.getLayers().getArray()[0])
        const urlLayerListArr = JSON.parse(obj[key])
        for (let i = 0; i < urlLayerListArr.length; i++) {
          // 逆ループ
          for (let j = urlLayerListArr[i].length - 1; j >= 0; j--) {
            const saiki =function (layers){
              for (let node of layers) {
                if (node.children) {
                  saiki(node.children)
                } else {
                  if (urlLayerListArr[i][j].id === node.data.id) {
                    let name
                    switch (i) {
                      case 0:
                        name = 'map01Dialog'
                        break
                      case 1:
                        name = 'map02Dialog'
                        break
                      case 2:
                        name = 'map03Dialog'
                        break
                      case 3:
                        name = 'map04Dialog'
                        break
                    }
                    store.commit('unshiftLayerList', {
                      value: {
                        id: node.data.id,
                        name: node.text,
                        layer: node.data.layer,
                        opacity: urlLayerListArr[i][j].o
                      },
                      name: name
                    })
                  }
                }
              }
            }
            saiki(layers)
          }
        }
      }
    }
  }
  // マップ移動時イベント------------------------------------------------------------------------
  store.getters.map01.on('moveend', moveEnd)
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
  let parameter = '?S=' + store.getters.splitFlg
  parameter += '&L=' + store.getters.layerLists
  // parameterだけエンコードする。起動時にwindow.location.hashでハッシュ値を取得するため
  parameter = encodeURIComponent(parameter)
  const state = {
    zoom: zoom,
    center: center4326,
    rotation: rotation
  };
  window.history.pushState(state, 'map', hash + parameter);
}

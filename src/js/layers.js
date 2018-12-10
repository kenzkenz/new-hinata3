import TileLayer from 'ol/layer/Tile.js'
import OSM from 'ol/source/OSM.js'
import XYZ from 'ol/source/XYZ.js'
import { transformExtent } from 'ol/proj.js'

const transformE = function (extent) {
    return transformExtent(extent,'EPSG:4326','EPSG:3857');
}


// オープンストリートマップ
function Osm () {
  this.source = new OSM()
}
const osmArr = []
for (let i = 0; i < 4; i++) {
  osmArr[i] = new TileLayer(new Osm())
}
// 標準地図
function Std () {
  this.source = new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
    minZoom: 2,
    maxZoom: 18
  })
}
const stdArr = []
for (let i = 0; i < 4; i++) {
  stdArr[i] = new TileLayer(new Std())
}
// 淡色地図
function Pale () {
  this.source = new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
    minZoom: 2,
    maxZoom: 18
  })
}
const paleArr = []
for (let i = 0; i < 4; i++) {
  paleArr[i] = new TileLayer(new Pale())
}
// 白地図
function Blank () {
  this.source = new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
    minZoom: 2,
    maxZoom: 18
  })
}
const blankArr = []
for (let i = 0; i < 4; i++) {
  blankArr[i] = new TileLayer(new Blank())
}
// 全国最新写真
function Seamlessphoto () {
  this.source = new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
    minZoom: 2,
    maxZoom: 18
  })
}
const seamlessphotoArr = []
for (let i = 0; i < 4; i++) {
  seamlessphotoArr[i] = new TileLayer(new Seamlessphoto())
}
// 色別標高図
function Relief () {
  this.source = new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png',
    minZoom: 5,
    maxZoom: 15
  })
}
const reliefArr = []
for (let i = 0; i < 4; i++) {
  reliefArr[i] = new TileLayer(new Relief())
}
// 宮崎県航空写真
function MiyazakiOrt () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/ort/{z}/{x}/{-y}.png',
    minZoom: 1,
    maxZoom: 19
  })
}
const miyazakiOrtArr = []
for (let i = 0; i < 4; i++) {
  miyazakiOrtArr[i] = new TileLayer(new MiyazakiOrt())
}
// 岐阜県CS立体図
function GihuCs () {
  this.source = new XYZ({
    url: 'https://kenzkenz2.xsrv.jp/gihucs/{z}/{x}/{-y}.png',
    minZoom: 1,
    maxZoom: 17
  }),
  this.extent = transformE([136.257111,35.141011,137.666902,36.482164143934]),
  this.center = [136.92019043124094,35.55338980561788]
}
const gihuCsArr = []
for (let i = 0; i < 4; i++) {
  gihuCsArr[i] = new TileLayer(new GihuCs())
}

// ここにレイヤーを全部書く。クリックするとストアのlayerListに追加されていく
const layers =
  [
    { text: 'OpenStreetMap', data: { id: 0, layer: osmArr, opacity: 100 } },
    { text: '国土地理院',
      children: [
        { text: '標準地図', data: { id: 1, layer: stdArr, opacity: 100 } },
        { text: '淡色地図', data: { id: 2, layer: paleArr, opacity: 100 } },
        { text: '白地図', data: { id: 3, layer: blankArr, opacity: 100 } },
        { text: '色別標高図', data: { id: 4, layer: reliefArr, opacity: 100 } },
        { text: '全国最新写真', data: { id: 5, layer: seamlessphotoArr, opacity: 100 } }
      ]},
    { text: '宮崎県',
      children: [
        { text: '宮崎県航空写真', data: { id: 6, layer: miyazakiOrtArr, opacity: 100 } }
      ]},
    { text: '立体図等',
      children: [
        { text: '岐阜県CS立体図', data: { id: 7, layer: gihuCsArr, opacity: 100 } }
      ]}
  ]
export default layers

import TileLayer from 'ol/layer/Tile.js'
import OSM from 'ol/source/OSM.js'
import XYZ from 'ol/source/XYZ.js'
import { transformExtent } from 'ol/proj.js'
const transformE = function (extent) {
    return transformExtent(extent,'EPSG:4326','EPSG:3857');
};
const mapsStr = ['map01','map02','map03','map04'];
// オープンストリートマップ
function Osm () {
  this.source = new OSM()
}
const osmObj = {};
for (let i of mapsStr) {
  osmObj[i] = new TileLayer(new Osm())
}
// 標準地図
function Std () {
  this.source = new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
    minZoom: 2,
    maxZoom: 18
  })
}
const stdObj = {};
for (let i of mapsStr) {
  stdObj[i] = new TileLayer(new Std())
}
// 淡色地図
function Pale () {
  this.source = new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
    minZoom: 2,
    maxZoom: 18
  })
}
const paleObj = {};
for (let i of mapsStr) {
  paleObj[i] = new TileLayer(new Pale())
}
// 白地図
function Blank () {
  this.source = new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
    minZoom: 2,
    maxZoom: 18
  })
}
const blankObj = {};
for (let i of mapsStr) {
  blankObj[i] = new TileLayer(new Blank())
}
// 全国最新写真
function Seamlessphoto () {
  this.source = new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
    minZoom: 2,
    maxZoom: 18
  })
}
const seamlessphotoObj = {};
for (let i of mapsStr) {
  seamlessphotoObj[i] = new TileLayer(new Seamlessphoto())
}
// 色別標高図
function Relief () {
  this.source = new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png',
    minZoom: 5,
    maxZoom: 15
  })
}
const reliefObj = {};
for (let i of mapsStr) {
  reliefObj[i] = new TileLayer(new Relief())
}
// 宮崎県航空写真
function MiyazakiOrt () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/ort/{z}/{x}/{-y}.png',
    minZoom: 1,
    maxZoom: 19
  });
  this.extent = transformE([130.66371,31.34280,131.88045,32.87815])
}
const miyazakiOrtObj = {};
for (let i of mapsStr) {
  miyazakiOrtObj[i] = new TileLayer(new MiyazakiOrt())
}
// 岐阜県CS立体図
function GihuCs () {
  this.source = new XYZ({
    url: 'https://kenzkenz2.xsrv.jp/gihucs/{z}/{x}/{-y}.png',
    minZoom: 1,
    maxZoom: 18
  });
  this.extent = transformE([136.257111,35.141011,137.666902,36.482164143934]);
  this.center = [136.92019043124094,35.55338980561788]
}
const gihuCsObj = {};
for (let i of mapsStr) {
  gihuCsObj[i] = new TileLayer(new GihuCs())
}
// 日本CS立体図
function NihonCs () {
  this.source = new XYZ({
    url: 'http://kouapp.main.jp/csmap/tile/japan/{z}/{x}/{y}.jpg',
    minZoom:9,
    maxZoom:15
  })
}
const nihonCsObj = {};
for (let i of mapsStr) {
  nihonCsObj[i] = new TileLayer(new NihonCs())
}
// 今昔マップ
// 福岡・北九州編
function Kon_hukuoka01 () {
  this.source = new XYZ({
    url: 'https://sv53.wadax.ne.jp/~ktgis-net/kjmapw/kjtilemap/fukuoka/00/{z}/{x}/{-y}.png',
    minZoom: 1,
    maxZoom: 16
  });
  this.center = [130.6152588501701, 33.720855341479506];
  this.extent = transformE([130.12549,33.41993,131.1254516,34.003285])
}
const kon_hukuoka01Arr = [];
for (let i = 0; i < 4; i++) {
  kon_hukuoka01Arr[i] = new TileLayer(new Kon_hukuoka01())
}
const kon_hukuoka01Obj = {};
for (let i of mapsStr) {
  kon_hukuoka01Obj[i] = new TileLayer(new Kon_hukuoka01())
}

// ここにレイヤーを全部書く。クリックするとストアのlayerListに追加されていく
const layers =
  [
    { text: 'OpenStreetMap', data: { id: 0, layer: osmObj, opacity: 1 } },
    { text: '国土地理院',
      children: [
        { text: '標準地図', data: { id: 1, layer: stdObj, opacity: 1 } },
        { text: '淡色地図', data: { id: 2, layer: paleObj, opacity: 1 } },
        { text: '白地図', data: { id: 3, layer: blankObj, opacity: 1 } },
        { text: '色別標高図', data: { id: 4, layer: reliefObj, opacity: 1 } },
        { text: '全国最新写真', data: { id: 5, layer: seamlessphotoObj, opacity: 1 } }
      ]},
    { text: '宮崎県',
      children: [
        { text: '宮崎県航空写真', data: { id: 6, layer: miyazakiOrtObj, opacity: 1 } }
      ]},
    { text: '立体図等',
      children: [
        { text: '岐阜県CS立体図', data: { id: 'r01', layer: gihuCsObj, opacity: 1 } },
        { text: '日本CS立体図', data: { id: 'r02', layer: nihonCsObj, opacity: 1 } }
      ]},
    { text: '今昔マップ',
      children: [
        { text: '福岡・北九州編',
          children: [
            { text: '1922-1926年', data: { id: 'kon_hu01', layer: kon_hukuoka01Arr, opacity: 1 } },
            // { text: '1936-1938年', data: { id: 'kon_hu02', layer: nihonCsArr, opacity: 1 } }
          ]}
      ]}
  ];
export default layers

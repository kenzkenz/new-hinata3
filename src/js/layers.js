import TileLayer from 'ol/layer/Tile.js'
import OSM from 'ol/source/OSM.js'
import XYZ from 'ol/source/XYZ.js'
import { transformExtent } from 'ol/proj.js'
import LayerGroup from 'ol/layer/Group';
import mw5 from './mw5'
import mw20 from './mw20'

const mapsStr = ['map01','map02','map03','map04'];
const transformE = extent => {
  return transformExtent(extent,'EPSG:4326','EPSG:3857');
};
// オープンストリートマップ------------------------------------------------------------------------
function Osm () {
  this.source = new OSM()
}
const osmObj = {};
for (let i of mapsStr) {
  osmObj[i] = new TileLayer(new Osm())
}
const osmSumm = 'OpenStreetMapは、道路地図などの地理情報データを誰でも利用できるよう、フリーの地理情報データを作成することを目的としたプロジェクトです。<a href=\'https://openstreetmap.jp\' target=\'_blank\'>OpenStreetMap</a>';
// 標準地図------------------------------------------------------------------------------------
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
const stdSumm = '国土地理院作成のタイルです。<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">リンク</a>';
// 淡色地図------------------------------------------------------------------------------------
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
const paleSumm = '国土地理院作成のタイルです。<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">リンク</a>';
// 白地図--------------------------------------------------------------------------------------
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
const blankSumm = '国土地理院作成のタイルです。<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">リンク</a>';
// 全国最新写真-------------------------------------------------------------------------------
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
const seamlessphotoSumm = '国土地理院作成のタイルです。<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">リンク</a>';
// 色別標高図---------------------------------------------------------------------------------
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
const reliefSumm = '国土地理院作成のタイルです。<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">リンク</a>';
// 宮崎県航空写真----------------------------------------------------------------------------
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
const miyazakiOrtSumm = '';
// 岐阜県CS立体図----------------------------------------------------------------------------
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
const gihuCsSumm = '';
// 日本CS立体図------------------------------------------------------------------------------
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
const nihonCsSumm = '';
// 迅速測図 (関東)----------------------------------------------------------------------------
function Jinsoku () {
  this.source = new XYZ({
    url: 'https://www.finds.jp/ws/tmc/1.0.0/Kanto_Rapid-900913-L/{z}/{x}/{y}.png',
    minZoom:1,
    maxZoom:17
  });
  this.extent = transformE([138.954453,34.86946,140.8793163,36.45969967])
}
const jinsokuObj = {};
for (let i of mapsStr) {
  jinsokuObj[i] = new TileLayer(new Jinsoku())
}
const jinsokuSumm = '<a href=\'http://www.finds.jp/tmc/layers.html.ja\' target=\'_blank\'>農研機構</a>';
// 今昔マップ-----------------------------------------------------------------------------------
// 福岡・北九州編------------------------------------------------------------------------------
function Kon_hukuoka01 () {
  this.source = new XYZ({
    url: 'https://sv53.wadax.ne.jp/~ktgis-net/kjmapw/kjtilemap/fukuoka/00/{z}/{x}/{-y}.png',
    minZoom: 1,
    maxZoom: 16
  });
  this.center = [130.6152588501701, 33.720855341479506];
  this.extent = transformE([130.12549,33.41993,131.1254516,34.003285])
}
const kon_hukuoka01Obj = {};
for (let i of mapsStr) {
  kon_hukuoka01Obj[i] = new TileLayer(new Kon_hukuoka01())
}
const kon_hukuoka01Summ = '';
// CS立体図10Mここから-----------------------------------------------------------------------
function Cs10m01 () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/cs/1/{z}/{x}/{-y}.png',
    minZoom:1,
    maxZoom:15
  });
  this.extent = transformE([128.4,32.5,129.530,34.7]);
}
function Cs10m02 () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/cs/2/{z}/{x}/{-y}.png',
    minZoom:1,
    maxZoom:15
  });
  this.extent = transformE([129.02,30.2,132.9,34]);
}
function Cs10m03 () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/cs/3/{z}/{x}/{-y}.png',
    minZoom:1,
    maxZoom:15
  });
  this.extent = transformE([129.99,33.33,133.7,36.6]);
}
function Cs10m04 () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/cs/4/{z}/{x}/{-y}.png',
    minZoom:1,
    maxZoom:15
  });
  this.extent = transformE([131.99,32.68,134.98,34.67]);
}
function Cs10m05 () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/cs/5/{z}/{x}/{-y}.png',
    minZoom:1,
    maxZoom:15
  });
  this.extent = transformE([132.99,34.00,135.48,35.8]);
}
function Cs10m06 () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/cs/6/{z}/{x}/{-y}.png',
    minZoom:1,
    maxZoom:15
  });
  this.extent = transformE([134.51,33.40,137.02,36.34]);
}
function Cs10m07 () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/cs/7/{z}/{x}/{-y}.png',
    minZoom:1,
    maxZoom:15
  });
  this.extent = transformE([135.99,34.00,137.90,37.66]);
}
function Cs10m08 () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/cs/8/{z}/{x}/{-y}.png',
    minZoom:1,
    maxZoom:15
  });
  this.extent = transformE([137.00,38.68,139.97,34.56]);
}
function Cs10m09 () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/cs/9/{z}/{x}/{-y}.png',
    minZoom:1,
    maxZoom:15
  });
  this.extent = transformE([138.05,38.00,140.99,32.43]);
}
function Cs10m10 () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/cs/10/{z}/{x}/{-y}.png',
    minZoom:1,
    maxZoom:15
  });
  this.extent = transformE([139.46,41.65,142.12,37.66]);
}
function Cs10m11 () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/cs/11/{z}/{x}/{-y}.png',
    minZoom:1,
    maxZoom:15
  });
  this.extent = transformE([139.00,43.35,141.19,41.33]);
}
function Cs10m12 () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/cs/12/{z}/{x}/{-y}.png',
    minZoom:1,
    maxZoom:15
  });
  this.extent = transformE([140.93,45.65,144.05,41.85]);
}
function Cs10m13 () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/cs/13/{z}/{x}/{-y}.png',
    minZoom:1,
    maxZoom:15
  });
  this.extent = transformE([143.95,44.35,145.95,42.70]);
}
function Cs10m15 () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/cs/15/{z}/{x}/{-y}.png',
    minZoom:1,
    maxZoom:15
  });
  this.extent = transformE([126.60,27.37,128.82,26.00]);
}
const cs10mObj = {};
for (let i of mapsStr) {
  cs10mObj[i] = new LayerGroup({
    layers: [
      new TileLayer(new Cs10m01()),
      new TileLayer(new Cs10m02()),
      new TileLayer(new Cs10m03()),
      new TileLayer(new Cs10m04()),
      new TileLayer(new Cs10m05()),
      new TileLayer(new Cs10m06()),
      new TileLayer(new Cs10m07()),
      new TileLayer(new Cs10m08()),
      new TileLayer(new Cs10m09()),
      new TileLayer(new Cs10m10()),
      new TileLayer(new Cs10m11()),
      new TileLayer(new Cs10m12()),
      new TileLayer(new Cs10m13()),
      new TileLayer(new Cs10m15())
      ]
  })
}
const cs10mSumm = '';
// CS立体図10Mここまで-----------------------------------------------------------------------
// 日本版mapwarper５万分の１ここから------------------------------------------------------
// 5万分の1,20万分の1の共用コンストラクタ
function Mapwarper (url,bbox) {
  this.source = new XYZ({
    url: url,
    minZoom: 1,
    maxZoom: 18
  });
  this.extent = transformE(bbox);
  // クリックしたとときにextentを操作するため元のextentを保存しておく。
  this.extent2 = transformE(bbox)
}
export const mw5Obj = {};
for (let i of mapsStr) {
  const layerGroup = [];
  const length =  mw5.length;
  for (let j = 0; j < length; j++) {
    const id = mw5[j].id;
    const url = 'https://mapwarper.h-gis.jp/maps/tile/' + id + '/{z}/{x}/{y}.png';
    const bbox = mw5[j].extent;
    const layer = new TileLayer(new Mapwarper(url,bbox));
    layerGroup.push(layer)
  }
  mw5Obj[i] = new LayerGroup({
    layers: layerGroup
  })
}
const mw5Summ = '';
// 日本版mapwarper５万分の１ここまで------------------------------------------------------
// 日本版mapwarper20万分の１ここから------------------------------------------------------
export const mw20Obj = {};
for (let i of mapsStr) {
  const layerGroup = [];
  const length =  mw20.length;
  for (let j = 0; j < length; j++) {
    const id = mw20[j].id;
    const url = 'https://mapwarper.h-gis.jp/maps/tile/' + id + '/{z}/{x}/{y}.png';
    const bbox = mw20[j].extent;
    const layer = new TileLayer(new Mapwarper(url,bbox));
    layerGroup.push(layer)
  }
  mw20Obj[i] = new LayerGroup({
    layers: layerGroup
  })
}
const mw20Summ = '';
// 日本版mapwarper20万分の１ここまで------------------------------------------------------

// ここにレイヤーを全部書く。クリックするとストアのlayerListに追加されていく-------------------------
const layers =
  [
    { text: 'OpenStreetMap', data: { id: 0, layer: osmObj, opacity: 1, summary: osmSumm } },
    { text: '国土地理院',
      children: [
        { text: '標準地図', data: { id: 1, layer: stdObj, opacity: 1, summary: stdSumm } },
        { text: '淡色地図', data: { id: 2, layer: paleObj, opacity: 1, summary: paleSumm } },
        { text: '白地図', data: { id: 3, layer: blankObj, opacity: 1, summary: blankSumm } },
        { text: '色別標高図', data: { id: 4, layer: reliefObj, opacity: 1, summary: reliefSumm } },
        { text: '全国最新写真', data: { id: 5, layer: seamlessphotoObj, opacity: 1, summary: seamlessphotoSumm } }
      ]},
    { text: '宮崎県',
      children: [
        { text: '宮崎県航空写真', data: { id: 6, layer: miyazakiOrtObj, opacity: 1, summary: miyazakiOrtSumm } }
      ]},
    { text: '立体図等',
      children: [
        { text: '日本CS立体図', data: { id: 'jcs', layer: nihonCsObj, opacity: 1, summary: nihonCsSumm } },
        { text: '全国CS立体図10m', data: { id: 'cs10', layer: cs10mObj, opacity: 1, summary: cs10mSumm } },
        { text: '岐阜県CS立体図', data: { id: 'gcs', layer: gihuCsObj, opacity: 1, summary: gihuCsSumm } }
      ]},
    { text: '古地図',
      children: [
        { text: '旧版地形図5万分の１', data: { id: 'mw5', layer: mw5Obj, opacity: 1, summary: mw5Summ } },
        { text: '旧版地形図20万分の１', data: { id: 'mw20', layer: mw20Obj, opacity: 1, summary: mw20Summ } },
        { text: '迅速測図 (関東)', data: { id: 'jinsoku', layer: jinsokuObj, opacity: 1, summary: jinsokuSumm } }
      ]},
    { text: '今昔マップ',
      children: [
        { text: '福岡・北九州編',
          children: [
            { text: '1922-1926年', data: { id: 'kon_hu01', layer: kon_hukuoka01Obj, opacity: 1, summary: kon_hukuoka01Summ } },
            // { text: '1936-1938年', data: { id: 'kon_hu02', layer: nihonCsArr, opacity: 1 } }
          ]}
      ]}
  ];
export const Layers = layers;


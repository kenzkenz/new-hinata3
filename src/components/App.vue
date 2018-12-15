最初に呼び出されるvueファイル。ここに他のvueファイルを取り込んでいく。
<template>
    <div id="map00">
        <transition>
            <div id="map01" :style="map01Size" v-show="map01Flg">


                <!--<div id="test">-->
                    <!--sssss-->
                <!--</div>-->

                <div class="top-left-div">
                    <b-button class='olbtn' :size="btnSize" @click="openDialog(arguments[0],menu01)"　style="margin-right:5px;"><v-icon name="bars"  scale="1.0" /></b-button>
                    <b-button class='olbtn' :size="btnSize" @click="splitMap"><v-icon name="columns"  scale="1.0" /></b-button>
                </div>
                <div class="top-right-div">
                    <b-button class='olbtn' :size="btnSize" @click="openDialog(arguments[0],opt01)">背景</b-button>
                </div>
                <G-Dialog :opt="opt01">
                    <div class="content-div" :style="map01DialogContentSize">
                        <div class="first-content-div">
                            <Layer :name="opt01.name"/>
                        </div>
                        <div class="second-content-div">
                            <LayerList :name="opt01.name" />
                        </div>
                    </div>
                </G-Dialog>
                <G-Dialog :opt="menu01">
                  <div :style="menuContentSize">
                      <b-button class='olbtn' :size="btnSize" @click="shortUrl">短縮URL作成</b-button>
                      <div class="shortUrl-div">{{ shortUrlText }}</div>
                  </div>
                </G-Dialog>
                <div class="zoom-div">{{ zoom01 }}</div>
            </div>
        </transition>
        <transition>
            <div id="map02" :style="map02Size" v-show="map02Flg">
                <div class="top-right-div">
                    <b-button class='olbtn' :size="btnSize" @click="openDialog(arguments[0],opt02)">背景</b-button>
                </div>
                <G-Dialog :opt="opt02">
                    <div class="content-div" :style="map02DialogContentSize">
                        <div class="first-content-div">
                            <Layer :name="opt02.name"/>
                        </div>
                        <div class="second-content-div">
                            <LayerList :name="opt02.name" />
                        </div>
                    </div>
                </G-Dialog>
                <div class="zoom-div">{{ zoom02 }}</div>
            </div>
        </transition>
        <transition>
            <div id="map03" :style="map03Size" v-show="map03Flg">
                <div class="top-right-div">
                    <b-button class='olbtn' :size="btnSize" @click="openDialog(arguments[0],opt03)">背景</b-button>
                </div>
                <G-Dialog :opt="opt03">
                    <div class="content-div" :style="map03DialogContentSize" >
                        <div class="first-content-div">
                            <Layer :name="opt03.name"/>
                        </div>
                        <div class="second-content-div">
                            <LayerList :name="opt03.name" />
                        </div>
                    </div>
                </G-Dialog>
                <div class="zoom-div">{{ zoom03 }}</div>
            </div>
        </transition>
        <transition>
            <div id="map04" :style="map04Size"  v-show="map04Flg">
                <div class="top-right-div">
                    <b-button class='olbtn' :size="btnSize" @click="openDialog(arguments[0],opt04)">背景</b-button>
                </div>
                <G-Dialog :opt="opt04">
                    <div class="content-div" :style="map04DialogContentSize">
                        <div class="first-content-div">
                            <Layer :name="opt04.name"/>
                        </div>
                        <div class="second-content-div">
                            <LayerList :name="opt04.name" />
                        </div>
                    </div>
                </G-Dialog>
                <div class="zoom-div">{{ zoom04 }}</div>
            </div>
        </transition>
        <transition>
            <div id="lock" v-show="synchDivFlg" @click="synch">
                <v-icon v-if="synchFlg" name="lock" scale="1.5" class="hover"/>
                <v-icon v-else name="lock-open" scale="1.5" class="hover"/>
            </div>
        </transition>
    </div>
</template>

<script>
import 'ol/ol.css'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import { transform, fromLonLat } from 'ol/proj.js'
import {defaults as defaultControls, ScaleLine} from 'ol/control.js';
import LayerList from './LayerList.vue'
import Layer from './Layer.vue'
import * as permalink from '../js/permalink'
import Target from 'ol-ext/control/Target'
import Inobounce from '../js/inobounce'
const center = fromLonLat([140.097, 37.856])
import Notification from '../js/notification'
// import OLCesium from 'olcs/OLCesium.js'
export default {
  name: 'MyMap',
  components: {
    LayerList,
    Layer
  },
  data () {
    return {
      btnSize: '',
      menuContentSize: {'height': '100px','margin': '10px', 'overflow': 'auto'},
      map01Size: {top: 0, left: 0, width: '100%', height: window.innerHeight + 'px'},
      map02Size: {top: 0, right: 0, width: 0, height: window.innerHeight + 'px'},
      map03Size: {top: 0, right: 0, width: '50%', height: window.innerHeight / 2 + 'px'},
      map04Size: {top: 0, right: 0, width: '50%', height: window.innerHeight / 2 + 'px'},
      map01DialogContentSize: {'max-height': '300px','overflow': 'auto'},
      map02DialogContentSize: {'max-height': '300px','overflow': 'auto'},
      map03DialogContentSize: {'max-height': '300px','overflow': 'auto'},
      map04DialogContentSize: {'max-height': '300px','overflow': 'auto'},
      zoom01: '',
      zoom02: '',
      zoom03: '',
      zoom04: '',
      menu01: {close: true, name: 'menu01', position: {top: '56px', left: '10px', 'z-index': 1}, dialog: {height: 'auto', 'min-width': '220px'}},
      opt01: {close: true, name: 'map01', position: {top: '56px', right: '210px',' z-index': 1}, dialog: {height: 'auto'}},
      opt02: {close: true, name: 'map02', position: {top: '56px', right: '210px', 'z-index': 1}, dialog: {height: 'auto'}},
      opt03: {close: true, name: 'map03', position: {top: '56px', right: '210px', 'z-index': 1}, dialog: {height: 'auto'}},
      opt04: {close: true, name: 'map04', position: {top: '56px', right: '210px', 'z-index': 1}, dialog: {height: 'auto'}},
      splitFlg: 1,
      map01Flg: true,
      map02Flg: false,
      map03Flg: false,
      map04Flg: false,
      synchDivFlg: false,
      synchFlg: true,
      shortUrlText: ''
    }
  },
  computed: {
  },
  methods: {
    // レイヤーのダイアログを開く
    openDialog (e,dialog) {
      this.$store.commit('incrDialogMaxZindex')
      const maxZindex = this.$store.state.dialogMaxZindex
      dialog.position["z-index"] = maxZindex
      this.$store.commit('editDialogArr', {name: dialog.name, flg: 'toggle'})
    },
    // 分割
    splitMap () {
      this.$store.commit('incrSplitFlg')
      this.splitMap2()
      permalink.moveEnd()
    },
    // 分割その２
    splitMap2 () {
      const vm = this
      const height = window.innerHeight + 'px'
      const height2 = window.innerHeight / 2 + 'px'
      const contentHeight =(window.innerHeight -100) + 'px'
      const contentHeight2 =((window.innerHeight/2) -100) + 'px'

      switch (this.$store.state.splitFlg) {
        // 1画面
        case 1:
          vm.synchDivFlg = false
          vm.map02Flg = false; vm.map03Flg = false; vm.map04Flg = false
          vm.map01Size = {top: 0, left: 0, width: '100%', height: height}
          vm.map02Size = {top: 0, right: 0, width: 0, height: 0}
          vm.map03Size = {top: 0, left: 0, width: 0, height: 0}
          vm.map04Size = {top: 0, left: 0, width: 0, height: 0}
          vm.map01DialogContentSize = {'max-height': contentHeight}
          break
        // 2画面（縦２画面）
        case 2:
          vm.synchDivFlg = true
          vm.map02Flg = true; vm.map03Flg = false; vm.map04Flg = false
          vm.map01Size = {top: 0, left: 0, width: '50%', height: height}
          vm.map02Size = {top: 0, left: '50%', width: '50%', height: height}
          vm.map03Size = {top: 0, left: 0, width: 0, height: 0}
          vm.map04Size = {top: 0, left: 0, width: 0, height: 0}
          vm.map01DialogContentSize = {'max-height': contentHeight}
          vm.map02DialogContentSize = {'max-height': contentHeight}
          break
        // 2画面（横２画面）
        case 3:
          vm.synchDivFlg = true
          vm.map02Flg = true; vm.map03Flg = false; vm.map04Flg = false
          vm.map01Size = {top: 0, left: 0, width: '100%', height: height2}
          vm.map02Size = {top: '50%', left: 0, width: '100%', height: height2}
          vm.map03Size = {top: 0, left: 0, width: 0, height: 0}
          vm.map04Size = {top: 0, left: 0, width: 0, height: 0}
          vm.map01DialogContentSize = {'max-height': contentHeight2}
          vm.map02DialogContentSize = {'max-height': contentHeight2}
          break
        // 3画面１（左が縦全、右が縦半）
        case 4:
          vm.synchDivFlg = true
          vm.map02Flg = true; vm.map03Flg = true; vm.map04Flg = false
          vm.map01Size = {top: 0, left: 0, width: '50%', height: height}
          vm.map02Size = {top: 0, left: '50%', width: '50%', height: height2}
          vm.map03Size = {top: '50%', left: '50%', width: '50%', height: height2}
          vm.map04Size = {top: 0, left: 0, width: 0, height: 0}
          vm.map01DialogContentSize = {'max-height': contentHeight}
          vm.map02DialogContentSize = {'max-height': contentHeight2}
          vm.map03DialogContentSize = {'max-height': contentHeight2}
          break
        // 3画面2（全て縦半）
        case 5:
          vm.synchDivFlg = true
          vm.map02Flg = true; vm.map03Flg = true; vm.map04Flg = false
          vm.map01Size = {top: 0, left: 0, width: '100%', height: height2}
          vm.map02Size = {top: '50%', left: 0, width: '50%', height: height2}
          vm.map03Size = {top: '50%', left: '50%', width: '50%', height: height2}
          vm.map04Size = {top: 0, left: 0, width: 0, height: 0}
          vm.map01DialogContentSize = {'max-height': contentHeight2}
          vm.map02DialogContentSize = {'max-height': contentHeight2}
          vm.map03DialogContentSize = {'max-height': contentHeight2}
          break
        // 4画面（全て縦半）
        case 6:
          vm.synchDivFlg = true
          vm.map02Flg = true; vm.map03Flg = true; vm.map04Flg = true
          vm.map01Size = {top: 0, left: 0, width: '50%', height: height2}
          vm.map02Size = {top: 0, right: 0, width: '50%', height: height2}
          vm.map03Size = {top: '50%', left: 0, width: '50%', height: height2}
          vm.map04Size = {top: '50%', left: '50%', width: '50%', height: height2}
          vm.map01DialogContentSize = {'max-height': contentHeight2}
          vm.map02DialogContentSize = {'max-height': contentHeight2}
          vm.map03DialogContentSize = {'max-height': contentHeight2}
          vm.map04DialogContentSize = {'max-height': contentHeight2}
      }
      this.$nextTick(function () {
        vm.$store.state.map01.updateSize()
        vm.$store.state.map02.updateSize()
        vm.$store.state.map03.updateSize()
        vm.$store.state.map04.updateSize()
      })
    },
    // 同期
    synch () {
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
    },
    shortUrl () {
      const vm = this
      const url = 'https://api-ssl.bitly.com/v3/shorten'
      const myToken = '032704dc9764ff62c36ef2aff9464eb50e89b4fe'
      // const target = 'https://kenzkenz.xsrv.jp/aaa/#8/140.1/37.86%3FS%3D1%26L%3D%5B%5B%7B%22id%22%3A1%2C%22o%22%3A1%7D%5D%2C%5B%7B%22id%22%3A2%2C%22o%22%3A1%7D%5D%2C%5B%7B%22id%22%3A4%2C%22o%22%3A1%7D%5D%2C%5B%7B%22id%22%3A5%2C%22o%22%3A1%7D%5D%5D'
      const target = window.location.href
      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        data: {
          "access_token":myToken,
          "longUrl":target
        }
      }).done(function (json) {
        vm.shortUrlText = json.data.url
      }).fail(function () {
        console.log("エラー")
      });
    }
  },
  mounted () {
    this.$nextTick(function () {
      // 縦バウンス無効化
      Inobounce()
      // map初期化
      initMap(this)
      // リサイズ
      const resize = () => {
        if (window.innerWidth < 700) {
          this.btnSize = 'sm'
        } else {
          this.btnSize = ''
        }
        this.splitMap2()
      }
      resize()
      window.onresize =  () => resize()
    })
  }
}
function initMap (vm) {
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
  // パーマリンク
  permalink.permalinkEventSet()
  // 画面分割
  vm.splitMap2()

  // const ol3d1 = new OLCesium({
  //   map:map01
  // });

// スクロールを無効にする
  $(window).on('touchmove.noScroll', function(e) {
    e.preventDefault();
  });
}
</script>

<style scoped>
    #test{
        width: 100px;
        height:100px;
        position: absolute;
        z-index: 9;
        background-color: red;

    }
    h1, h2 {
        font-weight: normal;
    }
    #map00{
        width: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
    }
    #map01{
        background-color: #fff;
        position: relative;
        z-index: 1000;
        border: #fff 1px solid;
    }
    #map02{
        background-color: #fff;
        position: absolute;
        border: #fff 1px solid;
    }
    #map03{
        background-color: white;
        position: absolute;
        border: #fff 1px solid;
    }
    #map04{
        background-color: white;
        position: absolute;
        border: #fff 1px solid;
    }
    .top-left-div{
        position: absolute;
        margin: 0;
        padding: 10px;
        top: 0;
        left: 0;
        z-index: 1;
    }
    .top-right-div{
        position: absolute;
        margin: 0;
        padding: 10px;
        top: 0;
        right: 0;
        z-index: 1;
    }
    .zoom-div{
        position: absolute;
        left: 10px;
        bottom: 10px;
        z-index: 1;
        color: #fff;
        text-shadow: black 1px 1px 0px, black -1px 1px 0px,
        black 1px -1px 0px, black -1px -1px 0px;
        font-size: x-large;
    }
    .content-div{
        overflow: auto;
    }
    .first-content-div{
        border: 1px solid grey;
        margin: 5px;
    }
    .second-content-div{
        border: 1px solid grey;
        margin: 5px;
        background: rgba(255,255,255,0.5);
    }
    #lock{
        position: absolute;
        top: calc(50% - 15px);
        left: calc(50% - 15px);;
        width:30px;
        height: 30px;
        border-radius: 30px;
        text-align: center;
        background-color: #fff;
        color: rgba(0,60,136,0.5);
        z-index: 10001;
    }
    .shortUrl-div{
        margin-top: 10px;
        padding: 5px;
        border: solid 1px gray;
    }
    #lock:hover{
        color: rgba(0,60,136,0.7);
    }
    .olbtn{
        background-color: rgba(0,60,136,0.5);
    }
    .btn-secondary:hover{
        background-color: rgba(0,60,136,0.7);
    }
    .v-enter-active, .v-leave-active {
        transition: opacity 3s;
    }
    .v-leave-active {
        transition: opacity 3s;
    }
    .v-enter, .v-leave-to  {
        opacity: 0;
    }
</style>
<style>
    .ol-scale-line{
        left: calc(50% - 50px);
    }
    /*汎用的なスタイルはここに*/
    .ol-zoom {
        bottom: 40px;
        top: auto;
    }
    body{
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    input[type=range] {
        height: 26px;
        -webkit-appearance: none;
        margin: 0 0;/*修正*/
        width: 100%;
        background-color: rgba(0,0,0,0);/*修正*/
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 0px 0px 0px #000000;
        background: #B6B6B6;
        border-radius: 6px;
        border: 1px solid #8A8A8A;
    }
    input[type=range]::-webkit-slider-thumb {
        box-shadow: 1px 1px 1px #828282;
        border: 1px solid #8A8A8A;
        height: 18px;
        width: 18px;
        border-radius: 18px;
        background: #DADADA;
        cursor: grab;
        -webkit-appearance: none;
        margin-top: -7.5px;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
        background: #B6B6B6;
    }
    input[type=range]::-moz-range-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 0px 0px 0px #000000;
        background: #B6B6B6;
        border-radius: 6px;
        border: 1px solid #8A8A8A;
    }
    input[type=range]::-moz-range-thumb {
        box-shadow: 1px 1px 1px #828282;
        border: 1px solid #8A8A8A;
        height: 18px;
        width: 18px;
        border-radius: 18px;
        background: #DADADA;
        cursor: grab;
    }
    input[type=range]::-ms-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animate: 0.2s;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    input[type=range]::-ms-fill-lower {
        background: #B6B6B6;
        border: 1px solid #8A8A8A;
        border-radius: 12px;
        box-shadow: 0px 0px 0px #000000;
    }
    input[type=range]::-ms-fill-upper {
        background: #B6B6B6;
        border: 1px solid #8A8A8A;
        border-radius: 12px;
        box-shadow: 0px 0px 0px #000000;
    }
    input[type=range]::-ms-thumb {
        margin-top: 1px;
        box-shadow: 1px 1px 1px #828282;
        border: 1px solid #8A8A8A;
        height: 18px;
        width: 18px;
        border-radius: 18px;
        background: #DADADA;
        cursor: grab;
    }
    input[type=range]:focus::-ms-fill-lower {
        background: #B6B6B6;
    }
    input[type=range]:focus::-ms-fill-upper {
        background: #B6B6B6;
    }
    /* */
    .ol-notification {
        width: 150%;
        bottom: 0;
        border: 0;
        background: none;
        margin: 0;
        padding: 0;
    }
    .ol-notification > div,
    .ol-notification > div:hover {
        position: absolute;
        background-color: rgba(0,0,0,.8);
        color: #fff;
        bottom: 0;
        left: 33.33%;
        max-width: calc(66% - 4em);
        min-width: 5em;
        max-height: 5em;
        min-height: 3em;
        border-radius: 4px 4px 0 0;
        padding: .2em .5em;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        -webkit-transition: .3s;
        transition: .3s;
        opacity: 1;
    }
    .ol-notification.ol-collapsed > div {
        bottom: -5em;
        opacity: 0;
    }

    .ol-notification a {
        color: #9cf;
        cursor: pointer;
    }


</style>

最初に呼び出されるvueファイル。ここに他のvueファイルを取り込んでいく。
<template>
    <div id="map00">
        <transition>
            <div id="map01" :style="map01Size" v-show="map01Flg">
                <div class="top-right-div">
                    <el-button type="info" size="medium" @click="splitMap">分割</el-button>
                    <el-button type="info" size="medium" @click="openDialog('map01Dialog')">背景</el-button>
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
                <div id="zoom-div">{{ zoom01 }}</div>
            </div>
        </transition>
        <transition>
            <div id="map02" :style="map02Size" v-show="map02Flg">
                <div class="top-right-div">
                    <el-button type="info" size="medium" @click="splitMap">分割</el-button>
                    <el-button type="info" size="medium" @click="openDialog('map02Dialog')">背景</el-button>
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
            </div>
        </transition>
        <transition>
            <div id="map03" :style="map03Size" v-show="map03Flg">
                <div class="top-right-div">
                    <el-button type="info" size="medium" @click="openDialog('map03Dialog')">背景</el-button>
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
            </div>
        </transition>
        <transition>
            <div id="map04" :style="map04Size"  v-show="map04Flg">
                <div class="top-right-div">
                    <el-button type="info" size="medium" @click="openDialog('map04Dialog')">背景</el-button>
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
import LayerList from './LayerList.vue'
import Layer from './Layer.vue'
import * as permalink from '../js/permalink'
import Target from 'ol-ext/control/Target'
const center = fromLonLat([140.097, 37.856])
export default {
  name: 'MyMap',
  components: {
    LayerList,
    Layer
  },
  data () {
    return {
      map01Size: {top: 0, left: 0, width: '100%', height: window.innerHeight + 'px'},
      map02Size: {top: 0, right: 0, width: 0, height: window.innerHeight + 'px'},
      map03Size: {top: 0, right: 0, width: '50%', height: window.innerHeight / 2 + 'px'},
      map04Size: {top: 0, right: 0, width: '50%', height: window.innerHeight / 2 + 'px'},
      map01DialogContentSize: {'max-height': '300px'},
      map02DialogContentSize: {'max-height': '300px'},
      map03DialogContentSize: {'max-height': '300px'},
      map04DialogContentSize: {'max-height': '300px'},
      zoom01: '99',
      opt01: {close: false, name: 'map01Dialog', position: {top: '56px', right: '210px'}, dialog: {height: 'auto'}},
      opt02: {close: false, name: 'map02Dialog', position: {top: '56px', right: '210px'}, dialog: {height: 'auto'}},
      opt03: {close: false, name: 'map03Dialog', position: {top: '56px', right: '210px'}, dialog: {height: 'auto'}},
      opt04: {close: false, name: 'map04Dialog', position: {top: '56px', right: '210px'}, dialog: {height: 'auto'}},
      splitFlg: 1,
      map01Flg: true,
      map02Flg: false,
      map03Flg: false,
      map04Flg: false,
      synchDivFlg: false,
      synchFlg: true
    }
  },
  computed: {

  },
  methods: {
    // レイヤーのダイアログを開く
    openDialog (dialog) { this.$store.commit('editDialogArr', {name: dialog, flg: 'toggle'}) },
    // 分割
    splitMap () {
      this.$store.commit('incrSplitFlg')
      this.splitMap2()
      permalink.moveEnd()
    },
    // 分割その２
    splitMap2 () {
      const height = window.innerHeight + 'px'
      const height2 = window.innerHeight / 2 + 'px'
      const contentHeight =(window.innerHeight -100) + 'px'
      const contentHeight2 =((window.innerHeight/2) -100) + 'px'
      const vm = this
      switch (this.$store.getters.splitFlg) {
        // 一画面
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
      let map01View = this.$store.getters.map01.getView()
      if (!this.synchFlg) {
        const viewArr = []
        for (let i = 0; i < 3; i++) {
          viewArr[i] = new View({
            center: map01View.getCenter(),
            zoom: map01View.getZoom()
          })
        }
        this.$store.getters.map02.setView(viewArr[0])
        this.$store.getters.map03.setView(viewArr[1])
        this.$store.getters.map04.setView(viewArr[2])
      } else {
        this.$store.getters.map02.setView(map01View)
        this.$store.getters.map03.setView(map01View)
        this.$store.getters.map04.setView(map01View)
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      initMap(this)
      // デバイスによって高さ設定が効かないときがあるようなので再度
      // this.map01Size = {width: '100%', height: window.innerHeight + 'px'}
      // this.map02Size = {width: '0', height: window.innerHeight + 'px'}
      // this.$store.state.map01.updateSize(); this.$store.state.map02.updateSize()
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
      vm.$store.getters.layerList('map01Dialog')[0].layer
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
  // map2-------------------------------------------------------------------------------------
  let map02 = null
  map02 = new Map({
    layers: [
      vm.$store.getters.layerList('map02Dialog')[0].layer
    ],
    target: 'map02',
    view: view01
  })
  vm.$store.commit('setMap02', map02)
  const target02 = new Target({composite: 'difference'})
  map02.addControl(target02);
  // map3-------------------------------------------------------------------------------------
  let map03 = null
  map03 = new Map({
    layers: [
      vm.$store.getters.layerList('map03Dialog')[0].layer
    ],
    target: 'map03',
    view: view01
  })
  vm.$store.commit('setMap03', map03)
  const target03 = new Target({composite: 'difference'})
  map03.addControl(target03);
  // map4-------------------------------------------------------------------------------------
  let map04 = null
  map04 = new Map({
    layers: [
      vm.$store.getters.layerList('map04Dialog')[0].layer
    ],
    target: 'map04',
    view: view01
  })
  vm.$store.commit('setMap04', map04)
  const target04 = new Target({composite: 'difference'})
  map04.addControl(target04);
  //--------------------------------------------------------------------------------------------
  // パーマリンク
  permalink.permalinkEventSet()
  // 画面分割
  vm.splitMap2()
}
</script>

<style scoped>
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
    .top-right-div{
        position: absolute;
        margin: 0;
        padding: 10px;
        top: 0;
        right: 0;
        z-index: 1;
    }
    #zoom-div{
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
        /*height: 150px;*/
        border: 1px solid grey;
        margin: 5px;
    }
    .second-content-div{
        /*height: 150px;*/
        border: 1px solid grey;
        margin: 5px;
        /*overflow: auto;*/
        background: whitesmoke;
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
        color: #606266;
        z-index: 10001;
    }
    #lock:hover{
        color: gainsboro;
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
    /*汎用的なスタイルはここに*/
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
</style>

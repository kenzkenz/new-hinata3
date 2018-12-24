最初に呼び出されるvueファイル。ここに他のvueファイルを取り込んでいく。
<template>
    <div id="map00">
        <!--map01--------------------------------------------------------------------------->
        <transition>
            <div id="map01" :style="map01Size" v-show="map01Flg">
                <div class="top-left-div">
                    <b-button class='olbtn' :size="btnSize" @click="openDialog(arguments[0],storeMenuDialog)" style="margin-right:5px;"><v-icon name="bars"  scale="1.0" /></b-button>
                    <b-button class='olbtn' :size="btnSize" @click="splitMap"><v-icon name="columns"  scale="1.0" /></b-button>
                </div>
                <div class="top-right-div">
                    <b-button class='olbtn' :size="btnSize" @click="openDialog(arguments[0],storeMap01Dialog)">背景</b-button>
                </div>
                <G-Dialog :dialogStyle="storeMap01Dialog">
                    <div class="content-div" :style="map01DialogContentSize">
                        <div class="first-content-div">
                            <Layer :name="storeMap01Dialog.name"/>
                        </div>
                        <div class="second-content-div">
                            <LayerList :name="storeMap01Dialog.name" />
                        </div>
                    </div>
                </G-Dialog>
                <G-Dialog :dialogStyle="storeMenuDialog">
                  <div :style="menuContentSize">
                      <div>
                          <b-button class='olbtn' :size="btnSize" @click="reset01">リセット</b-button>
                      </div>
                      <div>
                          <b-button class='olbtn' :size="btnSize" @click="shortUrl">短縮URL作成</b-button>
                          <div class="shortUrl-div">{{ shortUrlText }}</div>
                      </div>
                  </div>
                </G-Dialog>
                <G-Dialog :dialogStyle="this.$store.state.dialogs.map01info">
                    <div class="info-dialog  select-on">
                        <p>{{ this.$store.state.dialogs.map01info.text }}</p>
                        <hr>
                        <p v-html="this.$store.state.dialogs.map01info.summary"></p>
                    </div>
                </G-Dialog>
                <div class="zoom-div">{{ zoom.map01 }}</div>
            </div>
        </transition>
        <!--map02--------------------------------------------------------------------------->
        <transition>
            <div id="map02" :style="map02Size" v-show="map02Flg">
                <div class="top-right-div">
                    <b-button class='olbtn' :size="btnSize" @click="openDialog(arguments[0],storeMap02Dialog)">背景</b-button>
                </div>
                <G-Dialog :dialogStyle="storeMap02Dialog">
                    <div class="content-div" :style="map02DialogContentSize">
                        <div class="first-content-div">
                            <Layer :name="storeMap02Dialog.name"/>
                        </div>
                        <div class="second-content-div">
                            <LayerList :name="storeMap02Dialog.name" />
                        </div>
                    </div>
                </G-Dialog>
                <G-Dialog :dialogStyle="this.$store.state.dialogs.map02info">
                    <div class="info-dialog  select-on">
                        <p>{{ this.$store.state.dialogs.map02info.text }}</p>
                        <hr>
                        <p v-html="this.$store.state.dialogs.map02info.summary"></p>
                    </div>
                </G-Dialog>
                <div class="zoom-div">{{ zoom.map02 }}</div>
            </div>
        </transition>
        <!--map03--------------------------------------------------------------------------->
        <transition>
            <div id="map03" :style="map03Size" v-show="map03Flg">
                <div class="top-right-div">
                    <b-button class='olbtn' :size="btnSize" @click="openDialog(arguments[0],storeMap03Dialog)">背景</b-button>
                </div>
                <G-Dialog :dialogStyle="storeMap03Dialog">
                    <div class="content-div" :style="map03DialogContentSize" >
                        <div class="first-content-div">
                            <Layer :name="storeMap03Dialog.name"/>
                        </div>
                        <div class="second-content-div">
                            <LayerList :name="storeMap03Dialog.name" />
                        </div>
                    </div>
                </G-Dialog>
                <G-Dialog :dialogStyle="this.$store.state.dialogs.map03info">
                    <div class="info-dialog  select-on">
                        <p>{{ this.$store.state.dialogs.map03info.text }}</p>
                        <hr>
                        <p v-html="this.$store.state.dialogs.map03info.summary"></p>
                    </div>
                </G-Dialog>
                <div class="zoom-div">{{ zoom.map03 }}</div>
            </div>
        </transition>
        <!--map04--------------------------------------------------------------------------->
        <transition>
            <div id="map04" :style="map04Size"  v-show="map04Flg">
                <div class="top-right-div">
                    <b-button class='olbtn' :size="btnSize" @click="openDialog(arguments[0],storeMap04Dialog)">背景</b-button>
                </div>
                <G-Dialog :dialogStyle="storeMap04Dialog">
                    <div class="content-div" :style="map04DialogContentSize">
                        <div class="first-content-div">
                            <Layer :name="storeMap04Dialog.name"/>
                        </div>
                        <div class="second-content-div">
                            <LayerList :name="storeMap04Dialog.name" />
                        </div>
                    </div>
                </G-Dialog>
                <G-Dialog :dialogStyle="this.$store.state.dialogs.map04info">
                    <div class="info-dialog  select-on">
                        <p>{{ this.$store.state.dialogs.map04info.text }}</p>
                        <hr>
                        <p v-html="this.$store.state.dialogs.map04info.summary"></p>
                    </div>
                </G-Dialog>
                <div class="zoom-div">{{ zoom.map04 }}</div>
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
import LayerList from './LayerList.vue'
import Layer from './Layer.vue'
import * as Permalink from '../js/permalink'
import Inobounce from '../js/inobounce'
import * as MyMap from '../js/mymap'
export default {
  name: 'App',
  components: {
    LayerList,
    Layer
  },
  data () {
    return {
      btnSize: '',
      menuContentSize: {'height': '200px','margin': '10px', 'overflow': 'auto'},
      map01Size: {top: 0, left: 0, width: '100%', height: window.innerHeight + 'px'},
      map02Size: {top: 0, right: 0, width: 0, height: window.innerHeight + 'px'},
      map03Size: {top: 0, right: 0, width: '50%', height: window.innerHeight / 2 + 'px'},
      map04Size: {top: 0, right: 0, width: '50%', height: window.innerHeight / 2 + 'px'},
      map01DialogContentSize: {'max-height': '300px','overflow': 'auto'},
      map02DialogContentSize: {'max-height': '300px','overflow': 'auto'},
      map03DialogContentSize: {'max-height': '300px','overflow': 'auto'},
      map04DialogContentSize: {'max-height': '300px','overflow': 'auto'},
      zoom: {map01: '',map02: '',map03: '',map04: ''},
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
    storeMenuDialog () {return this.$store.state.dialogs.menuDialog},
    storeMap01Dialog () {return this.$store.state.dialogs.map01Dialog},
    storeMap02Dialog () {return this.$store.state.dialogs.map02Dialog},
    storeMap03Dialog () {return this.$store.state.dialogs.map03Dialog},
    storeMap04Dialog () {return this.$store.state.dialogs.map04Dialog}
  },
  methods: {
    // リセット
    reset01 () {
      alert('作成中！')
    },
    // レイヤーのダイアログを開く
    openDialog (e,dialog) {
      console.log(dialog);
      this.$store.commit('incrDialogMaxZindex');
      dialog.dialog["z-index"] = this.$store.state.dialogMaxZindex;
      this.$store.commit('editDialogArr', {name: dialog.name, flg: 'toggle'})
    },
    // 分割
    splitMap () {
      this.$store.commit('incrSplitFlg');
      this.splitMap2();
      Permalink.moveEnd()
    },
    // 分割その２
    splitMap2 () {
      const vm = this;
      const height = window.innerHeight + 'px';
      const height2 = window.innerHeight / 2 + 'px';
      const contentHeight =(window.innerHeight -100) + 'px';
      const contentHeight2 =((window.innerHeight/2) -100) + 'px';
      switch (this.$store.state.splitFlg) {
        // 1画面
        case 1:
          vm.synchDivFlg = false;
          vm.map02Flg = false; vm.map03Flg = false; vm.map04Flg = false;
          vm.map01Size = {top: 0, left: 0, width: '100%', height: height};
          vm.map02Size = {top: 0, right: 0, width: 0, height: 0};
          vm.map03Size = {top: 0, left: 0, width: 0, height: 0};
          vm.map04Size = {top: 0, left: 0, width: 0, height: 0};
          vm.map01DialogContentSize = {'max-height': contentHeight};
          break;
        // 2画面（縦２画面）
        case 2:
          vm.synchDivFlg = true;
          vm.map02Flg = true; vm.map03Flg = false; vm.map04Flg = false;
          vm.map01Size = {top: 0, left: 0, width: '50%', height: height};
          vm.map02Size = {top: 0, left: '50%', width: '50%', height: height};
          vm.map03Size = {top: 0, left: 0, width: 0, height: 0};
          vm.map04Size = {top: 0, left: 0, width: 0, height: 0};
          vm.map01DialogContentSize = {'max-height': contentHeight};
          vm.map02DialogContentSize = {'max-height': contentHeight};
          break;
        // 2画面（横２画面）
        case 3:
          vm.synchDivFlg = true;
          vm.map02Flg = true; vm.map03Flg = false; vm.map04Flg = false;
          vm.map01Size = {top: 0, left: 0, width: '100%', height: height2};
          vm.map02Size = {top: '50%', left: 0, width: '100%', height: height2};
          vm.map03Size = {top: 0, left: 0, width: 0, height: 0};
          vm.map04Size = {top: 0, left: 0, width: 0, height: 0};
          vm.map01DialogContentSize = {'max-height': contentHeight2};
          vm.map02DialogContentSize = {'max-height': contentHeight2};
          break;
        // 3画面１（左が縦全、右が縦半）
        case 4:
          vm.synchDivFlg = true;
          vm.map02Flg = true; vm.map03Flg = true; vm.map04Flg = false;
          vm.map01Size = {top: 0, left: 0, width: '50%', height: height};
          vm.map02Size = {top: 0, left: '50%', width: '50%', height: height2};
          vm.map03Size = {top: '50%', left: '50%', width: '50%', height: height2};
          vm.map04Size = {top: 0, left: 0, width: 0, height: 0};
          vm.map01DialogContentSize = {'max-height': contentHeight};
          vm.map02DialogContentSize = {'max-height': contentHeight2};
          vm.map03DialogContentSize = {'max-height': contentHeight2};
          break;
        // 3画面2（全て縦半）
        case 5:
          vm.synchDivFlg = true;
          vm.map02Flg = true; vm.map03Flg = true; vm.map04Flg = false;
          vm.map01Size = {top: 0, left: 0, width: '100%', height: height2};
          vm.map02Size = {top: '50%', left: 0, width: '50%', height: height2};
          vm.map03Size = {top: '50%', left: '50%', width: '50%', height: height2};
          vm.map04Size = {top: 0, left: 0, width: 0, height: 0};
          vm.map01DialogContentSize = {'max-height': contentHeight2};
          vm.map02DialogContentSize = {'max-height': contentHeight2};
          vm.map03DialogContentSize = {'max-height': contentHeight2};
          break;
        // 4画面（全て縦半）
        case 6:
          vm.synchDivFlg = true;
          vm.map02Flg = true; vm.map03Flg = true; vm.map04Flg = true;
          vm.map01Size = {top: 0, left: 0, width: '50%', height: height2};
          vm.map02Size = {top: 0, right: 0, width: '50%', height: height2};
          vm.map03Size = {top: '50%', left: 0, width: '50%', height: height2};
          vm.map04Size = {top: '50%', left: '50%', width: '50%', height: height2};
          vm.map01DialogContentSize = {'max-height': contentHeight2};
          vm.map02DialogContentSize = {'max-height': contentHeight2};
          vm.map03DialogContentSize = {'max-height': contentHeight2};
          vm.map04DialogContentSize = {'max-height': contentHeight2}
      }
      this.$nextTick(function () {
        MyMap.resize ()
      })
    },
    // 同期
    synch () {
      MyMap.synch(this)
    },
    shortUrl () {
      const vm = this;
      const url = 'https://api-ssl.bitly.com/v3/shorten';
      const myToken = '032704dc9764ff62c36ef2aff9464eb50e89b4fe';
      // const target = 'https://kenzkenz.xsrv.jp/aaa/#8/140.1/37.86%3FS%3D1%26L%3D%5B%5B%7B%22id%22%3A1%2C%22o%22%3A1%7D%5D%2C%5B%7B%22id%22%3A2%2C%22o%22%3A1%7D%5D%2C%5B%7B%22id%22%3A4%2C%22o%22%3A1%7D%5D%2C%5B%7B%22id%22%3A5%2C%22o%22%3A1%7D%5D%5D'
      const target = window.location.href;
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
      $(".ol-scale-line").mousedown(function(event){
        const target = $(this);
        target.addClass("drag");
        const eX = event.pageX - target.css("left").replace(/px/,"");
        const eY = event.pageY - target.css("top").replace(/px/,"");
        $(document).mousemove(function(event){
          target.find('.drag').css("left",event.pageX - eX).css("top",event.pageY - eY);
        });
        $(document).mouseup(function(){
          target.unbind("mousemove");
          target.removeClass("drag");
        });
      });

      /*
      $(".handle").mousedown(function(event){
        const parent = $(this).parent();
        parent.addClass("drag");
        const eX = event.pageX - parent.css("left").replace(/px/,"");
        const eY = event.pageY - parent.css("top").replace(/px/,"");
        $(document).mousemove(function(event){
          $(this).parent('.drag').css("left",event.pageX - eX).css("top",event.pageY - eY);
        });
        $(document).mouseup(function(event){
          $("div.drag").unbind("mousemove");
          $("div.drag").removeClass("drag");
        });
      });
      */

      // 縦バウンス無効化https://github.com/lazd/iNoBounce
      Inobounce();
      // map初期化
      MyMap.initMap(this);
      // パーマリンク
      Permalink.permalinkEventSet();
      this.splitMap2();
      // リサイズ
      const resize = () => {
        if (window.innerWidth < 700) {
          this.btnSize = 'sm'
        } else {
          this.btnSize = ''
        }
        // 画面分割
        this.splitMap2()
      };
      resize();
      window.onresize =  () => resize()
    })
  }
}
</script>

<style scoped>
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
        text-shadow: black 1px 1px 0, black -1px 1px 0,
        black 1px -1px 0, black -1px -1px 0;
        font-size: x-large;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .select-on{
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
    }
    .info-dialog{
        margin: 0;
        padding: 10px;
        min-height: 100px;
        width: 200px;
    }
    /*重要！！バウンスを止めたときに同時にスクロールを無効化させないために必要*/
    .content-div{
        overflow: auto;
        -webkit-overflow-scrolling: touch;
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
        height: 36px;
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
    /*汎用的なスタイルはここに*/
    body{
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    h1, h2 {
        font-weight: normal;
    }
    p {
        margin: 0!important;
        padding: 0!important;
    }
    hr {
        margin-top: 0.5em!important;
        margin-bottom: 0.5em!important;
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
        box-shadow: 0 0 0 #000000;
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
        box-shadow: 0 0 0 #000000;
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
        box-shadow: 0 0 0 #000000;
    }
    input[type=range]::-ms-fill-upper {
        background: #B6B6B6;
        border: 1px solid #8A8A8A;
        border-radius: 12px;
        box-shadow: 0 0 0 #000000;
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
<style>
    /*ol関係のスタイル*/
    .ol-rotate {
        right: 49%;
        top: 20px;
    }
    .ol-scale-line{
        left: calc(50% - 50px);
        height: 22px;
        cursor: grab;
    }
    .ol-zoom {
        bottom: 40px;
        top: auto;
    }
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

選択されたリストを表示するvueファイル。親から取得したvalで右画面用、左画面用に分岐する。
<template>
    <draggable element="ul"
               :options="{handle:'.handle-div',animation: 200}"
               @start="listDragBegin" @end="listDragEnd" v-model="storeLayerList">
        <li v-for="item in storeLayerList" :key="item.id">
            <div class="list-div">
                <div class="handle-div" >
                    <v-icon name="align-justify" class="hover-white handle-icon"/>
                </div>
                <div class="item-div">
                    {{ item.name }}
                </div>
                <div class="range-div">
                    <input type="range" min="0" max="1" step="0.01" class="range" v-model.number="item.opacity" @input="opacityChange(item)">
                </div>
                <div class="button-div">
                    <div @click="removeLayer(item)">
                        <v-icon name="times" scale="1.0" class="hover"/>
                    </div>
                </div>
            </div>
        </li>
        <vue-snotify></vue-snotify>
    </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import * as permalink from '../js/permalink'
import { transform } from 'ol/proj.js'
export default {
  name: 'Layer',
  props: ['name'],
  components: {
    draggable
  },
  data () {
    return {
      list: this.storeLayerList
    }
  },
  methods: {
    listDragBegin () {
    },
    listDragEnd () {
    },
    opacityChange (item) {
      item.layer.setOpacity(item.opacity)
      permalink.moveEnd()
    },
    removeLayer (item) {
      const result = this.storeLayerList.filter((el) => el.id !== item.id)
      this.$store.commit('updateList', {value: result, name: this.name})
      // 削除するレイヤーの透過度を１００に戻す。再度追加するときのために
      item.layer.setOpacity(1)
      switch (this.name) {
        case 'map01':
          this.map01.removeLayer(item.layer)
          break
        case 'map02':
          this.map02.removeLayer(item.layer)
          break
        case 'map03':
          this.map03.removeLayer(item.layer)
          break
        case 'map04':
          this.map04.removeLayer(item.layer)
          break
      }
    }
  },
  computed: {
    storeLayerList: {
      get () { return this.$store.getters.layerList(this.name) },
      set (value) { this.$store.commit('updateList', {value: value, name: this.name}) }
    },
    // watch用にlengthのあるオブジェクト
    storeLayerListWatch: {
      get () { return {value: this.$store.getters.layerList(this.name), length:this.$store.getters.layerList(this.name).length} },
    },
    storeNotification: {
      get () { return this.$store.state.notification },
      set (value) { this.$store.commit('updateNotification', value) }
    }
  },
  watch: {
    // ストアを監視。レイヤーを追加したとき・順番を変えたときに動く
    storeLayerListWatch : function (newLayerList,oldLayerList) {
      let map
      const thisName = this.name
      const store = this.$store
      map = store.state.maps[thisName]
      if (map) {
        // 逆ループ
        for (let i = newLayerList.value.length - 1; i >= 0; i--) {
          // リストクリックによる追加したレイヤーで リストの先頭で リストの増加があったとき
          if (newLayerList.value[i].addFlg) {
            if (i === 0 ) {
              if (newLayerList.length > oldLayerList.length) {
                const oldCenter = map.getView().getCenter()
                const center = newLayerList.value[i].layer.getProperties().center
                if (center) {
                  map.getView().setCenter(transform(center,"EPSG:4326","EPSG:3857"))
                  const div = $('<div>').text('元の位置に戻しますか？ ');

                  $('<a>').text('戻す')
                  .click(function() {
                    map.getView().setCenter(oldCenter)
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
          map.removeLayer(newLayerList.value[i].layer)
          map.addLayer(newLayerList.value[i].layer)
          newLayerList.value[i].layer.setOpacity(newLayerList.value[i].opacity)
        }
      }
      permalink.moveEnd()
    },
    //
    storeNotification: function (newValue) {
      if (newValue === 'cyouhuku') {
        this.$store.commit('updateNotification', '')
        this.$snotify.simple('すでに選択されています。', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          position: 'centerTop'
        })
      }
    }
  }
}
</script>

<style scoped>
    ul{
        padding: 0;
        margin: 0;
        position: relative;
    }
    ul li {
        color: black;
        border-bottom: solid 1px gainsboro;
        background: rgba(255,255,255,0.5);
        padding-top: 0;
        list-style-type: none!important;
        text-align: left;
        height: 39px;
    }
    .handle-div{
        position: absolute;
        height: 100%;
        background-color: rgba(0,60,136,0.5);
        cursor: grab;
    }
    .handle-icon{
        margin: 10px 5px 0 5px;
    }
    .list-div{
        position: relative;
        height: 100%;
    }
    .item-div{
        position: absolute;
        left: 30px;
        top: 3px;
    }
    .range-div{
        position: absolute;
        top:16px;
        left:30px;
        width:calc(100% - 60px);
    }
    .button-div{
        position: absolute;
        top:10px;
        right:0;
        width:15px;
        cursor: pointer;
    }
    .hover:hover{
        color: blue;
    }
    .hover-white:hover{
        color: white;
    }
    .el-notification__content{
        display: block;
    }
</style>
<style>
    /*非scopedでないと反映しなかったため*/
    .snotifyToast__inner{
        min-height: 50px;
    }
</style>

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
                    <input type="range" class="range" v-model.number="item.opacity" @input="opacityChange(item)">
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
export default {
  name: 'Layer',
  props: ['name'],
  components: {
    draggable
  },
  data () {
    return {
      dialogWidth: '200px',
      dialogHeight: '200px',
      list: this.storeLayerList
    }
  },
  methods: {
    listDragBegin () {
    },
    listDragEnd () {
    },
    opacityChange (item) {
      item.layer.setOpacity(item.opacity / 100)
      permalink.moveEnd()
    },
    removeLayer (item) {
      const result = this.storeLayerList.filter((el) => el.id !== item.id)
      this.$store.commit('updateList', {value: result, name: this.name})
      // 削除するレイヤーの透過度を１００に戻す。再度追加するときのために
      item.layer.setOpacity(100)
      switch (this.name) {
        case 'map01Dialog':
          this.map01.removeLayer(item.layer)
          break
        case 'map02Dialog':
          this.map02.removeLayer(item.layer)
          break
        case 'map03Dialog':
          this.map03.removeLayer(item.layer)
          break
        case 'map04Dialog':
          this.map04.removeLayer(item.layer)
          break
      }
    }
  },
  computed: {
    map01 () { return this.$store.getters.map01 },
    map02 () { return this.$store.getters.map02 },
    map03 () { return this.$store.getters.map03 },
    map04 () { return this.$store.getters.map04 },
    storeLayerList: {
      get () { return this.$store.getters.layerList(this.name) },
      set (value) { this.$store.commit('updateList', {value: value, name: this.name}) }
    },
    storeNotification: {
      get () { return this.$store.getters.notification },
      set (value) { this.$store.commit('updateNotification', value) }
    }
  },
  watch: {
    // ストアを監視。レイヤーを追加したとき・順番を変えたときに動く
    storeLayerList: function (newLayerList) {
      let map
      switch (this.name) {
        case 'map01Dialog':
          map = this.map01
          break
        case 'map02Dialog':
          map = this.map02
          break
        case 'map03Dialog':
          map = this.map03
          break
        case 'map04Dialog':
          map = this.map04
          break
      }
      if (map) {
        for (let i = newLayerList.length - 1; i >= 0; i--) {
          map.removeLayer(newLayerList[i].layer)
          map.addLayer(newLayerList[i].layer)
          newLayerList[i].layer.setOpacity(newLayerList[i].opacity / 100)
        }
      }
      permalink.moveEnd()
    },
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
        background: whitesmoke;
        padding-top: 0;
        list-style-type: none!important;
        text-align: left;
        height: 39px;
    }
    .handle-div{
        position: absolute;
        height: 100%;
        background-color: gray;
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

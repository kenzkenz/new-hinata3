選択されたリストを表示するvueファイル。親から取得したvalで右画面用、左画面用に分岐する。
<template>
    <draggable element="ul" :options="{handle:'.handle-div',animation: 200}" v-model="storeLayerList">
        <li v-for="item in storeLayerList" :key="item.id">
            <div class="list-div">
                <div class="handle-div" >
                    <v-icon name="align-justify" class="hover-white handle-icon"/>
                </div>
                <div class="item-div">
                    {{ item.name }}
                </div>
                <div class="range-div">
                    <input type="range" min="0" max="1" step="0.01" class="range" v-model.number="item.opacity" @input="opacityChange(item)" />
                </div>
                <div class="info-div" @click="info">
                    <v-icon name="info-circle" scale="1.0" class="hover"/>
                </div>

                <div class="close-div" @click="removeLayer(item)">
                    <v-icon name="times" scale="1.0" class="hover"/>
                </div>
            </div>
        </li>
        <vue-snotify></vue-snotify>
    </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import * as permalink from '../js/permalink'
import * as MyMap from '../js/mymap'
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
    opacityChange (item) {
      MyMap.opacityChange(item);
      permalink.moveEnd()
    },
    removeLayer (item) {
      MyMap.removeLayer(item, this.storeLayerList, this.name)
    },
    info () {
      alert('作成中')
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
      const map = this.$store.state.maps[this.name];
      if (map) MyMap.watchLayer(map, this.name, newLayerList,oldLayerList);
      permalink.moveEnd()
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
        -webkit-user-select: none;  /* Chrome all / Safari all */
        -moz-user-select: none;     /* Firefox all */
        -ms-user-select: none;      /* IE 10+ */
        user-select: none;
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
        left: 45px;
        top: 3px;
    }
    .range-div{
        position: absolute;
        top:16px;
        left:30px;
        width:calc(100% - 60px);
    }
    .info-div{
        position: absolute;
        top:2px;
        left:28px;
        width:15px;
        cursor: pointer;
        color:rgba(0,60,136,0.5);
    }
    .close-div{
        position: absolute;
        top:13px;
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

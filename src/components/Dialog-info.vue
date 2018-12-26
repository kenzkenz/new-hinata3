<template>
    <div>
        <div class="dialog-info-div" v-for="item in info" :key="item.id" :style="item.style" @mousedown="dialogMouseDown(item)">
            <div class="drag-handle" v-my-drag-handle></div>
            <div class="close-btn-div" @click="close(item)"><v-icon name="times" scale="1.5" class="hover"/></div>
            <!--なにもないとき。普通のラスターのとき-->
            <div v-if="!item.compoName">
                <div class="info-content-div">
                    <p v-html="item.name"></p>
                    <hr>
                    <p v-html="item.summary"></p>
                </div>
            </div>
            <!--海面上昇シミュレーション-->
            <div v-else-if="item.compoName === 'flood'">
                <div class="info-content-div">
                    <p v-html="item.name"></p>
                    <hr>
                    <p v-html="item.summary"></p>
                    <hr>
                    <div class="range-div"><input type="range" min="0" max="100" step="1" class="flood-range" v-model.number="seaLevel" @input="flood" /></div>
                    海抜{{ seaLevel }}メートル
                </div>
            </div>

        </div>
    </div>
</template>

<script>
  import * as Layers from '../js/layers'
  export default {
    name: "Dialog-info",
    props: ['name'],
    data () {
      return {
        seaLevel: 0
      }
    },
    computed: {
      info () {
        console.log(this.$store.state.dialogsInfo[this.name]);
        return this.$store.state.dialogsInfo[this.name]
      }
    },
    methods: {
      close (item) {
        const result = this.$store.state.dialogsInfo[this.name] .find(el => el.id === item.id);
        result.style.display = 'none'
      },
      dialogMouseDown (item) {
        const result = this.$store.state.dialogsInfo[this.name] .find(el => el.id === item.id);
        this.$store.commit('incrDialogMaxZindex');
        result.style["z-index"] = this.$store.state.dialogMaxZindex
      },
      // 海面上昇シミュレーション
      flood () {
        Layers.flood5Obj['map01'].getSource().changed();
        Layers.flood5Obj['map02'].getSource().changed();
        Layers.flood5Obj['map03'].getSource().changed();
        Layers.flood5Obj['map04'].getSource().changed();
      }
    },
    mounted () {
      // this.seaLevel = 50
    }
  }
</script>

<style scoped>
    .dialog-info-div{
        position: absolute;
        z-index: 10;
        background-color: #fff;
        box-shadow:2px 2px 5px #787878;
        border: 1px solid whitesmoke;
        border-radius: 4px;
        transition: opacity 1s;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .drag-handle{
        height: 30px;
        padding: 5px;
        background-color: rgba(0,60,136,0.5);
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        cursor: grab;
        /*width: 50px;*/
    }
    .close-btn-div{
        position: absolute;
        top: 3px;
        right: 5px;
        cursor: pointer;
        color: #fff;
        z-index: 2;
    }
    .info-content-div{
        padding: 10px;
        width:200px;
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
</style>

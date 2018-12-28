<template>
    <div>
        <div class="v-dialog-info-div" v-for="item in info" :key="item.id" :style="item.style" @mousedown="dialogMouseDown(item)">
            <div class="drag-handle" v-my-drag-handle></div>
            <div class="close-btn-div" @click="close(item)"><v-icon name="times" scale="1.5" class="hover"/></div>
            <!--なにもないとき。普通のラスターのとき-->
            <div v-if="!item.compoName">
                <div class="info-content-div">
                    <p v-html="item.title"></p><hr>
                    <p v-html="item.summary"></p>
                </div>
            </div>
            <!--海面上昇シミュレーション5m-->
            <div v-else-if="item.compoName === 'flood5m'">
                <div class="info-content-div">
                    <p v-html="item.title"></p><hr>
                    <p v-html="item.summary"></p><hr>
                    <b-form-radio-group v-model="selected5m" :options="options" name="flood5m" @change="floodChange5m"/>
                    <input type="range" min="0" :max="floodMax5m" step="1" class="flood-range5m" v-model.number="seaLevel5m" @input="flood" />
                    <div style="text-align: center;">海抜{{ seaLevel5m }}メートル</div>
                </div>
            </div>
            <!--海面上昇シミュレーション10m-->
            <div v-else-if="item.compoName === 'flood10m'">
                <div class="info-content-div">
                    <p v-html="item.title"></p><hr>
                    <p v-html="item.summary"></p><hr>
                    <b-form-radio-group v-model="selected10m" :options="options" name="flood10m" @change="floodChange10m"/>
                    <input type="range" min="0" :max="floodMax10m" step="1" class="flood-range10m" v-model.number="seaLevel10m" @input="flood" />
                    <div style="text-align: center;">海抜{{ seaLevel10m }}メートル</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import * as Layers from '../js/layers'
  export default {
    name: "v-dialog-info",
    props: ['name'],
    data () {
      return {
        seaLevel5m: 0,
        seaLevel10m: 0,
        selected5m: '100',
        selected10m: '100',
        options: [
          { text: 'max 100m', value: '100' },
          { text: 'max 500m', value: '500' },
          { text: 'max 1000m', value: '1000' },
          { text: 'max 4000m', value: '4000' }
        ],
        floodMax5m: '100',
        floodMax10m: '100'
      }
    },
    computed: {
      info () {
        // console.log(this.$store.state.dialogsInfo);
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
        Layers.flood10Obj['map01'].getSource().changed();
        Layers.flood10Obj['map02'].getSource().changed();
        Layers.flood10Obj['map03'].getSource().changed();
        Layers.flood10Obj['map04'].getSource().changed();
      },
      floodChange5m () {
        this.$nextTick(function () {
          this.floodMax5m = this.selected5m
        })
      },
      floodChange10m () {
        this.$nextTick(function () {
          this.floodMax10m = this.selected10m
        })
      }
    },
    mounted () {
      // this.seaLevel = 50
    }
  }
</script>

<style scoped>
    .form-group {
        margin-bottom: 0;
    }
    .v-dialog-info-div{
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

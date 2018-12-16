ダイアログ作成用の汎用vueファイル。グローバルで宣言。親からoptを取得して位置、スタイル等を設定する。
<template>
    <transition>
        <div class="dialog-parent-div" :style="this.opt.position" @mousedown="dialogMouseDown" @mouseenter="dialogEnter" @mouseleave="dialogLeave">
            <vue-draggable-resizable  :draggable="true" :class="{'dialog-div-enter': isEnter, 'dialog-div': !isEnter}" v-show="!this.storeFlg" :resizable="true" :parent="false"  drag-handle=".drag-handle" :style="this.opt.dialog" :handles="['ml','mr']">
                <div>
                    <div class="drag-handle"></div>
                    <div class="close-btn-div" @click="closeBtn">
                        <v-icon name="times" scale="1.5" class="hover"/>
                    </div>
                    <slot></slot>
                </div>
            </vue-draggable-resizable>
        </div>
    </transition>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
export default {
  name: 'Dialog',
  props: ['opt'],
  components: {
    VueDraggableResizable
  },
  data () {
    return {
      isEnter: false
    }
  },
  methods: {
    closeBtn () {
      this.$store.commit('editDialogArr', {name: this.opt.name, flg: true})
    },
    dialogMouseDown (e) {
      this.$store.commit('incrDialogMaxZindex')
      const maxZindex = this.$store.state.dialogMaxZindex
      this.opt.position["z-index"] = maxZindex
    },
    dialogEnter () {
      this.isEnter = true
    },
    dialogLeave () {
      this.isEnter = false
    }
  },
  computed: {
    storeDialogArr: {
      get () { return this.$store.state.dialogArr },
      set (value) { this.$store.commit('pushDialogArr', value) }
    },
    storeFlg: function () {
      const result = this.storeDialogArr.find(el => el.name === this.opt.name)
      return result.flg
    }
  },
  created () {
    // ダイアログクリエイト時に開閉のフラグをストアに設定する。
    this.$store.commit('pushDialogArr', {name: this.opt.name, flg: this.opt.close})
  },
  mounted () {
    this.$nextTick(function () {
    })
  }
}
</script>

<style scoped>
    .dialog-parent-div{
        height: 100%;
        width: 0;
        position: absolute;
    }
    .dialog-div{
        background-color: rgba(255,255,255,0.1);
        /*border: 1px solid black;*/
        box-shadow:2px 2px 5px #787878;
        border-radius: 4px;
    }
    .dialog-div-enter{
        background-color: #fff;
        /*border: 1px solid black;*/
        box-shadow:2px 2px 5px #787878;
        border-radius: 4px;
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
        z-index: 2;
    }
    .hover:hover{
        color: blue;
    }
    .hover-white:hover{
        color: white;
    }
    /* 1秒かけて透明度を遷移 */
    .v-enter-active, .v-leave-active {
        transition: opacity 1s;
    }
    /* 見えなくなるときの透明度 */
    .v-enter, .v-leave-to {
        opacity: 0;
    }
</style>

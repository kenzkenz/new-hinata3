ダイアログ作成用の汎用vueファイル。グローバルで宣言。親からoptを取得して位置、スタイル等を設定する。
<template>
    <transition>
        <div class="dialog-parent-div" :style="this.opt.position">
            <vue-draggable-resizable  class="dialog-div" v-show="!this.storeFlg" :resizable="true" :parent="false" drag-handle=".drag-handle" :style="this.opt.dialog" :handles="['ml','mr']">
                <div class="drag-handle"></div>
                <div class="close-btn-div" @click="closeBtn">
                    <v-icon name="times" scale="1.5" class="hover"/>
                </div>
                <slot></slot>
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
  methods: {
    closeBtn () {
      this.$store.commit('editDialogArr', {name: this.opt.name, flg: true})
    }
  },
  computed: {
    storeDialogArr: {
      get () { return this.$store.getters.dialogArr },
      set (value) { this.$store.commit('pushDialogArr', value) }
    },
    storeFlg: function () {
      const result = this.storeDialogArr.find(el => el.name === this.opt.name)
      return result.flg
    }
  },
  created () {
    this.$store.commit('pushDialogArr', {name: this.opt.name, flg: this.opt.close})
  }
}
</script>

<style scoped>
    .dialog-parent-div{
        height: 1px;
        width: 1px;
        position: absolute;
        top: 55px;
        right: 210px;
        /*left: 230px;*/
        z-index: 1;
    }
    .dialog-div{
        background-color: #fff;
        /*border: 1px solid black;*/
        box-shadow:2px 2px 5px #787878;
        border-radius: 4px;
    }
    .drag-handle{
        height: 20px;
        padding: 5px;
        background-color: #CCC;
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

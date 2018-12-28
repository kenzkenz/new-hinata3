<template>
    <div  v-show="!this.s_flg" class="dialog-div" :style="this.dialogStyle.dialog" @mousedown="dialogMouseDown">
        <div class="drag-handle" v-my-drag-handle></div>
            <div>
                <div class="close-btn-div" @click="closeBtn"><v-icon name="times" scale="1.5" class="hover"/></div>
                <slot></slot>
            </div>
    </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: ['dialogStyle'],
  methods: {
    closeBtn () {
      this.$store.commit('editDialogArr', {name: this.dialogStyle.name, flg: true})
    },
    dialogMouseDown () {
      this.$store.commit('incrDialogMaxZindex');
      this.dialogStyle.dialog["z-index"] = this.$store.state.dialogMaxZindex
    }
  },
  computed: {
    s_flg: function () {
      const result = this.$store.state.dialogArr.find(el => el.name === this.dialogStyle.name);
      return result.flg
    }
  },
  created () {
    // ダイアログクリエイト時に開閉のフラグをストアに設定する。
    this.$store.commit('pushDialogArr', {name: this.dialogStyle.name, flg: this.dialogStyle.close})
  }
}
</script>

<style scoped>
    .dialog-div{
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

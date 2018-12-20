ダイアログ作成用の汎用vueファイル。グローバルで宣言。親からoptを取得して位置、スタイル等を設定する。
<template>
    <!--<transition>-->
        <!--<div class="dialog-parent-div" :style="this.opt.position" @mousedown="dialogMouseDown" @mouseenter="dialogEnter" @mouseleave="dialogLeave">-->
            <!--<vue-draggable-resizable  :draggable="true" :class="{'dialog-div-enter': isEnter, 'dialog-div': !isEnter}" v-show="!this.storeFlg" :resizable="true" :parent="false"  drag-handle=".drag-handle" :style="this.opt.dialog" :handles="['ml','mr']">-->

    <!--<div id="testDiv">-->
        <!--<div class="handle" @mousedown="startDrag"></div>-->
    <!--</div>-->


    <div  v-show="!this.storeFlg" class="dialog-div-enter"  :style="this.opt.dialog" @mousedown="dialogMouseDown" @mouseenter="dialogEnter" @mouseleave="dialogLeave">
        <div class="drag-handle" @mousedown="startDrag"></div>
                <div>
                    <!--<div class="drag-handle"></div>-->
                    <div class="close-btn-div" @click="closeBtn">
                        <v-icon name="times" scale="1.5" class="hover"/>
                    </div>
                    <slot></slot>
                </div>
    </div>




            <!--</vue-draggable-resizable>-->
        <!--</div>-->
    <!--</transition>-->
</template>

<script>
export default {
  name: 'Dialog',
  props: ['opt'],
  components: {
  },
  data () {
    return {
      dragTarget: '',
      dragging: false,
      yDifference: 0,
      xDifference: 0,
      isEnter: false
    }
  },
  methods: {
    startDrag(event) {
      this.dragging = true;
      this.dragTarget = event.currentTarget.parentNode;
      this.yDifference = event.clientY - this.dragTarget.offsetTop;
      this.xDifference = event.clientX - this.dragTarget.offsetLeft
    },
    stopDrag() {
      this.dragging = false;
    },
    doDrag(event) {
      if (this.dragging) {
        this.dragTarget.style.top = (event.clientY - this.yDifference) + 'px';
        this.dragTarget.style.left = (event.clientX - this.xDifference) + 'px';
      }
    },
    closeBtn () {
      this.$store.commit('editDialogArr', {name: this.opt.name, flg: true})
    },
    dialogMouseDown () {
      this.$store.commit('incrDialogMaxZindex');
      this.opt.dialog["z-index"] = this.$store.state.dialogMaxZindex
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
      const result = this.storeDialogArr.find(el => el.name === this.opt.name);
      return result.flg
    }
  },
  created () {
    // ダイアログクリエイト時に開閉のフラグをストアに設定する。
    console.log(this.opt)
    this.$store.commit('pushDialogArr', {name: this.opt.name, flg: this.opt.close})
  },
  mounted () {
    window.addEventListener('mousemove', this.doDrag);
    window.addEventListener('mouseup', this.stopDrag);
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
        position: absolute;
        z-index: 10;
        background-color: #fff;
        box-shadow:2px 2px 5px #787878;
        border-radius: 4px;
        opacity: 0.7;
        transition: opacity 1s;
    }
    .handle{
        width: 100%;
        height: 50px;
        background-color: black;
    }
    .dialog-div-enter{
        position: absolute;
        z-index: 10;
        background-color: #fff;
        box-shadow:2px 2px 5px #787878;
        border-radius: 4px;
        transition: opacity 1s;
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

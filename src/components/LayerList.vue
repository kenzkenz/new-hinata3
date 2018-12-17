選択可能なレイヤーを全て表示するツリーのvueファイル。
<template>
    <tree :data="treeData" :options="treeOptions" @node:selected="onNodeSelected"/>
</template>

<script>
import LiquorTree from 'liquor-tree'
import Layers from '../js/layers'
export default {
  name: 'LayerList',
  props: ['name'],
  components: {
    [LiquorTree.name]: LiquorTree
  },
  data () {
    return {
      treeData: Layers,
      treeOptions: {} // 今の所なにも設定していない
    }
  },
  methods: {
    onNodeSelected: function (node) {
      if (node.children.length === 0) {
        this.$store.commit('unshiftLayerList', {
          value: {
            id: node.data.id,
            name: node.text,
            layer: node.data.layer,
            opacity: node.data.opacity,
            addFlg:true
          },
          name: this.name
        })
      }
      node.unselect()// セレクト状態を解除。解除しないと続けて押せない。
    }
  }
}
</script>

<style>
    /*非scopedでないと反映しなかったため*/
    .tree-root{
        margin: 0;
    }
    .tree-content{
        padding: 0;
        height: 24px;
    }
    .tree-anchor{
        margin-left: 0;
        padding: 0;
    }
</style>

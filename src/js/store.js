import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import * as Layers from '../js/layers'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    maps: {map01: null, map02: null, map03: null, map04: null},
    layerLists: {
      map01: [{id: 1, name: '標準地図', layer: Layers.Layers[1].children[0].data.layer['map01'], opacity: 1, summary:Layers.Layers[1].children[0].data.summary}],
      map02: [{id: 2, name: '淡色地図', layer: Layers.Layers[1].children[1].data.layer['map02'], opacity: 1}],
      map03: [{id: 4, name: '色別標高図', layer: Layers.Layers[1].children[3].data.layer['map03'], opacity: 1}],
      map04: [{id: 5, name: '全国最新写真', layer: Layers.Layers[1].children[4].data.layer['map04'], opacity: 1}]
    },
    dialogs: {
      menuDialog: {close: true, name: 'menu01', dialog: {top: '56px', left: '10px', 'z-index': 1, height: 'auto', 'min-width': '220px'}},
      map01Dialog: {close: true, name: 'map01', dialog: {top: '56px', left:'calc(100% - 260px)', 'z-index': 1, height: 'auto', 'min-width': '250px'}},
      map02Dialog: {close: true, name: 'map02', dialog: {top: '56px', left:'calc(100% - 260px)', 'z-index': 1, height: 'auto', 'min-width': '250px'}},
      map03Dialog: {close: true, name: 'map03', dialog: {top: '56px', left:'calc(100% - 260px)', 'z-index': 1, height: 'auto', 'min-width': '250px'}},
      map04Dialog: {close: true, name: 'map04', dialog: {top: '56px', left:'calc(100% - 260px)', 'z-index': 1, height: 'auto', 'min-width': '250px'}},
      map01info: {close: true, name: 'map01info', text: '01', summary:'', dialog: {top: '76px', left: 'calc(100% - 280px)', 'z-index': 1, height: 'auto'}},
      map02info: {close: true, name: 'map02info', text: '02', summary:'', dialog: {top: '56px', left: 'calc(100% - 360px)', 'z-index': 1, height: 'auto'}},
      map03info: {close: true, name: 'map03info', text: '03', summary:'', dialog: {top: '56px', left: 'calc(100% - 360px)', 'z-index': 1, height: 'auto'}},
      map04info: {close: true, name: 'map04info', text: '04', summary:'', dialog: {top: '56px', left: 'calc(100% - 360px)', 'z-index': 1, height: 'auto'}},
    },
    menuFlg:false,
    notifications: {},
    notification: '',
    dialogArr: [],
    dialogMaxZindex:1,
    splitFlg: 1
  },
  getters: {
    // info: (state) => (name) => {
    //   return state.info[name]
    // },
    layerList: (state) => (name) => {
      return state.layerLists[name]
    },
    layerLists (state) {
      const layerListArr = [];
      layerListArr.push(state.layerLists.map01);layerListArr.push(state.layerLists.map02);layerListArr.push(state.layerLists.map03);layerListArr.push(state.layerLists.map04);
      const layerListArr2 = [];
      for (let layerList of layerListArr) {
        const layerList2 = [];
        for (let layer of layerList) {
          layerList2.push({ id:layer.id, o:layer.opacity})
        }
        layerListArr2.push(layerList2)
      }
      return JSON.stringify(layerListArr2)
      // return layerListArr2
    }
  },
  mutations: {
    setDialogs (state,payload) {
      state.dialogs[payload.name] = payload.dialog
    },
    // マップを登録------------------------------------------------------------------------------
    setMap (state,payload) {
      state.maps[payload.name] = payload.map
    },
    //---------------------------------------------------------------------------------
    setNotifications(state, payload) {
      state.notifications[payload.name] = payload.control
    },
    // メニューの展開フラグ----------------------------------------------------------------------
    menuFlgToggle (state) {
      state.menuFlg = !state.menuFlg
    },
    // ダイアログの開閉フラグ---------------------------------------------------------------------
    pushDialogArr (state, payload) { state.dialogArr.push(payload) },
    editDialogArr (state, payload) {
      const result = state.dialogArr.find(el => el.name === payload.name);
      if (payload.flg === 'toggle') {
        result.flg = !result.flg
      } else {
        result.flg = payload.flg
      }
    },
    // ダイアログのマックスz-indedx インクリメント--------------------------------------------------
    incrDialogMaxZindex (state) {
      state.dialogMaxZindex++
    },
    // レイヤーリスト更新-------------------------------------------------------------------------
    updateList (state, payload) {
      state.layerLists[payload.name] = payload.value
    },
    // レイヤーリスト先頭に追加------------------------------------------------------------------
    unshiftLayerList (state, payload) {
      const layerList = state.layerLists[payload.name];
      const layer = payload.value.layer[payload.name];
      if (!layerList.find(el => el.id === payload.value.id)) {
        payload.value.layer = layer;
        layerList.unshift(payload.value)
      }
    },
    // 通知-------------------------------------------------------------------------------------
    updateNotification (state, payload) { state.notification = payload },
    //マップ分割フラグ----------------------------------------------------------------------------
    incrSplitFlg (state) {
      state.splitFlg++;
      if (state.splitFlg === 7) state.splitFlg = 1
    },
    updateSplitFlg (state, payload) {
      state.splitFlg = Number(payload)
    }
  }
});
export default store

import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import * as Layers from '../js/layers'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    maps: {map01: null, map02: null, map03: null, map04: null},
    layerLists: {
      map01: [{id: 1, title: '標準地図', layer: Layers.Layers[1].children[0].data.layer['map01'], opacity: 1, summary:Layers.Layers[1].children[0].data.summary}],
      map02: [{id: 2, title: '淡色地図', layer: Layers.Layers[1].children[1].data.layer['map02'], opacity: 1, summary:Layers.Layers[1].children[1].data.summary}],
      map03: [{id: 4, title: '色別標高図', layer: Layers.Layers[1].children[3].data.layer['map03'], opacity: 1, summary:Layers.Layers[1].children[3].data.summary}],
      map04: [{id: 5, title: '全国最新写真', layer: Layers.Layers[1].children[4].data.layer['map04'], opacity: 1, summary:Layers.Layers[1].children[4].data.summary}]
    },
    dialogs: {
      menuDialog: {close: true, name: 'menu01', dialog: {top: '56px', left: '10px', 'z-index': 1, height: 'auto', 'min-width': '220px'}},
      map01: {close: true, name: 'map01', dialog: {top: '56px', left:'30px', 'z-index': 1, height: 'auto', 'min-width': '250px'}},
      map02: {close: true, name: 'map02', dialog: {top: '56px', left:'30px', 'z-index': 1, height: 'auto', 'min-width': '250px'}},
      map03: {close: true, name: 'map03', dialog: {top: '56px', left:'30px', 'z-index': 1, height: 'auto', 'min-width': '250px'}},
      map04: {close: true, name: 'map04', dialog: {top: '56px', left:'30px', 'z-index': 1, height: 'auto', 'min-width': '250px'}},
    },
    dialogsInfo: {
      map01: [],
      map02: [],
      map03: [],
      map04: []
    },
    menuFlg:false,
    notifications: {},
    notification: '',
    dialogArr: [],
    dialogMaxZindex:1,
    splitFlg: 1
  },
  getters: {
    layerList: (state) => (mapName) => {
      return state.layerLists[mapName]
    },
    layerLists (state) {
      const layerListArr = [];
      layerListArr.push(state.layerLists.map01);layerListArr.push(state.layerLists.map02);layerListArr.push(state.layerLists.map03);layerListArr.push(state.layerLists.map04);
      const layerListArr2 = [];
      for (let layerList of layerListArr) {
        const layerList2 = [];
        for (let layer of layerList) {
          layerList2.push({
            id:layer.id,
            o:layer.opacity
          })
        }
        layerListArr2.push(layerList2)
      }
      // console.log(layerListArr2);
      return JSON.stringify(layerListArr2)
      // return layerListArr2
    }
  },
  mutations: {
    /*
    setDialogs (state,payload) {
      state.dialogs[payload.name] = payload.dialog
    },
    */
    // マップを登録------------------------------------------------------------------------------
    setMap (state,payload) {
      state.maps[payload.mapName] = payload.map
    },
    //-----------------------------------------------------------------------------------------
    setNotifications(state, payload) {
      state.notifications[payload.mapName] = payload.control
    },
    // メニューの展開フラグ-----------------------------------------------------------------------
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
    // インフォ用ダイアログの追加------------------------------------------------------------------
    pushDialogsInfo (state,payload) {
      const dialogs = state.dialogsInfo[payload.mapName];
      dialogs.push(payload.dialog)
    },
    // レイヤーリスト更新-------------------------------------------------------------------------
    updateList (state, payload) {
      state.layerLists[payload.name] = payload.value
    },
    // レイヤーリスト先頭に追加--------------------------------------------------------------------
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

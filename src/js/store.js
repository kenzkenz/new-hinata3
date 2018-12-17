import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import layers from './layers.js'
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    maps: {map01: null, map02: null, map03: null, map04: null},
    layerLists: {
      map01: [{id: 1, name: '標準地図', layer: layers[1].children[0].data.layer[0], opacity: 1}],
      map02: [{id: 2, name: '淡色地図', layer: layers[1].children[1].data.layer[1], opacity: 1}],
      map03: [{id: 4, name: '色別標高図', layer: layers[1].children[3].data.layer[2], opacity: 1}],
      map04: [{id: 5, name: '全国最新写真', layer: layers[1].children[4].data.layer[3], opacity: 1}]
    },
    menuFlg:false,
    notifications: {},
    notification: '',
    dialogArr: [],
    dialogMaxZindex:1,
    splitFlg: 1
  },
  getters: {
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
      let layerList, layer;
      switch (payload.name) {
        case 'map01':
          layerList = state.layerLists[payload.name];
          layer = payload.value.layer[0];
          break;
        case 'map02':
          layerList = state.layerLists[payload.name];
          layer = payload.value.layer[1];
          break;
        case 'map03':
          layerList = state.layerLists[payload.name];
          layer = payload.value.layer[2];
          break;
        case 'map04':
          layerList = state.layerLists[payload.name];
          layer = payload.value.layer[3];
          break
      }
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

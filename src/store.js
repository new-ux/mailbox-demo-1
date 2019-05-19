import Vue from 'vue'
import Vuex from 'vuex'

import { intentEngine } from './IntentEngine'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    letters: {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      data: {
        1: { from: 'facebook', subject: '2 new friend requests' },
        2: { from: 'facebook', subject: '1 new friend requests' },
        3: { from: 'facebook', subject: '4 new messages' },
        4: { from: 'facebook', subject: 'come back, alex' },
        5: { from: 'facebook', subject: '89 new comments' },
        6: { from: 'facebook', subject: 'news of your friends, you must see' },
        7: { from: 'facebook', subject: 'play the game' },
        8: { from: 'apple', subject: 'revolution again!' },
        9: { from: 'google', subject: 'install our brend new messenger' },
      },
      ui: {},
      loading: false,
      error: null,
    },
  },
  mutations: {
    TOGGLE_LETTER(state, /*data*/ { id, shouldChecked }) {
      if (!state.letters.ui[id]) Vue.set(state.letters.ui, id, { checked: false }) // normalize

      if (shouldChecked == null) {
        state.letters.ui[id].checked = !state.letters.ui[id].checked
      } else {
        state.letters.ui[id].checked = shouldChecked
      }
    },
  },
  actions: {
    TOGGLE_LETTER({ commit /* , getters */ }, data) {
      const { state } = store
      const { id } = data
      commit('TOGGLE_LETTER', data)
      intentEngine.signal(
        {
          actionObject: { ...state.letters.data[id], ui: state.letters.ui[id], id },
          actionType: 'TOGGLE_LETTER',
          actionArgs: { id },
        },
        {
          onItemSelect: id => {
            store.commit('TOGGLE_LETTER', { id, shouldChecked: true })
          },
          storeItems: store.getters.lettersCollection,
        }
      )
    },
  },
  getters: {
    lettersCollection: ({ letters }) => {
      console.log('getter')
      return letters.items.map(id => ({
        ...letters.data[id],
        id,
        ui: letters.ui[id] || {},
      }))
    },
  },
})
export default store
window.appStore = store

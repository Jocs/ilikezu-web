import Vue from 'vue'
import Vuex from 'vuex'

import HomeStore from './home'
import ListStore from './list'
import LoginStore from './login'
import DetailStore from './detail'
import PersonalStore from './personal'
import AddressesStore from './addresses'
import createAddressStore from './createAddress'
import collectionStore from './collection'
import OrderStore from './order'

Vue.use(Vuex)

const storeArray = [
	HomeStore,
	ListStore,
	LoginStore,
	DetailStore,
	PersonalStore,
	AddressesStore,
	createAddressStore,
	collectionStore,
	OrderStore
]

const { actions, mutations, state } = storeArray.reduce((acc, s) => {
	const {actions, mutations, state} = s
	return {
		actions: Object.assign({}, acc.actions, actions),
		mutations: Object.assign({}, acc.mutations, mutations),
		state: Object.assign({}, acc.state, state)
	}
}, {
	actions: {},
	mutations: {},
	state: {}
})

const store = new Vuex.Store({
	actions,
	mutations,
	state,
	getters: {}
})

export default store

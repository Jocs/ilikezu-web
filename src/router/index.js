/**
 * create by JOCS 2017-06-23
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = resolve => require(['../views/Home.vue'], resolve)
const Detail = resolve => require(['../views/Detail.vue'], resolve)
const List = resolve => require(['../views/List.vue'], resolve)
const Personal = resolve => require(['../views/Personal.vue'], resolve)
const Login = resolve => require(['../views/Login.vue'], resolve)
const Order = resolve => require(['../views/Order.vue'], resolve)
const Addresses = resolve => require(['../views/Addresses.vue'], resolve)
const CreateAddress = resolve => require(['../views/CreateAddress.vue'], resolve)
const Collection = resolve => require(['../views/Collection.vue'], resolve)
const Blank = resolve => require(['../views/Blank.vue'], resolve)
const PersonalSetting = resolve => require(['../views/PersonalSetting.vue'], resolve)
const Rule = resolve => require(['../views/Rule.vue'], resolve)
const About = resolve => require(['../views/About.vue'], resolve)
const Orders = resolve => require(['../views/Orders.vue'], resolve)
const Fan = resolve => require(['../views/Fan.vue'], resolve)
const OrderResult = resolve => require(['../views/OrderResult.vue'], resolve)


Vue.use(VueRouter)

const routes = [{
	path: '/home',
	component: Home
}, {
	path: '/list/:searchKey?/:proTypeId?',
	component: List
}, {
	path: '/detail/:recordId/:f?',
	component: Detail
}, {
	path: '/personal',
	component: Personal
}, {
	path: '/login',
	component: Login
}, {
	path: '/order/:recordId',
	component: Order
}, {
	path: '/addresses/:from?',
	component: Addresses
}, {
	path: '/createAddress',
	component: CreateAddress
}, {
	path: '/editAddress/:recordId',
	component: CreateAddress
}, {
	path: '/collection',
	component: Collection
}, {
	path: '/blank/:path?/:ukey?',
	component: Blank
}, {
	path: '/personalSetting',
	component: PersonalSetting
}, {
	path: '/rule',
	component: Rule
}, {
	path: '/about',
	component: About
}, {
	path: '/orders',
	component: Orders
}, {
	path: '/fans',
	component: Fan
}, {
	path: '/orderResult',
	component: OrderResult
}, {
	path: '/',
	redirect: '/home'
}]

export default new VueRouter({routes})

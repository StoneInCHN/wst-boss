import Mock from 'mockjs'
import api from './api'

Mock.mock(/getUserInfo/, 'get', api.getUserInfo)

export default Mock
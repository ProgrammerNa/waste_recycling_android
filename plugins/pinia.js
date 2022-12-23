// 使用pinia做持久化状态管理
import {createPinia} from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
const pinia = createPinia()
pinia.use(piniaPluginPersist)
 export default pinia
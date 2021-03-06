import {Dispatcher} from 'flux'
import assign from 'object-assign'

const appDispatcher = assign(new Dispatcher(), {
  handleServerAction(action) {
    this.dispatch({
      source: 'server',
      action: action,
    })
  },

  handleViewAction(action) {
    // this（action）をStoreに渡すメソッド
    this.dispatch({
      source: 'view',
      action: action,
    })
  },
})

export default appDispatcher

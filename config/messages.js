import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    // Dispatcherに以下情報を渡す
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID, // 変更箇所
      userID: newUserID,
    })
  },

  sendMessage(userID, message) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SEND_MESSAGE, // 変更箇所
      userID: userID,
      message: message,
      timestamp: +new Date(),
    })
  },

  postMessage(userID, contents) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.POST}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({ "contents": contents, "from": 1, "timestamp": +new Date() }) // これによりサーバ側に送りたいデータを送ることが出来ます。 // contents: contents
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.POST_MESSAGE,
            userID,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },

  getMessage() {
    return new Promise((resolve, reject) => {
      request
      .get('/api/messages') // 取得したいjsonがあるURLを指定する
      .end((error, res) => {
        if (!error && res.status === 200) { // 200はアクセスが成功した際のステータスコードです。
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_MESSAGE,
            json, // json: jsonと同じ。keyとvalueが一致する場合、このように省略出来ます。
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
}

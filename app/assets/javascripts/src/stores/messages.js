import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UserStore from '../stores/user'
import {ActionTypes} from '../constants/app'

const messages = {
  2: {
    user: {
      profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
      id: 2,
      name: 'Ryan Clark',
      status: 'online',
    },
    lastAccess: {
      recipient: 1424469794050,
      currentUser: 1424469794080,
    },
    messages: [
      {
        contents: 'Want a game of ping pong?',
        from: 3,
        timestamp: 1424352522000,
      },
    ],
  },
  3: {
    user: {
      read: true,
      profilePicture: 'https://avatars3.githubusercontent.com/u/2955483?v=3&s=460',
      name: 'Jilles Soeters',
      id: 3,
      status: 'online',
    },
    lastAccess: {
      recipient: 1424352522000,
      currentUser: 1424352522080,
    },
    messages: [
      {
        contents: 'Want a game of ping pong?',
        from: 3,
        timestamp: 1424352522000,
      },
    ],
  },
  4: {
    user: {
      name: 'Todd hggggg',
      id: 4,
      profilePicture: 'https://avatars1.githubusercontent.com/u/1655968?v=3&s=460',
      status: 'online',
    },
    lastAccess: {
      recipient: 1424423579000,
      currentUser: 1424423574000,
    },
    messages: [
      {
        contents: 'Please follow me on twitter I\'ll pay you',
        timestamp: 1424423579000,
        from: 4,
      },
    ],
  },
}

var openChatID = parseInt(Object.keys(messages)[0], 10)

class ChatStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getOpenChatUserID() {
    return openChatID
  }
  getChatByUserID(id) {
    return messages[id]
  }
  getAllChats() {
    return messages
  }
  getMessage() {
    if (!this.get('messages')) {
      this.setMessage([
        {
          contents: '',
          from: 3,
          timestamp: 1424352522000,
        },
      ])
    }
    return this.get('messages')
  }
  setMessage(array) {
    this.set('messages', array)
  }
}
const MessagesStore = new ChatStore()

// ここから下がDispatcherから経由してきたアクションを行う
MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  // actionのtypeで振り分ける
  switch (action.type) {
    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      openChatID = payload.action.userID
      // emitChange()をするとviewに変更を伝えられる
      MessagesStore.emitChange()
      break

    case ActionTypes.POST_MESSAGE:
      const userID = action.userID
      console.log('---メッセージが送られたか確認---')
      console.log(action)
      console.log(action.message)
      messages[userID].messages.push({
        contents: action.message,
        timestamp: action.timestamp,
        from: UserStore.user.id,
      })
      MessagesStore.emitChange()
      break

    case ActionTypes.GET_MESSAGE: // 上のgetMessage()を受け取っているとする
      MessagesStore.setMessage(action.json) // getMessage()で取得したjsonをセッターを利用して保存
      MessagesStore.emitChange()
      break
  }

  return true
})

export default MessagesStore

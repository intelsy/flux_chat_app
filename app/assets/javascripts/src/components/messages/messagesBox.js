import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages' // 追記
import ReplyBox from '../../components/messages/replyBox'
import UserStore from '../../stores/user'
import Utils from '../../utils'
import MessagesAction from '../../actions/messages'

class MessagesBox extends React.Component {

  constructor(props) {
    MessagesAction.getMessage()
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    // StoreのMessageStoreから持ってきている
    return {messages: MessagesStore.getMessage()}
  }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  // StoreがemitChange()すると、ここのonStoreChangeが発生する
  onStoreChange() {
    // setStateを行うとrender(リロード)が行われる
    this.setState(this.getStateFromStore())
  }
  // getMessageAction() {
  //   MessagesAction.getMessage()
  // }
// 終了位置
  render() {
    console.log('---this.state.messagesを確認---')
    console.log(this.state.messages)
    const messagesLength = this.state.messages.length
    const currentUserID = UserStore.user.id

    const messages = this.state.messages.map((message, index) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.from === currentUserID,
        'clear': true,
      })
      // ここでMessageBoxの見た目部分を定義
      return (
          <li key={ message.timestamp + '-' + message.from } className={ messageClasses }>
            <div className='message-box__item__contents'>
              { message.contents }
            </div>
          </li>
        )
    })

    const lastMessage = this.state.messages[messagesLength - 1]

    if (lastMessage.from === currentUserID) {
      // if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
      //   const date = Utils.getShortDate(lastMessage.timestamp)
      //   messages.push(
      //       <li key='read' className='message-box__item message-box__item--read'>
      //         <div className='message-box__item__contents'>
      //           Read { date }
      //         </div>
      //       </li>
      //     )
      // }
    }
    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            { messages }
          </ul>
          <ReplyBox />,
        </div>
      )
  }
}

export default MessagesBox

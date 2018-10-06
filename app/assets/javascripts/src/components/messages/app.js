import React from 'react'
import Header from './header'
import UserList from './userList'
import MessagesBox from './messagesBox'

// import ログイン情報など(session)

class App extends React.Component {
  render() {
    return (
        <div className='app'>
          <Header />
          <UserList />
          <MessagesBox />
        </div>
      )
  }
}

export default App

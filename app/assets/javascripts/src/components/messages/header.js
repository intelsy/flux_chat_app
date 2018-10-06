import React from 'react'

class Header extends React.Component {
  render() {
    return (
        <header className='header' class="header">
          <ul id="menu">
            <li><a href="/" id="logo"><h1>Okaka Talk</h1></a></li>
            <li><a href="/users/1" class="menu">にんじゃひよこ</a></li>
            <li><a href="/users/index" class="menu">ユーザー一覧</a></li>
            <li><a href="/users/edit" class="menu">ユーザー情報変更</a></li>
            <li><a href="/users/sign_out" class="menu" data-method="delete">ログアウト</a></li>
          </ul>
        </header>
      )
  }
}

export default Header

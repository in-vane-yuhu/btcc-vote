import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import * as stores from './store'
import './App.less'

import Home from './components/Home'

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <div className='App'>
          <Home />
        </div>
      </Provider>
    )
  }
}

export default App

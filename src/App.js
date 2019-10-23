import React, { Component } from 'react'
import wx from 'weixin-js-sdk'
import { Button, Card } from 'antd'

import './App.css'

import image from './assets/icon.jpg'

class App extends Component {
  state = { timestamp: 'click button to get timestamp' }
  componentDidMount = async () => {
    /* const data = await this.getJsapiTicket() */
    const data = {
      timestamp: 1571828742,
      nonceStr: 'efbm2f95lcx7c3',
      signature: '5e2732fe14fdc09049d15a54e0e4dfe79014aecd'
    }
    wx.config({
      debug: true,
      appId: 'wx5a0ac85ff274b9d8',
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        'onMenuShareTimeline', // 分享到朋友圈
        'onMenuShareAppMessage', // 分享给朋友
        'onMenuShareQQ', // 分享到QQ
        'onMenuShareWeibo', // 分享到腾讯微博
        'onMenuShareQZone' // 分享到QQ空间
      ]
    })

    wx.ready(() => {
      console.log('ready')
      wx.onMenuShareTimeline({
        title: 'title', // 分享标题
        link: 'http://invane.com/', // 分享链接，该链接域名必须与当前企业的可信域名一致
        imgUrl: image, // 分享图标
        success: res => {
          // 用户确认分享后执行的回调函数
          console.log({ res })
        },
        cancel: res => {
          // 用户取消分享后执行的回调函数
          console.log({ res })
        },
        trigger: res => {
          // 监听Menu中的按钮点击时触发的方法
          console.log({ res })
        },
        complete: res => {
          // 接口调用完成时执行的回调函数，无论成功或失败都会执行
          console.log({ res })
        },
        fail: err => {
          // 接口调用失败时执行的回调函数
          console.log({ err })
        }
      })
    })

    wx.error(err => {
      console.log('error', { err })
    })
  }

  getTimestamp = () => {
    const timestamp = Number(Date.parse(new Date()) / 1000)
    this.setState({
      timestamp
    })
  }

  render() {
    const { timestamp } = this.state
    return (
      <div className='App'>
        <header className='App-header'>
          <Button onClick={this.getTimestamp}>getTimestamp</Button>
          <Card>{timestamp}</Card>
        </header>
      </div>
    )
  }
}

export default App

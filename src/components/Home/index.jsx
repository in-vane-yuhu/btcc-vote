import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import './style.less'

import wx from 'weixin-js-sdk'
import { Row, Col, Button, message, Modal } from 'antd'

import ChartToken from '../ChartToken'
import Tokens from '../Tokens'
import FormVote from '../FormVote'
import FormAwards from '../FormAwards'
import ShareBar from '../ShareBar'
import AwardList from '../AwardList'

import mockAvatarSrc from '../../assets/icon.jpg'
import mockQR from '../../assets/qrcode.png'
import moments from '../../assets/moments.png'
import share from '../../assets/share.png'

@inject('GlobalStore')
@observer
class Home extends Component {
  state = {
    checkedValue: []
  }

  componentDidMount = async () => {
    const { getTokens, getResults, getAward, getUID } = this.props.GlobalStore
    const UID = localStorage['UID']
    if (UID) {
      getResults()
      getAward(UID)
      getUID()
    } else {
      getTokens()
    }

    const configData = {
      timestamp: 1571880098,
      nonceStr: 'efbm2f95lcx7c3',
      signature: 'b1587b55403e0a907e6c8bb0f2c9b6d27853b77b'
    }
    wx.config({
      debug: false,
      appId: 'wx5a0ac85ff274b9d8',
      timestamp: configData.timestamp,
      nonceStr: configData.nonceStr,
      signature: configData.signature,
      jsApiList: [
        'updateAppMessageShareData', // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
        'updateTimelineShareData', // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
        'onMenuShareWeibo' // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
      ]
    })

    wx.ready(() => {
      console.log('ready')
      // 这里是设置，在用户可能点击分享前调用
      // 微信调整分享功能后，现在无法获知用户是否分享完成
      // 这里的success应该是指自定义分享注册成功
      wx.updateAppMessageShareData({
        title: 'title', // 分享标题
        desc: 'desc', // 分享描述
        link: 'http://invane.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: mockAvatarSrc, // 分享图标
        success: res => {
          console.log({ res })
        }
      })
    })

    wx.error(err => {
      console.log('error', { err })
    })
  }

  onCheckCount = () => {
    const { checkedValue } = this.state
    const { showModal } = this.props.GlobalStore
    if (checkedValue.length < 5) {
      message.warn(`请选择5个`)
      return
    }
    if (checkedValue.length > 5) {
      message.warn('只能选择5个')
      return
    }
    showModal()
  }

  renderModalResponse = () => {
    const { hideResults, isResultsVisibal } = this.props.GlobalStore
    return (
      <Modal
        destroyOnClose
        className='modal-response'
        visible={isResultsVisibal}
        onCancel={hideResults}
        footer={null}
        width={'85%'}
        closable={false}
        maskClosable={false}
      >
        <Row className='resTitle'>
          <span>投票完成!</span>
        </Row>
        <Row className='resMsg'>
          <span>{`您获得 20 BTCT 奖励`}</span>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Button type='primary' size='large' onClick={hideResults}>
              确定
            </Button>
          </Col>
        </Row>
      </Modal>
    )
  }

  renderModalVoted = () => {
    const { hideVoted, isVotedVisibal } = this.props.GlobalStore
    return (
      <Modal
        destroyOnClose
        className='modal-response'
        visible={isVotedVisibal}
        onCancel={hideVoted}
        footer={null}
        width={'85%'}
        closable={false}
        maskClosable={false}
      >
        <Row className='resTitle'>
          <span>您已投过票!</span>
        </Row>
        <Row className='resMsg'>
          <span>您可以邀请好友以获得更多奖励!</span>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Button type='primary' size='large' onClick={hideVoted}>
              确定
            </Button>
          </Col>
        </Row>
      </Modal>
    )
  }

  renderModalShare = () => {
    const { hideShare, isShareVisibal } = this.props.GlobalStore
    return (
      <Modal
        destroyOnClose
        className='modal-share'
        visible={isShareVisibal}
        onCancel={hideShare}
        footer={null}
        width={'85%'}
        closable={false}
      >
        <Row className='step'>
          <Col span={3}>
            <span>1.</span>
          </Col>
          <Col>
            <span>点击右上角</span>
          </Col>
        </Row>
        <Row className='step'>
          <Col span={3}>
            <span>2.</span>
          </Col>
          <Col>
            <span>
              点击
              <img src={share} alt='share.png' />
              发送给朋友
            </span>
          </Col>
        </Row>
        <Row className='step'>
          <Col offset={3}>
            <span>
              或
              <img src={moments} alt='moments.png' />
              分享到朋友圈
            </span>
          </Col>
        </Row>
      </Modal>
    )
  }

  renderFormVote = () => {
    return <FormVote />
  }

  renderFormAwards = () => {
    return <FormAwards />
  }

  render() {
    return (
      <Fragment>
        <header className='header'>
          <div className='header-text'>拯救韭菜，空气币投票活动</div>
        </header>
        <div className='header-m'>
          <div className='header-m-rule'>
            <span>活动规则</span>
          </div>
          <div className='header-m-top'>票选出您心中的空气币TOP5</div>
          <div className='header-m-user'>{`用户 BTCC 邀请您参与投票`}</div>
          <div className='header-m-vote'>{`请选择5个您心中的空气币 进行投票`}</div>
        </div>
        <ChartToken />
        <Tokens />
        <ShareBar />
        <AwardList />
        <Row className='qrcode'>
          <div className='add'>加客服好友</div>
          <div className='group'>邀您加入{` BTCC `}群聊</div>
          <img src={mockQR} alt='qrcode' />
        </Row>
        {this.renderFormVote()}
        {this.renderFormAwards()}
        {this.renderModalResponse()}
        {this.renderModalShare()}
        {this.renderModalVoted()}
      </Fragment>
    )
  }
}

export default Home

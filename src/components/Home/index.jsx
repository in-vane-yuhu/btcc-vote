import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import './style.less'

import wx from 'weixin-js-sdk'
import { Row, Col, Button, message, Icon, Modal } from 'antd'

import ChartToken from '../ChartToken'
import Tokens from '../Tokens'
import FormSubmitUID from '../FormSubmitUID'
import AwardList from '../AwardList'

import mockAvatarSrc from '../../assets/icon.jpg'
import mockQR from '../../assets/qrcode.png'

@inject('GlobalStore')
@observer
class Home extends Component {
  state = {
    checkedValue: []
  }

  componentDidMount = async () => {
    const { getTokens } = this.props.GlobalStore
    getTokens()

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

  onCheckChange = checkedValue => {
    this.setState({
      checkedValue
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

  submitModal = () => {
    const { form } = this.formRef.props
    const { doVote } = this.props.GlobalStore
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      doVote(values)
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }

  renderFormSubmitUID = () => {
    const { isModalVisibal, submitLoading, hideModal } = this.props.GlobalStore
    return (
      <FormSubmitUID
        wrappedComponentRef={this.saveFormRef}
        visible={isModalVisibal}
        onCancel={hideModal}
        onSubmit={this.submitModal}
        loading={submitLoading}
      />
    )
  }

  renderModalResponse = () => {
    const { hideRes, isResVisibal } = this.props.GlobalStore
    return (
      <Modal
        destroyOnClose
        className='modal-response'
        visible={isResVisibal}
        onCancel={hideRes}
        footer={null}
        width={'85%'}
        closable={false}
        maskClosable={false}
      >
        <Row className='resTitle'>
          <span>投票完成!</span>
        </Row>
        <Row className='resMsg'>
          <span>{`您获得 ${'XX'} BTCT 奖励`}</span>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Button type='primary' size='large' onClick={hideRes}>
              确定
            </Button>
          </Col>
        </Row>
      </Modal>
    )
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
        <Row>
          <Button className='btn-invite' type='primary' size='large'>
            邀请好友投票可获得更多奖励
            <Icon type='right' />
          </Button>
        </Row>
        <AwardList />
        <Row className='qrcode'>
          <div className='add'>加客服好友</div>
          <div className='group'>邀您加入{` BTCC `}群聊</div>
          <img src={mockQR} alt='qrcode' />
        </Row>
        {this.renderFormSubmitUID()}
        {this.renderModalResponse()}
      </Fragment>
    )
  }
}

export default Home

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './style.less'

import { Button, Checkbox, message, Avatar, Row, Empty } from 'antd'

import mockAvatarSrc from '../../assets/icon.jpg'

@inject('GlobalStore')
@observer
class Tokens extends Component {
  componentDidMount = async () => {
    const { getTokens } = this.props.GlobalStore
    getTokens()
  }

  onCheckCount = () => {
    const { showModal, checkedTokens } = this.props.GlobalStore
    if (checkedTokens.length < 5) {
      message.warn(`请选择5个空气币以投票`)
      return
    }
    if (checkedTokens.length > 5) {
      message.warn('只能选择5个空气币投票')
      return
    }
    showModal()
  }

  render() {
    const { tokens, UID, checkTokens } = this.props.GlobalStore
    return UID ? null : (
      <Row className='check-container'>
        <Checkbox.Group onChange={checkTokens} style={{ width: '100%' }}>
          {tokens.map((item, index) => (
            <div key={index} className='item'>
              <div className='left'>
                <Avatar size={40} src={mockAvatarSrc} />
                <div className='context' style={{ marginLeft: 10 }}>
                  <span className='token'>{item.tokenName || '-'}</span>
                  <span className='desc'>{item.tokenIntroduction || '-'}</span>
                </div>
              </div>
              <Checkbox value={item.tokenID} />
            </div>
          ))}
          {tokens.length === 0 && <Empty description={false} />}
        </Checkbox.Group>
        <Button className='btn-vote' type='primary' size='large' onClick={this.onCheckCount}>
          投票
        </Button>
      </Row>
    )
  }
}

export default Tokens

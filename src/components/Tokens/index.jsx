import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import './style.less'

import { Button, Checkbox, message, Avatar, Row, Empty, Icon } from 'antd'

import mockAvatarSrc from '../../assets/icon.jpg'

@inject('GlobalStore')
@observer
class Tokens extends Component {
  state = {
    checkedValue: []
  }

  componentDidMount = async () => {
    const { getTokens } = this.props.GlobalStore
    getTokens()
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

  render() {
    const { tokens, isVote } = this.props.GlobalStore
    return isVote ? null : (
      <Row className='check-container'>
        <Checkbox.Group onChange={this.onCheckChange} style={{ width: '100%' }}>
          {tokens.map((item, index) => (
            <div key={index} className='checkItem'>
              <div className='checkItem-left'>
                <Avatar size={40} src={mockAvatarSrc} />
                <div style={{ marginLeft: 10 }}>
                  <span className='checkItem-token'>BTC</span>
                  <span className='checkItem-desc'>here is some desc</span>
                </div>
              </div>
              <Checkbox value={index} />
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

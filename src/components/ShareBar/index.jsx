import React, { Component } from 'react'
import { Row, Button, Icon } from 'antd'
import { observer, inject } from 'mobx-react'
import './style.less'

@inject('GlobalStore')
@observer
class ShareBar extends Component {
  render() {
    const { showShare, UID } = this.props.GlobalStore
    return UID ? (
      <Row>
        <Button className='btn-invite' type='primary' size='large' onClick={showShare}>
          邀请好友投票可获得更多奖励
          <Icon type='right' />
        </Button>
      </Row>
    ) : null
  }
}

export default ShareBar

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col, Card, Progress, Avatar } from 'antd'
import './style.less'

import mockAvatarSrc from '../../assets/icon.jpg'

@inject('GlobalStore')
@observer
class ChartToken extends Component {
  render() {
    const { isVote, tokens } = this.props.GlobalStore
    return isVote ? (
      <Row className='chart'>
        <Card className='card'>
          {tokens.map((item, index) => (
            <Row className='item' key={index}>
              <Col className='left' span={3}>
                <span>{`${index + 1}.`}</span>
              </Col>
              <Col className='right' span={21}>
                <div className='info'>
                  <Avatar size={40} src={mockAvatarSrc} />
                  <div className='context'>
                    <span className='token'>BTC</span>
                    <span className='desc'>here is some desc</span>
                  </div>
                </div>
                <Progress percent={item.percent} strokeColor='#36cdb5' status='active' />
              </Col>
            </Row>
          ))}
        </Card>
      </Row>
    ) : null
  }
}

export default ChartToken

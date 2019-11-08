import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col, Card, Progress, Avatar } from 'antd'
import './style.less'

import mockAvatarSrc from '../../assets/icon.jpg'

@inject('GlobalStore')
@observer
class ChartToken extends Component {
  render() {
    const { UID, results } = this.props.GlobalStore
    return UID ? (
      <Row className='chart'>
        <Card className='card'>
          {results.map((item, index) => (
            <Row className='item' key={index}>
              <Col className='left' span={3}>
                <span
                  style={{
                    color: index > 4 ? '#acb7bc' : '#36cdb5'
                  }}
                >{`${index + 1}.`}</span>
              </Col>
              <Col className='right' span={21}>
                <div className='info'>
                  <Avatar size={40} src={mockAvatarSrc} />
                  <div className='context'>
                    <span className='token'>{item.tokenName || '-'}</span>
                    <span className='desc'>{item.tokenIntroduction || '-'}</span>
                  </div>
                </div>
                <Progress
                  percent={Number(item.percentage).toFixed(1)}
                  strokeColor={index > 4 ? '#acb7bc' : '#36cdb5'}
                  status={index > 4 ? null : 'active'}
                />
              </Col>
            </Row>
          ))}
        </Card>
      </Row>
    ) : null
  }
}

export default ChartToken

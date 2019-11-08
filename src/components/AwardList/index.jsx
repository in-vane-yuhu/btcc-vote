import React, { Component } from 'react'
import { Row, Empty, Spin, Card, Icon } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import { observer, inject } from 'mobx-react'
import './style.less'

@inject('GlobalStore')
@observer
class AwardList extends Component {
  handleInfiniteOnLoad = () => {
    const { getAward } = this.props.GlobalStore
    getAward()
  }

  renderTitle = () => {
    const { UID, awards, showAwards } = this.props.GlobalStore
    return UID ? (
      <span className='my-award'>我的奖励({awards.length})</span>
    ) : (
      <div onClick={showAwards}>
        <span className='search-award'>查看奖励</span>
        <Icon type='right' />
      </div>
    )
  }

  renderExtra = () => {
    const { UID, resetUID } = this.props.GlobalStore
    return UID ? (
      <span className='switch-user' onClick={resetUID}>
        切换
      </span>
    ) : null
  }

  render() {
    const { awards, awardLoading } = this.props.GlobalStore
    return (
      <Row className='award'>
        <Card
          className='card'
          title={this.renderTitle()}
          bordered={false}
          extra={this.renderExtra()}
        >
          <div className='infinite'>
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={!awardLoading}
              useWindow={false}
            >
              {awards.map((item, index) => (
                <div className='item' key={index}>
                  <span>{item.type}</span>
                  <span>{`${item.awards} BTCT`}</span>
                </div>
              ))}
              {awards.length !== 0 && (
                <div className='nomore'>
                  <span>没有更多了</span>
                </div>
              )}
              {awards.length === 0 && (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
              )}
            </InfiniteScroll>
          </div>
          {awardLoading && (
            <div className='loading'>
              <Spin />
            </div>
          )}
        </Card>
      </Row>
    )
  }
}

export default AwardList

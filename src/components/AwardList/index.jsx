import React, { Component, Fragment } from 'react'
import { message, Row, Empty, Spin, Card, Icon } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import { observer, inject } from 'mobx-react'
import './style.less'

@inject('GlobalStore')
@observer
class AwardList extends Component {
  handleInfiniteOnLoad = () => {
    const { awards, getAward } = this.props.GlobalStore

    if (awards.length > 14) {
      message.success('奖励已经全部加载完啦')
      return
    }
    getAward()
  }

  renderTitle = () => {
    const { isVote, awards } = this.props.GlobalStore
    return isVote ? (
      <span className='my-award'>我的奖励（{awards.length}）</span>
    ) : (
      <div
        onClick={() => {
          message.warn('请先投票')
        }}
      >
        <span className='search-award'>查看奖励</span>
        <Icon type='right' />
      </div>
    )
  }

  render() {
    const { awards, awardLoading } = this.props.GlobalStore
    return (
      <Row className='award'>
        <Card className='card' title={this.renderTitle()} bordered={false}>
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
                  <span>投票</span>
                  <span>XX BTCT</span>
                </div>
              ))}
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

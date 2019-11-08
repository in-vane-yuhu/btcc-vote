import React, { Component } from 'react'
import { Modal, Form, Input, Button, Row, Col } from 'antd'
import './style.less'

const SubmitUID = Form.create({ name: 'form_submit_uid' })(
  class extends Component {
    render() {
      const { visible, onCancel, onSubmit, form, loading } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          destroyOnClose
          className='modal'
          visible={visible}
          title='登录您在BTCC的UID'
          onCancel={onCancel}
          onOk={onSubmit}
          footer={null}
          width={'85%'}
        >
          <Form>
            <Form.Item>
              {getFieldDecorator('UID', {
                rules: [{ required: true, message: '请输入UID' }]
              })(<Input className='input-UID' prefix='UID：' />)}
            </Form.Item>
            
            <Row className='tip'>
              <span className='uid'>没有UID？</span>
              <span className='app'>下载APP注册</span>
            </Row>
            <Row>
              <Col offset={7} span={10}>
                <Button type='primary' size='large' onClick={onSubmit} loading={loading}>
                  确定
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      )
    }
  }
)

export default SubmitUID

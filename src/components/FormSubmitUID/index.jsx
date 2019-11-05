import React, { Component } from 'react'
import { Modal, Form, Input, Button, Row, Col } from 'antd'
import './style.less'

const FormSubmitUID = Form.create({ name: 'form_submit_uid' })(
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
              })(<Input prefix='UID：' />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('inviter')(<Input prefix='邀请人：' readOnly />)}
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

export default FormSubmitUID

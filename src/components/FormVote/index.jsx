import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import SubmitUID from './form'

@inject('GlobalStore')
@observer
class FormVote extends Component {
  submitModal = () => {
    const { form } = this.formRef.props
    const { doVote } = this.props.GlobalStore
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      doVote({ ...values })
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }

  render() {
    const { isModalVisibal, hideModal, submitLoading } = this.props.GlobalStore
    return (
      <SubmitUID
        wrappedComponentRef={this.saveFormRef}
        visible={isModalVisibal}
        onCancel={hideModal}
        onSubmit={this.submitModal}
        loading={submitLoading}
      />
    )
  }
}

export default FormVote

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import SubmitUID from './form'

@inject('GlobalStore')
@observer
class FormAwards extends Component {
  submitModal = () => {
    const { form } = this.formRef.props
    const { getAward } = this.props.GlobalStore
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      getAward(values.UID)
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }

  render() {
    const { isAwardsVisibal, hideAwards, submitLoading } = this.props.GlobalStore
    return (
      <SubmitUID
        wrappedComponentRef={this.saveFormRef}
        visible={isAwardsVisibal}
        onCancel={hideAwards}
        onSubmit={this.submitModal}
        loading={submitLoading}
      />
    )
  }
}

export default FormAwards

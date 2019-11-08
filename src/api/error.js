let formatErrorMessage = message => {
  let text = ''
  switch (message) {
    case 'A unique constraint would be violated on User. Details: Field name = UID':
      text = '您已经投过票了'
      break

    default:
      text = message
      break
  }
  return text
}

export default formatErrorMessage

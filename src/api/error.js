let errMsg = message => {
  let text = ''
  switch (message) {
    // 其他模块
    case 'article title can not be empty':
      text = '资讯标题内容不能为空'
      break

    default:
      text = message
      break
  }
  return text
}

export default errMsg

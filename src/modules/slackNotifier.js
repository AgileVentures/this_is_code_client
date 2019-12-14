import axios from 'axios'

const slackNotifier = (props) => {
  const url = 'https://hooks.slack.com/services/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'
  const data = {
    text: `${props.user.userName} just logged in to ThisIsCode`,
  }
  if (props.user.loggedIn) {
    axios.post(url, JSON.stringify(data), {
      withCredentials: false,
      transformRequest: [(data, headers) => {
        delete headers.post["Content-Type"]
        return data
      }]
    })
  }
  return
}

export { slackNotifier }
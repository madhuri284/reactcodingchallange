import React from 'react'
import Api from '../api'
import MessageGrid from './message-grid.js'

class MessageList extends React.PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
    }
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount() {
    this.api.start()
  }

  messageCallback(message) {
    const { messages } = this.state
    this.setState({
      messages: [
        ...messages.slice(),
        message,
      ],
    })
  }

  handleClick = () => {
    const isApiStarted = this.api.isStarted()
    if (isApiStarted) {
      this.api.stop()
    } else {
      this.api.start()
    }
    this.forceUpdate()
  }

  startMessages = () => {
    this.api.start()
    this.forceUpdate()
  }

  stopMessages = () => {
    this.api.stop()
    this.forceUpdate()
        
  }

  clearMessages = () => {
    this.setState({messages:[]})
    this.forceUpdate()
  }

  clearMessageById = (id) => {
   const newMessages =  this.state.messages.filter(message=>{
    return message.id!==id
   })
    this.setState({messages:newMessages})
  }
  render() {
    const isApiStarted = this.api.isStarted()
    return (
      <div>
        <button
          onClick={this.handleClick}
        >
          {isApiStarted ? 'Stop Messages' : 'Start Messages'}
        </button>
       <MessageGrid messages = {this.state.messages} startMessages = {this.startMessages} clearMessages = {this.clearMessages} stopMessages = {this.stopMessages} clearMessageById = {this.clearMessageById}/>
      </div>
    )
  }
}

export default MessageList

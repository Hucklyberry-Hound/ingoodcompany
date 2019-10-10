import React, { Component } from 'react'

export default class creatPostForm extends Component {
  constructor(props) {
    this.state = {
      title: '',
      text: ''
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
    console.log(this.state)
  }



  render() {
    return (
      <div>
        <form>
          <input type='text' name='title' value={this.state.title} onChange={this.handleChange} placeholder='title' required />
          <input type='text' name='text' value={this.state.text} onChange={this.handleChange} placeholder='text' required />
        </form>
        <button type="submit" onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

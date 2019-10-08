import React from 'react';

export default class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: 'animals',
      hasPosts: 'yes',
      hasMessages: 'yes',
      privacy: 'Public',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleSubmit() {
    alert(this.state.hasPosts);
  }

  handleOnChange(event) {
    const key = event.target.name;
    const updatedValue = { [key]: event.target.value };
    this.setState(updatedValue);
  }

  render() {
    return (
      <div>
        <h1>Create A New Community</h1>
        <form
          className="create-form"
          name="create"
          onSubmit={this.handleSubmit}
        >
          <div className="create-field">
            <label htmlFor="name">Community Name</label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="create-field">
            <label htmlFor="category">Select A Topic</label>
            <select
              name="category"
              onChange={event => this.handleOnChange(event)}
              value={this.state.category}
            >
              <option value="animals">Animals</option>"
              <option value="computers">Computers</option>
              <option value="food">Food</option>
              <option value="chair">Chair</option>
            </select>
          </div>
          <div className="create-field">
            <label htmlFor="hasPosts">Has Posts</label>
            <select
              name="hasPosts"
              onChange={this.handleOnChange}
              value={this.state.hasPosts}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="create-field">
            <label htmlFor="hasMessages">Has Messages</label>
            <select
              name="hasMessages"
              onChange={this.handleOnChange}
              value={this.state.hasMessages}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="create-field">
            <label htmlFor="privacy">Privacy Settings</label>
            <select
              name="privacy"
              onChange={this.handleOnChange}
              value={this.state.privacy}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="submit-button">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

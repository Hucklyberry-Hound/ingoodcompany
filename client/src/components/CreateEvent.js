import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class CreateEvent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "",
        date: this.props.selectedDate,
        time: "",
        editable: true,
        description: "",
      };
  
      this.handleOnChange = this.handleOnChange.bind(this);
    }
  
    handleOnChange(event) {
      const key = event.target.name;
      const updatedValue = { [key]: event.target.value };
      this.setState(updatedValue);
      console.log(this.state.time)
    }
  
    render() {
        console.log(this.props)
      return (
        <div className="community-form-container">
          <div className="community-form">
            <h1>Create New Event on {this.state.date}</h1>
            <div className="create-field">
              <label htmlFor="name">Event Title: </label>
              <input
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.handleOnChange}
              />
            <label htmlFor="description">Event Description: </label>
              <input
                name="description"
                type="text"
                value={this.state.description}
                onChange={this.handleOnChange}
              />
              
            </div>
            <input type="time" 
                name="time" 
                value={this.state.time}
                onChange={this.handleOnChange}/>
            <button>Sumbit</button>
            <button onClick={this.props.closeView}>Cancel</button>
          </div>
        </div>
      );
    }
  }

  export default CreateEvent
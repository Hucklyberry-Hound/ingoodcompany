import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

//CSS imports
import '../styles/Calendar.css'


const ADD_EVENT = gql`
  mutation CreateMutation(
    $title: String!
    $date: String!
    $description: String!
    $community: String!
  ) {
    createEvent(
      title: $title
      date: $date
      description: $description
      community: $community
    ) {
      title
      date
    }
  }
`;

class CreateEvent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "",
        date: this.props.selectedDate,
        time: "00:00",
        editable: true,
        description: "",
        community: `${this.props.communityId}`
      };
  
      this.handleOnChange = this.handleOnChange.bind(this);
      this.handleOnDateChange = this.handleOnDateChange.bind(this);
    }
  
    handleOnChange(event) {
      const key = event.target.name;
      const updatedValue = { [key]: event.target.value };
      this.setState(updatedValue);
    }

    handleOnDateChange(event) {
      const time = event.target.value
      const date = this.props.selectedDate
      const newDateTime = `${date} ${time}`
      this.setState({date: newDateTime, time: time})
      console.log(this.state.date)
    }
  
    render() {
        console.log(this.props)
      return (
        <div className="single-event">
          <div className="create-event">
            <h1>Create New Event on {this.props.selectedDate}</h1>
            <div className="calendar-field">
              <div>
              <label htmlFor="name">Event Title: </label>
              <input
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.handleOnChange}
              />
              </div>
              <div>
            <label htmlFor="description">Event Description: </label>
              <input
                name="description"
                type="text"
                value={this.state.description}
                onChange={this.handleOnChange}
              />
              </div>
              <div className="calendar-time">
            <input type="time" 
                name="time" 
                value={this.state.time}
                onChange={this.handleOnDateChange}/>
                </div>
              </div>
              <Mutation 
              mutation={ADD_EVENT}
              variables={this.state}
              onCompleted={this.props.closeView}
              >
               {createMutation => (
                <button onClick={createMutation}>Submit</button>
              )}
            </Mutation>
            <button onClick={this.props.closeView}>Cancel</button>
          </div>
        </div>
      );
    }
  }

  export default CreateEvent
import React from "react";

//load css
import '../styles/Calendar.css'

class SingleEvent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        return(
        <div className="single-event">
        <div className="single-event-details">
            <h1>{this.props.selectedEvent.title}</h1>
            <div className="event-details">
            <h3>Event Details</h3>
            <p>{this.props.selectedEvent.description}</p>
            </div>
            <h3>Hosted By: {this.props.selectedEvent.hostedby}</h3>
            <button onClick={this.props.closeView}>Close</button>
        </div>
        </div>
        )
    }

}

export default SingleEvent;
import React from "react";
import { Link } from  'react-router-dom'

//load css
import '../styles/Calendar.css'

class SingleEvent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
        <div className="single-event">
        <div className="single-event-details">
            <h1>{this.props.selectedEvent.title}</h1>
            <div className="event-details">
            <h3>Event Details</h3>
            <p>{this.props.selectedEvent.description}</p>
            </div>
            <h3>Hosted By: <Link to={`/user/${this.props.selectedEvent.hostedby}`}> {this.props.selectedEvent.hostedby} </Link> </h3>
            <button onClick={this.props.closeView}>Close</button>
        </div>
        </div>
        )
    }

}

export default SingleEvent;
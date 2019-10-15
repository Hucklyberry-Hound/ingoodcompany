import React from "react";

class SingleEvent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
        <div className="community-form-container">
        <div className="community-form">
            <h1>{this.props.selectedEvent.title}</h1>
            <p>{this.props.selectedEvent.description}</p>
            <button onClick={this.props.closeView}>Close</button>
        </div>
        </div>
        )
    }

}

export default SingleEvent;
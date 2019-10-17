import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import CreateEvent from './CreateEvent';
import SingleEvent from './SingleEvent';
import { useQuery } from '@apollo/react-hooks';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

//CSS imports
import '../styles/main.scss';
import '../styles/Calendar.css';

export const GET_EVENTS = gql`
  query events {
    events {
      title
      id
      description
      date
      hostedby {
        firstName
        lastName
        username
      }
      community {
        name
        id
      }
    }
  }
`;

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreate: false,
      showEvent: false,
      selectedEvent: {
        title: '',
        start: '',
        description: '',
        hostedby: '',
      },
      selectedDate: '',
    };
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
    this.closeView = this.closeView.bind(this);
  }

  handleDateClick(arg) {
    const date = arg.dateStr;
    this.setState({ showCreate: true, selectedDate: date });
  }

  handleEventClick(calEvent, jsEvent, view, resourceObj) {
    const event = {
      title: calEvent.event.title,
      start: calEvent.event.start,
      description: calEvent.event.extendedProps.description,
      hostedby: calEvent.event.extendedProps.hostedby.username,
    };

    this.setState({ showEvent: true, selectedEvent: event });
  }

  closeView() {
    this.setState({ showCreate: false, showEvent: false });
  }

  render() {
    return (
      <Query query={GET_EVENTS}>
        {({ loading, error, data }) => {
          if (loading) return <div className="loading">Loading</div>;
          if (error) return <div>ERROR</div>;

          const events = data.events.filter(
            event => event.community.id === this.props.communityId
          );
          return (
            <div className="calendar-container">
              <div className="calendar">
                <FullCalendar
                  defaultView="dayGridMonth"
                  plugins={[dayGridPlugin, interactionPlugin]}
                  weekends={true}
                  events={events}
                  dateClick={this.handleDateClick}
                  navLinks={true}
                  eventLimit={true}
                  eventClick={this.handleEventClick}
                />
                {this.state.showCreate ? (
                  <CreateEvent
                    selectedDate={this.state.selectedDate}
                    closeView={this.closeView}
                    communityId={this.props.communityId}
                  />
                ) : (
                  ''
                )}
                {this.state.showEvent ? (
                  <SingleEvent
                    selectedEvent={this.state.selectedEvent}
                    closeView={this.closeView}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
export default Events;

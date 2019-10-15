import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import CreateEvent from './CreateEvent';
import SingleEvent from './SingleEvent';

//CSS imports
import '../styles/main.scss'
import '../styles/Calendar.css'


class Events extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCreate: false,
            showEvent: false,
            selectedEvent: {
                title: '',
                start: '',
                description: ''
            },
            selectedDate: ""
        }
        this.handleDateClick = this.handleDateClick.bind(this)
        this.handleEventClick = this.handleEventClick.bind(this)
        this.closeView = this.closeView.bind(this)
    }

     handleDateClick(arg) { // bind with an arrow function
        const date = arg.dateStr;
        console.log(date)
        this.setState({showCreate: true, selectedDate: date})
    }

      handleEventClick(calEvent, jsEvent, view, resourceObj) {
          const event = {
              title: calEvent.event.title,
              start: calEvent.event.start,
              description: calEvent.event.extendedProps.description
          }
          
         this.setState({showEvent: true, selectedEvent: event})
    }

    closeView() {
        this.setState({showCreate: false, showEvent: false})
    }

    render() {
        return (
        <div className="calendar">
        <FullCalendar defaultView="dayGridMonth" 
        plugins={[ dayGridPlugin, interactionPlugin ]} 
        weekends={true}
        events={[
          {id: 'a', title: 'event 1', date: '2019-10-01 00:00:00', editable:true, 
          extendedProps: { department: 'BioChemistry' }, description: 'Lecture'},
          {title: 'event 2', date: '2019-10-02' },
          {title: 'event 3', date: '2019-10-03' },
          {title: 'event 3', date: '2019-10-03' },
          {title: 'event 3', date: '2019-10-03' },
          {title: 'event 3', date: '2019-10-03' },
          {title: 'event 3', date: '2019-10-03' }
        ]}
        dateClick={this.handleDateClick}
        navLinks= {true}
        eventLimit= {true}
        eventClick = {this.handleEventClick}
        />
        {(this.state.showCreate) ? <CreateEvent selectedDate={this.state.selectedDate} closeView={this.closeView} /> : "" }
        {(this.state.showEvent) ? <SingleEvent selectedEvent={this.state.selectedEvent} closeView={this.closeView} /> : "" }
        </div>
      )
    }
    
  
  }
export default Events

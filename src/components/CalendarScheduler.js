import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const localizer = momentLocalizer(moment);

const CalendarScheduler = () => {
    const [events, setEvents] = useState([]);
    const [modalData, setModalData] = useState({
        show: false,
        isUpdateMode: false,
        event: null,
        conflict: false
    });
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        videoCallLink: '',
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    // Fetch existing events from the backend
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events');
            setEvents(response.data.map(event => ({
                ...event,
                start: new Date(event.start),
                end: new Date(event.end),
            })));
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // Generate a Jitsi meeting link dynamically
    const generateJitsiLink = () => {
        const meetingId = `meeting-${Math.random().toString(36).substr(2, 9)}`;
        return `https://meet.jit.si/${meetingId}`;  // Jitsi's dynamic link
    };

    // Open modal to create or edit event
    const openModal = (slotInfo, event = null) => {
        if (event) {
            setModalData({
                show: true,
                isUpdateMode: true,
                event,
                conflict: false
            });
            setNewEvent({
                title: event.title,
                date: moment(event.start).format('YYYY-MM-DD'),
                startTime: moment(event.start).format('HH:mm'),
                endTime: moment(event.end).format('HH:mm'),
                videoCallLink: event.videoCallLink || generateJitsiLink(),  // Auto-generate Jitsi link
            });
        } else {
            setModalData({
                show: true,
                isUpdateMode: false,
                event: null,
                conflict: false
            });
            setNewEvent({
                title: '',
                date: moment(slotInfo.start).format('YYYY-MM-DD'),
                startTime: moment(slotInfo.start).format('HH:mm'),
                endTime: moment(slotInfo.end).format('HH:mm'),
                videoCallLink: generateJitsiLink(),  // Generate new Jitsi link for new event
            });
        }
    };

    // Close the modal
    const closeModal = () => {
        setModalData({
            show: false,
            isUpdateMode: false,
            event: null,
            conflict: false
        });
        setNewEvent({ title: '', date: '', startTime: '', endTime: '', videoCallLink: '' });
    };

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    // Save or update event in the backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        const startDateTime = `${newEvent.date}T${newEvent.startTime}`;
        const endDateTime = `${newEvent.date}T${newEvent.endTime}`;

        const eventToAdd = {
            title: newEvent.title,
            start: new Date(startDateTime).toISOString(),
            end: new Date(endDateTime).toISOString(),
            videoCallLink: newEvent.videoCallLink,
        };

        try {
            if (modalData.isUpdateMode && modalData.event && modalData.event._id) {
                const response = await axios.put(`http://localhost:5000/api/events/${modalData.event._id}`, eventToAdd);
                if (response.status === 200) {
                    setEvents(prevEvents =>
                        prevEvents.map(event => 
                            event._id === modalData.event._id 
                            ? { ...response.data, start: new Date(response.data.start), end: new Date(response.data.end) }
                            : event
                        )
                    );
                }
            } else {
                const response = await axios.post('http://localhost:5000/api/events', eventToAdd);
                if (response.status === 201) {
                    setEvents(prevEvents => [...prevEvents, {
                        ...response.data,
                        start: new Date(response.data.start),
                        end: new Date(response.data.end)
                    }]);
                }
            }
            closeModal();
        } catch (error) {
            console.error('Error saving event:', error.response ? error.response.data : error.message);
        }
    };

   // Delete event from the backend
const handleDelete = async () => {
    const eventId = modalData.event._id || modalData.event.id;  // Check for either _id or id
    if (!modalData.event || !eventId) {
        console.log("Selected event for deletion:", modalData.event);  // Log the selected event
        alert('Please select a valid event to delete.');
        return;
    }
    try {
        console.log(`Deleting event with ID: ${eventId}`);  // Log the ID of the event being deleted
        const response = await axios.delete(`http://localhost:5000/api/events/${eventId}`);
        if (response.status === 200) {
            setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId && event.id !== eventId));
            closeModal();
        }
    } catch (error) {
        console.error('Error deleting event:', error.response ? error.response.data : error.message);
    }
};


    // Start the video meeting when the button is clicked
    const startMeeting = () => {
        if (newEvent.videoCallLink) {
            window.open(newEvent.videoCallLink, '_blank');  // Open the video call in a new tab
        } else {
            alert('No video call link available for this event.');
        }
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable
                views={['month', 'week', 'day', 'agenda']}
                onSelectSlot={(slotInfo) => openModal(slotInfo)}
                onSelectEvent={(event) => openModal(null, event)}
            />

            <Modal
                show={modalData.show}
                onHide={closeModal}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        {modalData.isUpdateMode ? "Update Event" : "Create New Event"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEventTitle">
                            <Form.Label>Event Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={newEvent.title}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEventDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={newEvent.date}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formStartTime">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="startTime"
                                value={newEvent.startTime}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEndTime">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="endTime"
                                value={newEvent.endTime}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formVideoCallLink">
                            <Form.Label>Video Call Link</Form.Label>
                            <Form.Control
                                type="url"
                                name="videoCallLink"
                                value={newEvent.videoCallLink}
                                onChange={handleInputChange}
                                placeholder="https://meet.jit.si/example"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mr-2">
                            {modalData.isUpdateMode ? "Update Event" : "Add Event"}
                        </Button>
                        {modalData.isUpdateMode && (
                            <>
                                <Button variant="danger" onClick={handleDelete} className="mr-2">
                                    Delete Event
                                </Button>
                                <Button variant="success" onClick={startMeeting}>
                                    Start Meeting
                                </Button>
                            </>
                        )}
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CalendarScheduler;

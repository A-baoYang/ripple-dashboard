import classes from "./Event.module.css"
import React from 'react';

function EventItem(props) {
    return (
        <div className={classes.EventItem}>
            <span>{props.text}</span>
            <span>{props.score}</span>
        </div>
    )
}

function EventList(props) {
    const events = [
        { "id": "2982181", "text": "jojfoejfdj", "score": 88 },
        { "id": "0298982", "text": "dckodkosdkp", "score": 98 },
    ]

    return (
        <div className={classes.EventList}>
            <p>{props.ListName}</p>
            <span>
                {events.map(event => (
                    <React.Fragment key={event.id}>
                        <EventItem text={event.text} score={event.score} />
                    </React.Fragment>
                ))}
            </span>
        </div>
    )
}

export default EventList;

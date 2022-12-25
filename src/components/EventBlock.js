import EventList from "./Event";
import classes from "./EventBlock.module.css"

function EventBlock() {
    return (
        <div>
            <h2>重要事件</h2>
            <div className={classes.EventBlock}>
                <EventList ListName="正面事件 Top10" />
                <EventList ListName="負面事件 Top10" />
            </div>
        </div>
    )
}

export default EventBlock;

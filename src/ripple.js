import { useState, useEffect, useContext } from 'react';
import { DateRangeFilter, TargetSelector } from './components/Filters';
import { addDays } from 'date-fns';
import Sentiment from './components/SentimentBlock';
import EventBlock from './components/EventBlock';
import FetchNeo4j from './api/Neo4j';

import classes from './ripple.module.css'


function Ripple() {
    const [stocks, setStocks] = useState([{ value: '1103', label: '1103', color: '#5243AA' }]);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
        }
    ]);

    return (
        <div className={classes.Ripple}>
            <div className={classes.PageTitle}>
                <h1>Ripple Dashboard</h1>
            </div>
            <div className={classes.FilterBar}>
                <div className={classes.FilterBarLeft}>
                    <TargetSelector select={stocks} onSelect={setStocks} />
                </div>
                <div className={classes.FilterBarRight}>
                    <DateRangeFilter select={dateRange} onSelect={setDateRange} />
                </div>
            </div>
            <div className={classes.Content}>
                <div className={classes.ContentLeft}>
                    <Sentiment stocks={stocks} dateRange={dateRange} />
                    <EventBlock stocks={stocks} dateRange={dateRange} />
                </div>
                <div className={classes.ContentRight}>
                    <FetchNeo4j stocks={stocks} dateRange={dateRange} />
                </div>
            </div>
        </div>
    )

}
export default Ripple;

import classes from "./Filters.module.css";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { useState, useRef, useEffect, useContext } from 'react';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import Select from 'react-select';
import colorOptions from '../data/stockids';


function TargetSelector({ select, onSelect }) {
    const [stocks, setStocks] = useState([{ value: '1103', label: '1103', color: '#5243AA' }]);
    const handleChange = (item) => {
        onSelect(item);
    }

    return (
        <div className={classes.TargetSelector}>
            <p><b>Target Stock Select</b></p>
            <Select
                isMulti
                name="stock"
                options={colorOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(item) => {
                    setStocks(item);
                    handleChange(item);
                }}
                value={stocks}
            />
        </div>
    )
}

function DateRangeFilter({ select, onSelect }) {
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
        }
    ]);
    const handleChange = (item) => {
        onSelect(item);
    }
    return (
        <div>
            <DateRangePicker
                showSelectionPreview={true}
                showMonthAndYearPickers={true}
                months={2}
                ranges={dateRange}
                direction="horizontal"
                preventSnapRefocus={true}
                calendarFocus="backwards"
                onChange={(item) => {
                    setDateRange([item.selection]);
                    handleChange([item.selection]);
                }}
            />
        </div>
    )
}

export { DateRangeFilter, TargetSelector };
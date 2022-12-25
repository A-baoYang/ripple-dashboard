import Plot from 'react-plotly.js';
import classes from './SentimentBlock.module.css';

function SentimentBlock({ stocks, dateRange }) {
    console.log("Sentiment: ", stocks);
    // console.log("Date Range: ", dateRange);

    const computedStyle = getComputedStyle(document.documentElement);

    const font_color = computedStyle.getPropertyValue('--theme-color-2');
    const paper_bgcolor = computedStyle.getPropertyValue('--theme-color-0');
    const plot_bgcolor = computedStyle.getPropertyValue('--theme-color-1');

    return (
        <div className={classes.SentimentBlock}>
            <h2>情緒分數 / 股價</h2>
            <p>
                {stocks.map(stock => (
                    <span>{stock.label} </span>
                ))}
            </p>
            <p>{JSON.stringify(dateRange)}</p>
            <Plot
                data={[
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: [2, 6, 3, 4, 5, 8, 10, 12, 11, 9],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    },
                ]}
                layout={{
                    title: 'Cumulative Return', font: { color: font_color }, autosize: true,
                    legend_title_font_color: font_color, paper_bgcolor: paper_bgcolor, plot_bgcolor: plot_bgcolor
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    )
}

export default SentimentBlock;

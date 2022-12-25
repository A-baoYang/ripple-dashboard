import { useState, useRef, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Indicators from 'highcharts/indicators/indicators-all.js';
import DragPanes from 'highcharts/modules/drag-panes.js';
import AnnotationsAdvanced from 'highcharts/modules/annotations-advanced.js';
import PriceIndicator from 'highcharts/modules/price-indicator.js';
import FullScreen from 'highcharts/modules/full-screen.js';
import StockTools from 'highcharts/modules/stock-tools.js';
import HHollowCandleStick from 'highcharts/modules/hollowcandlestick';
import HeikinAshi from 'highcharts/modules/heikinashi';

import classes from './CandleStick.module.css';

function CandleStick(props) {
    const computedStyle = getComputedStyle(document.documentElement);
    
    const theme_color_0 = computedStyle.getPropertyValue('--theme-color-0');
    const theme_color_1 = computedStyle.getPropertyValue('--theme-color-1');
    const theme_color_2 = computedStyle.getPropertyValue('--theme-color-2');
    const theme_color_3 = computedStyle.getPropertyValue('--theme-color-3');

    const up_color = '#259847';
    const down_color = '#E5213D';

    Indicators(Highcharts);
    DragPanes(Highcharts);
    AnnotationsAdvanced(Highcharts);
    PriceIndicator(Highcharts);
    FullScreen(Highcharts);
    StockTools(Highcharts);
    HHollowCandleStick(Highcharts);
    HeikinAshi(Highcharts);

    const options = {
        title: {
            text: props.symbol,
            style: {
                color: theme_color_2
            }
        },

        rangeSelector: {
            buttons: [{
                type: 'minute',
                count: 360,
                text: '6h',
                title: 'View 6 hours'
            }, {
                type: 'day',
                count: 1,
                text: '1d',
                title: 'View 1 day'
            }, {
                type: 'week',
                count: 1,
                text: '1w',
                title: 'View 1 week'
            }, {
                type: 'month',
                count: 1,
                text: '1m',
                title: 'View 1 month'
            }, {
                type: 'month',
                count: 3,
                text: '3m',
                title: 'View 3 months'
            }, {
                type: 'month',
                count: 6,
                text: '6m',
                title: 'View 6 months'
            }, {
                type: 'year',
                count: 1,
                text: '1y',
                title: 'View 1 year'
            }, {
                type: 'ytd',
                text: 'YTD',
                title: 'View year to date'
            }, {
                type: 'all',
                text: 'All',
                title: 'View all'
            }],
            buttonTheme: {
                fill: theme_color_2,
                style: {
                    color: theme_color_0
                },
                states: {
                    hover: {
                            fill: theme_color_3,
                            stroke: theme_color_3,
                    },
                    select: {
                            fill: theme_color_3,
                            stroke: theme_color_3,
                    }
                }
            },
            labelStyle: {
                color: theme_color_2
            },
            inputStyle: {
                color: theme_color_2
            }
        },

        xAxis: {
            lineColor: theme_color_3,
            tickColor: theme_color_3,
            labels: {
                style: {
                    color: theme_color_3
                }
            },
            crosshair: {
                width: 1,
                color: theme_color_3
            }
        },

        yAxis: [
            {
                labels: {
                    align: 'right',
                    style: {
                        color: theme_color_3
                    }
                },
                title: {
                    text: 'Price',
                    style: {
                        color: theme_color_2
                    }
                },
                gridLineWidth: 1,
                gridLineColor: 'gray',
                height: '80%',
                crosshair: {
                    width: 1,
                    color: theme_color_3
                }
            },
            {
                labels: {
                    align: 'right',
                    style: {
                        color: theme_color_3
                    }
                },
                title: {
                    text: 'Volume',
                    style: {
                        color: theme_color_2
                    }
                },
                top: '80%',
                height: '20%',
                offset: 0,
                gridLineColor: 'gray'
            }
        ],

        series: [
            {
                type: 'candlestick',
                name: 'Price',
                id: 'price',
                data: props.chart,
                yAxis: 0,
                showInLegend: false
            },
            {
                type: 'column',
                name: 'Volume',
                id: 'volume',
                data: props.volume,
                yAxis: 1,
                showInLegend: false
            },
            {
                type: 'line',
                name: 'Sentiment',
                id: 'sentiment',
                data: props.sentiment,
                yAxis: 1,
                showInLegend: true
            }
        ],

        legend: {
            enabled: true,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            itemStyle: {
                color: theme_color_2
            },
            itemHoverStyle: { 
                color: theme_color_3
            },
            itemMarginBottom: 15,
            itemHiddenStyle: {
                color: theme_color_1
            }
        },

        plotOptions: {
            scatter: {
                tooltip: {
                    crosshairs: true,
                }
            },
            candlestick: {
                color: down_color,
                upColor: up_color,

                lineColor: 'gray',	    		
	    		upLineColor: 'gray'
            },
            ohlc: {
                color: down_color,
                upColor: up_color
            },
            hollowcandlestick: {
                color: down_color,
                upColor: up_color
            },
            line: {
                color: theme_color_2
            },
            hlc: {
                color: theme_color_2,
            },
            heikinashi: {
                color: down_color,
                upColor: up_color,

                lineColor: 'gray',	    		
	    		upLineColor: 'gray'
            },
            series: {
                states: {
                    inactive: {
                        opacity: 0.6
                    }
                }
            }
        },

        chart: {
            backgroundColor: theme_color_0,
            polar: false,
            type: 'line'
        },

        navigator: {
            outlineColor: 'gray',
            handles:{
                backgroundColor: theme_color_1,
                borderColor: theme_color_2
            },
            xAxis: {
                gridLineColor: 'gray',
                labels: {
                    style: {
                        color: theme_color_2
                    }
                }
            },
            series: {
                lineColor: theme_color_3,
                color: theme_color_2 + '30'
            },
        },

        navigation: {
            annotationsOptions: {
                typeOptions: {
                    label: {
                        style: {
                            color: theme_color_3
                        }
                    },
                    line: {
                        stroke: theme_color_2,
                        fill: theme_color_2
                    },
                    crosshairX: {
                        stroke: theme_color_2,
                        fill: theme_color_2
                    },
                    crosshairY: {
                        stroke: theme_color_2,
                        fill: theme_color_2
                    },
                    connector: {
                        stroke: theme_color_2,
                        fill: theme_color_2
                    }
                },
                labelOptions: {
                    backgroundColor: theme_color_3 + 'B0',
                    borderColor: theme_color_3
                },
                shapeOptions: {
                    fill: theme_color_3 + '50'
                }
            }
        },

        scrollbar: {
            rifleColor: theme_color_0,
            trackBackgroundColor: theme_color_2 + '60',
            trackBorderColor: theme_color_2,
            buttonBorderColor: theme_color_2,
            buttonBackgroundColor: theme_color_3,
            buttonArrowColor: theme_color_0,
            barBackgroundColor: theme_color_3,
            barBorderColor: theme_color_2
        },

        tooltip: {
            backgroundColor: theme_color_3 + 'B0',
            //outside: true,
            style: {
                color: theme_color_0,
            }
        },

        stockTools: {
            gui: {
                enabled: true,
                buttons: [ 'indicators', 'separator', 'simpleShapes', 'lines', 'crookedLines', 'measure', 'advanced', 'toggleAnnotations', 'separator', 'verticalLabels', 'flags', 'separator', 'zoomChange', 'fullScreen', 'typeChange', 'separator', 'currentPriceIndicator', 'saveChart' ]
            }
        },

        accessibility: {
            enabled: false
        }
    };

    const size = useRef(null);
    const [width, setWidth] = useState(0);
    const chartComponent = useRef({});

    useEffect(() => {
        setWidth(size.current.clientWidth);
        
        const resizeHandler = () => {
            try {
                setWidth(size.current.clientWidth);
            }
            catch(err) {
                window.removeEventListener('resize', this);
            }
        }

        window.addEventListener('resize', resizeHandler);
    }, []);

    useEffect(() => {
        const chart = chartComponent.current?.chart;
        if (chart) chart.reflow(false);
    }, [width]);

    return (
        <div className={classes.CandleStick} ref={size} style={{ height: width * 0.6 }}>
            <HighchartsReact
                ref={chartComponent} 
                highcharts={Highcharts}
                constructorType={'stockChart'}
                options={options}
                containerProps={{ style: { height: '100%' } }}
                style={{width: '100%', height: '100%'}}
            />
        </div>
    )
}

export default CandleStick;
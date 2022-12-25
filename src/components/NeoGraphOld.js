import classes from "./NeoGraph.module.css";
import Graph from "react-graph-vis";
import graph_data from "../data/graph_data.js";

function NeoGraph(props) {

    const options = {
        layout: {
            hierarchical: false
        },
        edges: {
            color: "#000000"
        },
        height: "700px",
        physics: {
            "barnesHut": {
                "gravitationalConstant": -30900,
                "centralGravity": 2,
                "springLength": 150,
                "damping": 0.1,
            }
        }
    };

    const events = {};
    return (
        <div>
            <h2>{props.title}</h2>
            <div className={classes.NeoGraphFrame}>
                <Graph
                    graph={graph_data}
                    options={options}
                    events={events}
                />
            </div>
        </div>
    );
}

export default NeoGraph;

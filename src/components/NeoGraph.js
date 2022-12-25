import classes from "./NeoGraph.module.css";
import Graph from "react-graph-vis";

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
                "gravitationalConstant": -20900,
                "centralGravity": 2,
                "springLength": 120,
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
                    graph={props.graph}
                    options={options}
                    events={events}
                />
            </div>
        </div>
    );
}

export default NeoGraph;

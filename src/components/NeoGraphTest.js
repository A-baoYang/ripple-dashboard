import { useEffect, useState } from "react";
import classes from "./NeoGraph.module.css";

import Graph from "react-graph-vis";
import driver from 'neo4j-driver';

const NEO4J_URI = "neo4j://10.0.10.6:7687"
const NEO4J_USER = "neo4j"
const NEO4J_PASSWORD = "neo4jj"
const NEO4J_DATABASE = "kgbuilder-0.3.0"
const query = 'MATCH p=(m)-[r:`持股`]->(n) RETURN r,m,n LIMIT 3'


const edge_reformat = (edge) => {
    return {"from": parseInt(edge.startNodeElementId), "to": parseInt(edge.endNodeElementId), "label": edge.type}
}
const node_reformat = (node) => {
    return {"id": parseInt(node.elementId), "label": node.properties.name}
}

function NeoGraph(props) {

    const [data, setdata] = useState({});

    function Neo4jCypher() {
        let node_list = [];
        let edge_list = [];
        let neo4j = driver.driver(
            NEO4J_URI, driver.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
        )
        let session = neo4j.session({
            database: NEO4J_DATABASE,
            defaultAccessMode: neo4j.session.READ
        })
        session
            .run(query)
            .then(results => {
                results.records.forEach(record => {
                    const r = edge_reformat(record.get("r"))
                    const m = node_reformat(record.get("m"))
                    const n = node_reformat(record.get("n"))
                    if (edge_list.map(x => x.from).includes(r.from) == false && edge_list.map(x => x.to).includes(r.to) == false) {
                        edge_list.push(r);
                    }
                    node_list.map(x => x.id).includes(m.id) === false ? node_list.push(m) : console.log("");
                    node_list.map(x => x.id).includes(n.id) === false ? node_list.push(n) : console.log("");
                })
                setdata({"nodes": node_list, "edges": edge_list})
            })
            .catch(error => {
                console.log(error)
            })
            .then(() => session.close())
    }
    
    useEffect(() => {
        Neo4jCypher();
    }, [])
    useEffect(() => {
        console.log(data);
    }, [data])


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
                "gravitationalConstant": -2937,
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
                    graph={data}
                    options={options}
                    events={events}
                />
            </div>
        </div>
    );
}

export default NeoGraph;

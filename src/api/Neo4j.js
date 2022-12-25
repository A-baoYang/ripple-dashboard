import React, { useEffect, useState } from "react";
import NeoGraph from '../components/NeoGraph';

const NEO4J_URI = "http://10.0.10.6:7474"
const NEO4J_USER = "neo4j"
const NEO4J_PASSWORD = "neo4jj"
const NEO4J_DATABASE = "kgbuilder-0.3.0"
const auth_code = btoa(`${NEO4J_USER}:${NEO4J_PASSWORD}`)
const URI = `${NEO4J_URI}/db/${NEO4J_DATABASE}/tx`
const query = 'MATCH p=(m)-[r]->(n) WHERE type(r) IN $rel_list AND r.datetime[-1] > $start_stamp AND r.datetime[-1] < $ end_stamp RETURN p LIMIT 50'
const userDefine__rel_list = ["合資", "增持", "持股"]
const userDefine__start_stamp = Math.floor(new Date("2020-06-02 08:00:00").getTime() / 1000)
const userDefine__end_stamp = Math.floor(new Date("2020-06-03 01:00:00").getTime() / 1000)
const req_query = {"statements": [{"statement": query, "parameters": {"rel_list": userDefine__rel_list, "start_stamp": userDefine__start_stamp, "end_stamp": userDefine__end_stamp}, "resultDataContents": ["graph"]}]}
console.log(req_query)
const headers = {
    "Authorization": `Basic ${auth_code}`,
    "Accept": "application/json;charset=UTF-8",
    "Content-Type": "application/json",
    "X-Stream": "true",
}

// const RippleContext = React.createContext({
//     graph: {}, fetchGraph: () => {}
// })

function FetchNeo4j() {
    console.log(req_query)
    const [graph, setGraph] = useState({"nodes": [], "edges": []}) // 要預設值給他否則會報錯
    const fetchGraph = async () => {
        const response_Neo4j = await fetch(URI, {
            method: 'POST',
            body: JSON.stringify(req_query),
            headers: headers
        })
        const graph = await response_Neo4j.json();
        // const temp_graph = graph.results[0].data[0].graph
        const temp_nodes = [].concat.apply([], graph.results[0].data.map(d => d.graph.nodes))
        const new_temp_nodes = []
        temp_nodes.map(n => {
            new_temp_nodes.map(x => x.id).includes(n.id) === false ? new_temp_nodes.push(n) : console.log("")
        })
        const temp_edges = [].concat.apply([], graph.results[0].data.map(d => d.graph.relationships))
        const new_temp_edges = []
        temp_edges.map(rel => {
            new_temp_edges.map(x => x.id).includes(rel.id) === false ? new_temp_edges.push(rel) : console.log("")
        })
        const temp_graph = {"nodes": new_temp_nodes, "edges": new_temp_edges}

        console.log(temp_graph);
        temp_graph["edges"].map(rel => (
            Object.defineProperty(rel, "from", 
                Object.getOwnPropertyDescriptor(rel, "startNode")), delete rel["startNode"],
            Object.defineProperty(rel, "to", 
                Object.getOwnPropertyDescriptor(rel, "endNode")), delete rel["endNode"],
            Object.defineProperty(rel, "label", 
                Object.getOwnPropertyDescriptor(rel, "type")), delete rel["type"]
        ));
        temp_graph["nodes"].map(n => {
            n["stock_id"] = n["properties"]["stock_id"]
            n["label"] = `${n["properties"]["name"]} (${n["stock_id"]})`
        })
        
        console.log(temp_graph);
        setGraph(temp_graph)
    }

    useEffect(() => {
        fetchGraph();
    }, [graph])
    // useEffect(() => {
    //     console.log(graph);
    // }, [graph])

    return (
        // <RippleContext.Provider value={{graph, fetchGraph}}>
        <div>
            <NeoGraph title="法人關係圖譜" graph={graph} />
            {console.log(graph)}
        </div>
        // </RippleContext.Provider>
    )
}

export default FetchNeo4j;

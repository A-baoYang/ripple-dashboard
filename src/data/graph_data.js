const graph_data = {
    nodes: [
        { id: 11, label: "中文節點 11"},
        { id: 2, label: "Node 2"},
        { id: 3, label: "Node 3"},
        { id: 4, label: "Node 4"},
        { id: 5, label: "Node 5"}
    ],
    edges: [
        { from: 11, to: 2, label: "中文關係" },
        { from: 11, to: 3, label: "test" },
        { from: 2, to: 4, label: "test" },
        { from: 2, to: 5, label: "test" }
    ]
};

// const graph_data = {
//     "nodes": [
//         {
//             "id": 320,
//             "label": "仁寶"
//         },
//         {
//             "id": 291,
//             "label": "凱碩"
//         },
//         {
//             "id": 330,
//             "label": "天二科技"
//         },
//         {
//             "id": 371,
//             "label": "鴻海"
//         },
//         {
//             "id": 389,
//             "label": "納諾*-KY"
//         },
//         {
//             "id": 7,
//             "label": "京鼎"
//         },
//         {
//             "id": 396,
//             "label": "榮創"
//         },
//         {
//             "id": 272,
//             "label": "美吾華"
//         },
//         {
//             "id": 397,
//             "label": "懷特"
//         },
//         {
//             "id": 322,
//             "label": "中環"
//         },
//         {
//             "id": 419,
//             "label": "台積電"
//         },
//         {
//             "id": 271,
//             "label": "永冠-KY"
//         },
//         {
//             "id": 425,
//             "label": "東元"
//         }
//     ],
//     "edges": [
//         {
//             "from": 320,
//             "to": 291,
//             "label": "持股"
//         },
//         {
//             "from": 330,
//             "to": 371,
//             "label": "持股"
//         },
//         {
//             "from": 371,
//             "to": 389,
//             "label": "持股"
//         },
//         {
//             "from": 7,
//             "to": 396,
//             "label": "持股"
//         },
//         {
//             "from": 272,
//             "to": 397,
//             "label": "持股"
//         },
//         {
//             "from": 322,
//             "to": 419,
//             "label": "持股"
//         },
//         {
//             "from": 271,
//             "to": 425,
//             "label": "持股"
//         }
//     ]
// };

export default graph_data;


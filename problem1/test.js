
const result = {
    nodes: [
        { data: { id: 'root', name: "root" } }
    ],

    edges: [
    ]
}

// let input = {
//     'root': [
//         'rootName',
//         { 'p1': 
//             [ 'p1Name',
//                 {
//                     'sp2': [1, 2],
//                     'sp3': [3,4]
//                 }
//             ]
//         },
//         {
//             'p2': {
//                 'ln': [5,6],
//                 'rn': 'onlyChild'
//             }
//         }
//     ]
// }

// let input = {
//     'root': [
//         {
//             'p2': {
//                 'ln': [5,6],
//                 'rn': 'onlyChild'
//             }
//         },
//         { 'p3': {
//                 'ln2': 'leftChild',
//                 'rn2': 'rightChild'
//             }
//         }
//     ]
// }

let input = {
  'root': {
     'p2': {
       'ln': [5,6],
       'rn': 'onlyChild'
     }, 
     'p3': {
         'ln2': 'leftChild',
         'rn2': 'rightChild'
       }
     }
  }

function iterateArray(parent, arrayData) {
    for (let i=0; i<arrayData.length; i++) {
        const dataType = typeof arrayData[i];
        if (dataType === 'string' || dataType === 'number') {
            result.edges.push({ data: { id: `${parent}:${arrayData[i]}`, source: parent, target: arrayData[i] } });
            result.nodes.push({ data: { id: arrayData[i], name:  arrayData[i]} });
        } else if (Array.isArray(arrayData[i])) {
            iterateArray(parent, arrayData[i]);
        } else {
            iterateObject(parent, arrayData[i]);
        }
    }
}

function iterateObject(parent, objectData) {
    console.log(parent, objectData);
    const keyValue = Object.keys(objectData);
    for (let i=0; i<keyValue.length; i++) {
        const dataType = typeof objectData[keyValue[i]];
        result.edges.push({ data: { id: `${parent}:${keyValue[i]}`, source: parent, target: keyValue[i] } });
        result.nodes.push({ data: { id: keyValue[i], name: keyValue[i]} });
        if (dataType === 'string' || dataType === 'number') {
            result.edges.push({ data: { id: `${parent}:${objectData[keyValue[i]]}`, source: keyValue[i], target: objectData[keyValue[i]] } });
            result.nodes.push({ data: { id: objectData[keyValue[i]], name: objectData[keyValue[i]] } });
        } else if (Array.isArray(objectData[keyValue[i]])) {
            iterateArray(keyValue[i], objectData[keyValue[i]]);
        } else {
            iterateObject(keyValue[i], objectData[keyValue[i]]);
        }
        
    }
}
// iterateArray('root', input['root'])
let test = iterateObject('root', Object.values(input)[0]);
console.log(test);
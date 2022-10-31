
const result = {
    nodes: [
        { data: { id: 'root', name: "root" } }
    ],

    edges: [
    ]
}

let input = {
    'root': [
        'rootName',
        { 'p1': 
            [ 'p1Name',
                {
                    'sp2': [1, 2],
                    'sp3': [3,4]
                }
            ]
        },
        {
            'p2': {
                'ln': [5,6],
                'rn': 'onlyChild'
            }
        }
    ]
}

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
iterateArray('root', input['root'])
  
var cy = window.cy = cytoscape({
    container: document.getElementById('cy'),

    layout: {
      name: 'concentric',
      concentric: function(n){ return n.id() === 'j' ? 200 : 0; },
      levelWidth: function(nodes){ return 100; },
      minNodeSpacing: 100
    },

    style: [
      {
        selector: 'node[name]',
        style: {
          'content': 'data(name)'
        }
      },

      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle'
        }
      },

      // some style for the extension

      {
        selector: '.eh-handle',
        style: {
          'background-color': 'red',
          'width': 12,
          'height': 12,
          'shape': 'ellipse',
          'overlay-opacity': 0,
          'border-width': 12, // makes the handle easier to hit
          'border-opacity': 0
        }
      },

      {
        selector: '.eh-hover',
        style: {
          'background-color': 'red'
        }
      },

      {
        selector: '.eh-source',
        style: {
          'border-width': 2,
          'border-color': 'red'
        }
      },

      {
        selector: '.eh-target',
        style: {
          'border-width': 2,
          'border-color': 'red'
        }
      },

      {
        selector: '.eh-preview, .eh-ghost-edge',
        style: {
          'background-color': 'red',
          'line-color': 'red',
          'target-arrow-color': 'red',
          'source-arrow-color': 'red'
        }
      },

      {
        selector: '.eh-ghost-edge.eh-preview-active',
        style: {
          'opacity': 0
        }
      }
    ],

    elements: result
    
  });
var bfs = cy.elements().bfs('#a', function(){}, true);

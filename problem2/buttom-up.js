
class Node {
    constructor(value) {
        this.value = value;
        this.leaf = [];
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    createTree(parent, child) {
        var newNode = new Node(child);
        if (this.root === null) {
            this.root = newNode;
            return newNode;
        } else {
            parent.leaf.push(newNode);
            return newNode;
        }
    }

    iterateArray(parent, arrayData) {
        for (let i=0; i<arrayData.length; i++) {
            const dataType = typeof arrayData[i];
            if (dataType === 'string' || dataType === 'number') {
                this.createTree(parent, arrayData[i]);
            } else if (Array.isArray(arrayData[i])) {
                this.iterateArray(parent, arrayData[i]);
            } else {
                this.iterateObject(parent, arrayData[i]);
            }
        }
    }
    
    iterateObject(parent, objectData) {
        const keyValue = Object.keys(objectData);
        for (let i=0; i<keyValue.length; i++) {
            const dataType = typeof objectData[keyValue[i]];
            const leaf = this.createTree(parent, keyValue[i]);
            if (dataType === 'string' || dataType === 'number') {
                this.createTree(leaf, objectData[keyValue[i]]);
            } else if (Array.isArray(objectData[keyValue[i]])) {
                this.iterateArray(leaf, objectData[keyValue[i]]);
            } else {
                this.iterateObject(leaf, objectData[keyValue[i]]);
            }
            
        }
    }

    skipLeave(leafName) {
        let level;
        var data = [];
        function traverse(node, depth = 0) {
            for (let i=0; i<node.leaf.length; i++) {
                if (node.leaf[i].value === leafName) {
                    level = depth;  
                }
                if (data[depth]) {
                    data[depth].push(node.leaf[i].value);
                } else {
                    data.push([node.leaf[i].value]);
                }
                traverse(node.leaf[i], depth+1);
            }
        }
        traverse(this.root);
        if (data[level]) {
            data.splice(level, 1);
        }
        return data;
    }

    DFSInOrder() {
        var data = [];
        function traverse(node, depth = 0) {
            for (let i=0; i<node.leaf.length; i++) {
                if (data[depth]) {
                    data[depth].push(node.leaf[i].value);
                } else {
                    data.push([node.leaf[i].value]);
                }
                traverse(node.leaf[i], depth+1);
            }
        }
        traverse(this.root);
        return data.reverse();
    }
}
// [[1,2,3,4,5,6,'onlyChild'], ['p1Name', 'sp2', 'sp3', 'ln', 'rn'], ['rootName', 'p1', 'p2']]

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

var tree = new BinarySearchTree();
// const rootNode = tree.createTree(undefined, Object.keys(input)[0]);
tree.iterateObject(Object.keys(input)[0], input);
const inOrder = tree.DFSInOrder();
const skipLeaveLevel = tree.skipLeave("p1");
console.log(inOrder);
console.log(skipLeaveLevel);
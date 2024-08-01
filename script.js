document.querySelector("#start").addEventListener("click", startVisualization);
document.querySelector("#next-btn").addEventListener("click", nextStep);

const graph = {
    nodes: [
        {id:0,edges: [1,2]},
        {id:1,edges: [0,3,4]},
        {id:2,edges: [0,5,6]},
        {id:3,edges: [1]},
        {id:4,edges: [1]},
        {id:5,edges: [2]},
        {id:6,edges: [2]},
    ]
};

let bfsQueue = [];
let dfsStack = [];
let visited = [];
let algo = "";

function createGraph() {
    const container = document.querySelector("#visuals");
    container.innerHTML = "";

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const nodeRadius = 20;
    const nodeSpacing = 150; // Adjust as needed

    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    graph.nodes.forEach((node, index) => {
        const angle = (2 * Math.PI / graph.nodes.length) * index;
        const x = centerX + Math.cos(angle) * nodeSpacing - nodeRadius;
        const y = centerY + Math.sin(angle) * nodeSpacing - nodeRadius;

        const nodeElement = document.createElement("div");
        nodeElement.classList.add("node");
        nodeElement.id = `node-${node.id}`;
        nodeElement.innerText = node.id;
        nodeElement.style.left = `${x}px`;
        nodeElement.style.top = `${y}px`;
        container.appendChild(nodeElement);
    });

    graph.nodes.forEach(node => {
        node.edges.forEach(edge => {
            const startNode = document.querySelector(`#node-${node.id}`);
            const endNode = document.querySelector(`#node-${edge}`);

            const startX = startNode.offsetLeft + nodeRadius;
            const startY = startNode.offsetTop + nodeRadius;
            const endX = endNode.offsetLeft + nodeRadius;
            const endY = endNode.offsetTop + nodeRadius;

            const length = Math.hypot(endX - startX, endY - startY);
            const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

            const edgeElement = document.createElement("div");
            edgeElement.classList.add("edge");
            edgeElement.style.width = `${length}px`;
            edgeElement.style.transform = `rotate(${angle}deg)`;
            edgeElement.style.left = `${startX}px`;
            edgeElement.style.top = `${startY}px`;
            container.appendChild(edgeElement);
        });
    });
}

function bfsStep() {
    const nodes = document.querySelectorAll(".node");
    if (bfsQueue.length > 0) {
        const index = bfsQueue.shift();
        if (!visited[index]) {
            visited[index] = true;
            nodes[index].style.backgroundColor = "green";
            graph.nodes[index].edges.forEach(edge => {
                if (!visited[edge]) bfsQueue.push(edge);
            });
        }
    }
}

function dfsStep() {
    const nodes = document.querySelectorAll(".node");
    if (dfsStack.length > 0) {
        const index = dfsStack.pop();
        if (!visited[index]) {
            visited[index] = true;
            nodes[index].style.backgroundColor = "red";
            graph.nodes[index].edges.forEach(edge => {
                if (!visited[edge]) dfsStack.push(edge);
            });
        }
    }
}

function nextStep() {
    if (algo === "bfs") {
        bfsStep();
    } else if (algo === "dfs") {
        dfsStep();
    }
}

function startVisualization() {
    algo = document.querySelector("#algo-select").value;
    createGraph();
    visited = Array(graph.nodes.length).fill(false);

    if (algo === "bfs") {
        bfsQueue = [0];
        document.querySelector("#next-btn").style.display = "inline-block";
    } else if (algo === "dfs") {
        dfsStack = [0];
        document.querySelector("#next-btn").style.display = "inline-block";
    }
}

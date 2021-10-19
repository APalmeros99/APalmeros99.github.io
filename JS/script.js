/*
    This JS file makes a Graph data structure with nodes and edges as an adjecency list and then finds the shortest path
    from a specifed set of starting and destination nodes using a Breadth First Search algorithm.

    function Graph()
        this function makes a Graph data structure that simply connects nodes to other nodes. the connection
        is an edge.
    
    function shortestPath()
        this function uses Breadth First Search to find all existing paths. While keeping track of previous vertex
        this allows us to get the shortest path from destination to the starting node, which we can reverse to
        make the list print from the starting node to the destination.
*/
function Graph()
{
    var neighbors = this.neighbors = [];    // Key = vertex, value = array of neighbors.
  
    this.addEdge = function (x, y)          
    {      
        if (neighbors[x] === undefined)     // If inputs are empty, they are ignored.
        {                                   // Add the edge x -> y.
            neighbors[x] = [];
        }
        neighbors[x].push(y);
        if (neighbors[y] === undefined)
        {                                   // Also add the edge y -> x in order                        
            neighbors[y] = [];              // to implement an undirected graph.
        }                                   
        neighbors[y].push(x);               
    };
    return this;
}
 
function shortestPath(graph, start, destination)
{
    if (start == destination)               // Finishes function if destination is same as starting point.
    {                                       // EX: start = USA, destination = USA.
        print(start);          
        return;                 
    }                           
    var queue = [start]                     // Queue array with the variable 'start' in the first index.
    var visited = {start: true};            // Visited object with booleans to track visited nodes.
    var predecessor = [];                   // Array to keep track of previous vertex.

    while (queue.length > 0)
    {
        var x = queue.shift();              // Pop first vertex off the queue.
        var neighbors = graph.neighbors[x]; // Gets nodes connected to the initial node as neighbor nodes. (Vertex)
        //console.log(neighbors);
        for (var i = 0; i < neighbors.length; ++i) 
        {
            var y = neighbors[i];           // Check if the current set of neighbor nodes has been visited
            if (visited[y])                 // If it has, go on to the next check.
            {
                continue;
            }
            visited[y] = true;              // Update the status of the set of neighbors to visited=true.
            if (y === destination)          // Check if the path is complete.
            {                               // If so, backtrack through the path until it hits the starting node.
                var path = [y];   
                while (x !== start)
                {
                    path.push(x);           // Add the set of nodes to the path array.
                    x = predecessor[x];     
                }
                path.push(x);               // Makes final path array. 
                path.reverse();             // Since we backtracked through the route, we need to reverse
                print(path.join(' --> '));  // the list so it starts from the starting node instead of the destination.
                //console.log(path);
                return;
            }
            predecessor[y] = x;
            queue.push(y);
            //console.log(predecessor);
        }
    }
}
  
  function print(output)                    // Function to print output with a line break
  {
        document.getElementById('display').innerHTML += output + '<br>';
  }
    function findRoute() {                        // Function that initializes a Graph and adds nodes and edges to it.
    var graph = new Graph();
    graph.addEdge('CAN', 'USA');
    graph.addEdge('USA', 'MEX');
    graph.addEdge('MEX', 'BLZ');
    graph.addEdge('MEX', 'GTM');
    graph.addEdge('GTM', 'SLV');
    graph.addEdge('GTM', 'HND');
    graph.addEdge('HND', 'NIC');
    graph.addEdge('NIC', 'CRI');
    graph.addEdge('CRI', 'PAN');
    
    var dest = document.getElementById('fname').value;    // Gets user input from the form in index.html
    shortestPath(graph, 'USA', dest);                     // calls function with starting node of 'USA' and dynamic destination-
  };                                                      // depending on user input.

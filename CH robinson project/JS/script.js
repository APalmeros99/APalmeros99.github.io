/*
    function Graph()
        this function makes a Graph data structure that simple connects nodes to other nodes. the connection
        is an edge.
    
    function shortestPath()
        this function uses Breadth First Search to find all paths

*/
function Graph()
{
    var neighbors = this.neighbors = []; // Key = vertex, value = array of neighbors.
  
    this.addEdge = function (u, v)
    {      
        if (neighbors[u] === undefined)
        {                                  // Add the edge u -> v. with strict comparison of ===
            neighbors[u] = [];
        }
        neighbors[u].push(v);
        if (neighbors[v] === undefined)
        {                                  // Also add the edge v -> u in order                        
            neighbors[v] = [];               // to implement an undirected graph.
        }                                  // For a directed graph, delete
        neighbors[v].push(u);              // these four lines.
    };
    return this;
}
 
function shortestPath(graph, start, destination)
{
    if (start == destination)               //finishes function if destination is same as starting point
    {                                       // EX: start = USA, destination = USA
        print(start);          
        return;                 
    }                           
    var queue = [ start ]
    var visited = { start: true };
    var predecessor = [];
    var tail = 0;

    while (tail < queue.length)
    {
        var u = queue[tail++];              // Pop a vertex off the queue.
        var neighbors = graph.neighbors[u];
        //console.log(neighbors);
        for (var i = 0; i < neighbors.length; ++i) 
        {
            var v = neighbors[i];
            if (visited[v])
            {
                continue;
            }
            visited[v] = true;
            if (v === destination)
            {                       // Check if the path is complete.
                var path = [ v ];   // If so, backtrack through the path.
                while (u !== start)
                {
                    path.push(u);
                    u = predecessor[u];
                }
                path.push(u);
                path.reverse();
                print(path.join(' --> '));
                //console.log(path);
                return;
            }
            predecessor[v] = u;
            queue.push(v);
            //console.log(predecessor);
        }
    }
}
  
  function print(output)
  {
        document.getElementById('display').innerHTML += output + '<br>';
  }
    function fun() {
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
    
    var dest = document.getElementById('fname').value;
    shortestPath(graph, 'USA', dest);
  };

 
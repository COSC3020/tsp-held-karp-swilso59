# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

## Answer 
Worse-case Asymptotic Time Comlexity
1. Total Subproblems:
- This algorithm process:
  -  All subsets of cities: $2^{n}$ subsets for $n$ cities.
  -  All Starting cities: $n$ starting cities for each subset.
     - Total subproblems complexity: $O(n \cdot 2^{n})$.
2. Work Per Subproblem:
- Key Generation:
  - Sorting Cities: $O(n\log(n))$
  - Joining Cities: $O(n)$.
- Subset filtering:
  - Removing the start city takes $O(n)$.
- Recursive Calls
  - Number of recursive calls: $n - 1$ calls for $n$ cities.
  - Each call calculates the distance and updates the shortest path : $O(n)$.
    - Total Work for recursive calls: $O(n^{2})$.
3. Total Time complexity
- Combining the total subproblems and work per subproblem:
  - $O(n \cdot 2^{n}) \cdot O(n^{2}) = O(n^{2} \cdot 2^{n})$.
4. The dominant factor is the recursive processing of all the subsets and starting cities.
- This leads us to a worst-case time complexity of: $\Theta(n^{2} \cdot 2^{n})$.

Worse-case Asymtotic Memory Complexity 

The cache is the most memory intensive component, as it grows exponentially with the number of cities. 
- The number of keys is $2^{n}$.
- For each possible starting city., there are $n \cdot 2^{n}$ keys.
- Each key is a string of length $n$.
- Leaving us with the worse case memory complexity of $\Theta(n^{2} \cdot 2^{n})$. 

## Plagiarism Acknowledgement 
This assignment was definitely difficult. I started by watching a few youtube videos first, trying to understand how the algorithms works. These videos definitly helped me understand the concept of the held-karp algorithm but didnt provide much for the implementation. 

- https://www.youtube.com/watch?v=6jqlBDYNrL0&ab_channel=CSDoctorr
- https://www.youtube.com/watch?v=GIF6f0XMIbk&ab_channel=AlgorithmsLab
- https://www.youtube.com/watch?v=cY4HiiFHO1o&ab_channel=WilliamFiset

Once I felt I had a pretty decent idea of the algorithm, I started working on my implementation using the pseudocode given. I 
eventually ended up looking at a repository to help me complete the implementation. Some of the key points from the exmaple that helped me create my implementation where the memoization, key generation, and filtering remaining cities.
In summary, the videos helped me understand the concept, the pseudocode provided the framework, and the repository assisted with the details of implementation. For the time comlexity and memory complexity I assentially just repeated the steps I have don for previous assugnments and applied them to this algorithm. 

- https://github.com/COSC3020/tsp-held-karp-Dhruv8806/blob/main/code.js





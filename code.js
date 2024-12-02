function tsp_hk(distance_matrix) {
    // Find the shortest path visiting all cities using Held-Karp algorithm.

    // If there are no cities or just one, return 0.
    if (distance_matrix.length <= 1) {
        return 0;
    }

    // Store results of subproblems.
    let cache = {};

    // List of city indices.
    let cities = [];
    for (let i = 0; i < distance_matrix.length; i++) {
        cities.push(i); // Add each city index to the list.
    }

    // Start with the largest possible value.
    let minTourLength = Infinity;

    // Try starting the tour from each city.
    for (let start = 0; start < cities.length; start++) {
        // Compute the shortest path starting from the current city.
        let tourLength = heldKarp(distance_matrix, start, cities, cache);

        // Update shortest path.
        minTourLength = Math.min(minTourLength, tourLength);
    }

    // Return the shortest tour length found.
    return minTourLength === Infinity ? 0 : minTourLength;
}

function heldKarp(distance_matrix, start, cities, cache) {
    // Create a unique key for memoization.
    let key = `${start}-[${cities.sort().join(",")}]`;

    // Return cached result if already computed.
    if (key in cache) {
        return cache[key];
    }

    // Base case: Only two cities remain.
    if (cities.length === 2) {
        // Find the remaining city.
        let otherCity = cities[0] === start ? cities[1] : cities[0];
        // Cache the direct distance.
        cache[key] = distance_matrix[start][otherCity];
        return cache[key];
    }

    // Start with the largest possible value.
    let shortestPath = Infinity;

    // Try all possible next cities.
    for (let nextCity of cities) {
        // Skip the current city.
        if (nextCity !== start) {
            // Exclude the current city from the list.
            let remainingCities = cities.filter(city => city !== start);

            // Add distance to next city and compute the shortest path recursively.
            let candidatePath = heldKarp(distance_matrix, nextCity, remainingCities, cache) 
                                + distance_matrix[start][nextCity];

            // Update the shortest path.
            shortestPath = Math.min(shortestPath, candidatePath);
        }
    }

    // Cache the result for reuse.
    cache[key] = shortestPath;
    return shortestPath;
}

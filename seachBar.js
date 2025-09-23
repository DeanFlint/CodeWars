/*
Goal: “Build a search input that queries an endpoint and renders a list as the user types.”

Thought process:
1. Create a search input field.
2. Event listener for input
3. Fetch data and render list
4. Handle empty string (clear results)
5. Handle errors gracefully

2–3 minutes clarifying requirements.
10–12 minutes coding the minimum working solution.
3–5 minutes narrating improvements you’d add.
*/


const input = document.getElementById("searchInput");
const results = document.getElementById("results");

input.addEventListener("input", async (event) => {
  // we use trim() to remove whitespace from both ends of the string
  const query = event.target.value.trim();

  // if query is an empty string, clear results and return
  if (!query) {
    results.innerHTML = "";
    return
  }

  // fetch data from the API
  try {
    // we want to await the fetch call to complete before proceeding
    const response = await fetch(`https://api.example.com/search?q=${encodeURIComponent(query)}`);
    // we want to await the response.json() call to complete before proceeding
    const data = await response.json();
    // render the results
    // we map over the data array and create a list item for each result
    // then we join the array of list items into a single string and set it as the innerHTML of the results element
    results.innerHTML = data.map(item => `<li>${item.name}</li>`).join("");
  } catch (error) {
    // we want to error handle any issues with the fetch call
    console.error("Error fetching data:", error);
    // we use innerHTML to display an error message to the user
    results.innerHTML = "<li>Error fetching data</li>";
  }

})

// In summary, I added an input event listener to the search input field that fetches data from an API based on the user's query and renders the results in a list. I also handled empty queries and errors gracefully.

/*
If i had more time, I would:
1. Debounce the input event to limit the number of API calls made as the user types.
  - I would do this by setting a timeout that delays the fetch call until the user has stopped typing for a certain period (e.g., 300ms).
2. Add a loading indicator to inform the user that a search is in progress.
  - I would do this by adding a "Loading..." message to the results element before the fetch call and removing it once the data is fetched or an error occurs.
3. Implement pagination or infinite scrolling for large result sets.
  - I would do this by modifying the API call to include pagination parameters (e.g., page number, page size) and adding a "Load More" button or infinite scroll functionality to fetch and display more results as the user scrolls down.
4. Add accessibility features to ensure the search bar is usable by all users.
  - I would do this by adding appropriate ARIA attributes to the input and results elements, ensuring keyboard navigation is supported, and providing clear focus indicators.
5. Style the search bar and results list for better user experience.
6. Add pagination or infinite scroll for large result sets.
*/

/*
Caching would prevent identical queries in the same session.
How I would implement this:
*/

const cache = new Map();
// the signal option allows us to cancel the fetch request if needed
async function fetchResults(query, { signal } = {}) {
  // after the initial query, we store the results in the cache so when this is run again, it would check the cache first
  if (cache.has(query)) return cache.get(query);
  const url = `https://api.example.com/search?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  cache.set(query, data);
  return data;
}

/*
Debounce would limit the number of API calls made as the user types.
*/

let timer = null;
const DEBOUNCE_MS = 300;

input.addEventListener('input', () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    // call the same body you already wrote (or factor it into a function)
    input.dispatchEvent(new Event('debounced-input'));
  }, DEBOUNCE_MS);
});

input.addEventListener('debounced-input', async () => {
  // fetch logic from api here but this would only be called after the user has stopped typing for 300ms
});


/*
In terms of accessibility, I would suggest using aria-live regions to announce updates to screen readers.

<div id="status" role="status" aria-live="polite"></div>
<ul id="results"></ul>

Using aria-live="polite" ensures that screen readers announce changes to the status region without interrupting the user.


“For accessibility, I’d add a small status region with aria-live="polite".
That way, when results change or I show a loading message, screen readers announce it automatically.
Polite means it won’t interrupt the user mid-sentence — if it were an error, I might use assertive instead.”
*/
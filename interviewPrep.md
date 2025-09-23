/*
What’s the difference between props and state? When do you use each?
  Props:
  - Props are data that are passed from Parent to Child components that the child compnent cannot change.
  - They work like function parameters for read-only access.

  State:
    - State is data managed internally withing a component that the component itself can update and which
    dictates the component's mutable, internal memory and appearance.

  - You can use props for configuring a child component with external data and event handlers.
  - You can use state for managing data that changes over time to to user interaction or other internal logic within the component itself.
*/

// Example of props and state
  function Greeting({ name }) { // props comes from parent
    const [count, setCount] = React.useState(0); // state changes inside the component
    return (
      <div>
        <p>Hello {name}, you clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click</button>
      </div>
    );
  }

// ====================================================================================================================================================

/*
How does React decide when to re-render a component?
  - React wi ll re-render a component when either it's state or props change.
  - React compares the new virtual DOM with the old one (diffing) and updates on what changed
*/

// ====================================================================================================================================================

/*
Can you explain what the key prop does in lists, and why it’s important?
  - Key props in lists allow React to identify list items.
  - Without keys, Reach may re-render too much or incorrectly.
  - Key should be unique and stable (alike to an ID)
*/

// ====================================================================================================================================================

/*
How does useEffect work? What’s the purpose of the dependency array?
  - useEffect runs after render, often for side effects (such as API calls, subscriptions)
  - Dependency arrays tells React when to re-run the effect:
    - [] -> run once
    - [value] -> run when value changes
*/

// Example of useEffect with dependency array
function ExampleEffect({ someProp }) {
  React.useEffect(() => {
    // Side effect code here, e.g. fetch data
    console.log('Effect ran');

    return () => {
      // Cleanup code here, e.g. unsubscribe
      console.log('Cleanup');
    };
  }, [someProp]); // Effect runs when someProp changes

  return <div>Check console for effect logs</div>;
}

// ====================================================================================================================================================

/*
What’s the difference between controlled and uncontrolled components?
  - Controlled: React manages the input value with state
  - Uncontrolled: DOM manages the input value (using ref)
  - > Controlled is more common because it keeps data in sync
*/

// Controlled -> React controlls the value
function ControlledInput() {
  const [value, setValue] = React.useState('');
  return (
    <input value={value} onChange={e => setValue(e.target.value)} />
  );
}

// Uncontrolled -> DOM controlls the value, access with ref
function UncontrolledInput() {
  const inputRef = React.useRef();
  function handleSubmit(){
    alert(inputRef.current.value);
  };
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleSubmit}>Show Value</button>
    </div>
  );
}

// ====================================================================================================================================================

/*
Can you explain lifting state up and give an example?
  - This is when state is moved to the closest common parent so multiple children can share it
  - Example: A parent holds 'selectedItem', passes it to two child components
*/

// Example of lifting state up -> Parent holds state, passes to children
function Parent() { // Parent holds the state
  const [color, setColor] = React.useState("red");
  return (
    <>
      <ColorPicker color={color} setColor={setColor} />
      <Display color={color} />
    </>
  );
}

function ColorPicker({ color, setColor }) { // Child receives state and setter
  return (
    <select value={color} onChange={e => setColor(e.target.value)}>
      <option value="red">Red</option>
      <option value="blue">Blue</option>
    </select>
  );
}

function Display({ color }) { // Child receives state
  return <p>Selected color: {color}</p>;
}

// ====================================================================================================================================================

/*
When would you use the Context API instead of props?
  - You would use Context API instead of props when you need to share data deeply across components without passing props at every level.
  - Example: theme, authentication, language.
*/

// Example of Context API
const ThemeContext = React.createContext('light');
function ThemedButton() {
  const theme = React.useContext(ThemeContext);
  return <button className={theme}>I am styled by theme context!</button>;
}
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

// ====================================================================================================================================================

/*
How do you optimize performance in React? (memoization, React.memo, useCallback, etc.)
  - Avoid unneccessary re-renders using:
    - React.memo for components.
    - useCallback and useMemo for functions/values
    - Lazy loading components
*/

// Example of React.memo and useCallback
const ExpensiveComponent = React.memo(function ExpensiveComponent({ onClick }) {
  console.log("Rendering ExpensiveComponent");
  return <button onClick={onClick}>Click me</button>;
});

function ParentWithCallback() {
  const [count, setCount] = React.useState(0);
  const handleClick = React.useCallback(() => {
    setCount(c => c + 1);
  }, []); // Stable reference

  return (
    <div>
      <p>Count: {count}</p>
      <ExpensiveComponent onClick={handleClick} />
    </div>
  );
}

// ====================================================================================================================================================

/*
What’s the difference between client-side rendering (CSR), server-side rendering (SSR), and static site generation (SSG)?
  - Client-side rendering (CSR) -> Browser loads an empty HTML, then React builds UI (slower initial load, faster after)
  - Server-side rendering (SSR) -> Server sends HTML and React hydrates(===WHAT?===) it (faster first load, SEO friendly ===WHY?===)
  - Static site generation (SSG) -> HTML built at build time, served directly. (super fast, good for static content ===WHY?===)
*/

// Example of CSR, SSR, SSG
// CSR: React app loaded in browser
// SSR: Next.js rendering on server
// SSG: Gatsby generating static HTML at build time

// ====================================================================================================================================================

/*
How would you debug a React app where a child component isn’t updating when props change?
  - Check if parent is passing the right value
  - Ensure key is correct in lists
  - Make sure child isn't memorised incorrectly (React.memo might prevent update).
*/

// Example of debugging props issue
function DebuggingExample({ value }) {
  React.useEffect(() => {
    console.log("Value prop changed:", value);
  }, [value]);

  return <div>Value: {value}</div>;
}

// ====================================================================================================================================================

/*
What is a vitural DOM and how does React use it to improve performance?
  - Virtual DOM is a lightweight in-memory representation of the real DOM.
  - React uses it to batch updates and minimize direct DOM manipulations, which are slow.
  - React diffs the virtual DOM with the previous version to determine the minimal set of changes needed to update the real DOM.
*/

// ====================================================================================================================================================

/*
What are subscriptions in React, and how do they work?
  - Subscriptions are a way to listen for changes in data sources (like WebSockets, or external stores).
  - You typically set up subscriptions in useEffect and clean them up in the return function to avoid memory leaks.
*/

// Example of subscription with useEffect
function SubscriptionExample() {
  React.useEffect(() => {
    const handleResize = () => {
      console.log('Window resized:', window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup
    };
  }, []); // Empty array means this effect runs once on mount and cleans up on unmount

  return <div>Resize the window and check the console</div>;
}

// ====================================================================================================================================================

/*
Expand more on what a Contect API is and how it works.
  - Context API allows you to share data globally across the component tree without passing props down manually at every level.
  - You create a Context with React.createContext, provide a value with a Provider, and consume it with useContext or Context.Consumer.
  - Useful for themes, user authentication, language settings, etc.
*/

// Example of Context API
const UserContext = React.createContext(null);
function UserProfile() {
  const user = React.useContext(UserContext);
  return <div>User: {user ? user.name : 'Guest'}</div>;
}
function AppWithUser() {
  const user = { name: 'Alice' };
  return (
    <UserContext.Provider value={user}>
      <UserProfile />
    </UserContext.Provider>
  );
}

// ====================================================================================================================================================

/*
What are closures and how do they relate to React hooks?
  - Closures are functions that "remember" their lexical scope even when executed outside that scope.
  - In React hooks, closures allow functions defined in hooks (like event handlers or effects) to access state and props from the component's scope at the time they were created.
  - This can lead to stale data if not managed properly, hence the need for dependencies in useEffect or useCallback.
*/
// Example of closure in hooks
function ClosureExample() {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1); // Using functional update to avoid stale closure
    }, 1000);
    return () => clearInterval(interval);
  }, []); // Empty array means this effect runs once on mount and cleans up on unmount

  return <div>Count: {count}</div>;
}


// ====================================================================================================================================================

/* How to rewrite a class component to a functional component with hooks?
  - Convert lifecycle methods to useEffect
  - Convert state to useState
  - Remove 'this' references
*/

// Class component
class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.increment}> +1 </button>
      </div>
    );
  }
};

// Functional component with hooks
import {useState } from 'react';

function Counter() {
  // useState for state, hooks no 'this'
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* No 'this', direct access to count */}
      <p>{count}</p>
      {/* No 'this', direct access to setCount */}
      <button onClick={() => setCount(count + 1)}> +1 </button>
    </div>
  )
}

// ====================================================================================================================================================

/*
Reducers in React - what are they and when would you use them?
  - Reducers are functions that take the current state and an action, and return a new state.
  - They are used with useReducer hook for managing complex state logic or when the next state depends on the previous one.
  - Useful for state that involves multiple sub-values or when the state logic is complex.

A reducer is simply just: (state, action) => newState
It's about managing state transitions in a predictable way.
*/

// ====================================================================================================================================================



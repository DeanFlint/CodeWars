import * as React from "react";

export default function App() {
  const [mode, setMode] = React.useState("dark");

  function handleClick(){
    mode === "dark" ? setMode("light") : setMode("dark");
  }

  return (
    <main className={mode}>
      {mode === "light" ? (
        <button onClick={handleClick}>Activate Dark Mode</button>
      ) : (
        <button onClick={handleClick}>Activate Light Mode</button>
      )}
    </main>
  );
}

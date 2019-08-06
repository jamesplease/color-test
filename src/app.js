import React from "react";
import "./app.css";
import Scale from "./scale";

const colors = [
  {
    title: "Moana",
    hex: "#2aadcb"
  },
  {
    title: "Sex Education",
    hex: "#dab11f"
  },
  {
    title: "The Punisher",
    hex: "#ea2026"
  }
];

function App() {
  return (
    <div className="app">
      {colors.map(c => {
        return <Scale hex={c.hex} key={c.title} />;
      })}
    </div>
  );
}

export default App;

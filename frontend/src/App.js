import logo from "./logo.png";
import "./App.css";

function App() {
  fetch("http://localhost:4000/launches", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="header">Launches</h1>
    </div>
  );
}

export default App;

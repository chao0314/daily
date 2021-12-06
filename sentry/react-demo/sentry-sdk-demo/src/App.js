
import './App.css';

function App() {
  function fn() {
    console.log(window.a.b);
  }
  return (
      <button onClick={fn}>Break the world</button>
  );
}

export default App;

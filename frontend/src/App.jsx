import StackVisualizer from "./components/Stack/StackVisualizer";
import QueueVisualizer from "./components/Queue/QueueVisualizer";
import "./App.css";
function App() {
  return (
    <div className="App">
      {" "}
      <h1>Visualizador de Estructuras de Datos</h1> <StackVisualizer />{" "}
      <QueueVisualizer />
    </div>
  );
}
export default App;

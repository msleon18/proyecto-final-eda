import StackVisualizer from "./components/Stack/StackVisualizer";
import QueueVisualizer from "./components/Queue/QueueVisualizer";
import BSTVisualizer from "./components/BST/BSTVisualizer";
import "./App.css";
function App() {
  return (
    <div className="App">
      {" "}
      <h1>Visualizador de Estructuras de Datos</h1> <StackVisualizer />{" "}
      <QueueVisualizer />
      <BSTVisualizer />
    </div>
  );
}
export default App;

import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import {useState, useEffect} from "react";

function App() {
  const [inputText, setInputText] = useState("");
  
  const [todos, setTodos] = useState([]);
  
  const [status, setStatus] = useState("all");
  
  const [filteredTodos, setFilteredTodos] = useState([]); 
  
  const filterHandler = () => {
    switch(status){
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  useEffect(() => {
    getLocalTodos()
  }, [])

  useEffect(() =>{
    filterHandler()
    saveLocalTodos()
  }, [todos, status])

  const saveLocalTodos = () => {
    if(todos.length > 0){
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos", JSON.stringify([]))
    } else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"))
      setTodos(todoLocal)
    }
  }

  return (
    <div className="App">
      <header>
        <h1>zgr's Todo List</h1>        
      </header>
      <Form setStatus={setStatus} todos={todos} setTodos={setTodos} setInputText={setInputText} inputText={inputText}/>
      <TodoList filteredTodos={filteredTodos} todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;

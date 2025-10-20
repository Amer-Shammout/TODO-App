import { createContext, useContext, useState, useMemo, useEffect } from "react";

const TodosContext = createContext();

export function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("amer-todos");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setTodos(parsed);
      } catch (error) {
        console.error("Error loading todos:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if(isLoaded) localStorage.setItem("amer-todos", JSON.stringify(todos));
  }, [todos,isLoaded]);

  const completedCount = useMemo(
    () => todos.filter((t) => t.isFinished).length,
    [todos]
  );

  const activeCount = useMemo(
    () => todos.filter((t) => !t.isFinished).length,
    [todos]
  );

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  const toggleTodo = (id) =>
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isFinished: !todo.isFinished } : todo
      )
    );

  const editTodo = (id, title, subtitle) =>
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title, subtitle } : todo))
    );

  const deleteTodo = (id) =>
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.isFinished);
      case "completed":
        return todos.filter((todo) => todo.isFinished);
      default:
        return todos;
    }
  }, [todos, filter]);

  const value = {
    todos,
    filteredTodos,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    filter,
    setFilter,
    activeCount,
    completedCount,
    isLoaded
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodosContext);
}

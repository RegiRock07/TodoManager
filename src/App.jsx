import { useState, useEffect } from 'react'
import { TodoProvider } from "./contexts"
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([])  //todos is an array

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo},...prev]); //naya todo added infront of prev
  };
  /* prev concept... purani state ka access miljata hai*/
  
  const updateTodo = (id, newTodo) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...newTodo } : item
      ));
  };

  const deleteTodo = (id) => {   //jo id doge uss id ka todo delete
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };
  /* Keep all items except the one where item.id === id */

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((item) =>
      item.id === id ? {...item, completed: !item.completed} : item
    ));
  };
  /* Now CheckBox ke liye... Array mei har Todo object ke andar jaao and completed value ko toggle
  kro.. true hai toh false krdo... false hai toh true kardo*/

  /*
  🧠 What is localStorage?
  localStorage is a built-in browser storage that lets you store data in the browser 
  permanently (until it's manually cleared). It stores key-value pairs as strings.

  ✅ Data stays even if you refresh or close the browser.

  🔐 Syntax
    👉 localStorage.setItem(key, value)
    Stores a value under a given key
    Both key and value must be strings

    👉 localStorage.getItem(key)
    Retrieves the value stored under a key
  */

  //Local_Storage (String <---> JSON)
  //local storage mei string mei stored hota hai we need in JSON

  /* when application is loading, it might already have todos.. so they should appear on loading */
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")) //string ---> JSON
    if(todos && todos.length > 0){
      setTodos(todos)
    }
  }, []);

  //Auto-save todos to local storage on any change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))   //both parameters string
  }, [todos]);

  // Clear completed todos function
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((item) => !item.completed));
  };

  // Progress calculation
  const totalTodos = todos.length;
  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const progressPercentage = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete, clearCompleted }}>
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-10 px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl px-6 py-6 text-white relative overflow-hidden group">
          {/* Header glow effect */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 opacity-70"></div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-2 h-2 bg-emerald-400/30 rounded-full animate-bounce delay-100"></div>
            <div className="absolute top-20 right-20 w-1 h-1 bg-blue-400/30 rounded-full animate-bounce delay-300"></div>
            <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-bounce delay-500"></div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 mt-2 tracking-wide text-gray-100">
            Todo Application
          </h1>

          
          <div className="mb-6">
            {/* Todo form goes here */} 
            <TodoForm/>
          </div>
          
          {/* Progress Section */}
          {todos.length > 0 && (
            <div className="mb-6 p-4 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-600/50">
              {/* Stats Row */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">Total: <span className="font-semibold text-white">{totalTodos}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Active: <span className="font-semibold text-orange-400">{activeTodos}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Completed: <span className="font-semibold text-emerald-400">{completedTodos}</span></span>
                  </div>
                </div>
                {completedTodos > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="px-3 py-1 bg-red-600/80 hover:bg-red-600 text-white text-sm rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Clear Completed
                  </button>
                )}
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Progress</span>
                  <span className="text-sm font-semibold text-emerald-400">{Math.round(progressPercentage)}% Complete</span>
                </div>
                <div className="w-full bg-gray-700/80 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.length === 0 ? (
              <div className="w-full text-center py-12 text-gray-400">
                <div className="text-6xl mb-4 animate-bounce">📝</div>
                <p className="text-lg">No todos yet! Add your first todo above.</p>
              </div>
            ) : (
              todos.map((todo, index) => (
                <div key={todo.id}     //key dena is important varna performance bekaar
                  className='w-full transform transition-all duration-300 animate-fadeInUp'
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <TodoItem todo={todo} />
                </div>
              ))
            )}
          </div>
          
          {/* Stats footer */}
          {todos.length > 0 && (
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex justify-between text-sm text-gray-400">
                <span className="hover:text-emerald-400 transition-colors duration-300">High Priority: {todos.filter(t => t.priority === 'high').length}</span>
                <span className="hover:text-blue-400 transition-colors duration-300">Low Priority: {todos.filter(t => t.priority === 'low').length}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
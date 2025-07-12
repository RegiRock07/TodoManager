import React, { useState } from 'react'
import { useTodo } from '../contexts';

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)        //todo khud object hai.. jiske andar ek value todo(msg) hai
    const [isDeleting, setIsDeleting] = useState(false)
    const [isToggling, setIsToggling] = useState(false)
    const { updateTodo, deleteTodo, toggleComplete } = useTodo()    //bring functionalities from the context
    
    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg })            //purana same rehne do msg update krdo bas 
        setIsTodoEditable(false)
    }
    
    const toggleCompleted = () => {
        setIsToggling(true)
        setTimeout(() => {
            toggleComplete(todo.id)                               // already defined in App.jsx
            setIsToggling(false)
        }, 150)
    }
    
    // Priority colors and styles
    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'high':
                return {
                    borderColor: 'border-red-500/50',
                    bgColor: 'bg-red-900/20',
                    glowColor: 'shadow-red-500/10',
                    hoverBg: 'hover:bg-red-800/30',
                    priorityIcon: '🔴',
                    priorityText: 'text-red-400'
                };
            case 'low':
                return {
                    borderColor: 'border-blue-500/50',
                    bgColor: 'bg-blue-900/20',
                    glowColor: 'shadow-blue-500/10',
                    hoverBg: 'hover:bg-blue-800/30',
                    priorityIcon: '🔵',
                    priorityText: 'text-blue-400'
                };
            default:
                return {
                    borderColor: 'border-gray-500/50',
                    bgColor: 'bg-gray-700/80',
                    glowColor: 'shadow-gray-900/30',
                    hoverBg: 'hover:bg-gray-600/80',
                    priorityIcon: '⚪',
                    priorityText: 'text-gray-400'
                };
        }
    };

    const priorityStyles = getPriorityStyles(todo.priority);
    
    const handleDelete = () => {
        setIsDeleting(true)
        setTimeout(() => {
            deleteTodo(todo.id)
        }, 300)
    }
    
    return (
        <div
            className={`flex items-center border rounded-xl px-5 py-4 gap-4 shadow-xl transition-all duration-500 backdrop-blur-sm relative 
                ${todo.completed 
                    ? "bg-gray-800/60 border-gray-600/50 shadow-gray-900/20" 
                    : `${priorityStyles.bgColor} ${priorityStyles.borderColor} ${priorityStyles.glowColor} ${priorityStyles.hoverBg}`
                }
                ${isDeleting ? 'animate-pulse scale-95 opacity-50' : 'hover:shadow-2xl hover:transform hover:scale-[1.02]'}
                ${isToggling ? 'animate-pulse' : ''}
            `}
        >
            {/* Animated background gradient */}
            
            {/* Completion animation overlay */}
            {todo.completed && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 opacity-50 animate-pulse"></div>
            )}
            
            {/* Priority indicator */}
            <div className="flex items-center gap-2">
                <span className="text-lg">{priorityStyles.priorityIcon}</span>
                <div className="relative">
                    <input
                        type="checkbox"
                        className="h-5 w-5 accent-emerald-500 cursor-pointer rounded transition-all duration-300 hover:scale-125 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                        checked={todo.completed}
                        onChange={toggleCompleted}
                    />
                    {/* Custom checkmark animation */}
                    {todo.completed && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="flex-1 relative">
                <div className="flex items-center gap-2 mb-1">
                    <input
                        type="text"
                        className={`flex-1 text-lg bg-transparent outline-none rounded-lg font-medium tracking-wide transition-all duration-300
                            ${isTodoEditable 
                                ? "border border-gray-500 px-3 py-2 bg-gray-800/80 text-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 shadow-lg focus:shadow-emerald-500/20" 
                                : "border-none text-gray-200"
                            } 
                            ${todo.completed ? "line-through text-gray-500" : "text-white"}
                            ${!isTodoEditable && !todo.completed ? "hover:text-emerald-300 cursor-pointer" : ""}`}
                        value={todoMsg}
                        onChange={(e) => setTodoMsg(e.target.value)}
                        readOnly={!isTodoEditable}
                    />
                </div>
                <div className={`text-xs font-medium ${priorityStyles.priorityText}`}>
                    {todo.priority === 'high' ? 'High Priority' : 'Low Priority'}
                </div>
                {/* Text highlight effect */}
                {/* {!isTodoEditable && !todo.completed && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
                )} */}
            </div>
            
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-10 h-10 rounded-xl text-lg border border-gray-500/50 justify-center items-center bg-gray-800/80 hover:bg-gray-700/80 transition-all duration-300 disabled:opacity-40 shadow-lg hover:shadow-emerald-500/20 transform hover:scale-110 active:scale-95 relative overflow-hidden group/btn"
                onClick={() => {
                    if (todo.completed) return;
                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                <span className="relative z-10 transition-all duration-300 group-hover/btn:scale-110">
                    {isTodoEditable ? "📁" : "✏️"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-0 group-hover/btn:opacity-100 transition-all duration-300"></div>
            </button>
            
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-10 h-10 rounded-xl text-lg border border-gray-500/50 justify-center items-center bg-gray-800/80 hover:bg-red-600/80 transition-all duration-300 shadow-lg hover:shadow-red-500/30 transform hover:scale-110 active:scale-95 relative overflow-hidden group/btn"
                onClick={handleDelete}
            >
                <span className="relative z-10 transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12">
                    ❌
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 opacity-0 group-hover/btn:opacity-100 transition-all duration-300"></div>
            </button>
        </div>
    );
}

export default TodoItem;
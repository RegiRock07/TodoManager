import React, { useState } from 'react'
import { useTodo } from '../contexts'

function TodoForm() {
    const [todo, setTodo] = useState("")
    const [priority, setPriority] = useState("low") // Default priority is low
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {addTodo} = useTodo()        //context se utha lia
    
    const add = (e) => {
        e.preventDefault();
        if (!todo.trim()) return; // ✅ ignores empty/whitespace-only input
        
        setIsSubmitting(true)
        setTimeout(() => {
            addTodo({ todo: todo.trim(), completed: false, priority: priority });
            setTodo(""); // ✅ clears input after add
            setPriority("low"); // Reset priority to low
            setIsSubmitting(false)
        }, 150) // Small delay for animation feedback
    };
    
    return (
        <div className="space-y-4">
            {/* Priority Selection */}
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => setPriority("low")}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        priority === "low" 
                            ? "bg-blue-600/80 text-white shadow-lg shadow-blue-500/30" 
                            : "bg-gray-700/80 text-gray-300 hover:bg-gray-600/80"
                    }`}
                >
                    🔵 Low Priority
                </button>
                <button
                    type="button"
                    onClick={() => setPriority("high")}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        priority === "high" 
                            ? "bg-red-600/80 text-white shadow-lg shadow-red-500/30" 
                            : "bg-gray-700/80 text-gray-300 hover:bg-gray-600/80"
                    }`}
                >
                    🔴 High Priority
                </button>
            </div>
            
            {/* Todo Input Form */}
            <form onSubmit={add} className="flex w-full gap-3">
                <div className="flex-grow relative">
                    <input
                        type="text"
                        placeholder="Write Todo..."
                        className="w-full rounded-xl px-5 py-3 text-sm sm:text-base bg-gray-800/80 border border-gray-600/50 placeholder-gray-400 text-white outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 backdrop-blur-sm shadow-lg hover:bg-gray-700/80 hover:shadow-xl hover:shadow-emerald-500/10 focus:shadow-emerald-500/20 transform hover:scale-[1.02] focus:scale-[1.02]"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shrink-0 shadow-lg hover:shadow-emerald-500/30 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group ${isSubmitting ? 'animate-pulse' : ''}`}
                >
                    <span className="relative z-10">{isSubmitting ? 'Adding...' : 'Add'}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </button>
            </form>
        </div>
    );
}

export default TodoForm;
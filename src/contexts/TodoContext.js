import { createContext, useContext } from "react";

//CreateContext
export const TodoContext = createContext({
    todos: [                                  //Array aur uske andar objects(variables)
        {
            id: 1,
            todo: "Todo Msg",
            completed: false,
        }
    ],
    //Now functions ---> again define their functionality in app.jsx not here
    addTodo: (todo) => {},
    updateTodo: (id,todo)=> {},               //id mtlb konsa todo update krna hai
    deleteTodo: (id) =>  {},
    toggleComplete: (id) => {}
})

//UseContext
export const useTodo = () => {
    return useContext(TodoContext)
}

//ContextProvider
export const TodoProvider = TodoContext.Provider




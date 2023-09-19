import { contactService } from "../../services/contact.service.js"
import { userService } from "../../services/user.service.js"
import { ADD_TODO, REMOVE_TODO, SET_FILTER_BY, SET_IS_LOADING, SET_TODOS, UPDATE_TODO } from "../reducers/contact.reducer.js"
import { store } from '../store.js'

export function loadTodos(sortBy) {
    const { filterBy } = store.getState().contactModule
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return contactService.query(filterBy, sortBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos: todos.todosToDisplay, todoCount: todos.todoCount, doneCount: todos.doneCount })
        })
        .catch(err => {
            console.log('car action -> Cannot load todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeTodo(todoId) {
    return contactService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('car action -> Cannot remove todo', err)
            throw err
        })
}

export function toggleTodo(todoToToggle) {
    return contactService.save(todoToToggle)
        .then((savedTodo) => {
            store.dispatch({ type: UPDATE_TODO, todo: savedTodo })
        })
        .catch(err => {
            console.log('Cannot toggle todo', err)
            throw err
        })
}

export function addTodo(todoToAdd, loggedinUser) {
    return contactService.save(todoToAdd)
        .then(savedTodo => {
            store.dispatch({ type: ADD_TODO, todo: savedTodo })
            // if (loggedinUser) {
            //     userService.addActivity(loggedinUser._id, todoToAdd)
            //         .catch(err => {
            //             console.error('Error adding activity:', err)
            //         })
            // }
        })
        .catch(err => {
            console.log('Cannot add todo', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}
const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { addTodo, loadTodos, removeTodo, setFilterBy, toggleTodo } from '../store/actions/contact.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import {  contactService } from '../services/contact.service.js'
import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoSort } from '../cmps/TodoSort.jsx'
import { ContactList } from '../cmps/ContactList.jsx'

export function ContactIndex() {

    const todos = useSelector(storeState => storeState.contactModule.todos)
    const filterBy = useSelector(storeState => storeState.contactModule.filterBy)
    const loggedinUser = useSelector(storeState => storeState.contactModule.loggedinUser)
    const isLoading = useSelector(storeState => storeState.contactModule.isLoading)
    const [todoToAdd, setTodoToAdd] = useState(contactService.getEmptyTodo())
    const [sortBy, setSortBy] = useState({ type: '', desc: -1 })

    useEffect(() => {
        loadTodos(sortBy)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy, sortBy])

    function onSetFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    function onToggleTodo(todo) {
        const todoToToggle = todo
        todoToToggle.isDone = !todoToToggle.isDone
        toggleTodo(todoToToggle)
            .then(() => {
                showSuccessMsg('Todo toggled')
            })
            .catch(err => {
                console.log('Cannot toggle todo', err)
                showErrorMsg('Cannot toggle todo')
            })
    }

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg('Todo removed')
            })
            .catch(err => {
                console.log('Cannot remove todo', err)
                showErrorMsg('Cannot remove todo')
            })
    }

    function handleChange({ target }) {
        const value = target.value
        setTodoToAdd(prevTodo => ({ ...prevTodo, txt: value }))
    }

    function onAddTodo(ev) {
        ev.preventDefault()
        addTodo(todoToAdd, loggedinUser)
            .then(() => {
                showSuccessMsg('Todo added')
                setTodoToAdd(contactService.getEmptyTodo())
            })
            .catch(err => {
                console.log('Cannot add todo', err)
                showErrorMsg('Cannot add todo')
            })
    }

    return (
        <section className='todo-index'>
            {/* <h3>Todos App</h3> */}
            <main>
                {/* <TodoFilter
                    onSetFilterBy={onSetFilterBy}
                    filterBy={filterBy}
                /> */}
                <form onSubmit={onAddTodo}>
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        onChange={handleChange}
                    value={todoToAdd.txt}
                    />
                    <button>Add</button>
                </form>
                {/* <TodoSort sortBy={sortBy} setSortBy={setSortBy} /> */}
                {!isLoading && <ContactList
                    todos={todos}
                    onRemoveTodo={onRemoveTodo}
                    onToggleTodo={onToggleTodo}
                />}
                {isLoading && <div>Loading...</div>}
            </main>
        </section>
    )
}
import { ContactPreview } from "./ContactPreview.jsx"

const { Link } = ReactRouterDOM

export function ContactList({ todos, onRemoveTodo, onToggleTodo }) {
    if (!todos) return <p>No todos to show..</p>
    return (
        <section className="todo-list">
            <ul>
                {
                // todos.length ?
                 todos.map(todo =>
                        <li key={todo._id}>
                            <ContactPreview
                                todo={todo}
                                onToggleTodo={onToggleTodo}
                            />
                            <div>
                                <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>
                                <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                                <button onClick={() => onRemoveTodo(todo._id)}>Remove</button>
                            </div>
                        </li>)

                    // : <p>No todos to show..</p>
                    }

            </ul>
        </section>
    )
}
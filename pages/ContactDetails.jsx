const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { contactService } from "../services/contact.service.js"

export function ContactDetails() {
    const params = useParams()
    const navigate = useNavigate()

    const [currTodo, setCurrTodo] = useState(null)

    useEffect(() => {
        contactService.getById(params.id)
            .then(todo => {
                if (!todo) return navigate('/todo')
                setCurrTodo(todo)
            })
            .catch(err => {
                console.log('Had issues loading todo', err);
            })
    }, [])

    if (!currTodo) return <h4>loading</h4>
    const { _id, txt, isDone } = currTodo
    return (
        <section className="todo-details">
            <div className="todo-data-container">
                <h1>Id: {_id}</h1>
                <h1>To Do: {txt}</h1>
                <h1>Is done?: {isDone ? 'yes' : 'no'}</h1>
                <button className="back-btn" onClick={() => navigate('/todo')}>
                    Back to todos
                </button>
            </div>
        </section>
    )
}
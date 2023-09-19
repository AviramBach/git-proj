const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

import { AppHeader } from "./cmps/AppHeader.jsx"
import { AppFooter } from "./cmps/AppFooter.jsx"

import { HomePage } from "./pages/HomePage.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { ContactDetails } from "./pages/ContactDetails.jsx"
import { ContactIndex } from "./pages/ContactIndex.jsx"
import { TodoEdit } from "./pages/TodoEdit.jsx"
import { store } from './store/store.js'

export function App() {
    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<ContactDetails />} path="/todo/:id" />
                            <Route element={<ContactIndex />} path="/todo" />
                            <Route element={<TodoEdit />} path="/todo/edit/:todoId" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}
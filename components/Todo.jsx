import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addTodo, removeTodo } from '../store/reducers/todos'
import TodoItem from './TodoItem'

class Todo extends Component {
    constructor(props) {
        super(props)
        this.handleAddTodos = this.handleAddTodos.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
        this.state = {
            text: ''
        }
    }
    handleAddTodos(e) {
        e.preventDefault()
        this.props.addTodo({
            text: this.state.text
        })
        this.setState({ text: '' })
    }
    removeTodo(todo) {
        this.props.removeTodo({ todo })
    }
    render() {
        return (
            <div className="mdl-card mdl-shadow--2dp">
                <form onSubmit={this.handleAddTodos}>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input
                            type="text"
                            value={this.state.text}
                            onInput={e =>
                                this.setState({ text: e.target.value })
                            }
                            className="mdl-textfield__input"
                            id="input"
                        />
                        <label className="mdl-textfield__label" htmlFor="input">
                            What must be done?
                        </label>
                    </div>
                </form>

                <ul>
                    {this.props.todos.map((todo, i) => {
                        return (
                            <TodoItem
                                key={i}
                                todo={todo}
                                remove={this.removeTodo}
                            />
                        )
                    })}
                </ul>
                <style>{`
						form {
							background: #fff;
							padding: 10px;
						}
						ul {
							min-height: 100px;
							margin: 0;
							padding: 0;
							text-align: left;
							list-style: none;
						}
						ul li {
							padding: 10px;
							background: #FFF;
							border-bottom: 1px solid #EEE;
						}
						ul li:nth-child(2n) {
							background: #EEF6FF;
						}
						ul li:last-child {
							border-bottom: none;
						}
						.mdl-card {
							margin: auto;
							transition: all .3s;
							transform: translateY(100px);
						}
					`}</style>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos.toJS().data
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({ addTodo, removeTodo }, dispatch)
    return { ...actions, dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(Todo)

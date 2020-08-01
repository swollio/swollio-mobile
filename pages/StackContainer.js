import React, { Component } from 'react'

/**
 * StackContainer handles the logic of using stack based navigation.
 * If a workflow requires traversal of a navigation tree, it should 
 * use this container.
 * 
 * The usage of stack navigation is as follows: If a view wants to 
 * push a new view onto the stack (i.e view a 'details' page), the
 * following pattern should be used:
 * 
 * ``` props.push((props) => <Element {...props} />) ```
 * 
 * If a view wants to go back to the most recent view, the following
 * pattern should be used:
 * 
 * ``` pop() ```
 */
export default class StackContainer extends Component {

    state = {
        stack: [this.props.rootView]
    }

    push(CustomElement) {
        this.setState({
            stack: [CustomElement, ...this.state.stack]
        })
    };

    pop() {
        if (this.state.stack.length > 1) {
            this.setState({
                stack: this.state.stack.slice(1)
            })
        }
    }

    render() {
        const CustomElement = this.state.stack[0];
        return (
            <CustomElement
                push={(CustomElement) => this.push(CustomElement)}
                pop={() => (this.pop())}
            />
        )
    }
   
}
import React, { useState } from 'react'
import { View } from 'react-native'

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
export default function StackContainer (props) {
    const [stack, setStack] = useState([props.rootView])
    const Current = stack[0];
    const push = (CustomElement) => setStack([CustomElement, ...stack]);
    const pop = () => stack.length > 1 && setStack(stack.slice(1));
    return <Current push={push} pop={pop} />
}
// 小前 Day1练习 #2: React组件
// TypeScript + React基础 - 组件定义
import React, { useState, useEffect } from 'react';

// ==================== 组件定义 ====================

// 1. 简单的函数组件
interface GreetingProps {
    name: string;
    time?: string;
}

const Greeting: React.FC<GreetingProps> = ({ name, time = "现在" }) => {
    return (
        <div className="greeting">
            <h2>你好, {name}!</h2>
            <p>当前时间: {time}</p>
        </div>
    );
};

// 2. 计数器组件 - 展示状态管理
interface CounterProps {
    initialCount?: number;
    step?: number;
}

const Counter: React.FC<CounterProps> = ({ 
    initialCount = 0, 
    step = 1 
}) => {
    const [count, setCount] = useState(initialCount);
    const [history, setHistory] = useState<number[]>([initialCount]);
    
    const increment = () => {
        const newCount = count + step;
        setCount(newCount);
        setHistory([...history, newCount]);
    };
    
    const decrement = () => {
        const newCount = count - step;
        setCount(newCount);
        setHistory([...history, newCount]);
    };
    
    const reset = () => {
        setCount(initialCount);
        setHistory([initialCount]);
    };
    
    return (
        <div className="counter">
            <h3>计数器: {count}</h3>
            <div className="buttons">
                <button onClick={decrement}>-</button>
                <button onClick={reset}>重置</button>
                <button onClick={increment}>+</button>
            </div>
            <p>历史: {history.join(' -> ')}</p>
        </div>
    );
};

// 3. Todo列表组件
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, text: "学习TypeScript", completed: true },
        { id: 2, text: "学习React", completed: false },
        { id: 3, text: "完成Day1练习", completed: false }
    ]);
    const [input, setInput] = useState("");
    
    const addTodo = () => {
        if (input.trim()) {
            const newTodo: Todo = {
                id: Date.now(),
                text: input,
                completed: false
            };
            setTodos([...todos, newTodo]);
            setInput("");
        }
    };
    
    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };
    
    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
    
    return (
        <div className="todo-list">
            <h3>待办事项 ({todos.filter(t => !t.completed).length}/{todos.length})</h3>
            <div className="input-row">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="添加新任务..."
                />
                <button onClick={addTodo}>添加</button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        <span onClick={() => toggleTodo(todo.id)}>
                            {todo.completed ? '✓' : '○'} {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>删除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// 4. 带有useEffect的组件
const DataFetcher: React.FC<{ url: string }> = ({ url }) => {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        // 模拟数据获取
        setLoading(true);
        const timer = setTimeout(() => {
            setData(`从 ${url} 获取的数据`);
            setLoading(false);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [url]);
    
    if (loading) return <div>加载中...</div>;
    if (error) return <div>错误: {error}</div>;
    
    return (
        <div className="data-fetcher">
            <p>数据: {data}</p>
        </div>
    );
};

// 导出组件
export { Greeting, Counter, TodoList, DataFetcher };
export type { Todo, GreetingProps, CounterProps };

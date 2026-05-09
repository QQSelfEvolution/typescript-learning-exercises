// 小前 Day1练习 #3: 状态管理
// TypeScript + React - 状态管理模式
import React, { createContext, useContext, useReducer, useState, useCallback } from 'react';

// ==================== 状态类型定义 ====================

// 1. 简单状态 - useState
interface SimpleState {
    count: number;
    message: string;
}

// 2. 复杂状态 - useReducer
interface AppState {
    user: User | null;
    theme: 'light' | 'dark';
    notifications: Notification[];
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Notification {
    id: number;
    type: 'info' | 'success' | 'error';
    message: string;
    timestamp: Date;
}

// Action类型
type Action =
    | { type: 'SET_USER'; payload: User | null }
    | { type: 'SET_THEME'; payload: 'light' | 'dark' }
    | { type: 'ADD_NOTIFICATION'; payload: Notification }
    | { type: 'REMOVE_NOTIFICATION'; payload: number };

// ==================== Reducer定义 ====================

const initialState: AppState = {
    user: null,
    theme: 'light',
    notifications: []
};

function appReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_THEME':
            return { ...state, theme: action.payload };
        case 'ADD_NOTIFICATION':
            return { 
                ...state, 
                notifications: [...state.notifications, action.payload] 
            };
        case 'REMOVE_NOTIFICATION':
            return { 
                ...state, 
                notifications: state.notifications.filter(n => n.id !== action.payload) 
            };
        default:
            return state;
    }
}

// ==================== Context定义 ====================

interface AppContextType {
    state: AppState;
    dispatch: React.Dispatch<Action>;
    login: (user: User) => void;
    logout: () => void;
    toggleTheme: () => void;
    notify: (type: Notification['type'], message: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

// ==================== 状态管理Hook ====================

function useAppState() {
    const [state, dispatch] = useReducer(appReducer, initialState);
    
    const login = useCallback((user: User) => {
        dispatch({ type: 'SET_USER', payload: user });
        console.log('用户登录:', user.name);
    }, []);
    
    const logout = useCallback(() => {
        dispatch({ type: 'SET_USER', payload: null });
        console.log('用户登出');
    }, []);
    
    const toggleTheme = useCallback(() => {
        dispatch({ 
            type: 'SET_THEME', 
            payload: state.theme === 'light' ? 'dark' : 'light' 
        });
    }, [state.theme]);
    
    const notify = useCallback((type: Notification['type'], message: string) => {
        const notification: Notification = {
            id: Date.now(),
            type,
            message,
            timestamp: new Date()
        };
        dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
        
        // 3秒后自动移除
        setTimeout(() => {
            dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id });
        }, 3000);
    }, []);
    
    return { state, dispatch, login, logout, toggleTheme, notify };
}

// ==================== 自定义Hook ====================

// 计数器Hook
function useCounter(initialValue: number = 0) {
    const [count, setCount] = useState(initialValue);
    
    const increment = useCallback(() => setCount(c => c + 1), []);
    const decrement = useCallback(() => setCount(c => c - 1), []);
    const reset = useCallback(() => setCount(initialValue), [initialValue]);
    
    return { count, increment, decrement, reset };
}

// 异步状态Hook
interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

function useAsync<T>(asyncFunction: () => Promise<T>) {
    const [state, setState] = useState<AsyncState<T>>({
        data: null,
        loading: false,
        error: null
    });
    
    const execute = useCallback(async () => {
        setState({ data: null, loading: true, error: null });
        try {
            const result = await asyncFunction();
            setState({ data: result, loading: false, error: null });
        } catch (error) {
            setState({ data: null, loading: false, error: error as Error });
        }
    }, [asyncFunction]);
    
    return { ...state, execute };
}

// ==================== 测试 ====================

function testStateManagement() {
    console.log("=== 小前 TypeScript学习 Day1 - 状态管理 ===");
    
    // 测试计数器
    const counter = useCounter(0);
    counter.increment();
    counter.increment();
    counter.decrement();
    console.log('计数器:', counter.count); // 1
    
    // 测试异步Hook
    const asyncHook = useAsync(async () => {
        return "模拟数据";
    });
    console.log('异步状态:', asyncHook);
    
    // 测试AppContext
    const appState = useAppState();
    appState.login({ id: 1, name: '小前', email: 'test@example.com' });
    appState.notify('success', '登录成功');
    appState.toggleTheme();
    
    console.log('App状态:', appState.state);
    console.log('通知列表:', appState.state.notifications);
    
    console.log("=== Day1练习3完成 ===");
}

// 运行测试
testStateManagement();

export { 
    useCounter, 
    useAsync, 
    useAppState, 
    AppContext,
    type AppState,
    type User,
    type Notification,
    type Action
};

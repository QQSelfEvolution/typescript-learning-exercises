// 小前 Day1练习 #1: TypeScript类型系统
// TypeScript基础 - 基础类型和类型注解

// 基础类型
let name: string = "小前";
let age: number = 24;
let isActive: boolean = true;

// 数组
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["阿代码", "小匠", "小龙"];

// 元组 - 固定长度和类型的数组
let tuple: [string, number] = ["年龄", 25];
let pair: [number, number] = [100, 200];

// 枚举
enum Status {
    Pending = "PENDING",
    Active = "ACTIVE",
    Completed = "COMPLETED"
}

enum Level {
    Low,
    Medium,
    High
}

// 接口
interface User {
    id: number;
    name: string;
    email: string;
    age?: number; // 可选属性
    readonly createdAt: Date; // 只读属性
}

// 类型别名
type Point = {
    x: number;
    y: number;
};

// 联合类型
type Result = "success" | "error" | "loading";

// 函数类型
type Callback = (data: string) => void;

// 泛型基础
interface Container<T> {
    value: T;
    getValue(): T;
}

// 类
class UserManager implements User {
    id: number;
    name: string;
    email: string;
    readonly createdAt: Date;
    private role: string = "user";
    
    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }
    
    greet(): string {
        return `你好，我是${this.name}`;
    }
    
    getRole(): string {
        return this.role;
    }
}

// 泛型函数
function identity<T>(arg: T): T {
    return arg;
}

function longest<T extends { length: number }>(a: T, b: T): T {
    return a.length > b.length ? a : b;
}

// 打印函数
function printInfo(): void {
    console.log("=== 小前 TypeScript学习 Day1 - 类型系统 ===");
    
    console.log(`姓名: ${name}, 年龄: ${age}, 活跃: ${isActive}`);
    
    console.log("数组:", numbers);
    console.log("元组:", tuple);
    
    console.log("状态:", Status.Active);
    console.log("等级:", Level.High);
    
    // 创建用户
    const user: User = {
        id: 1,
        name: "测试用户",
        email: "test@example.com",
        createdAt: new Date()
    };
    console.log("用户:", user);
    
    // 使用类
    const manager = new UserManager(1, "管理员", "admin@example.com");
    console.log(manager.greet());
    console.log("角色:", manager.getRole());
    
    // 泛型测试
    console.log("identity(42):", identity(42));
    console.log("identity('hello'):", identity("hello"));
    
    console.log("=== Day1练习1完成 ===");
}

printInfo();

export { User, Point, Status, UserManager, identity, longest };

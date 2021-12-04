class HelloWorld {
    name: string;
    constructor(name:string){
        this.name = name || 'Вася';
    }
    print(){
        console.log('hello, '+this.name)
    }
}

let user1: HelloWorld = new HelloWorld('Petia');
let user2: HelloWorld = new HelloWorld('');

export default HelloWorld;
export {user1,user2};
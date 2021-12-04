import img from '../assets/img/under.jpg';
import '../css/style.scss';
import {user1,user2} from './helloworld';
import HelloWorld from './helloworld';

document.body.innerHTML = `<img src="${img}" alt="under construction">`

user2.print();

const ma = new HelloWorld('Nmmmm');

ma.print()
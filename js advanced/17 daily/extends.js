function One(name) {
    this.name = 'one ' + name;
}

One.prototype.say = function () {
    console.log(this.name);
};
One.tag = 'number';
One.print = function () {
    console.log(this.tag)
};

function Two(name) {
    One.call(this, name);//�̳� ����ʵ�����Ժͷ���
    this.age = '18';
}

Object.setPrototypeOf(Two.prototype, One.prototype);//�������Ժͷ���

//Two.prototype.__proto__ = One.prototype; //�ȼ�


//Two.prototype =  Object.create(One.prototype)
//Two.prototype.constructor = Two; ���� constructor


/*
Object.create�ȼ�

function create(proto) {

    function Fn() {}

    Fn.prototype = proto;
    return new Fn();

}
*/


Two.__proto__ = One; //��̬���Ժͷ���

let t = new Two('two');

Two.print();

t.say();

/*-------------class-------------*/


class Onec {

    constructor(name) {
        this.name = name
    }

    say() {
        console.log(this.name);
    }

    static get tag() {
        return 'number';
    }

    static print() {
        console.log(this.tag);
    }

}


class Twoc extends One {

    constructor(name) {
        super(name);
        this.age = '18';
    }
}

console.log(Onec.tag, Twoc.tag);
Onec.print();
Twoc.print();
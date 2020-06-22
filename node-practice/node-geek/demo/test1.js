let s = 'abc';
let buf1 = Buffer.alloc(10);

buf1.write(s, 0, 'utf8');
let s1 = buf1.toString('utf8');
console.log(s.length, s1.length, s1.trim().length)

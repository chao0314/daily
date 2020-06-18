let s = 'he';

let buf = Buffer.alloc(16);

buf.writeUInt32BE(321, 0);
buf.write(s, 4, 8);

buf.writeUInt32BE(123, 12);

console.log(buf.readUInt32BE(0));
console.log(buf.slice(4, 12).toString());
console.log(buf.readUInt32BE(12));

let s1=  'ColumnResponse'

console.log(Buffer.from(s1).length);
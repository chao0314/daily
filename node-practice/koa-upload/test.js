//'content-type': 'multipart/form-data; boundary=----WebKitFormBoundarygIIA9PZJ6DqKUG4S'

let s = `content-type: multipart/form-data; boundary=------WebKitFormBoundaryIY4Im7RfUJnQ9chJ`;
let d = `------WebKitFormBoundaryIY4Im7RfUJnQ9chJ
Content-Disposition: form-data; name="name"

aaa
------WebKitFormBoundaryIY4Im7RfUJnQ9chJ
Content-Disposition: form-data; name="age"

www
------WebKitFormBoundaryIY4Im7RfUJnQ9chJ--

`
let boundary = s.split('=')[1]
console.log(boundary)

let contents = d.split(boundary).slice(1, -1);
console.log(contents);

let data = {}
contents.forEach(entry => {
    let [header, ...body] = entry.split(/\r\n|\r\r|\n\n/g);
    console.log("-h--", header)
    console.log("-b--", body)
    let [,key,filename] = header.match(/name=(.+?).+?filename=(.+?)/g);

    if (header.includes('filename')) {


    } else {

        data[key] = Buffer.concat(body).toString().trim();

    }

})

console.log(data);


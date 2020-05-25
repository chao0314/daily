let f = `let html = '';
                    with(data){
                      echo('<html lang="en"><head><title>Title</title></head><body><ul></ul></body></html>');
                      }
                    return html;`;

let fn = new Function(f);
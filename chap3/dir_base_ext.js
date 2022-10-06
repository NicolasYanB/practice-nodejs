var path = require('path');
var completePath = '/foo/bar/bas';
console.log('dirname:', path.dirname(completePath));
console.log('basename:', path.basename(completePath));
console.log('extname:', path.extname(completePath));


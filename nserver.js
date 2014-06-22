var http = require('http'),
	path = require('path'),
    fs = require('fs');


http.createServer(function(request,response){
	console.log("Requst Starting");
	var filePath = '.' + request.url;
	if(filePath == './'){
		filePath = './index.html';
	}

	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}

	path.exists(filePath, function(exists){
		if(exists){
			fs.readFile(filePath, function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				}
				else {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				}
			});
		}
	});
}).listen(8080);
console.log("Server running on 8080");

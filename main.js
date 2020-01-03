const Request = require("./request.js");
const Storage = require("./storage.js");
const Input = require("./input.js");

let folderName = "";


function constructTime() {
	let date = new Date();

	let months = [
		"Jan", "Feb", "Mar", "Apr",
		"May", "Jun", "Jul", "Aug",
		"Sep", "Oct", "Nov", "Dec"
	];

	let general = `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
	let specific = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

	return general + ' -- ' + specific;
}


function doRequest(url, saveId) {
	if(typeof saveId === 'undefined') saveId = 0;

	if(url.slice(0, 5) === 'https') {
		handleRequest(url, Request.https.get(url), saveId);
	}
	else {
		handleRequest(url, Request.http.get(url), saveId);
	}
}


function handleRequest(url, promise, saveId) {
	promise.then((response) => {

		let saveObject = { from: url };

		if(response.statusCode === 302 || response.statusCode === 301) {
			console.log("Redirect to:", response.headers['location']);
			saveObject.to = response.headers['location'];

			doRequest(response.headers['location'], saveId + 1);
		}

		let data = "";

		response.on('data', (chunk) => {
			data += chunk;
		});

		response.on('end', () => {
			saveRequest(saveId, saveObject, data);
		});

	}).catch((err) => {
		console.log("REQUEST ERROR:", err);
	});
}


function saveRequest(id, url, data) {
	let prefix = "";

	for(let p in url) {
		prefix += p.toUpperCase() + ": " + url[p] + '\r\n';
	}

	if(!folderName) {
		folderName = "./" + constructTime();
		Storage.createFolder(folderName);
	}

	Storage.write(`${folderName}/response${id}.txt`, prefix + '\r\n' + data);
}


Input.allowInput(true);
Input.write("Website: ");

Input.onInput((data) => {
	doRequest(data);
	Input.allowInput(false);
});

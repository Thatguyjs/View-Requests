const http = require("http");
const https = require("https");
const url = require("url");


let Main = {

	_get: function(secure, url) {
		return new Promise((resolve, reject) => {
			let request;

			if(secure) {
				request = https.get(url, (response) => {
					resolve(response);
				});
			}
			else {
				request = http.get(url, (response) => {
					resolve(response);
				});
			}

			request.on('error', (error) => {
				reject(error);
			});
		});
	},


	http: {

		get: function(site="") {
			return Main._get(false, site);
		}

	},


	https: {

		get: function(site="") {
			return Main._get(true, site);
		}

	}

};


module.exports = Main;

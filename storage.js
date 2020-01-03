const fs = require("fs");


let Main = {

	_write: function(path, data, options) {
		if(options) {
			// TODO
		}

		return new Promise((resolve, reject) => {
			fs.writeFile(path, data, (err) => {
				if(err) return reject(err);
				resolve();
			});
		});
	},


	createFolder: function(path) {
		return new Promise((resolve, reject) => {
			fs.mkdir(path, (error) => {
				if(error) return reject(error);
				resolve();
			});
		});
	},


	write: function(path, data) {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, data, (error) => {
				if(error) return reject(error);
				resolve(error);
			});
		});
	}

};


module.exports = Main;

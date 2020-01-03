const process = require("process");


let Main = {
	_callback: new Function(),
	paused: false,

	allowInput: function(allowed) {
		Main.paused = allowed;
		allowed ? process.stdin.resume() : process.stdin.pause();

		if(allowed) {
			process.stdin.once('data', (data) => {
				Main._callback(String(data.slice(0, -1)));
			});
		}
	},


	onInput: function(callback) {
		Main._callback = callback;
		if(!Main.paused) Main.allowInput(true);
	}

};


module.exports = Main;

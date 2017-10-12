/**
 * gzip
 * a simple layer for the native node.js http.Server
 * @author Jan Kuča <jan@jankuca.com>, http://jankuca.com
 */

var spawn = require('child_process').spawn;

/**
 * @param {http.ServerRequest} req
 * @param {http.ServerResponse} res
 * @return {boolean} Whether gzip encoding takes place
 */
function gzip(req, res) {
	// check if the client accepts gzip
	var header = req.headers['accept-encoding'];
	var accepts = Boolean(header && /gzip/i.test(header));
	if (!accepts) return false;

	// store native methods
	var writeHead = res.writeHead;
	var write = res.write;
	var end = res.end;

	var gzip = spawn('gzip');
	gzip.stdout.on('data', function (chunk) {
		write.call(res, chunk);
	});
	gzip.on('exit', function () {
		end.call(res);
	});

	// duck punch gzip piping
	res.writeHead = function (status, headers) {
		headers = headers || {};

		if (Array.isArray(headers)) {
			headers.push([ 'content-encoding', 'gzip' ]);
		} else {
			headers['content-encoding'] = 'gzip';
		}

		writeHead.call(res, status, headers);
	};
	res.write = function (chunk) {
		gzip.stdin.write(chunk);
	};
	res.end = function () {
		gzip.stdin.end();
	};

	return true;
};

module.exports = gzip;

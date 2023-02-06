// const http = require('http');
const WebSocket = require('ws');

// const server = http.createServer((request, response) => { });
// const ws = new WebSocket.Server({ server });

const wss = new WebSocket.Server({ port: 3000 });

let clients = [];

// connection =============
wss.on('connection', (ws, req) => {
	console.log(`Connected ${req.socket.remoteAddress}`)
	clients.push(ws)

	if (clients.length > 1) {

		clients.forEach((client, index) => {
			client.send(JSON.stringify({
				name: 'index',
				value: index + 1
			}))
		})

		setTimeout(() => {
			clients.forEach(client => {
				client.send(JSON.stringify({
					name: 'start'
				}))
			})
		}, 3000);
	}

	// message =============
	ws.on('message', data => {
		clients.forEach(client => {
			client.send(data.toString())
		})
	});

	// close =============
	ws.on('close', () => {
		clients.forEach(client => {
			client.send(JSON.stringify({
				name: 'end'
			}))
		})
		clients = []
	});
});

// server.listen(3000, () => {
// 	console.log('start');
// });


















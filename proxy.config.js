const proxy = [
  {
    context: ['/socket.io', '/api'],
    target: 'http://10.0.0.202:3000/'
  }
];
module.exports = proxy;
// http://10.0.0.202:3000/
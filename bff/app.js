const server = require('http').createServer();
const _ = require('lodash')
const io = require('socket.io')(server);
var services = []
io.sockets.on('connection', function (socket) {

    socket.on('storeClientInfo', function (data) {
      if (_.find(services, 'serviceId', data.serviceId)) {
        let index = _.findIndex(services, { serviceId: data.serviceId })
        services[index].serviceId = data.serviceId;
        services[index].status = true
        services[index].socketId = socket.id
      } else {
        services.push({ serviceId: data.serviceId, socketId: socket.id, status: true })
      }
      console.log('Server: ', data.serviceId, 'is now active')
      console.log(services)
    });

    socket.on('disconnect', function (data) {
      let index = _.findIndex(services, { socketId: socket.id })
      services[index].status = false
      console.log('Server: ', services[index].serviceId, 'is now inactive')
      console.log(services)
    });
});
server.listen(3000, function () {
  console.info('Server listening to port 3000')
})
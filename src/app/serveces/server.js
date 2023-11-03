import socketIO from 'socket.io-client'
const url = 'http://localhost:3000'
export const ioClient = socketIO.connect(url)
export const connect = () => ioClient.on('connect', () => console.log('connected!', ioClient.id))


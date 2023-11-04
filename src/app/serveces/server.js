import socketIO from 'socket.io-client'
const url = process.env.NEXT_PUBLIC_SERVER_URL
export const ioClient = socketIO.connect(url)
export const connect = () => ioClient.on('connect', () => console.log('connected!'))


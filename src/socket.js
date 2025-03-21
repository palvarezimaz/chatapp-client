import { io } from 'socket.io-client';

let URL = 'http://localhost:3002';
if (process.env.NODE_ENV === 'production') {
  URL = 'https://github.com/palvarezimaz/chatapp-server';
}
const socket = io(URL, { 
  withCredentials: false, 
  extraHeaders: {
    "Access-Control-Allow-Origin": "https://github.com/palvarezimaz/chatapp-server"
  },
  autoConnect: false });

////// UNCOMMENT FOR DEVELOPMENT - LOGS ANY SOCKET EVENT
// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

export default socket;

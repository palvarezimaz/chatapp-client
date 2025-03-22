import { io } from 'socket.io-client';

let URL = 'http://localhost:3002';
if (process.env.NODE_ENV === 'production') {
  URL = 'https://pai-chatapp-server.koyeb.app/';
}
const socket = io(URL, { 
  withCredentials: false, 
  extraHeaders: {
    "Access-Control-Allow-Origin": "https://pai-chatapp-server.koyeb.app/"
  },
  autoConnect: false });

////// UNCOMMENT FOR DEVELOPMENT - LOGS ANY SOCKET EVENT
// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

export default socket;

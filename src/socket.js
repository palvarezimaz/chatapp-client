import { io } from 'socket.io-client';

let URL = 'http://localhost:3002';
if (process.env.NODE_ENV === 'production') {
  URL = 'https://paichatapp.herokuapp.com/';
}
const socket = io(URL, { autoConnect: false });

////// UNCOMMENT FOR DEVELOPMENT - LOGS ANY SOCKET EVENT
// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

export default socket;

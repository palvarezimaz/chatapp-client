import React from 'react';
import io from 'socket.io-client';
import Message from './components/Message';

const App = () => {
  const [time, setTime] = React.useState('fetching');
  React.useEffect(() => {
    const socket = io('http://localhost:3002');
    socket.on('connect', () => console.log(socket.id));
    socket.on('connect_error', () => {
      setTimeout(() => socket.connection(), 3002);
    });

    socket.on('time', (data) => setTime(data));
    socket.on('disconnect', () => setTime('server disconnected'));
  }, []);

  return (
    <div className="App">
      <p>{time}</p>
      <Message />

      {/* <span>State: {this.state.connected ? 'Connected' : 'Disconnected'}</span>
      <span>Current transport: {this.state.currentTransport}</span>
      <span>Last message: {this.state.lastMessage}</span> */}
    </div>
  );
};

export default App;
//////////////
// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       connected: socket.connected,
//       currentTransport: socket.connected
//         ? socket.io.engine.transport.name
//         : '-',
//       lastMessage: '',
//     };
//   }

//   componentDidMount() {
//     socket.on('connect', () => this.onConnectionStateUpdate());
//     socket.on('disconnect', () => this.onConnectionStateUpdate());
//     socket.on('message', (content) => this.onMessage(content));
//   }

//   componentWillUnmount() {
//     socket.off('connect');
//     socket.off('disconnect');
//     socket.off('message');
//   }

//   onConnectionStateUpdate() {
//     this.setState({
//       connected: socket.connected,
//       currentTransport: socket.connected
//         ? socket.io.engine.transport.name
//         : '-',
//     });
//     if (socket.connected) {
//       socket.io.engine.on('upgrade', () => this.onUpgrade());
//     } else {
//       socket.io.engine.off('upgrade');
//     }
//   }

//   onMessage(content) {
//     this.setState({
//       lastMessage: content,
//     });
//   }

//   onUpgrade() {
//     this.setState({
//       currentTransport: socket.io.engine.transport.name,
//     });
//   }

//   render() {
//     return (
//       <div className="App">
//         <span>
//           State: {this.state.connected ? 'Connected' : 'Disconnected'}
//         </span>
//         <span>Current transport: {this.state.currentTransport}</span>
//         <span>Last message: {this.state.lastMessage}</span>
//       </div>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

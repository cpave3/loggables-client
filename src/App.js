import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001",
      data: []
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("newLine", line => {
        this.setState({ data: this.state.data.concat(line) });
    });
    socket.on('allData', data => this.setState({ data }));
    console.log(this.state.data);
  }
  render() {
    const { response } = this.state;
    console.log(response);
    return (
      <div style={{ textAlign: "center" }}>
        
        {this.state.data.map((row, i) => {
            return (<div> {row.id}: {row.data} </div>)
        })}

      </div>
    );
  }
}
export default App;

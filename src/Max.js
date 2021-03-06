import { State, CONNECTION_STATES, SUPPORTED_OBJECTS } from 'xebra.js';

import React, { Component } from 'react';
import _ from 'lodash';

class Max extends Component {
  constructor(props) {
    super(props);

    console.log('supported objs:', SUPPORTED_OBJECTS);

    this.xebraState = new State({
      hostname: '192.168.1.37',
      //hostname: '127.0.0.1',
      // hostname: '10.30.87.25',
      port: 8086,
      supported_objects: SUPPORTED_OBJECTS
    });

    this.xebraState.connect();

    this.xebraState.on("connection_changed", status => {
      //   INIT: 1,
      //   CONNECTING: 2,
      //   CONNECTED: 4,
      //   CONNECTION_FAIL: 8,
      //   RECONNECTING: 16,
      //   DISCONNECTED: 32
      this.props.onConnectionChange(CONNECTION_STATES.CONNECTED === status);
    });

    // this.xebraState.getPatchers();
  }

  sendOscMsgs = (oscMsgs) => {
    if (this.isConnected()) {
      _.each(
        oscMsgs,
        oscMsg => this.xebraState.sendMessageToChannel(
          'osc', oscMsg
        ));
    }
  };

  isConnected = () => this.xebraState.connectionState === CONNECTION_STATES.CONNECTED;

  render() {
    const { oscMsgs } = this.props;
    this.sendOscMsgs(oscMsgs);
    return null;
  }

}

export default Max;
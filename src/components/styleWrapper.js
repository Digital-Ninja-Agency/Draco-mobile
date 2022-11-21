import React, { Component } from "react";
import { StyleProvider } from "native-base";

import getTheme from '../../native-base-theme/components';
import materialOSS from "../../native-base-theme/variables/materialOSS";

export default class StyleWrapper extends Component {
   render() {
      return (
         <StyleProvider style={getTheme(materialOSS)}>
            {this.props.children}
         </StyleProvider>
      )
   }
}
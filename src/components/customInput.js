import React from 'react';
import { TextInput } from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';

import mapPropsToStyleNames from 'native-base/src/utils/mapPropsToStyleNames';
import variable from "native-base-theme/variables/platform";

import NativeBaseComponent from 'native-base/src/basic/Base/NativeBaseComponent';

class customInput extends NativeBaseComponent {
  componentDidMount() {
    this._textInput.setNativeProps({
      style: {
        fontFamily: variable.fontFamily,
      },
    });
  }

  render() {
    const variables = variable;
    return (
      <TextInput
        ref={c => {
          this._textInput = c;
          this._root = c;
        }}
        editable={!this.props.disabled}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholderTextColor={
          this.props.placeholderTextColor
            ? this.props.placeholderTextColor
            : variables.inputColorPlaceholder
        }
        {...this.props}
      />
    );
  }
}

var StyledInput = connectStyle('NativeBase.Input', {}, mapPropsToStyleNames)(
  customInput
);

export { StyledInput as customInput };

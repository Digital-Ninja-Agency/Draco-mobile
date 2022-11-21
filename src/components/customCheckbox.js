import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import IconNB from 'react-native-vector-icons/Ionicons';
import { connectStyle } from 'native-base-shoutem-theme';

import variable from "native-base-theme/variables/platform";
import { PLATFORM } from "native-base-theme/variables/commonColor";

import mapPropsToStyleNames from 'native-base/src/utils/mapPropsToStyleNames';
import computeProps from 'native-base/src/utils/computeProps';

class customCheckBox extends Component {
  static contextTypes = {
    theme: PropTypes.object
  };

  getInitialStyle(variables) {
    const { color, checked } = this.props;
    return {
      checkStyle: {
        borderColor: color || variables.checkboxBgColor,
        backgroundColor:
          checked === true
            ? color || variables.checkboxBgColor
            : variables.checkboxDefaultColor
      }
    };
  }

  prepareRootProps(variables) {
    const defaultProps = {
      style: this.getInitialStyle(variables).checkStyle
    };

    return computeProps(this.props, defaultProps);
  }
  render() {
    const { checked } = this.props;
    const variables = variable;
    const platformStyle = variables.platformStyle;
    const platform = variables.platform;
    return (
      <TouchableOpacity
        ref={c => (this._root = c)}
        {...this.prepareRootProps(variables)}
      >
        <IconNB
          style={{
            color:
              checked === true
                ? variables.checkboxTickColor
                : variables.checkboxDefaultColor,
            fontSize: variables.CheckboxFontSize,
            lineHeight: variables.CheckboxIconSize,
            paddingLeft: variables.CheckboxPaddingLeft,
            marginTop: variables.CheckboxIconMarginTop,
            textShadowRadius: variables.checkboxTextShadowRadius
          }}
          name={
            platform === PLATFORM.IOS && platformStyle !== PLATFORM.MATERIAL
              ? 'ios-checkmark'
              : 'md-checkmark'
          }
        />
      </TouchableOpacity>
    );
  }
}

customCheckBox.propTypes = {
  ...TouchableOpacity.propTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  checked: PropTypes.bool,
  onPress: PropTypes.func
};

const StyledCheckBox = connectStyle(
  'NativeBase.CheckBox',
  {},
  mapPropsToStyleNames
)(customCheckBox);

export { StyledCheckBox as customCheckBox };

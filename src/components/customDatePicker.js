import React from "react";
import {
  Modal,
  View,
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
  TouchableOpacity,
} from "react-native";

import variable from "native-base-theme/variables/platform";
import { PLATFORM } from "native-base-theme/variables/commonColor";
import { Text } from "native-base/src/basic/Text";

export default class customDatePicker extends React.Component {
  static defaultProps = {
    disabled: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      defaultDate: props.defaultDate ? props.defaultDate : new Date(),
      chosenDate:
        !props.placeHolderText && props.defaultDate
          ? props.defaultDate
          : undefined,
    };
  }

  setDate(date) {
    this.setState({ chosenDate: new Date(date) });
    if (this.props.onDateChange) {
      this.props.onDateChange(date);
    }
  }

  showDatePicker = () => {
    if (Platform.OS === PLATFORM.ANDROID) {
      this.openAndroidDatePicker();
    } else {
      this.setState({ modalVisible: true });
    }
  };

  validateAccept = () => {
    if (this.state.chosenDate == undefined) {
      this.setDate(this.state.defaultDate);
    }
    this.setState({ modalVisible: false });
  };

  async openAndroidDatePicker() {
    try {
      const newDate = await DatePickerAndroid.open({
        date: this.state.chosenDate
          ? this.state.chosenDate
          : this.state.defaultDate,
        minDate: this.props.minimumDate,
        maxDate: this.props.maximumDate,
        mode: this.props.androidMode,
      });
      const { action, year, month, day } = newDate;
      if (action === "dateSetAction") {
        const selectedDate = new Date(year, month, day);
        this.setState({ chosenDate: selectedDate });
        this.props.onDateChange(selectedDate);
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  }

  formatChosenDate(date) {
    if (this.props.formatChosenDate) {
      return this.props.formatChosenDate(date);
    }
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/");
  }

  render() {
    const {
      animationType,
      disabled,
      locale,
      maximumDate,
      minimumDate,
      modalTransparent,
      placeHolderText,
      placeHolderTextStyle,
      textStyle,
      timeZoneOffsetInMinutes,
    } = this.props;

    const variables = this.context.theme
      ? this.context.theme["@@shoutem.theme/themeStyle"].variables
      : variable;

    return (
      <View style={{
        width: '100%'
      }}>
        <View>
          <Text
            onPress={() => (!disabled ? this.showDatePicker() : undefined)}
            style={[
              {
                padding: variables.datePickerPadding,
                color: variables.datePickerTextColor,
              },
              this.state.chosenDate ? textStyle : placeHolderTextStyle,
            ]}
          >
            {this.state.chosenDate
              ? this.formatChosenDate(this.state.chosenDate)
              : placeHolderText || "Select Date"}
          </Text>
          <View>
            <Modal
              supportedOrientations={["portrait", "landscape"]}
              animationType={animationType}
              transparent={modalTransparent} // from api
              visible={this.state.modalVisible}
              onRequestClose={() => { }}
            >
              <Text
                style={{
                  flex: variables.datePickerFlex,
                }}
              />
              <View
                style={{
                  flex: 0,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: "3%",
                  paddingHorizontal: "10%",
                  backgroundColor: "#fdfdfd",
                  borderColor: "#ddd",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      chosenDate: undefined,
                      modalVisible: false,
                    })
                  }
                >
                  <Text
                    style={{
                      color: "red",
                    }}
                  >
                    Anuleaza
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.validateAccept()}>
                  <Text
                    style={{
                      color: "dodgerblue",
                    }}
                  >
                    Accepta
                  </Text>
                </TouchableOpacity>
              </View>
              <DatePickerIOS
                style={{
                  backgroundColor: "#fefefe",
                  paddingVertical: "5%"
                }}
                date={
                  this.state.chosenDate
                    ? this.state.chosenDate
                    : this.state.defaultDate
                }
                onDateChange={date => this.setState({ chosenDate: new Date(date) })}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                mode="date"
                locale={locale}
                timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
              />
            </Modal>
          </View>
        </View>
      </View>
    );
  }
}

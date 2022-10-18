import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const CButton = (props: any) => {
  return (
    <Button
      style={{ margin: "2%", alignSelf: "center" }}
      mode="contained"
      testID={props.testID}
      onPress={props.onPress}
      disabled={props.isDisable}
    >
      <Text>{props.title}</Text>
    </Button>
  );
};

export default CButton;

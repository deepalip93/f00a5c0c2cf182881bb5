import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Card, TextInput } from "react-native-paper";
import CButton from "./CButton";
import moment from "moment";

const Home = () => {
  const [noLots, setNoLots] = useState<any>("");
  const [carRegNo, setCarRegNo] = useState<any>("");
  const [parkingLots, setParkingLots] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedParking, setSelectedParking] = useState(null);
  const [noOfHours, setNoOfHours] = useState(0);
  const [billAmount, setBillAmount] = useState<any>(null);

  /* istanbul ignore next */
  const createParkingLots = () => {
    var tempArray = [];
    for (let index = 1; index <= noLots; index++) {
      tempArray.push({
        id: index,
        carRegNo: "",
        isCheck: false,
        timeStamp: Date.now(),
      });
    }
    setNoLots("");
    setParkingLots(tempArray);
  };
  /* istanbul ignore next */
  const assignParking = () => {
    var filteredArray = parkingLots.filter((a: any) => a.carRegNo === carRegNo);
    if (filteredArray.length === 0) {
      var filteredData = parkingLots.filter((d: any) => d.isCheck === false);
      if (filteredData.length === 0) {
        setCarRegNo("");
        alert("Oops... Parking Is Full!");
      } else {
        var randomIndex = Math.floor(Math.random() * filteredData.length);
        var data = parkingLots.map((d: any) => {
          if (d.isCheck) {
            return d;
          } else {
            if (filteredData[randomIndex].id === d.id) {
              return { ...d, isCheck: true, carRegNo: carRegNo };
            } else {
              return d;
            }
          }
        });
        setCarRegNo("");
        alert("Parking Allocated Successfully!");
        setParkingLots(data);
      }
    } else {
      setCarRegNo("");
      alert("Car Number Already Exists!");
    }
  };
  /* istanbul ignore next */
  const generateBill = (item: any) => {
    let carTime = item.timeStamp;
    let currentTime = Date.now();
    const parkedTime = moment(currentTime).diff(carTime, "hours");
    console.log(parkedTime);
    setNoOfHours(parkedTime);
    if (parkedTime > 2) {
      setBillAmount((parkedTime - 2) * 10 + 10);
    } else {
      setBillAmount(10);
    }
  };
  /* istanbul ignore next */
  const takePayment = () => {
    var body = {
      "car-registration": selectedParking?.carRegNo,
      charge: billAmount,
    };
    fetch("https://httpstat.us/200", { method: "POST", body: body })
      .then((res: any) => {
        console.log(res);
        let data = [...parkingLots];
        data.forEach((d: any) => {
          if (d.id === selectedParking?.id) {
            d.isCheck = false;
            d.carRegNo = "";
          }
        });
        setBillAmount(null);
        setParkingLots(data);
        setShowModal(false);
      })
      .catch((e: any) => console.log(e));
  };
  /* istanbul ignore next */
  const renderParkingLots = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        testID={
          item.isCheck
            ? `parking-drawing-registered-${index}`
            : `parking-drawing-space-${index}`
        }
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: "#96ADC8",
          marginHorizontal: 40,
          marginVertical:10,
          borderRadius:20,
          justifyContent: "center",
          alignItems: "center",
          height: 100,
        }}
        onPress={() => {
          generateBill(item), setSelectedParking(item), setShowModal(true);
        }}
      >
        <Text
          testID={`parking-drawing-space-number-${index}`}
          style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
        >
          {item.id}
        </Text>
        {item.carRegNo && (
          <>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Car Number : {item.carRegNo}
            </Text>
            <Image
              source={require("../assets/car.png")}
              style={{ height: 25, width: 25 }}
            />
          </>
        )}
      </TouchableOpacity>
    );
  };
  /* istanbul ignore next */
  const renderModal = () => {
    return (
      <Modal
        visible={showModal}
        transparent={true}
        testID="deregister-car-registration"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card style={{ width: "80%", padding: "3%" }}>
            <View style={{ marginHorizontal: 20 }}>
              <Text>Car Registration No: {selectedParking?.carRegNo}</Text>
              <Text
                testID="deregister-time-spent"
                style={{ marginVertical: 20 }}
              >
                Total Time Spent: {noOfHours === 0 ? "1" : noOfHours} hr
              </Text>
              <Text testID="deregister-charge">Total Bill: ${billAmount}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <CButton
                testID="deregister-payment-button"
                title={"Payment Taken"}
                onPress={
                  /* istanbul ignore next */ () =>
                    /* istanbul ignore next */ takePayment()
                }
              />
              <CButton
                testID="deregister-back-button"
                title={"Close"}
                onPress={
                  /* istanbul ignore next */ () =>
                    /* istanbul ignore next */ setShowModal(false)
                }
              />
            </View>
          </Card>
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView style={{ flex: 1, padding: "2%", paddingBottom: "5%",paddingTop:'10%' }}>
      <TextInput
        value={noLots}
        testID="parking-create-text-input"
        placeholder="Enter No Of Lots"
        mode="outlined"
        onChangeText={
          /* istanbul ignore next */ (t: any) =>
            /* istanbul ignore next */ setNoLots(t.replace(/[^0-9]/g, ""))
        }
      />
      <CButton
        isDisable={noLots.length === 0}
        testID={"parking-create-submit-button"}
        title={"Create Parking Lots"}
        onPress={
          /* istanbul ignore next */ () =>
            /* istanbul ignore next */ createParkingLots()
        }
      />

      {parkingLots != 0 && (
        /* istanbul ignore next */
        <>
          <TextInput
            value={carRegNo}
            testID="parking-drawing-registration-input"
            placeholder="Enter Car Reg No"
            mode="outlined"
            onChangeText={
              /* istanbul ignore next */ (t: any) =>
                /* istanbul ignore next */ setCarRegNo(t)
            }
          />
          <CButton
            isDisable={carRegNo.length === 0}
            testID="parking-drawing-add-car-button"
            title={"Submit"}
            onPress={
              /* istanbul ignore next */ () =>
                /* istanbul ignore next */ assignParking()
            }
          />
        </>
      )}
      <Card
        style={{ alignSelf: "center", backgroundColor: "white", width: "100%",marginTop:'5%' }}
      >
        <FlatList
          data={parkingLots}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "center" }}
          renderItem={renderParkingLots}
        />
      </Card>
      {renderModal()}
    </ScrollView>
  );
};

export default Home;

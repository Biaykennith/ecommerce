import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";

const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image: "https://th.bing.com/th/id/R.7961222ddabcdce766f5e4a0a9ace0ec?rik=nD2uU%2bpqnOx90Q&riu=http%3a%2f%2fwww.restaurantgirl.com%2fwp-content%2fuploads%2f2014%2f08%2f42281-hi-drinks.jpg&ehk=3y9qFGYFUEBbTkHgTF3sYNkEPQdTohDVC0Cj%2bMSRGDQ%3d&risl=&pid=ImgRaw&r=0",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://th.bing.com/th/id/OIP.V_I1EUKGVT4qe52pU1XB8gHaFj?pid=ImgDet&rs=1",
      name: "Deals",
    },
    {
      id: "3",
      image:
        "https://i5.walmartimages.com/asr/7b673a21-d6e8-4445-a32c-afdcda21b4d8_1.97ecaa927b4f963cee1f015aeadced8a.jpeg",
      name: "Drinks",
    },
    {
      id: "4",
      image:
        "https://exoduschiropractic.files.wordpress.com/2013/08/vegetables.jpg",
      name: "Vegetables",
    },
    {
      id: "5",
      image:
        "https://media.gettyimages.com/photos/various-fresh-dairy-products-picture-id544807136",
      name: "Dairy foods",
    },
    {
      id: "6",
      image: "https://www.thelittlefishcompany.com/wp-content/uploads/2022/04/badge-shop.jpg",
      name: "Fish and Seafood",
    },
  ];
  const images = [
    "https://www.azernews.az/media/pictures/o-GROCERY-SHOPPING-TIP-VEGETABLE-VEGETABLES-HEALTHY-facebook.jpg",
    "https://www.happybeinghealthy.com/wp-content/uploads/2014/08/Frozen-food-from-Costco.jpg",
    "https://www.supermarketperimeter.com/ext/resources/2019/12/MeatPoultryProducts_Lead.jpg?1579276511",
  ];
  const deals = [
    {
      id: "20",
      title: "Purefoods Tender Juicy Hotdog Jumbo 1KG",
      oldPrice: 200,
      price: 190,
      image:
        "https://down-ph.img.susercontent.com/file/463ca8166f43d1e7fa6f11e513774f79",
      carouselImages: [
        "https://down-ph.img.susercontent.com/file/463ca8166f43d1e7fa6f11e513774f79",
        "https://down-ph.img.susercontent.com/file/2a8f523b6fa5971b74edc51ecc4be030",
        "https://down-ph.img.susercontent.com/file/cbe2b7efbb413fbb8c0dbcfa5128df16",
        
      ],
      color: "red",
      size: "1kg",

    },
    {
      id: "30",
      title:
        "Purefoods Chicken Drummets 240G",
      oldPrice: 200,
      price: 160,
      image:
        "https://down-ph.img.susercontent.com/file/e64d047b0275bc5ffc8f10b767e25420",
      carouselImages: [
        "https://down-ph.img.susercontent.com/file/e64d047b0275bc5ffc8f10b767e25420",
        "https://down-ph.img.susercontent.com/file/443b1264959b9fbff4bb1b79d7bfdc4e",
        "https://down-ph.img.susercontent.com/file/f2640dc0232a6501ec029e0adf14c422",
       
      ],
      color: "blue",
      size: "240G",
    },
    {
      id: "40",
      title:
        "Purefoods Honeycured Bacon 400G",
      oldPrice: 160,
      price: 140,
      image:
        "https://down-ph.img.susercontent.com/file/b1a0332bbb694f763ab01e584d3d76bc",
      carouselImages: [
        "https://down-ph.img.susercontent.com/file/b1a0332bbb694f763ab01e584d3d76bc",
        "https://down-ph.img.susercontent.com/file/7c6a4c1ea7d1a2d1902f5c76122f2df6",
        "https://down-ph.img.susercontent.com/file/4522e285399224b7d3dead01622705a5",
      ],
      color: "orange",
      size: "400G",
    },
    {
      id: "40",
      title:
        "Purefoods Chicken Breast Nuggets 200G",
      oldPrice: 140,
      price: 130,
      image:
        "https://down-ph.img.susercontent.com/file/78844243a83eb905dc12c72f16e65bbe",
      carouselImages: [
        "https://down-ph.img.susercontent.com/file/78844243a83eb905dc12c72f16e65bbe",
        "https://down-ph.img.susercontent.com/file/366d063c54e1afd9d02c3540525181a4",
        "https://down-ph.img.susercontent.com/file/e07af261a7148caa0f71d641492799ec",
      ],
      color: "yellow",
      size: "200G",
    },
  ];
  const offers = [
    {
      id: "0",
      title:
        "Kraft Heinz Grocery Package BBQ Party Bundle",
      offer: "20% off",
      oldPrice: 500,
      price: 400,
      image:
        "https://down-ph.img.susercontent.com/file/sg-11134201-22120-g7und1v11xkve1",
      carouselImages: [
        "https://down-ph.img.susercontent.com/file/sg-11134201-22100-t33jatshybiv76",
        "https://down-ph.img.susercontent.com/file/sg-11134201-22120-g7und1v11xkve1",
       
      ],
      color: "blue",
      size: "18oz",
    },
    {
      id: "1",
      title:
        "Heinz Seriously Good Mayonnaise Squeeze Bottle 220ml",
      offer: "20%",
      oldPrice: 160,
      price: 120,
      image: "https://down-ph.img.susercontent.com/file/sg-11134201-22100-9i7depghybivea",
      carouselImages: [
        "https://down-ph.img.susercontent.com/file/sg-11134201-22100-1cgvmcghybivc4",
        "https://down-ph.img.susercontent.com/file/sg-11134201-22100-9i7depghybivea",
        "https://down-ph.img.susercontent.com/file/6fc90348d42733fe717f3ca11dc9ae27",
      ],
      color: "white",
      size: "220ml",
    },
    {
      id: "2",
      title: "Steak Sauce Grocery Package - Bundle A",
      offer: "40%",
      oldPrice: 400,
      price: 368,
      image: "https://down-ph.img.susercontent.com/file/sg-11134201-22120-3a6moqb21xkv83",
      carouselImages: ["https://down-ph.img.susercontent.com/file/sg-11134201-22120-3a6moqb21xkv83"],
      color: "brown",
      size: "bundle",
    },
    {
      id: "3",
      title:
        "Heinz Glass Bottle Tomato Ketchup 300g",
      offer: "40%",
      oldPrice: 100,
      price: 60,
      image: "https://down-ph.img.susercontent.com/file/2fc5d7a50584f6edc85d501321586e5d",
      carouselImages: [
        "https://down-ph.img.susercontent.com/file/845e1593d8d6fd1f1927d076c96b8b58",
        "https://down-ph.img.susercontent.com/file/2fc5d7a50584f6edc85d501321586e5d",
        "https://down-ph.img.susercontent.com/file/sg-11134201-22100-6ru8yg6rybiv51",
      ],
      color: "red",
      size: "300G",
    },
  ];
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [category, setCategory] = useState("jewelery");
  const { userId, setUserId } = useContext(UserType);
  const [selectedAddress,setSelectedAdress] = useState("");
  console.log(selectedAddress)
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "Jewelry", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
    { label: "Women's clothing", value: "women's clothing" },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log("error message", error);
      }
    };

    fetchData();
  }, []);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http:/192.168.43.220:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  console.log("address", addresses);
  return (
    <>
      <SafeAreaView
        style={{
          paddinTop: Platform.OS === "android" ? 40 : 0,
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <ScrollView>
          <View
            style={{
              backgroundColor: "#00CED1",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: "white",
                borderRadius: 3,
                height: 38,
                flex: 1,
                marginTop: 35,
              }}
            >
              <AntDesign
                style={{ paddingLeft: 10 }}
                name="search1"
                size={22}
                color="black"
              />
              <TextInput placeholder="Search" />
            </Pressable>

           
          </View>

          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#AFEEEE",
            }}
          >
            <Ionicons name="location-outline" size={24} color="black" />

            <Pressable>
            {selectedAddress ? (
                <Text>
                  Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    Add a Address
                </Text>
              )}
            </Pressable>

            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 5,
                  }}
                >
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <SliderBox
            images={images}
            autoPlay
            circleLoop
            dotColor={"#13274F"}
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: "100%" }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Trending Deals of the week
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {deals.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 180, height: 180, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </Pressable>
            ))}
          </View>

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Today's Deals
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />

                <View
                  style={{
                    backgroundColor: "#E31837",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Upto {item?.offer}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

         

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select a delivery location to see product availabilty and delivery
              options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* already added addresses */}
            {addresses?.map((item, index) => (
              <Pressable
              onPress={() => setSelectedAdress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor:selectedAddress === item ? "#FBCEB1" : "white"
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.houseNo},{item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  Philippines
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066b2",
                  fontWeight: "500",
                }}
              >
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

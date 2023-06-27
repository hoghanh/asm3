import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Pressable,
  Icon,
  HStack,
  Image,
  VStack,
  Spacer,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  saveFlowers,
  addToFavorites,
  getFlowers,
  clearFavoritesList,
} from "./Utils";

const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    console.log("delete row");
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const fetchFavorites = async () => {
    let favoritesData = await getFlowers();
    favoritesData = favoritesData.filter((fav) => fav.isFav === "true");
    setFavorites(favoritesData);
  };

  useEffect(() => {
    fetchFavorites();
  }, [favorites]);

  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable
        onPress={() => console.log("You touched me")}
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
      >
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <Image
              size="80px"
              source={{
                uri: item.flowerUrl,
              }}
              alt="favourite list"
              borderRadius={8}
            />
            <VStack>
              <Text
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                bold
              >
                {item.name}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                numberOfLines={2}
                maxW={150}
              >
                {item.des}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize="sm"
              color="primary.600"
              _dark={{
                color: "warmGray.50",
              }}
              alignSelf="flex-start"
            >
              {item.price}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.id)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Xoá
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <>
      {favorites.length > 0 ? (
        <>
          <SwipeListView
            data={favorites}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-75}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
          />
          <Box position="absolute" bottom={4} right={4}>
            <Pressable onPress={clearFavoritesList}>
              <Box
                bg="red.500"
                p={3}
                borderRadius="md"
                alignItems="center"
                justifyContent="center"
              >
                <Icon
                  as={<MaterialIcons name="delete" />}
                  color="white"
                  size="md"
                />
                <Text color="white" fontSize="md" fontWeight="medium">
                  Xoá
                </Text>
              </Box>
            </Pressable>
          </Box>
        </>
      ) : (
        <Box alignItems="center" justifyContent="center" m="auto">
          <Image
            size="300"
            source={require("../img/box.png")}
            alt="empty icons"
          />
        </Box>
      )}
    </>
  );
};

export default Favorites;

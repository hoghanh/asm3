import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Text,
  Pressable,
  Icon,
  HStack,
  Image,
  VStack,
  Spacer,
  AlertDialog,
  Button,
  Center,
  NativeBaseProvider,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFlowers, removeToFavorites, clearFavoritesList } from "./Utils";

const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const deleteRow = async (item) => {
    console.log("delete row", item.id);
    await removeToFavorites(item);
    onClose();
  };

  const fetchFavorites = async () => {
    let favoritesData = await getFlowers();
    favoritesData = favoritesData.filter((fav) => fav.isFav === "true");
    setFavorites(favoritesData);
  };

  useEffect(() => {
    fetchFavorites();
  }, [favorites]);

  const renderItem = ({ item }) => (
    <Box>
      <Pressable
        onPress={() => navigation.navigate("Chi tiết", { item })}
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

  const renderHiddenItem = ({ item }) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(item)}
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

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);

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
          />
          <Box position="absolute" bottom={4} right={4}>
            <Pressable onPress={() => setIsOpen(!isOpen)}>
              <Box
                bg="danger.500"
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
              </Box>
            </Pressable>
            <Center>
              <AlertDialog
                leastDestructiveRef={cancelRef}
                isOpen={isOpen}
                onClose={onClose}
                ref={cancelRef}
              >
                <AlertDialog.Content>
                  <AlertDialog.CloseButton />
                  <AlertDialog.Header>Xoá toàn bộ</AlertDialog.Header>
                  <AlertDialog.Body>
                    Xoá hết toàn bộ danh sách yêu thích của bạn. Bạn không còn
                    yêu thích hoa ư? Thật buồn! Không thể khôi phục đâu!!!
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button.Group space={2}>
                      <Button
                        variant="subtle"
                        onPress={onClose}
                        ref={cancelRef}
                      >
                        Huỷ
                      </Button>
                      <Button colorScheme="danger" onPress={clearFavoritesList}>
                        Xoá
                      </Button>
                    </Button.Group>
                  </AlertDialog.Footer>
                </AlertDialog.Content>
              </AlertDialog>
            </Center>
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

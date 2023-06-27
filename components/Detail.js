import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Pressable,
  Stack,
  Icon,
  NativeBaseProvider,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { saveFlowers, addToFavorites, getFlowers } from "./Utils";

const Detail = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;

  const [detail, setDetail] = useState(item);

  useEffect(() => {
    setDetail(item);
  }, [item]);

  const fetchDetail = async () => {
    let flowers = await getFlowers();
    setDetail(flowers.find((flower) => flower.id === item.id));
  };

  const handlePress = async (item) => {
    console.log("Press", item.id);
    await addToFavorites(item);
    fetchDetail();
  };

  return (
    <Box alignItems="center" p="3">
      <Box
        height="100%"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: detail.flowerUrl,
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="5" pb="0" space={3} direction="row">
          <Stack space={2} flex={1}>
            <Heading size="sm" ml="-1">
              {detail.name}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "primary.500",
              }}
              _dark={{
                color: "primary.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {detail.price}
            </Text>
          </Stack>
          <Pressable p="3" onPress={() => handlePress(detail)}>
            <Icon
              as={MaterialIcons}
              name="favorite"
              size="md"
              color={detail.isFav === "true" ? "danger.500" : "gray"}
            />
          </Pressable>
        </Stack>
        <Text p="4" pt="0" space={3} fontWeight="400">
          {detail.des}
        </Text>
      </Box>
    </Box>
  );
};

export default Detail;

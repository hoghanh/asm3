import React from "react";
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

const Detail = () => {
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
                uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="3" space={3} direction="row">
          <Stack space={2} flex={1}>
            <Heading size="sm" ml="-1">
              jabsdjgdkgak
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
              ksagdjags
            </Text>
          </Stack>
          <Pressable p="2" onPress={() => handlePress(item)}>
            <Icon as={MaterialIcons} name="favorite" size="lg" color="gray" />
          </Pressable>
        </Stack>
        <Text p="2" space={3} fontWeight="400" numberOfLines={3}>
          kasjgdasgmdg
        </Text>
      </Box>
    </Box>
  );
};

export default Detail;

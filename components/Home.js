import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  FlatList,
  Stack,
  View,
  Button,
  IconButton,
  Icon,
  Pressable,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { saveFlowers, addToFavorites, getFlowers } from "./Utils";

const Home = ({ navigation }) => {
  const listFlower = [
    {
      id: "1",
      name: "PHONG LAN",
      timeStamp: "12:47 PM",
      price: "300.000 VNĐ",
      cate: "Orchid",
      isFav: "false",
      des: "Phong lan là một loại cây hoa rất phổ biến và được yêu thích trong việc trang trí nội thất và ngoại thất. Đây là một loài cây có hoa thuộc họ Orchidaceae, và có khoảng 28.000 loài phong lan khác nhau trên toàn thế giới. Phong lan có một loạt các hình dạng và màu sắc khác nhau. Những loại phổ biến như Phalaenopsis, Dendrobium và Cymbidium được trồng rộng rãi trong ngành công nghiệp hoa. Các loại phong lan này thường có hoa lớn, màu sắc đa dạng và thường rất bền. Trồng và chăm sóc phong lan có thể đòi hỏi một chút kiến thức và công phu. Điều quan trọng nhất là cung cấp ánh sáng phù hợp, độ ẩm và chế độ tưới nước thích hợp cho cây. Phong lan thường phát triển tốt trong môi trường ẩm ướt, nhưng không thích ở nơi có độ ẩm quá cao. Cần đảm bảo rằng không gian trồng phong lan có đủ ánh sáng nhưng tránh tiếp xúc trực tiếp với ánh nắng mặt trời.",
      flowerUrl:
        "https://images.unsplash.com/photo-1577378978713-9bebf3db8312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },

    {
      id: "3",
      name: "CHI LAN HOÀNG THẢO",
      timeStamp: "6:22 PM",
      price: "250.000 VNĐ",
      cate: "Orchid",
      isFav: "false",
      des: "Lan hoàng thảo là một chi lớn trong Họ Lan. Hiện nay chi này bao gồm hơn 1.200 loài. Chi Lan hoàng thảo được phân bố rộng rãi nhiều ở Nam Á, Đông Á và Đông Nam Á cho đến Philippines, Borneo, nước Úc, Tân Gui-nê, Quần đảo Solomon và New Zealand.",
      flowerUrl:
        "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
    },
    {
      id: "12",
      name: "CÚC TANA",
      timeStamp: "8:36 PM",
      price: "100.000 VNĐ",
      cate: "Other",
      isFav: "false",
      des: "Hoa cúc tana có nguồn gốc từ Hà Lan, tuy không quá rực rỡ, cuốn hút nhưng cúc tana được mọi người yêu thích bởi vẻ đẹp thuần khiết và giản dị. Những bông cúc tana nhỏ xinh khoe sắc như mặt trời bé nhỏ tỏa nắng trong tiết trời se lạnh.",
      flowerUrl:
        "https://images.unsplash.com/photo-1657023649190-8e8890cc1e7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "4",
      name: "LAN PHI ĐIỆP",
      timeStamp: "8:56 PM",
      price: "180.000 VNĐ",
      cate: "Orchid",
      isFav: "false",
      des: "Một số người gọi lan này là Giả Hạc, thuộc chi hoàng thảo, thích hợp với khí hậu nhiệt đới như Việt Nam. Loại lan này khi mọc hướng xuống đất và hoa nở tạo thành một dải như hình thác nước nên được xếp vào dòng thân thòng. Chiều cao cây trung bình từ 10 – 30cm, thân chia đốt như đốt mía. Lá màu xanh bóng, như hình thoi. Hoa có mùi thơm dễ chịu, tùy cảm nhận của mỗi người chơi lan họ sẽ liên tưởng tới những mùi khác nhau như mùi của mù tạt, quả mâm xôi hay mùi đại hoàng.",
      flowerUrl:
        "https://images.unsplash.com/photo-1678604014285-e99486ae1906?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "5",
      name: "TẦM XUÂN",
      timeStamp: "8:56 PM",
      price: "25.000 VNĐ",
      cate: "Rose",
      isFav: "false",
      des: "Hoa tầm xuân là hoa của cây tầm xuân, có tên khoa học là Rosa canina. Ngoài ra, ở nước ta còn gọi với tên khác là: Thích hoa, ngưu cước, thập tỉ muội, dã tường vi,... Tầm xuân là một loài hoa hồng leo, xuất xứ từ các nước châu Âu, khu vực Tây Á và Tây Bắc Phi. Hoa tầm xuân có những điểm gần giống với hoa hồng nhưng cánh của hoa tầm xuân mỏng hơn, cây mọc thành bụi dày và leo cao.",
      flowerUrl:
        "https://images.unsplash.com/photo-1684072319516-b249067b6511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "13",
      name: "TULIP",
      timeStamp: "8:36 PM",
      price: "35.000 VNĐ",
      cate: "Other",
      isFav: "false",
      des: "Hoa tu-líp, còn được viết là tulip theo tiếng Anh, còn có tên gọi khác là uất kim hương, uất kim cương, là một chi thực vật có hoa trong họ Liliaceae.",
      flowerUrl:
        "https://images.unsplash.com/photo-1589994160839-163cd867cfe8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    },
    {
      id: "2",
      name: "LAN VŨ NỮ",
      timeStamp: "11:11 PM",
      price: "120.000 VNĐ",
      cate: "Orchid",
      isFav: "false",
      des: "Lan vũ nữ (tên khoa học: Cattleya) là một loài cây hoa phong lan đẹp thuộc họ Orchidaceae. Nó được đánh giá cao về giá trị thẩm mỹ và được trồng rộng rãi trên toàn thế giới. Lan vũ nữ có những đặc điểm nổi bật như cánh hoa lớn, màu sắc tươi sáng và hương thơm quyến rũ. Các loài lan vũ nữ thường có màu hoa đa dạng, bao gồm màu trắng, vàng, hồng, tím và đỏ.",
      flowerUrl:
        "https://images.unsplash.com/photo-1679966519593-43d645c9c433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
    {
      id: "6",
      name: "HỒNG TRẮNG",
      timeStamp: "8:36 PM",
      price: "15.000 VNĐ",
      cate: "Rose",
      isFav: "false",
      des: "Hoa hồng trắng hay còn gọi là hoa hồng lai hoặc hoa nhược tâm, có nguồn gốc từ Châu Âu và xuất hiện từ thời cổ đại. Các nước phương Tây ở thời đại trước rất được xem trọng vì mang nhiều ý nghĩa theo nền văn hóa.",
      flowerUrl:
        "https://plus.unsplash.com/premium_photo-1673467102399-75a62094b9ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },

    {
      id: "8",
      name: "HỒNG ĐỎ",
      timeStamp: "8:36 PM",
      price: "15.000 VNĐ",
      cate: "Rose",
      isFav: "false",
      des: "Hoa hồng đỏ là loài hoa có vẻ ngoài xinh đẹp, quyến rũ và mang trên mình hương thơm nồng nàn, dịu ngọt. Những cánh hoa được nhuộm màu đỏ rực rỡ, nổi bật trên thảm lá xanh đã làm xao xuyến nhiều trái tim của phái đẹp. Chính vì thế, nên hoa hồng đỏ được mệnh danh là nữ hoàng của các loài hoa.",
      flowerUrl:
        "https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=718&q=80",
    },
    {
      id: "9",
      name: "CÚC HOẠ MI",
      timeStamp: "8:36 PM",
      price: "99.000 VNĐ",
      cate: "Other",
      isFav: "false",
      des: "Cúc Họa Mi tên tiếng anh là Daisy – bắt nguồn từ “Saxon, day’s eye” có nghĩa dịch ra là “con mắt ban ngày”. Bởi vào mỗi sáng ban mai, hoa sẽ nở rộ cho đến khi buổi chiều tà cánh hoa sẽ khép dần lại.",
      flowerUrl:
        "https://images.unsplash.com/photo-1600264195762-c10ff160b264?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=724&q=80",
    },
    {
      id: "10",
      name: "CẨM TÚ CẦU",
      timeStamp: "8:36 PM",
      price: "20.000 VNĐ",
      cate: "Other",
      isFav: "false",
      des: "Hoa cẩm tú cầu mang vẻ đẹp mong nhanh, tinh tế như hình ảnh người thiếu nữ. Khi nhắc đến hoa cẩm tú cầu, ta thường nghĩ ra loài hoa này tượng trưng cho sự kiêu sa, lạnh lùng.",
      flowerUrl:
        "https://images.unsplash.com/photo-1593977901404-41e4afaa623d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "11",
      name: "CẨM CHƯỚNG",
      timeStamp: "8:36 PM",
      price: "50.000 VNĐ",
      cate: "Other",
      isFav: "false",
      des: "Hoa Cẩm Chướng hay có tên gọi khác là hoa Phăng (có tên khoa học là Dianthus Caryophyllus) có nguồn gốc từ vùng Địa Trung Hải. Là một trong những loài hoa tồn tại hơn 2000 năm và rất được yêu thích do có mùi thơm quyến rũ và thời gian nở rất lâu. Cái tên khoa học Dianthus của hoa Cẩm Chướng còn mang ý nghĩa đặc biệt, được lấy trong từ “dios” có nghĩa là “thần thánh” (chỉ thần Zeus) và từ “anthos” có nghĩa là “hoa”. Vì vậy, loài hoa này còn có một cái tên mang ý nghĩa tượng trưng cao quý là “Hoa của chúa”.",
      flowerUrl:
        "https://images.unsplash.com/photo-1618913962881-89418453c8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: "7",
      name: "HỒNG VÀNG",
      timeStamp: "8:36 PM",
      price: "15.000 VNĐ",
      cate: "Rose",
      isFav: "false",
      des: "Hoa hồng vàng tượng trưng cho sự lạc quan, vui vẻ và chan hòa nên là loài hoa để tặng bạn bè, để mối quan hệ của bạn được củng cố trong lúc khó khăn.",
      flowerUrl:
        "https://images.unsplash.com/photo-1605138090832-672d54ff023f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1909&q=80",
    },
    {
      id: "14",
      name: "HOA ĐÀO",
      timeStamp: "8:32 PM",
      price: "25.000 VNĐ",
      cate: "Other",
      isFav: "false",
      des: "Hoa đào không chỉ là sắc hoa để tô điểm cho không gian ngày Tết, mà phía sau sắc hương của hoa là tầng tầng ý nghĩa được gửi gắm từ bao đời nay vào ngày Tết cổ truyền.",
      flowerUrl:
        "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    },
  ];

  const [filteredData, setFilteredData] = useState(listFlower);

  const [selectedButton, setSelectedButton] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("flowers");
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setFilteredData(parsedData);
      } else {
        saveFlowers(listFlower);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = async (filterValue) => {
    const flowers = await getFlowers();
    let filtered;

    setSelectedButton(filterValue);

    if (filterValue !== "all") {
      filtered = flowers.filter((item) => item.cate === filterValue);
    } else filtered = flowers;
    setFilteredData(filtered);
  };

  const handlePress = async (item) => {
    console.log("Press", item.id);
    await addToFavorites(item);
    filterData(selectedButton);
  };

  return (
    <View>
      <Stack
        mb="2.5"
        mt="1.5"
        direction={{
          base: "row",
        }}
        mx={{
          base: "auto",
          md: "0",
        }}
        space={2}
      >
        <Button
          size="sm"
          onPress={() => filterData("all")}
          variant={selectedButton === "all" ? "solid" : "subtle"}
        >
          TẤT CẢ
        </Button>
        <Button
          size="sm"
          onPress={() => filterData("Orchid")}
          variant={selectedButton === "Orchid" ? "solid" : "subtle"}
        >
          HOA LAN
        </Button>
        <Button
          size="sm"
          onPress={() => filterData("Rose")}
          variant={selectedButton === "Rose" ? "solid" : "subtle"}
        >
          HOA HỒNG
        </Button>
        <Button
          size="sm"
          onPress={() => filterData("Other")}
          variant={selectedButton === "Other" ? "solid" : "subtle"}
        >
          KHÁC
        </Button>
      </Stack>
      <FlatList
        data={filteredData}
        numColumns={2}
        renderItem={({ item }) => (
          <Box alignItems="center" flex={1}>
            <Box
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              margin="2"
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
                <AspectRatio w="100%" ratio={4 / 3}>
                  <Image
                    source={{
                      uri: item.flowerUrl,
                    }}
                    alt="image"
                  />
                </AspectRatio>
              </Box>
              <Stack p="3" space={3} direction="row">
                <Stack space={2} flex={1}>
                  <Heading size="sm" ml="-1" numberOfLines={1}>
                    {item.name}
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
                    {item.price}
                  </Text>
                </Stack>
                <Pressable p="2" onPress={() => handlePress(item)}>
                  <Icon
                    as={MaterialIcons}
                    name="favorite"
                    size="md"
                    color={item.isFav === "true" ? "danger.500" : "gray"}
                  />
                </Pressable>
              </Stack>
              <Text p="2" space={3} fontWeight="400" numberOfLines={3}>
                {item.des}
              </Text>
            </Box>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Home;

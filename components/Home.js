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
import { useIsFocused } from "@react-navigation/native";

import { saveFlowers, addToFavorites, getFlowers } from "./Utils";

const Home = ({ navigation }) => {
  const listFlower = [
    {
      id: "1",
      name: "PHONG LAN",
      timeStamp: "12:47 PM",
      price: "300.000 VNĐ",
      cate: "High",
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
      cate: "High",
      isFav: "false",
      des: "Lan hoàng thảo là một chi lớn trong Họ Lan. Hiện nay chi này bao gồm hơn 1.200 loài. Chi Lan hoàng thảo được phân bố rộng rãi nhiều ở Nam Á, Đông Á và Đông Nam Á cho đến Philippines, Borneo, nước Úc, Tân Gui-nê, Quần đảo Solomon và New Zealand.",
      flowerUrl:
        "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
    },
    {
      id: "12",
      name: "LAN MÈO ĐỐM",
      timeStamp: "8:36 PM",
      price: "100.000 VNĐ",
      cate: "Low",
      isFav: "false",
      des: "Những loài lan này thường mọc ở những nơi có bóng râm từ những cây gần đó và có thể có một hoặc những chùm hoa cao, đẹp mắt trên mỗi giả hành mang tới 25 bông hoa. Các lá đài và cánh hoa có màu xanh lục, kích thước và hình dạng tương tự nhau, được bao phủ bởi các đốm và vạch màu đỏ.",
      flowerUrl:
        "https://www.allaboutgardening.com/wp-content/uploads/2021/11/Spotted-Cat-of-the-Mountain.jpg",
    },
    {
      id: "4",
      name: "LAN PHI ĐIỆP",
      timeStamp: "8:56 PM",
      price: "180.000 VNĐ",
      cate: "Medium",
      isFav: "false",
      des: "Một số người gọi lan này là Giả Hạc, thuộc chi hoàng thảo, thích hợp với khí hậu nhiệt đới như Việt Nam. Loại lan này khi mọc hướng xuống đất và hoa nở tạo thành một dải như hình thác nước nên được xếp vào dòng thân thòng. Chiều cao cây trung bình từ 10 – 30cm, thân chia đốt như đốt mía. Lá màu xanh bóng, như hình thoi. Hoa có mùi thơm dễ chịu, tùy cảm nhận của mỗi người chơi lan họ sẽ liên tưởng tới những mùi khác nhau như mùi của mù tạt, quả mâm xôi hay mùi đại hoàng.",
      flowerUrl:
        "https://images.unsplash.com/photo-1678604014285-e99486ae1906?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "5",
      name: "LAN VỎ SÒ",
      timeStamp: "8:56 PM",
      price: "90.000 VNĐ",
      cate: "Low",
      isFav: "false",
      des: "Có tới 20 bông hoa không mùi, mọc ngược, nở trong thời gian dài tới sáu tháng, tô điểm cho quốc hoa của Belize này. Ở đó, loài hoa màu đen này còn được gọi là “orquidea negra” hay “Black Orchid.” Những bông hoa nở liên tục, vì vậy khi một bông hoa tàn, một bông hoa khác sẽ mở ra. Một số người đã báo cáo thời gian nở hoa lên tới 18 tháng vì đặc điểm này.",
      flowerUrl:
        "https://images.unsplash.com/photo-1531217182035-78d279dcdb7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: "13",
      name: "LAN THÁNG NĂM",
      timeStamp: "8:36 PM",
      price: "150.000 VNĐ",
      cate: "Medium",
      isFav: "false",
      des: "Là một loài sặc sỡ, Hoa lan Mayflower có các giả hành tròn, ngắn với một hoặc hai lá thịt nhuốm màu tím. Giả hành cũ sẽ khô héo vào cuối mùa và một cụm hoa mới sẽ hình thành từ giả hành mới phát triển.",
      flowerUrl:
        "https://www.allaboutgardening.com/wp-content/uploads/2022/02/Mayflower-Orchid.jpg",
    },
    {
      id: "2",
      name: "LAN VŨ NỮ",
      timeStamp: "11:11 PM",
      price: "120.000 VNĐ",
      cate: "Medium",
      isFav: "false",
      des: "Lan vũ nữ (tên khoa học: Cattleya) là một loài cây hoa phong lan đẹp thuộc họ Orchidaceae. Nó được đánh giá cao về giá trị thẩm mỹ và được trồng rộng rãi trên toàn thế giới. Lan vũ nữ có những đặc điểm nổi bật như cánh hoa lớn, màu sắc tươi sáng và hương thơm quyến rũ. Các loài lan vũ nữ thường có màu hoa đa dạng, bao gồm màu trắng, vàng, hồng, tím và đỏ.",
      flowerUrl:
        "https://images.unsplash.com/photo-1679966519593-43d645c9c433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
    {
      id: "6",
      name: "LAN HỒNG NỮ",
      timeStamp: "8:36 PM",
      price: "150.000 VNĐ",
      cate: "Medium",
      isFav: "false",
      des: "Loài hoa dại lớn sặc sỡ này có hai lá ở gốc đối diện với các đường gân song song và một bông hoa lớn ở cuối cuống mọc thẳng. Sự nở hoa trên loài lan này có thể có màu đỏ tươi đến hồng trắng, hồng trắng với đường viền màu hồng đậm hơn, hoặc (hiếm khi) toàn màu trắng. Một tên phổ biến cho loại cây này là hoa moccasin.",
      flowerUrl:
        "https://images.unsplash.com/photo-1655438060609-a3de40b52a24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },

    {
      id: "8",
      name: "LAN CỎ HỒNG",
      timeStamp: "8:36 PM",
      price: "45.000 VNĐ",
      cate: "Low",
      isFav: "false",
      des: "Những loài lan này là những cây mảnh khảnh với những chiếc lá hẹp, gấp lại và một thân ngầm. Tên chi có nghĩa là bộ râu đẹp liên quan đến những sợi lông màu vàng sáng trên môi của bông hoa. Chúng được cho là bắt chước phấn hoa và thu hút các loài thụ phấn.",
      flowerUrl:
        "https://www.allaboutgardening.com/wp-content/uploads/2021/11/Grass-Pink.jpg",
    },
    {
      id: "9",
      name: "LAN VANI",
      timeStamp: "8:36 PM",
      price: "99.000 VNĐ",
      cate: "Low",
      isFav: "false",
      des: "Vanilla planifolia là một loài thực vật có hoa thuộc chi Vanilla của họ Lan. Loài này được Jacks. ex Andrews miêu tả khoa học đầu tiên năm 1808. Đây là loài bản địa của México và là một trong những nguồn chủ yếu để sản xuất hương liệu vani do có hàm lượng chất vanillin cao.",
      flowerUrl:
        "https://www.allaboutgardening.com/wp-content/uploads/2021/11/Vanilla-Orchid.jpg",
    },
    // {
    //   id: "10",
    //   name: "CẨM TÚ CẦU",
    //   timeStamp: "8:36 PM",
    //   price: "20.000 VNĐ",
    //   cate: "Other",
    //   isFav: "false",
    //   des: "Hoa cẩm tú cầu mang vẻ đẹp mong nhanh, tinh tế như hình ảnh người thiếu nữ. Khi nhắc đến hoa cẩm tú cầu, ta thường nghĩ ra loài hoa này tượng trưng cho sự kiêu sa, lạnh lùng.",
    //   flowerUrl:
    //     "https://images.unsplash.com/photo-1593977901404-41e4afaa623d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    // },
    // {
    //   id: "11",
    //   name: "CẨM CHƯỚNG",
    //   timeStamp: "8:36 PM",
    //   price: "50.000 VNĐ",
    //   cate: "Other",
    //   isFav: "false",
    //   des: "Hoa Cẩm Chướng hay có tên gọi khác là hoa Phăng (có tên khoa học là Dianthus Caryophyllus) có nguồn gốc từ vùng Địa Trung Hải. Là một trong những loài hoa tồn tại hơn 2000 năm và rất được yêu thích do có mùi thơm quyến rũ và thời gian nở rất lâu. Cái tên khoa học Dianthus của hoa Cẩm Chướng còn mang ý nghĩa đặc biệt, được lấy trong từ “dios” có nghĩa là “thần thánh” (chỉ thần Zeus) và từ “anthos” có nghĩa là “hoa”. Vì vậy, loài hoa này còn có một cái tên mang ý nghĩa tượng trưng cao quý là “Hoa của chúa”.",
    //   flowerUrl:
    //     "https://images.unsplash.com/photo-1618913962881-89418453c8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    // },
    // {
    //   id: "7",
    //   name: "HỒNG VÀNG",
    //   timeStamp: "8:36 PM",
    //   price: "15.000 VNĐ",
    //   cate: "Rose",
    //   isFav: "false",
    //   des: "Hoa hồng vàng tượng trưng cho sự lạc quan, vui vẻ và chan hòa nên là loài hoa để tặng bạn bè, để mối quan hệ của bạn được củng cố trong lúc khó khăn.",
    //   flowerUrl:
    //     "https://images.unsplash.com/photo-1605138090832-672d54ff023f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1909&q=80",
    // },
    // {
    //   id: "14",
    //   name: "HOA ĐÀO",
    //   timeStamp: "8:32 PM",
    //   price: "25.000 VNĐ",
    //   cate: "Other",
    //   isFav: "false",
    //   des: "Hoa đào không chỉ là sắc hoa để tô điểm cho không gian ngày Tết, mà phía sau sắc hương của hoa là tầng tầng ý nghĩa được gửi gắm từ bao đời nay vào ngày Tết cổ truyền.",
    //   flowerUrl:
    //     "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    // },
  ];

  const [filteredData, setFilteredData] = useState(listFlower);

  const [selectedButton, setSelectedButton] = useState("all");

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchData();
    if (isFocused) {
      filterData(selectedButton);
    }
  }, [isFocused]);

  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("flowers");
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setFilteredData(parsedData);
      } else {
        saveFlowers(listFlower);
        filteredData(selectedButton);
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
    <View style={{ flex: 1 }}>
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
          onPress={() => filterData("Low")}
          variant={selectedButton === "Low" ? "solid" : "subtle"}
        >
          GIÁ THẤP
        </Button>
        <Button
          size="sm"
          onPress={() => filterData("Medium")}
          variant={selectedButton === "Medium" ? "solid" : "subtle"}
        >
          GIÁ TRUNG BÌNH
        </Button>
        <Button
          size="sm"
          onPress={() => filterData("High")}
          variant={selectedButton === "High" ? "solid" : "subtle"}
        >
          GIÁ CAO
        </Button>
      </Stack>
      <FlatList
        data={filteredData}
        numColumns={2}
        renderItem={({ item }) => (
          <Box alignItems="center" flex={1}>
            <Pressable
              onPress={() => navigation.navigate("Chi tiết", { item })}
            >
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
                <Stack p="3" pb="0" space={3} direction="row">
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
                      size="lg"
                      color={item.isFav === "true" ? "danger.500" : "gray"}
                    />
                  </Pressable>
                </Stack>
                <Text p="2" space={3} fontWeight="400" numberOfLines={3}>
                  {item.des}
                </Text>
              </Box>
            </Pressable>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Home;

import AsyncStorage from "@react-native-async-storage/async-storage";

// Lưu danh sách hoa
export const saveFlowers = async (flowers) => {
  try {
    const jsonFlowers = JSON.stringify(flowers);
    await AsyncStorage.setItem("flowers", jsonFlowers);
  } catch (error) {
    console.log("Lỗi khi lưu danh sách hoa:", error);
  }
};

// Truy xuất danh sách hoa
export const getFlowers = async () => {
  try {
    const jsonFlowers = await AsyncStorage.getItem("flowers");
    return jsonFlowers != null ? JSON.parse(jsonFlowers) : [];
  } catch (error) {
    console.log("Lỗi khi truy xuất danh sách hoa:", error);
    return [];
  }
};

// Thêm một mục vào danh sách yêu thích
export const addToFavorites = async (item) => {
  const flowers = await getFlowers();

  flowers.forEach((flower) => {
    if (flower.id === item.id) {
      flower.isFav = flower.isFav === "true" ? "false" : "true";
    }
  });
  saveFlowers(flowers);
};

//Xoá tất cả trong danh sách yêu thích
export const clearFavoritesList = async () => {
  try {
    // Xoá danh sách yêu thích từ AsyncStorage
    const flowers = await getFlowers();

    flowers.forEach((flower) => {
      flower.isFav = "false";
    });
    saveFlowers(flowers);
    console.log("Đã xoá tất cả các mục trong danh sách yêu thích.");
    // Cập nhật state hoặc hiển thị thông báo thành công
  } catch (error) {
    console.log("Lỗi khi xoá danh sách yêu thích:", error);
    // Xử lý lỗi
  }
};

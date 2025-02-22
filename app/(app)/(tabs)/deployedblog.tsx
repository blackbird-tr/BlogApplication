import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { getFireBlog } from "@/BlogProcess/BlogProcess";
import { useFocusEffect } from "@react-navigation/native";
import { useSession } from "@/context/ctx";
import Header from "../header";
import { GetFireUserByUserId } from "@/Firebase/FireStore/FireStoreUser";
import BlogModal from "@/Components/BlogComp/BlogModal";
type UserType = {
  uName: string;
  uSurname: string;
};
type MyBlogType = {
  bName: string;
  bContent: string;
};
export default function deployedblog() {
  const [blogs, setBlogs] = useState<Array<any>>([]);
  const [MyBlogs, setMyBlogs] = useState<MyBlogType>({
    bContent: "",
    bName: "",
  });
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [User, setUser] = useState<UserType>({ uName: "", uSurname: "" });

  const fetchBlogs = async () => {
    setLoading(true);
    const fetchedBlogs = await getFireBlog();
    setBlogs(fetchedBlogs);
    setLoading(false);
  };
  const { signOut } = useSession();
  useFocusEffect(
    useCallback(() => {
      fetchBlogs();
    }, [])
  );
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={{
        padding: 10,
        borderWidth: 1,
        borderRadius: 12,
        height: 180,
        width: 170,
        borderColor: "#ccc",
        flexDirection: "row",
        marginTop: 12,
      }}
    >
      <View style={{ alignItems: "flex-end" }}>
        <FontAwesome5
          name="readme"
          size={32}
          color="rgba(87, 186, 240, 0.78)"
        />
        <View style={{ marginStart: 12 }}>
          <Text style={{ marginTop: 24, fontSize: 18, fontWeight: "bold" }}>
            {item.name}
          </Text>
          <Text style={{ marginTop: 8, color: "gray" }}>
            Content: {item.content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const handlePress = async (item: any) => {
    const user = await GetFireUserByUserId(item.user_id);
    if (user) {
      setUser({
        uName: user.name,
        uSurname: user.surname,
      });
      setMyBlogs({
        bName: item.name,
        bContent: item.content,
      });
    }
    setModalVisible(true);
  };
  return (
    <>
      <BlogModal
        blog={MyBlogs}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        user={User}
      />
      <View style={{ backgroundColor: "#f9f9f9" }}>
        <Header HeaderName="Shared Blogs" logOut={signOut} />
      </View>
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: "#f9f9f9",
          flexDirection: "row",
        }}
      >
        <FlatList
          data={blogs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
          ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Text>Blog bulunamadı!</Text>
            </View>
          }
        />
      </View>
    </>
  );
}

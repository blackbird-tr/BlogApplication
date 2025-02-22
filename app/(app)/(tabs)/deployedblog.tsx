import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { router } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';
import { getFireBlog } from '@/BlogProcess/BlogProcess';
import { useFocusEffect } from '@react-navigation/native';
import { useSession } from '@/context/ctx';
import Header from '../header'; 
import { GetFireUserByUserId } from '@/Firebase/FireStore/FireStoreUser';
import BlogModal from '@/Components/BlogComp/BlogModal';
type UserType ={
  uName:string;
  uSurname:string;
}
type MyBlogType ={
  bName:string;
  bContent:string;
}
export default function deployedblog() {
  const [blogs, setBlogs] = useState<Array<any>>([]);
  const [MyBlogs, setMyBlogs] = useState<MyBlogType>({bContent:"",bName:""});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [User, setUser] = useState<UserType>({ uName: "", uSurname: "" });

  const fetchBlogs = async () => {
    setLoading(true);
    const fetchedBlogs = await getFireBlog()
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
    <TouchableOpacity onPress={()=>handlePress(item)} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text> 
      <Text style={{ color: 'gray' }}>Content: {item.content}</Text>
    </TouchableOpacity>
  );
  const handlePress=async (item:any)=>{

    
    const user = await GetFireUserByUserId(item.user_id);
if (user) {
  setUser({
    uName: user.name, 
    uSurname: user.surname
  });
  setMyBlogs({
    bName:item.name,
    bContent:item.content
  })
}
  setModalVisible(true);
  }
  return (
    <>
    <BlogModal  blog={MyBlogs} modalVisible={modalVisible} setModalVisible={setModalVisible} user={User} />
    <View>
      <Header HeaderName="Shared Blogs"  logOut={signOut} />
    </View>
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f9f9f9" }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}> </Text>
        <TouchableOpacity onPress={fetchBlogs} disabled={loading}>
          <Ionicons name="refresh" size={24} color={loading ? 'gray' : 'black'} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={blogs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text>Blog bulunamadı!</Text>
          </View>
        }
      />
    </View></>
  );
}
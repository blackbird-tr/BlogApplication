import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { GetBlogs } from '@/Firebase/FireStore/FireStoreProcess';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const [blogs, setBlogs] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    const fetchedBlogs = await GetBlogs();
    setBlogs(fetchedBlogs);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
      <Text>{item.content}</Text>
      <Text style={{ color: 'gray' }}>Yazar: {item.user_id}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Bloglar</Text>
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
    </View>
  );
}
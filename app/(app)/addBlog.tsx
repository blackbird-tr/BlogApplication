import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router'; 
import { AddMyBlog } from '@/SQLite/SqLiteProcess';
  

export default function AddBlog() {
  const [name, setName] = useState('');
  const [content, setContent] = useState(''); 
  
  const handleSave = async () => {
    if (name.trim() === '' || content.trim() === '') return;
    try{
      AddMyBlog(name,content); 
    }
    catch(error){
      alert("failed")
    }
    router.push('/')
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Başlık:</Text>
      <TextInput
        style={styles.input}
        placeholder="Blog başlığını girin"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>İçerik:</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Blog içeriğini girin"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Button title="Kaydet" onPress={handleSave} />

       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  textArea: {
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  blogList: {
    marginTop: 20,
  },
  blogItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  blogTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

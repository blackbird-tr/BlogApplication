import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
 
import * as Yup from 'yup';
interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}
const InputField = ({ label, value, onChangeText, secureTextEntry }: InputFieldProps) => (
  <View style={styles.InputView}  >
    <Text style={styles.Text}>{label}</Text>
    <TextInput 
    style={styles.InputText}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  </View>
);
export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    birthYear: "",
    email: "",
    password: "",
    passwordCheck: "",
  });
  const [errors, setErrors] = useState<any>({});
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('İsim gereklidir'),
    surname: Yup.string().required('Soyisim gereklidir'),
    birthYear: Yup.number()
      .typeError('Doğum yılı sayı olmalıdır')
      .required('Doğum yılı gereklidir')
      .min(1900, 'Geçerli bir doğum yılı giriniz')
      .max(new Date().getFullYear(), 'Gelecekte doğum yılı olamaz'),
    email: Yup.string().email('Geçersiz email').required('Email gereklidir'),
    password: Yup.string().min(6, 'Şifre en az 6 karakter olmalıdır').required('Şifre gereklidir'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
      .required('Şifre doğrulama gereklidir'),
  });



  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      console.log('Form başarıyla gönderildi!', formData);
    } catch (validationErrors: any) {
      const newErrors: any = {};
      validationErrors.inner.forEach((error: any) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <ScrollView style={styles.MainView}>
      <Image source={require('@/assets/images/account.png')} style={styles.image} />
      
      <InputField label="Name" value={formData.name} onChangeText={(text) => handleChange("name", text)} />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      <InputField label="Surname" value={formData.surname} onChangeText={(text) => handleChange("surname", text)} />
      {errors.surname && <Text style={styles.errorText}>{errors.surname}</Text>}
      <InputField label="Email" value={formData.email} onChangeText={(text) => handleChange("email", text)} />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <InputField label="BirthYear" value={formData.birthYear} onChangeText={(text) => handleChange("birthYear", text)} />
      {errors.birthYear && <Text style={styles.errorText}>{errors.birthYear}</Text>}
      <InputField label="Password" value={formData.password} secureTextEntry={true} onChangeText={(text) => handleChange("password", text) } />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      <InputField label="Password Again" value={formData.passwordCheck} secureTextEntry={true} onChangeText={(text) => handleChange("passwordCheck", text)} />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit} >
      <Text style={styles.buttonText}>{'Save'}</Text>
    </TouchableOpacity> 
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginLeft:50,
    marginBottom: 10,
  },
  MainView:{
    marginTop:35,
    

  },
  InputText:{
    borderWidth:1,
    borderRadius:12,
    margin:4,
    borderColor:'rgba(130, 129, 129, 0.76)',
    paddingLeft:15,
    width:'80%',
    alignSelf:'center'

  },
  InputView:{
    
  },
  Text:{
    textAlign:'center',
    fontWeight:'700',
    fontStyle:'italic',
    color:'rgba(45, 44, 44, 0.76)'
  },
  button:{
    borderWidth:1,
    borderColor:'rgba(36, 68, 143, 0.76)',
    borderRadius:12,
    width:90,
    height:40,
    alignSelf:'center',
    justifyContent:'center',
    marginTop:20,
    marginBottom:20,

  },
  buttonText:{
    textAlign:'center',
    fontWeight:'700',
    fontStyle:'italic',
    color:'rgba(36, 68, 143, 0.76)',
  },
  image:{
    height:200,
    width:200,
    alignSelf:'center', 
    opacity:0.6
  }
});

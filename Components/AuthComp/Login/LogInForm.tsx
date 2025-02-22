import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { router } from "expo-router";
interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}
const InputField = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
}: InputFieldProps) => {
  return (
    <View style={styles.InputView}>
      <Text style={styles.Text}>{label}</Text>
      <TextInput
        style={styles.InputText}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
type FormData = {
  email: string;
  password: string;
};
type Props = {
  handleLogin: (formDATA: FormData) => void;
};

export default function LogInForm({ handleLogin }: Props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>({});
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Geçersiz email").required("Email gereklidir"),
    password: Yup.string()
      .min(6, "Şifre en az 6 karakter olmalıdır")
      .required("Şifre gereklidir"),
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      handleLogin(formData);
    } catch (validationErrors: any) {
      const newErrors: any = {};
      validationErrors.inner.forEach((error: any) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };
  return (
    <View style={styles.mainView}>
      <Image
        source={require("@/assets/images/login.png")}
        style={styles.image}
      />

      <InputField
        label="E-mail"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <InputField
        label="Password"
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry={true}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{"LogIn"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.registerText}>
          Don't you have an account ? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    alignSelf: "center",
    opacity: 0.6,
    marginBottom: 40,
  },
  errorText: {
    color: "red",
    marginLeft: 50,
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "rgba(36, 68, 143, 0.76)",
    borderRadius: 12,
    width: 90,
    height: 40,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  InputText: {
    borderWidth: 1,
    borderRadius: 12,
    margin: 4,
    borderColor: "rgba(130, 129, 129, 0.76)",
    paddingLeft: 15,
    width: "80%",
    alignSelf: "center",
  },
  InputView: {
    marginTop: 12,
  },
  mainView: {
    flex: 1,
    marginTop: 40,
  },
  Text: {
    textAlign: "center",
    fontWeight: "700",
    fontStyle: "italic",
    color: "rgba(45, 44, 44, 0.76)",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "700",
    fontStyle: "italic",
    color: "rgba(36, 68, 143, 0.76)",
  },
  registerText: {
    textAlign: "center",
    fontWeight: "500",
    color: "rgba(2, 18, 55, 0.94)",
  },
});

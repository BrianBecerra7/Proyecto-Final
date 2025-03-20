import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const ImageUploader = ({ uploadPreset, onUploadComplete }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImageToCloudinary(result.assets[0].uri);
    }
  };

  const uploadImageToCloudinary = async (imageUri) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'profile.jpg',
    });
    formData.append('upload_preset', uploadPreset);
    formData.append('cloud_name', 'df5qzxunp');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/df5qzxunp/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setLoading(false);

      if (data.secure_url) {
        onUploadComplete(data.secure_url);
      } else {
        console.error('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text>{loading ? 'Uploading...' : 'Pick an Image'}</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default ImageUploader;

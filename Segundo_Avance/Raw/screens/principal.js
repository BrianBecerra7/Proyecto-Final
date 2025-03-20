import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';
import Footer from '../components/Footer';

const Principal = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Box style={styles.box}>
          <Text style={styles.title}>Welcome to RawConnect</Text>
          <Text style={styles.subtitle}>Your journey starts here</Text>
        </Box>
        <Footer/>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 350,
    borderRadius: 15,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    marginBottom: 10,
  },
});

export default Principal;

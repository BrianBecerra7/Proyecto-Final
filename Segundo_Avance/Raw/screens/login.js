import { StatusBar } from 'expo-status-bar';
import { Box, Input, NativeBaseProvider } from 'native-base';
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import Footer from '../components/Footer';
import { auth, db, doc, getDoc, signInWithEmailAndPassword, onAuthStateChanged } from '../config/fb.js'; 

export default function Login({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [displayText, setDisplayText] = useState({
    user: "",
    pass: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        
        const docRef = doc(db, "Roles", currentUser.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const role = docSnap.data().role;
          if (role === 1) {
            navigation.navigate('MainBuyer');
          } else if (role === 2) {
            navigation.navigate('MainProducer');
          } else {
            setError("Invalid role assigned to this user.");
          }
        } else {
          setError("User not found in roles collection.");
        }
      }
      setLoading(false); 
    });

    
    return () => unsubscribe();
  }, [navigation]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, user, pass);
      const currentUser = userCredential.user;

      const docRef = doc(db, "Roles", currentUser.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const role = docSnap.data().role;

        if (role === 1) {
          navigation.navigate('MainBuyer');
        } else if (role === 2) {
          navigation.navigate('MainProducer');
        } else {
          setError("Invalid role assigned to this user.");
        }
      } else {
        setError("User not found in roles collection.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const handlePredefinedLoginpRroducer = async () => {
    try {

      const userCredential = await signInWithEmailAndPassword(auth, predefinedUserProd.email, predefinedUserProd.password);
      const currentUser = userCredential.user;

      const docRef = doc(db, "Roles", currentUser.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const role = docSnap.data().role;

        if (role === 1) {
          navigation.navigate('MainBuyer');
        } else if (role === 2) {
          navigation.navigate('MainProducer');
        } else {
          setError("Invalid role assigned to this user.");
        }
      } else {
        setError("User not found in roles collection.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const predefinedUserProd = {
    email: "productor@gmail.com",
    password: "Prod123456&"
  };

  const handlePredefinedLoginpBuyer = async () => {
    try {

      const userCredential = await signInWithEmailAndPassword(auth, predefinedUserBuyer.email, predefinedUserBuyer.password);
      const currentUser = userCredential.user;

      const docRef = doc(db, "Roles", currentUser.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const role = docSnap.data().role;


        if (role === 1) {
          navigation.navigate('MainBuyer');
        } else if (role === 2) {
          navigation.navigate('MainProducer');
        } else {
          setError("Invalid role assigned to this user.");
        }
      } else {
        setError("User not found in roles collection.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const predefinedUserBuyer = {
    email: "jorgito@gmail.com",
    password: "Jorgito123456&"
  };





  if (loading) {
    return <Text>Loading...</Text>;
  }


  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Box>
          <Card.Content style={{ boxShadow: '50%', borderRadius: 10, backgroundColor: '#f0f0f0', alignItems: 'center', width: 350, height: 600, marginBottom: 80 }}>
            <Text variant="displayLarge" style={{ margin: 40 }}>Login</Text>
            <Card.Content >
              <Image source={require('../assets/user.png')} style={styles.image} />
            </Card.Content>
            <Input
              variant="underlined"
              placeholder="Email"
              value={user}
              onChangeText={setUser}
              style={styles.input}
            />
            <Input
              variant="underlined"
              placeholder="Password"
              value={pass}
              onChangeText={setPass}
              style={styles.input}
              secureTextEntry={true}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Text style={styles.text}>Don't have an Account?{" "}
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>Register</Text>
              </TouchableOpacity>
            </Text>

            <Button
              icon="account"
              mode="contained"
              onPress={handleLogin}
              style={{ margin: 25, backgroundColor: '#4f4f4f' }}>
              Login
            </Button>

            <Button
              icon="account"
              mode="contained"
              onPress={handlePredefinedLoginpRroducer}
              style={{ margin: 25, backgroundColor: '#4f4f4f' }}>
              Login Producer
            </Button>

            <Button
              icon="account"
              mode="contained"
              onPress={handlePredefinedLoginpBuyer}
              style={{ margin: 25, backgroundColor: '#4f4f4f' }}>
              Login Buyer
            </Button>

          </Card.Content>

          <StatusBar style="auto" />
        </Box>

        <Footer />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 20,
    width: 300,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    margin: 20
  },
  link: {
    color: '#3498db',
    marginLeft: 10,
  },
  title: {
    marginBottom: 50,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

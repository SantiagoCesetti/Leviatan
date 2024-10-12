import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import appFirebase from '../credenciales';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const auth = getAuth(appFirebase);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setError('');
        setShowPassword(false);
    };

    useFocusEffect(
        React.useCallback(() => {
            resetForm();
        }, [])
    );

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Inicio de sesión exitoso
            setError('');
            resetForm();
        } catch (error) {
            setError('Error al iniciar sesión: ' + error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            // Inicio de sesión con Google exitoso
            setError('');
            resetForm();
        } catch (error) {
            setError('Error al iniciar sesión con Google: ' + error.message);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            await signInWithPopup(auth, facebookProvider);
            // Inicio de sesión con Facebook exitoso
            setError('');
            resetForm();
        } catch (error) {
            setError('Error al iniciar sesión con Facebook: ' + error.message);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotPassword = () => {
        Linking.openURL('https://www.youtube.com/watch?v=xvFZjo5PgG0');
    };

    const handleHomeNavigation = () => {
        navigation.navigate('index');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleHomeNavigation} style={styles.homeIcon}>
                        <Ionicons name="home-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headertext}>Clean Class</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Inicio de sesión</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Correo electrónico"
                            value={email}
                            onChangeText={(text) => setEmail(text.slice(0, 50))}
                            keyboardType="email-address"
                            maxLength={50}
                        />
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Contraseña"
                                value={password}
                                onChangeText={(text) => setPassword(text.slice(0, 20))}
                                secureTextEntry={!showPassword}
                                maxLength={20}
                            />
                            <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
                                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
                            <Text style={styles.forgotPassword}>Olvidé contraseña...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
                            <Ionicons name="logo-google" size={24} color="white" style={styles.socialIcon} />
                            <Text style={styles.buttonText}>Iniciar Sesión con Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.facebookButton} onPress={handleFacebookLogin}>
                            <Ionicons name="logo-facebook" size={24} color="white" style={styles.socialIcon} />
                            <Text style={styles.buttonText}>Iniciar Sesión con Facebook</Text>
                        </TouchableOpacity>
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#E6F3FF',
    },
    header: {
        backgroundColor: "#00B8BA",
        height: 80,
        width: 'auto',
        padding: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    homeIcon: {
        marginLeft: 20,
    },
    headertext: {
        paddingTop: 20,
        fontSize: 25,
        color: '#000000',
        marginRight: 20,
        fontWeight: 'bold'
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
    },
    formContainer: {
        width: '100%',
        maxWidth: 300,
        alignItems: 'center',
        alignSelf: 'center',
    },
    formTitle: {
        fontSize: 24,
        marginBottom: 30,
        color: '#000000',
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderRadius: 3,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    passwordInput: {
        flex: 1,
        height: 40,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderRadius: 3,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
    },
    forgotPasswordContainer: {
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    forgotPassword: {
        color: 'light-black',
        textDecorationLine: 'underline',
    },
    button: {
        height: 40,  
        width: '100%',  
        backgroundColor: '#000',  
        borderRadius: 10,  
        alignSelf: 'center',
        justifyContent: 'center',  
        marginTop: 8,
    },
    googleButton: {
        height: 40,
        width: '100%',
        backgroundColor: '#4285F4',
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    facebookButton: {
        height: 40,
        width: '100%',
        backgroundColor: '#3b5998',
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    socialIcon: {
        marginRight: 10,
    },
    buttonText: {
        color: '#fff',  
        textAlign: 'center',  
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default LoginForm;

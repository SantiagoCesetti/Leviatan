import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import appFirebase from '../credenciales';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';

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
        Linking.openURL('https://only-fans.uk/pantu');
    };

    const handleHomeNavigation = () => {
        navigation.navigate('index');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Header handleHomeNavigation={handleHomeNavigation} />
                <View style={styles.body}>
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Inicio de sesión</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Correo electrónico</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={(text) => setEmail(text.slice(0, 50))}
                                keyboardType="email-address"
                                maxLength={50}
                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Contraseña</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    value={password}
                                    onChangeText={(text) => setPassword(text.slice(0, 20))}
                                    secureTextEntry={!showPassword}
                                    maxLength={20}
                                />
                                <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
                                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#666" />
                                </TouchableOpacity>
                            </View>
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
        backgroundColor: '#f0f8ff',
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    formContainer: {
        width: '100%',
        maxWidth: 300,
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        alignSelf: 'center',
    },
    formTitle: {
        fontSize: 24,
        marginBottom: 30,
        color: '#000000',
    },
    inputWrapper: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        width: '100%',
        height: 45,
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 8,
    },
    passwordInput: {
        flex: 1,
        height: 45,
        paddingHorizontal: 12,
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    eyeIcon: {
        padding: 6,
    },
    forgotPasswordContainer: {
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    forgotPassword: {
        color: '#2196F3',
        fontSize: 14,
        textDecorationLine: 'underline',
        marginTop: -10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#2196F3',
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default LoginForm;

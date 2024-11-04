import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import appFirebase from '../credenciales';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import Header from '../../components/Header';
import Background from '../../components/Background';
import Background2 from '../../components/Background2';
import Header2 from '../../components/Header2';
import { ThemeProvider, ThemeContext } from '../../components/ThemeContext';
import ColorMode from '../../components/ColorMode';

const auth = getAuth(appFirebase);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const LoginFormContent = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
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
        Linking.openURL('https://only-fans.uk/pantup');
    };

    const handleMenuPress = () => {
        console.log('Menu pressed');
    };

    return (
        <View style={styles.container}>
            <View style={styles.backgroundContainer}>
                {isDarkMode ? <Background2 /> : <Background />}
            </View>
            <View style={styles.mainContent}>
                {isDarkMode ? <Header2 handleHomeNavigation={handleMenuPress} /> : <Header handleHomeNavigation={handleMenuPress} />}
                <ColorMode />
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.body}>
                        <View style={[styles.formContainer, isDarkMode && styles.formContainerDark]}>
                            <Text style={[styles.formTitle, isDarkMode && styles.formTitleDark]}>Inicio de sesión</Text>
                            <View style={styles.inputWrapper}>
                                <View style={styles.labelContainer}>
                                    <Ionicons name="mail" size={20} color={isDarkMode ? '#A73DFF' : '#00B8BA'} style={styles.icon} />
                                    <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Correo electrónico</Text>
                                </View>
                                <TextInput
                                    style={[
                                        styles.input,
                                        emailFocused && (isDarkMode ? styles.inputFocusedDark : styles.inputFocused),
                                        isDarkMode && styles.inputDark
                                    ]}
                                    value={email}
                                    onChangeText={(text) => setEmail(text.slice(0, 50))}
                                    keyboardType="email-address"
                                    maxLength={50}
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => setEmailFocused(false)}
                                />
                            </View>
                            <View style={styles.inputWrapper}>
                                <View style={styles.labelContainer}>
                                    <Ionicons name="lock-closed" size={20} color={isDarkMode ? '#A73DFF' : '#00B8BA'} style={styles.icon} />
                                    <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Contraseña</Text>
                                </View>
                                <View style={[
                                    styles.passwordContainer,
                                    passwordFocused && (isDarkMode ? styles.inputFocusedDark : styles.inputFocused),
                                    isDarkMode && styles.inputDark
                                ]}>
                                    <TextInput
                                        style={[styles.passwordInput, isDarkMode && styles.inputDark]}
                                        value={password}
                                        onChangeText={(text) => setPassword(text.slice(0, 20))}
                                        secureTextEntry={!showPassword}
                                        maxLength={20}
                                        onFocus={() => setPasswordFocused(true)}
                                        onBlur={() => setPasswordFocused(false)}
                                    />
                                    <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
                                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color={isDarkMode ? '#A73DFF' : '#666'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
                                <Text style={[styles.forgotPassword, isDarkMode && styles.forgotPasswordDark]}>
                                    Olvidé contraseña...
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, isDarkMode && styles.buttonDark]} onPress={handleLogin}>
                                <Text style={styles.buttonText}>Iniciar Sesión</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.googleButton, isDarkMode && styles.googleButtonDark]} onPress={handleGoogleLogin}>
                                <Ionicons name="logo-google" size={24} color="white" style={styles.socialIcon} />
                                <Text style={styles.buttonText}>Iniciar Sesión con Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.facebookButton, isDarkMode && styles.facebookButtonDark]} onPress={handleFacebookLogin}>
                                <Ionicons name="logo-facebook" size={24} color="white" style={styles.socialIcon} />
                                <Text style={styles.buttonText}>Iniciar Sesión con Facebook</Text>
                            </TouchableOpacity>
                            {error ? <Text style={styles.errorText}>{error}</Text> : null}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const LoginForm = () => {
    return (
        <ThemeProvider>
            <LoginFormContent />
        </ThemeProvider>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#E6F3FF',
    },
    body: {
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 100,
    },
    formContainer: {
        width: '100%',
        maxWidth: 375,
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
        outlineStyle: 'none',
    },
    inputFocused: {
        borderColor: '#00B8BA',
        borderWidth: 2,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 8,
        outlineStyle: 'none',
    },
    passwordInput: {
        flex: 1,
        height: 45,
        paddingHorizontal: 12,
        fontSize: 16,
        backgroundColor: 'transparent',
        outlineStyle: 'none',
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
        color: '#5D9696',
        fontSize: 14,
        textDecorationLine: 'underline',
        marginTop: -10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#00B8BA',
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
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 5,
        marginTop: -7,
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    mainContent: {
        flex: 1,
        zIndex: 2,
    },
    formContainerDark: {
        backgroundColor: '#1A1625',
        borderColor: '#A73DFF',
    },
    formTitleDark: {
        color: '#E6E6FA',
    },
    inputLabelDark: {
        color: '#E6E6FA',
    },
    inputDark: {
        backgroundColor: '#2D2640',
        borderColor: '#4A4460',
        color: '#E6E6FA',
    },
    inputFocusedDark: {
        borderColor: '#A73DFF',
        borderWidth: 2,
    },
    forgotPasswordDark: {
        color: '#A73DFF',
    },
    buttonDark: {
        backgroundColor: '#9370DB',
        borderColor: '#7B68EE',
    },
    googleButtonDark: {
        backgroundColor: '#8A2BE2',
        borderColor: '#9400D3',
    },
    facebookButtonDark: {
        backgroundColor: '#7B68EE',
        borderColor: '#6A5ACD',
    },
});

export default LoginForm;

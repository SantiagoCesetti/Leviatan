import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, ScrollView, Image } from 'react-native';
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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

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

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserData({
                    nombre: user.displayName || "Usuario",
                    email: user.email,
                    foto: user.photoURL,
                    verificado: user.emailVerified
                });
            } else {
                setIsLoggedIn(false);
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError('Error al iniciar sesión: ' + error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            setUserData({
                nombre: user.displayName || "Usuario",
                email: user.email,
                foto: user.photoURL,
                verificado: user.emailVerified
            });
        } catch (error) {
            setError('Error al iniciar sesión con Google: ' + error.message);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            await signInWithPopup(auth, facebookProvider);
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

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserData(null);
        auth.signOut(); // Cerrar sesión en Firebase
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
                        {!isLoggedIn ? (
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
                        ) : (
                            <View style={[styles.formContainer, isDarkMode && styles.formContainerDark]}>
                                <Text style={[styles.formTitle, isDarkMode && styles.formTitleDark]}>
                                    Información de la cuenta
                                </Text>
                                <View style={styles.userInfoContainer}>
                                    {/* Nombre */}
                                    <View style={[styles.infoRow, isDarkMode && styles.infoRowDark]}>
                                        <View style={styles.iconWrapper}>
                                            <Ionicons 
                                                name="person-outline" 
                                                size={20} 
                                                color={isDarkMode ? '#A73DFF' : '#00B8BA'} 
                                            />
                                        </View>
                                        <View style={styles.infoContent}>
                                            <Text style={[styles.infoLabel, isDarkMode && styles.infoLabelDark]}>Nombre</Text>
                                            <Text style={[styles.infoValue, isDarkMode && styles.infoValueDark]}>{userData.nombre}</Text>
                                        </View>
                                    </View>

                                    {/* Email */}
                                    <View style={[styles.infoRow, isDarkMode && styles.infoRowDark]}>
                                        <View style={styles.iconWrapper}>
                                            <Ionicons 
                                                name="mail-outline" 
                                                size={20} 
                                                color={isDarkMode ? '#A73DFF' : '#00B8BA'} 
                                            />
                                        </View>
                                        <View style={styles.infoContent}>
                                            <Text style={[styles.infoLabel, isDarkMode && styles.infoLabelDark]}>Email</Text>
                                            <Text style={[styles.infoValue, isDarkMode && styles.infoValueDark]}>
                                                {userData.email} {userData.verificado ? '(Verificado)' : ''}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Foto de perfil */}
                                    <View style={[styles.infoRow, isDarkMode && styles.infoRowDark]}>
                                        <View style={styles.iconWrapper}>
                                            <Ionicons 
                                                name="image-outline" 
                                                size={20} 
                                                color={isDarkMode ? '#A73DFF' : '#00B8BA'} 
                                            />
                                        </View>
                                        <View style={styles.infoContent}>
                                            <Text style={[styles.infoLabel, isDarkMode && styles.infoLabelDark]}>Foto de perfil</Text>
                                            {userData?.foto && (
                                                <Image 
                                                    source={{ uri: userData.foto }} 
                                                    style={[styles.profilePhoto, isDarkMode && styles.profilePhotoDark]}
                                                />
                                            )}
                                        </View>
                                    </View>

                                    {/* Último acceso */}
                                    <View style={[styles.infoRow, isDarkMode && styles.infoRowDark]}>
                                        <View style={styles.iconWrapper}>
                                            <Ionicons 
                                                name="time-outline" 
                                                size={20} 
                                                color={isDarkMode ? '#A73DFF' : '#00B8BA'} 
                                            />
                                        </View>
                                        <View style={styles.infoContent}>
                                            <Text style={[styles.infoLabel, isDarkMode && styles.infoLabelDark]}>Último acceso</Text>
                                            <Text style={[styles.infoValue, isDarkMode && styles.infoValueDark]}>
                                                {new Date().toLocaleString('es-ES', {
                                                    weekday: 'long',
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <TouchableOpacity 
                                    style={[styles.logoutButton, isDarkMode && styles.logoutButtonDark]} 
                                    onPress={handleLogout}
                                >
                                    <Text style={styles.buttonText}>Cerrar Sesión</Text>
                                </TouchableOpacity>
                            </View>
                        )}
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
        width: '90%',
        maxWidth: 500,
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 12,
        shadowColor: '#00B8BA',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
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
        shadowColor: '#A73DFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 15,
        elevation: 8,
    },
    formTitleDark: {
        color: '#FFFFFF',
    },
    inputLabelDark: {
        color: '#E6E6FA',
    },
    inputDark: {
        backgroundColor: '#2D2640',
        borderColor: '#4A4460',
        color: '#E6E6FA',
        borderRadius: 10,
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
    userInfoText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        padding: 8,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e1e1e1',
    },
    userInfoTextDark: {
        color: '#E6E6FA',
        backgroundColor: '#2D2640',
        borderColor: '#4A4460',
    },
    logoutButton: {
        backgroundColor: '#00B8BA',
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    logoutButtonDark: {
        backgroundColor: '#A73DFF',
    },
    userInfoContainer: {
        width: '100%',
    },
    infoRow: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    infoRowDark: {
        backgroundColor: '#2D2640',
    },
    iconWrapper: {
        width: 24,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 4,
    },
    infoLabelDark: {
        color: '#9999A3',
    },
    infoValue: {
        fontSize: 15,
        color: '#333333',
    },
    infoValueDark: {
        color: '#FFFFFF',
    },
    profilePhoto: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginTop: 8,
        borderWidth: 2,
        borderColor: '#00B8BA',
    },
    profilePhotoDark: {
        borderColor: '#A73DFF',
    },
    logoutButton: {
        backgroundColor: '#00B8BA',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    logoutButtonDark: {
        backgroundColor: '#A73DFF',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default LoginForm;

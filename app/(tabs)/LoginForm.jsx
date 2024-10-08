import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import appFirebase from '../credenciales';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(appFirebase);

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Inicio de sesión exitoso
            setError('');
        } catch (error) {
            setError('Error al iniciar sesión: ' + error.message);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotPassword = () => {
        Linking.openURL('https://www.youtube.com/watch?v=xvFZjo5PgG0');
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Inicio de sesión</Text>
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
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#B6DEF9',
    },
    formContainer: {
        width: '100%',
        maxWidth: 300,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
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
        backgroundColor: '#87CEFA',
        borderWidth: 2,
        borderColor: '#4682B4',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        marginTop: 7,
    },
    buttonText: {
        color: 'black',
        fontSize: 14.3,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default LoginForm;

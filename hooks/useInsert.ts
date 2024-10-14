import { useState} from "react";
import Firebase from "firebase/app";
import "firebase/firestore";
 const useInsert = () => {

    const PersonalForm = () => {
        const [nombre, setNombre] = useState("");
        const [apellido, setApellido] = useState("");
        const [email, setEmail] = useState("");
        const [telefono, setTelefono] = useState("");
        const [isOrdenado, setIsOrdenado] = useState("");
        const [isBarrido, setIsBarrido] = useState("");
        const [isTrapeado, setIsTrapeado] = useState("");
        const [isDesinfectado, setIsDesinfectado] = useState("");
        const [observacion, setObservacion] = useState("");
        const [habilitar, setHabilitar] = useState(1);
    
        const handlesubmit = async (e) => {
            e.preventDeFault();

        const nuevoPersonal = {
            nombre,
            apellido,
            email,
            telefono,
            isOrdenado,
            isBarrido,
            isTrapeado,
            isDesinfectado,
            observacion,

            created_at: Firebase.firestore.FieldValue.serverTimestamp(),
        };
        
        try {
            await Firebase.firestore().collection("personal").doc(nombre).set(nuevoPersonal);
                alert("Personal registrado exitosamente");
                limpiarFormulario();
        }   catch (error) {
            console.error("Error al registrar al profesor: ", error);
        }
            try {
                await Firebase.firestore().collection("personal").doc(nombre).update(nuevoPersonal);
                alert("Personal actualizado exitosamente");
                limpiarFormulario();
            } catch (error) {
                console.error("Error al actualizar al profesor: ", error);
            }
            try {
                await Firebase.firestore().collection("personal").doc(nombre).update({
                    habilitar: 0,
                    updated_at: Firebase.firestore.FieldValue.serverTimestamp()
                });
                setHabilitar(0);
                alert ("Personal deshabilitado exitosamente");
            } catch (error) {
                console.error("Error al deshabilitar al Personal: ", error);
            }
        };

        const limpiarFormulario = () => {
            setNombre("");
            setApellido("");
            setEmail("");
            setTelefono("");
            setIsOrdenado("");
            setIsBarrido("");
            setIsTrapeado("");
            setIsDesinfectado("");
            setObservacion("");            
            setHabilitar(1);
        }
    }
}
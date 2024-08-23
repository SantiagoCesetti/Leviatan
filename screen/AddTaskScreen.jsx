import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { Formik } from "formik"; //formik sirve para llamar a todos los formularios, si se desea llamar solo a uno se debe elegir dentro de formik,ej: formik@
import * as Yup from "yup";
import { Input, VStack } from "native-base"; //sirve para validar la URL
import { useTaskStore } from "../store/taskStore";
import { useNavigation } from "@react-navigation/native"; 

const AddTaskScreen = () => {
  const addTask = useTaskStore((state) => state.addTask);
  const navigation = useNavigation();

  const TaskSchema = Yup.object().shape({
    title: Yup.string().min(2, "Algo!").max(24, "Algo!").required("Título!"),
    description: Yup.string()
      .min(8, "Algo!")
      .max(60, "Algo!")
      .required("Título!"),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ title: "", description: "" }}
        validationSchema={TaskSchema}
        onSubmit={(values, { resetForm }) => {
          addTask(values);
          resetForm();
          navigation.navigate("Tarefas");
        }}
      >
        {" "}
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <VStack space={4}>
            <Input
              placeholder="Titulo"
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
              isInvalid={touched.title && !!errors.title}
              _invalid={{ borderColor: "red.500" }}
            />{" "}
            {touched.title && errors.title && (
              <Text style={styles.errorText}> {errors.title} </Text>
            )}{" "}
            <Input
              placeholder="Descripción"
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              isInvalid={touched.description && !!errors.description}
              _invalid={{ borderColor: "red.500" }}
            />{" "}
            {touched.description && errors.description && (
              <Text style={styles.errorText}> {errors.description} </Text>
            )}{" "}
            <Button onPress={handleSubmit} title="Adicionar tarea" />
          </VStack>
        )}{" "}
      </Formik>{" "}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  errorText: {
    fontSize: 12,
    color: "red",
  },
});

export default AddTaskScreen;import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input, VStack } from "native-base";
import { useTaskStore } from "../store/taskStore";
import { useNavigation } from "@react-navigation/native";

const AddTaskScreen = () => {
  const addTask = useTaskStore((state) => state.addTask);
  const navigation = useNavigation();

  const TaskSchema = Yup.object().shape({
    title: Yup.string().min(2, "Algo!").max(24, "Algo!").required("Título!"),
    description: Yup.string()
      .min(8, "Algo!")
      .max(60, "Algo!")  //app.jsx debe quedar a la altura del Jason
      .required("Título!"),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ title: "", description: "" }}
        validationSchema={TaskSchema}
        onSubmit={(values, { resetForm }) => {
          addTask(values);
          resetForm();
          navigation.navigate("Tarefas");
        }}
      >
        {" "}
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <VStack space={4}>
            <Input
              placeholder="Titulo"
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
              isInvalid={touched.title && !!errors.title}
              _invalid={{ borderColor: "red.500" }}
            />{" "}
            {touched.title && errors.title && (
              <Text style={styles.errorText}> {errors.title} </Text>
            )}{" "}
            <Input
              placeholder="Descripción"
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              isInvalid={touched.description && !!errors.description}
              _invalid={{ borderColor: "red.500" }}
            />{" "}
            {touched.description && errors.description && (
              <Text style={styles.errorText}> {errors.description} </Text>
            )}{" "}
            <Button onPress={handleSubmit} title="Adicionar tarea" />
          </VStack>
        )}{" "}
      </Formik>{" "}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  errorText: {
    fontSize: 12,
    color: "red",
  },
});

export default AddTaskScreen;


import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { entypo  } from "expo/vector-icons";
import { NativeBAseProvider } from "native-base";
import TasksScreen from "./screens/TasksScreen";
import AddTaskScreen from "./screens/AddTaskScreen";

const Tab = createBottomTabNavigator();

export default function App() {

    return (
        <NativeBAseProvider>
            <NavigationContainer>
                <Tab.Navigator
                 screenOptions ={({ route }) => ({
                    let iconName;
                    if (route.name === "Listas de tareas") {
                        iconName = "List";
                    } else if (route.name === "Adicionar Tareas") {
                        iconName = "add-to-list";
                    }
                    return <Entypo name={iconName} size={size} color={color} />
                 },
                 })}
}


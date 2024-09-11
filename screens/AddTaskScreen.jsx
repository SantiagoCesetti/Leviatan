import React from "react";
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
    title: Yup.string().min(2, "¡El título debe tener al menos 2 caracteres!").max(24, "¡El título no debe superar los 24 caracteres!").required("¡El título es obligatorio!"),
    description: Yup.string()
      .min(8, "¡La descripción debe tener al menos 8 caracteres!")
      .max(60, "¡La descripción no debe superar los 60 caracteres!")
      .required("¡La descripción es obligatoria!"),
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
              placeholder="Título"
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
              isInvalid={touched.title && !!errors.title}
              _invalid={{ borderColor: "red.500" }}
            />
            {touched.title && errors.title && (
              <Text style={styles.errorText}>{errors.title}</Text>
            )}
            <Input
              placeholder="Descripción"
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              isInvalid={touched.description && !!errors.description}
              _invalid={{ borderColor: "red.500" }}
            />
            {touched.description && errors.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}
            <Button onPress={handleSubmit} title="Adicionar tarea" />
          </VStack>
        )}
      </Formik>
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

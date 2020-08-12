import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const Logo = () => <Text>Title Component</Text>;

// * Home -----------------------------------------------------------------
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home!</Text>
      <Button
        title="Go to Details"
        // onPress={() => navigation.push("Details")}
        onPress={() =>
          navigation.navigate("Details", { title: "User 1", user_id: 1 })
        }
      />
    </View>
  );
};

HomeScreen.navigationOptions = {
  headerTitle: <Logo />,
  headerStyle: {
    backgroundColor: "#ffeecc",
  },
  headerTintColor: "#222",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

// * Details ---------------------------------------------------------------
const DetailsScreen = ({ navigation }) => {
  const [cont, setCont] = useState(0);
  const plusOne = () => setCont(cont + 1);

  useEffect(() => {
    navigation.setParams({ plusOne });
  }, [cont]);

  const lala = navigation.getParam("lala", "default value :c");
  return (
    <View style={styles.container}>
      <Text>Details! {cont}</Text>
      {/* <Button title="Go Back" onPress={() => navigation.goBack()} /> */}
      <Button
        title="Go Back"
        onPress={() => navigation.setParams({ title: "User 1" })}
      />
    </View>
  );
};

DetailsScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  return {
    title: navigation.getParam("title", "Cargando..."),
    headerRight: (
      <Button
        onPress={() => navigation.navigate("MyModal")}
        title="Plus 1"
        color="#222"
      />
    ),
    headerStyle: {
      backgroundColor: navigationOptions.headerStyle.backgroundColor,
    },
  };
};

/*
  Componente de navegacion
  recibe un obj de configuracion, el cual seran las pantallas de navegacion.
*/
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#222",
      },
      headerTintColor: "#ff5f40",
      headerTitleStyle: {
        fontWeight: "900",
      },
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: AppNavigator,
    MyModal: () => <Text>Modal lalala</Text>,
  },
  {
    mode: "modal",
    headerMode: "none",
  }
);

/*
  createAppContainer creara un componente que va a manejar todo el estado de navegacion de la aplicacion.
  Recibe un componente que tiene que ser de navegacion.
*/
export default createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

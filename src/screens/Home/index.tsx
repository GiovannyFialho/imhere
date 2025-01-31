import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Participant } from "../../components/Participant";

import { styles } from "./styles";

export function Home() {
  const participants = [
    "Giovanny",
    "Fialho",
    "Fulano",
    "João",
    "Rogério",
    "Ana",
    "Isa",
    "Mike",
    "Felipe",
    "Fernando",
    "Emanuel",
    "Jonas",
  ];

  function handleParticipanAdd() {
    console.log("Você clicou para adicionar");
  }

  function handleParticipanRemove(name: string) {
    console.log(`Você quer remover o participante ${name}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>

      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2025</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipanAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={(item) => item}
        data={participants}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
            de presença
          </Text>
        )}
        renderItem={({ item }) => (
          <Participant name={item} onRemove={handleParticipanRemove} />
        )}
      />
    </View>
  );
}

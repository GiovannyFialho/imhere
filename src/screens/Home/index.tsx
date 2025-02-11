import { useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Participant } from "../../components/Participant";

import { styles } from "./styles";

export function Home() {
  const [participants, setparticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState<string>("");

  function handleParticipanAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert(
        "Participante existe",
        `Já existe um participante ${participantName} na lista`
      );
    }

    setparticipants((prev) => [...prev, participantName]);
    setParticipantName("");
  }

  function handleParticipanRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}`, [
      {
        text: "Sim",
        onPress: () => {
          const newParticipantsList = participants.filter(
            (participant) => participant !== name
          );
          setparticipants(newParticipantsList);

          Alert.alert("Deletado!");
        },
      },
      { text: "Não", style: "cancel" },
    ]);
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
          value={participantName}
          onChangeText={setParticipantName}
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
          <Participant
            name={item}
            onRemove={() => handleParticipanRemove(item)}
          />
        )}
      />
    </View>
  );
}

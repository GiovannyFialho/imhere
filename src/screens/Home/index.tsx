import { useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
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
    Keyboard.dismiss();

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
    Keyboard.dismiss();

    Alert.alert("Remover", `Remover o participante ${name}`, [
      {
        text: "Sim",
        onPress: () => {
          setparticipants((prev) =>
            prev.filter((participant) => participant !== name)
          );
        },
      },
      { text: "Não", style: "cancel" },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Evento super</Text>

      <Text style={styles.eventDate}>
        {new Intl.DateTimeFormat("pt-br", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date())}
      </Text>

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

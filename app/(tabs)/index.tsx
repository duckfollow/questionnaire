import { Image, StyleSheet, Platform } from 'react-native';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { setQuestions, updateAnswer } from '../../store/leaderboardSlice';
import { RootState } from '../../store';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const questionsData = useSelector((state: RootState) => state.leaderboard.questions);
  const navigation = useNavigation();

  const handleSelectAnswer = (id: Number, answer: string) => {
    dispatch(updateAnswer({ id, answer }));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.container}>
        <FlatList
          data={questionsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{index + 1}. {item.question}</Text>
              {item.answers.map((answer, idx) => (
                <TouchableOpacity key={idx} style={item.answer === answer ? styles.answerButtonSelect : styles.answerButton} onPress={() => {
                  handleSelectAnswer(item.id, answer)
                }}>
                  <Text style={styles.answerText}>{answer}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
        <Button title="View Leaderboard" onPress={() => navigation.navigate('leaderboard')} />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 8,
  },
  answerButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 4,
  },
  answerButtonSelect: {
    padding: 10,
    backgroundColor: '#52BE80',
    marginVertical: 4,
  },
  answerText: {
    fontSize: 16,
  },
});

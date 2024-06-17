import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Platform } from 'react-native';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectCorrectAnswersCount } from '../../store/selectors';

export default function LeaderboardScreen() {
  const questionsData = useSelector((state: RootState) => state.leaderboard.questions);
  const correctAnswersCount = useSelector(selectCorrectAnswersCount);

  const getAnswerButtonStyle = (item: any, selectedAnswer: string) => {
    if (item.answer === selectedAnswer) {
      if (item.correct === selectedAnswer) {
        return styles.answerButtonSelect; // correct answer selected
      } else {
        return styles.answerButtonFail; // incorrect answer selected
      }
    } else {
      return styles.answerButton; // default style
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <Text style={styles.correctText}>Score: {correctAnswersCount}/{questionsData.length}</Text>
      <View style={styles.container}>
        <FlatList
          data={questionsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{index + 1}. {item.question}</Text>
              {item.answers.map((answer, idx) => (
                <View key={idx} style={getAnswerButtonStyle(item, answer)}>
                  <Text style={styles.answerText}>{answer}</Text>
                </View>
              ))}
              <Text style={styles.questionText}>answer: {item.correct}</Text>
            </View>
          )}
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
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
  answerButtonFail: {
    padding: 10,
    backgroundColor: '#C0392B',
    marginVertical: 4,
  },
  answerText: {
    fontSize: 16,
  },
  correctText: {
    fontSize: 36,
    color: '#FFFFFF'
  },
});

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './';

export const selectQuestions = (state: RootState) => state.leaderboard.questions;

export const selectCorrectAnswersCount = createSelector(
    [selectQuestions],
    (questions) => {
        return questions.reduce((count, question) => {
            if (question.correct === question.answer) {
                return count + 1;
            }
            return count;
        }, 0);
    }
);

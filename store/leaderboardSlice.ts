import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LeaderboardState {
    questions: {
        id: Number,
        question: string;
        answers: string[];
        answer: string;
        correct: string;
    }[];
}

const getInitData = () => {
    const shuffled = [
        {
            "id": 1,
            "question": "What is the value of π (Pi) rounded to two decimal places?",
            "answers": ["3.12", "3.14", "3.15", "3.16"],
            "answer": "",
            "correct": "3.14"
        },
        {
            "id": 2,
            "question": "What is the square root of 64?",
            "answers": ["6", "7", "8", "9"],
            "answer": "",
            "correct": "8"
        },
        {
            "id": 3,
            "question": "What is the result of 7 + 6 * 2?",
            "answers": ["26", "20", "19", "15"],
            "answer": "",
            "correct": "19"
        },
        {
            "id": 4,
            "question": "What is the value of 2^5?",
            "answers": ["8", "16", "32", "64"],
            "answer": "",
            "correct": "32"
        },
        {
            "id": 5,
            "question": "What is the derivative of x^2?",
            "answers": ["2x", "x^2", "x", "2"],
            "answer": "",
            "correct": "2x"
        },
        {
            "id": 6,
            "question": "What is the sum of the angles in a triangle?",
            "answers": ["90 degrees", "180 degrees", "270 degrees", "360 degrees"],
            "answer": "",
            "correct": "180 degrees"
        },
        {
            "id": 7,
            "question": "What is the formula for the area of a circle?",
            "answers": ["πr^2", "2πr", "πd", "πr"],
            "answer": "",
            "correct": "πr^2"
        },
        {
            "id": 8,
            "question": "What is the value of the golden ratio (Φ) rounded to two decimal places?",
            "answers": ["1.61", "1.62", "1.63", "1.64"],
            "answer": "",
            "correct": "1.62"
        },
        {
            "id": 9,
            "question": "What is the least common multiple (LCM) of 4 and 6?",
            "answers": ["8", "10", "12", "14"],
            "answer": "",
            "correct": "12"
        },
        {
            "id": 10,
            "question": "What is the perimeter of a square with side length 5?",
            "answers": ["10", "15", "20", "25"],
            "answer": "",
            "correct": "20"
        },
        {
            "id": 11,
            "question": "What is the integral of 1/x dx?",
            "answers": ["ln(x) + C", "1/x + C", "x + C", "e^x + C"],
            "answer": "",
            "correct": "ln(x) + C"
        },
        {
            "id": 12,
            "question": "What is the next prime number after 7?",
            "answers": ["9", "10", "11", "13"],
            "answer": "",
            "correct": "11"
        },
        {
            "id": 13,
            "question": "What is 10! (10 factorial)?",
            "answers": ["3628800", "40320", "5040", "720"],
            "answer": "",
            "correct": "3628800"
        },
        {
            "id": 14,
            "question": "What is the hypotenuse of a right triangle with legs of length 3 and 4?",
            "answers": ["5", "6", "7", "8"],
            "answer": "",
            "correct": "5"
        },
        {
            "id": 15,
            "question": "What is the value of the expression 2(3 + 4)?",
            "answers": ["10", "12", "14", "16"],
            "answer": "",
            "correct": "14"
        },
        {
            "id": 16,
            "question": "What is the decimal equivalent of 1/8?",
            "answers": ["0.125", "0.25", "0.375", "0.5"],
            "answer": "",
            "correct": "0.125"
        },
        {
            "id": 17,
            "question": "What is the slope of the line y = 2x + 3?",
            "answers": ["1", "2", "3", "4"],
            "answer": "",
            "correct": "2"
        },
        {
            "id": 18,
            "question": "What is the sum of the first 10 natural numbers?",
            "answers": ["45", "50", "55", "60"],
            "answer": "",
            "correct": "55"
        },
        {
            "id": 19,
            "question": "What is the probability of getting heads in a single toss of a fair coin?",
            "answers": ["0.25", "0.5", "0.75", "1"],
            "answer": "",
            "correct": "0.5"
        },
        {
            "id": 20,
            "question": "What is the equation of a line with a slope of 3 and a y-intercept of -2?",
            "answers": ["y = 3x - 2", "y = -3x + 2", "y = 2x - 3", "y = -2x + 3"],
            "answer": "",
            "correct": "y = 3x - 2"
        }
    ];
    shuffleArray(shuffled);
    shuffled.forEach(q => shuffleArray(q.answers));

    return shuffled;
}

const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};


const initialState: LeaderboardState = {
    questions: getInitData(),
};


const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        setQuestions: (state, action: PayloadAction<{
            id: Number,
            question: string;
            answers: string[];
            answer: string;
            correct: string;
        }[]>) => {
            state.questions = action.payload;
        },
        updateAnswer: (state, action: PayloadAction<{ id: Number; answer: string }>) => {
            const { id, answer } = action.payload;
            const question = state.questions.find(q => q.id === id);
            if (question) {
                question.answer = answer;
            }
        }
    },
});

export const { setQuestions, updateAnswer } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;

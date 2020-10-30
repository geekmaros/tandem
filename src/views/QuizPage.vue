<template>
  <section class="text-tandempink font-serif">
    WELCOME TO QUIZ PAGE {{ this.$route.params.payload }}
    <div class="quiz-card-wrapper mx-auto mt-16 w-full max-w-3xl shadow-2xl">
      <div
        class="top-header  flex items-center bg-white rounded-lg justify-between font-sans px-5 pt-5 pb-5"
      >
        <h1 class="text-tandempurple200 text-3xl font-bold">TandemTrivia</h1>
        <h1 class="text-tandempink text-2xl font-semibold">
          question <span>{{ currentQuestion + 1 }}</span> /
          <span>{{ questionBank.length - 1 }}</span>
        </h1>
      </div>

      <!--      <div-->
      <!--        v-for="(question, qindex) in questionBank.slice(-->
      <!--          currentQuestion,-->
      <!--          nextQuestion-->
      <!--        )"-->
      <!--        :key="`question-${qindex}`"-->
      <!--        class="question-wrapper mt-3 bg-white rounded-lg pt-8 pb-8"-->
      <!--      >-->
      <div
        v-for="(question, qindex) in questionBank"
        v-show="currentQuestion === qindex"
        :key="`question-${qindex}`"
        class="question-wrapper mt-3 bg-white rounded-lg pt-8 pb-8"
      >
        <p class="text-darkestteal text-center text-xl font-semibold">
          {{ question.question }}
        </p>

        <ul class="options px-5 mt-10">
          <li
            class="options  bg-lightteal mt-2 py-3 rounded-lg px-5 cursor-pointer"
            :key="`options-${oindex}`"
            :class="`options-${oindex}`"
            v-for="(options, oindex) in question.shuffledOptions()"
            @click="processAnswer(options, question.correctAnswer, qindex)"
          >
            <span
              class=" text-darkestteal font-semibold mx-auto text-center mr-1"
              >{{ optionLabel[oindex] }}.
            </span>
            <span class="text-darkteal">{{ options }}</span>
          </li>
        </ul>
      </div>

      <div class="footer-buttons bg-transparent flex justify-between mt-3">
        <button
          type="button"
          class=" border-2 border-white rounded-full  font-semibold focus:outline-none text-2xl text-white bg-tandempink px-5 hover:bg-tandempurple"
        >
          Skip
        </button>
        <button
          type="button"
          @click="
            () => {
              nextQuestion++;
              currentQuestion++;
            }
          "
          class=" border-2 border-white rounded-full  font-semibold focus:outline-none  text-2xl text-white bg-tandempink px-5 hover:bg-tandempurple"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import api from "../api/api.json";
import {
  shuffle,
  generateUniqueNumbersOfElementFromArray
} from "../HelperFunctions";

export default {
  name: "QuizPage",
  data() {
    return {
      questionBank: null,
      selectedQuestions: [],
      // currentQuestion: Math.floor(Math.random() * 21),
      currentQuestion: 0,
      nextQuestion: 1,
      score: 0,
      optionLabel: ["A", "B", "C", "D"],
      activeQuestion: {}
    };
  },
  created: function() {
    const questionArray = api;
    const newQuestionBank = questionArray.map(item => {
      return {
        question: item.question,
        options: [...item.incorrect, item.correct],
        correctAnswer: item.correct,
        shuffledOptions: function() {
          return shuffle(this.options);
        }
      };
    });

    this.getCurrentQuestion();

    this.questionBank = generateUniqueNumbersOfElementFromArray(
      10,
      newQuestionBank
    );
    console.log(this.questionBank);
  },
  methods: {
    processAnswer(selectedAnswer, correctAnswer, questionIndex) {
      console.log(
        selectedAnswer + " , " + correctAnswer + " , " + questionIndex
      );
      this.selectedQuestions.push(questionIndex);
      console.log(this.checkDuplicateQuestion(questionIndex));
    },
    checkDuplicateQuestion(index) {
      return this.selectedQuestions.includes(index);
    },
    getCurrentQuestion() {
      return Math.floor(Math.random() * 21);
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
section {
  $list: 4;
  @for $i from 0 through $list {
    .options-#{$i}:hover {
      background-color: #ffe9de;
    }
  }
}
</style>

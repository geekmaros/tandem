<template>
  <section
    class="text-tandempink font-serif w-full h-screen  flex justify-center items-center"
  >
    <div class="wrapper max-w-3xl w-full">
      <div class="quiz-card-wrapper  w-full  shadow-2xl">
        <div
          class="top-header  w-full flex flex-col md:flex-row items-center bg-white rounded-lg justify-between font-sans px-5 pt-5 pb-5"
        >
          <h1 ref="option" class="text-tandempurple200 text-3xl font-bold">
            TandemTrivia
          </h1>
          <h1 class="text-tandempink text-2xl font-semibold">
            question <span>{{ currentQuestion + 1 }}</span> /
            <span>{{ questionBank.length }}</span>
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
          class="question-wrapper mt-3  "
        >
          <div class="question-options bg-white rounded-lg pt-8 pb-8">
            <p class="text-darkestteal text-center px-4 text-xl font-semibold">
              {{ question.question }}
            </p>
            <!--          :class="{
           'bg-red-700': status === true,
           'bg-green-700': status === false
         }"-->

            <div class="options px-5 mt-10">
              <button
                ref="option"
                v-for="(options, oindex) in question.shuffledOptions"
                class="options block w-full text-left focus:outline-none mt-2 py-3 rounded-lg px-5 cursor-pointer"
                :key="`options-${oindex}`"
                :id="`options-${oindex}`"
                :class="{
                  'bg-blue-300':
                    question.isAnswered &&
                    confirmAnswer(options, question.correctAnswer) === true,

                  'bg-red-300':
                    question.isAnswered &&
                    confirmAnswer(options, question.correctAnswer) === false
                }"
                :disabled="question.isAnswered === true"
                @click="selectAnswer(options, question.correctAnswer, question)"
              >
                <span
                  class=" text-darkestteal font-semibold mx-auto text-center mr-1"
                  >{{ optionLabel[oindex] }}.
                </span>
                <span class="text-darkteal">{{ options }}</span>
              </button>
            </div>
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
            <button
              v-show="currentQuestion + 1 === questionBank.length"
              type="button"
              @click="
                () => {
                  nextQuestion++;
                  currentQuestion++;
                }
              "
              class=" border-2 border-white rounded-full  font-semibold focus:outline-none  text-2xl text-white bg-tandempink px-5 hover:bg-tandempurple"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from "../api/api.json";
import {
  shuffler,
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
      status: false,
      isAnswered: false,
      optionLabel: ["A", "B", "C", "D"]
    };
  },
  created: function() {
    const questionArray = api;
    const newQuestionBank = questionArray.map(item => {
      // const option = [];
      return {
        question: item.question,
        options: [...item.incorrect, item.correct],
        shuffledOptions: shuffler([...item.incorrect, item.correct]),
        correctAnswer: item.correct,
        isAnswered: false
      };
    });

    this.getCurrentQuestion();

    this.questionBank = generateUniqueNumbersOfElementFromArray(
      10,
      newQuestionBank
    );
    console.log(this.questionBank);
  },
  watch: {
    isAnswered: function(val, oldval) {
      oldval;
      this.isAnswered = val;
    }
  },
  methods: {
    selectAnswer(selectedAnswer, correctAnswer, question) {
      // this.selectedQuestions.push(questionIndex);
      question.isAnswered = true;
      this.correctOption = correctAnswer;
      setTimeout(() => {
        if (this.correctOption === correctAnswer) {
          this.status = true;
        }
        this.confirmAnswer(selectedAnswer, correctAnswer);
        console.log(selectedAnswer, correctAnswer, question);
      }, 1000);
    },
    getCurrentQuestion() {
      return Math.floor(Math.random() * 21);
    },
    confirmAnswer(option, answer) {
      return option === answer;
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
section {
  $list: 4;
  @for $i from 0 through $list {
    #options-#{$i}:hover {
      background-color: #c9fff6;
    }
  }
}
</style>

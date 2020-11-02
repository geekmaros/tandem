<template>
  <section
    class="text-tandempink font-serif w-full h-screen  flex justify-center items-center p-5 md:p-5"
  >
    <div class="wrapper md:max-w-3xl w-full">
      <button @click="newGame" class="bg-white p-3 rounded-lg mb-4 font-bold">
        New Game
      </button>
      <div v-show="!showScore" class="quiz-card-wrapper  w-full  shadow-2xl ">
        <div
          class="top-header  w-full flex flex-col md:flex-row items-center bg-white rounded-lg justify-between font-sans px-5 pt-5 pb-5"
        >
          <div class="top-left">
            <h1 ref="option" class="text-tandempurple200 text-3xl font-bold">
              TandemTrivia
            </h1>

            <p class="text-sm">
              Current Player:
              <span class="text-tandempurple text-base">{{ username }}</span>
            </p>
          </div>
          <h1 class="text-tandempink text-lg font-semibold">
            Question <span>{{ currentQuestion + 1 }}</span> /
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
            <div class="options px-5 mt-10">
              <button
                v-for="(options, oindex) in question.shuffledOptions"
                class="options  block w-full text-left  focus:outline-none mt-2 py-3 rounded-lg px-5 cursor-pointer text-white"
                :key="`options-${oindex}`"
                :id="`options-${oindex}`"
                :class="{
                  'success luckcharm text-white ':
                    question.isAnswered &&
                    confirmAnswer(options, question.correctAnswer) === true,

                  'error luckcharm text-white hover:bg-transparent':
                    question.isAnswered &&
                    confirmAnswer(options, question.correctAnswer) === false
                }"
                :disabled="question.isAnswered === true"
                @click="selectAnswer(options, question.correctAnswer, question)"
              >
                <span class="  font-semibold mx-auto text-center mr-1"
                  >{{ optionLabel[oindex] }}.
                </span>
                <span class="font-medium">{{ options }}</span>
              </button>
            </div>
          </div>

          <div
            class="footer-buttons bg-transparent flex justify-between mt-3 w-full"
          >
            <button
              type="button"
              @click="skipButton"
              v-show="currentQuestion + 1 < questionBank.length"
              class=" border-2 border-white rounded-full  font-semibold focus:outline-none text-2xl text-white bg-tandempink px-5 hover:bg-tandempurple"
            >
              Skip
            </button>
            <button
              type="button"
              @click="nextButton"
              :class="{ 'opacity-50': question.isAnswered === false }"
              :disabled="question.isAnswered === false"
              v-show="currentQuestion + 1 < questionBank.length"
              class=" border-2 border-white rounded-full   font-semibold focus:outline-none  text-2xl text-white bg-tandempink px-5 hover:bg-tandempurple"
            >
              Next
            </button>
            <button
              v-show="currentQuestion + 1 === questionBank.length"
              type="button"
              @click="submitButton"
              class=" border-2 border-white justify-end rounded-full  font-semibold focus:outline-none  text-2xl text-white bg-tandempink px-5 hover:bg-tandempurple"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div
        v-show="showScore"
        class="score-wrapper font-sans text-center items-center h-auto rounded-lg bg-white pt-10 px-5 pb-10"
      >
        <div class="img-wrapper flex justify-center items-center mb-8 ">
          <img class="img-svg  h-40" :src="svgSrc" alt="" />
        </div>
        <h1 v-if="score === 100" class="text-2xl font-bold">
          Impressive Performance
        </h1>
        <h1 v-else-if="score >= 80" class="text-2xl font-bold">
          Great Performance
        </h1>
        <h1 v-else-if="score >= 50" class="text-2xl font-bold">
          Good Performance
        </h1>
        <h1 v-else class="text-2xl font-bold">
          Ooops Not so good
        </h1>
        <p class="user text-3xl font-bold text-tandempurple">{{ username }}</p>
        <p class="text-lg mt-4">
          Total Score: <span>{{ score }} </span>/ {{ questionBank.length * 10 }}
        </p>

        <div class="btn-wrapper w-full flex justify-center items-center">
          <button
            type="button"
            @click="resetButton"
            class=" border-2 mt-10 border-white flex items-center justify-center rounded-full  font-semibold focus:outline-none  text-2xl text-white bg-tandempink px-5 hover:bg-tandempurple"
          >
            Restart
            <span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                class="fill-current"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M18.537 19.567A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.136-.67 4.116-1.81 5.74L17 12h3a8 8 0 1 0-2.46 5.772l.997 1.795z"
                /></svg
            ></span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import api from "../api/api.json";
import {
  generateUniqueNumbersOfElementFromArray,
  shuffler
} from "../HelperFunctions";

export default {
  name: "QuizPage",
  data() {
    return {
      questionBank: null,
      currentQuestion: 0,
      score: 0,
      optionLabel: ["A", "B", "C", "D"],
      showScore: false,
      setupForReload: {}
    };
  },
  created: function() {
    if (localStorage.getItem("trivia")) {
      const trivia = JSON.parse(localStorage.getItem("trivia"));
      this.setuser(trivia.user);
      this.questionBank = trivia.questionBank;
      this.currentQuestion = trivia.currentQuestion;
      this.score = trivia.score;
    } else {
      this.fetchAndPopulateQuestionBank();
      console.log(this.setupForReload);
    }
  },
  watch: {
    setupForReload: {
      handler(newValue) {
        localStorage.setItem("trivia", JSON.stringify(newValue));
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({ setuser: "user/setUserName" }),
    selectAnswer(selectedAnswer, correctAnswer, question) {
      // this.selectedQuestions.push(questionIndex);
      question.isAnswered = true;
      this.correctOption = correctAnswer;
      setTimeout(() => {
        if (this.confirmAnswer(selectedAnswer, correctAnswer)) {
          this.score += 10;
        }
      }, 1000);
    },
    confirmAnswer(option, answer) {
      return option === answer;
    },
    nextButton() {
      this.setupForReload = {
        questionBank: this.questionBank,
        user: this.username,
        score: this.score,
        currentQuestion: this.currentQuestion + 1
      };
      this.currentQuestion++;
    },
    skipButton() {
      this.currentQuestion++;
      this.score += 0;
    },
    submitButton() {
      this.showScore = true;
    },
    fetchAndPopulateQuestionBank() {
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

      this.questionBank = generateUniqueNumbersOfElementFromArray(
        10,
        newQuestionBank
      );
    },
    resetButton() {
      this.showScore = false;
      this.currentQuestion = 0;
      this.score = 0;
      this.fetchAndPopulateQuestionBank();
    },
    newGame() {
      localStorage.removeItem("trivia");
      this.$router.push({ name: "Home" });
    }
  },
  computed: {
    username() {
      return this.$store.getters["user/getPlayer"];
    },
    svgSrc() {
      if (this.score >= 80) {
        return require("../assets/svg/10.svg");
      } else if (this.score >= 50) {
        return require("../assets/svg/below10.svg");
      }
      return require("../assets/svg/below5.svg");
    }
  }
};
</script>

<style scoped lang="scss">
section {
  $list: 4;
  @for $i from 0 through $list {
    #options-#{$i}.luck-charm {
      color: #fff;
    }
    #options-#{$i}:hover {
      background-color: #c9fff6;
    }
  }
  .options.luckcharm {
    color: #fff !important;
  }
  .options.error.luckcharm {
    background-color: #fd5455 !important;
  }
  .options.success.luckcharm {
    background-color: #18e518 !important;
  }
  .options.luckcharm:hover {
    background-color: unset;
  }
  .options {
    color: #007aa8;
  }
}
</style>

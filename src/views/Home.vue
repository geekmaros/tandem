<template>
  <main
    class="home w-full h-screen  font-serif text-white flex justify-center items-center px-5 md:px-0"
  >
    <div class=" relative my-auto">
      <div class="top text-center">
        <h1 class="font-bold leading-relaxed text-white font-sans text-3xl ">
          Enter Your Username
        </h1>
        <div class="input-form my-3 ">
          <form action="" @submit.prevent="dispatchToSetUSerName">
            <label for="username"></label>
            <input
              data-username
              id="username"
              type="text"
              v-model="username"
              class="h-12 w-full username rounded-full pl-3 py-2 font-semibold bg-white focus:outline-none focus:border-2 focus:border-tandempink text-tandempurple"
            />
            <span
              v-if="error"
              class=" text-tandempink w-auto w-full  rounded px-2 mt-4 bg-white  text-xs block"
              >username cannot be empty</span
            >

            <div
              @click="dispatchToSetUSerName"
              class="block cursor-pointer ml-10 mr-10 bg-tandempink border-2 border-white text-2xl mx-auto font-semibold font-sans rounded-full px-4 py-1 mt-3  shadow-xl focus:outline-none"
            >
              Let's Play!
            </div>
          </form>
        </div>
      </div>
      <div class="instructions text-center font-semibold">
        <p class="instruct"><b>Read the following Instructions</b></p>
        <p>Enter your username</p>
        <p>You have 10 Trivial questions to answer</p>
        <p>Enjoy!!!</p>
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      username: null,
      error: false
    };
  },
  methods: {
    ...mapActions({ setuser: "user/setUserName" }),
    dispatchToSetUSerName(e) {
      e.preventDefault();
      if (this.username === "" || this.username === null) {
        this.error = true;
        return;
      }
      const currentPlayer = this.username;
      this.setuser(currentPlayer);
      this.error = false;
      this.$router.push({ name: "QuizPage", params: { currentPlayer } });
    }
  },
  components: {}
};
</script>
<style scoped lang="scss">
main {
}
</style>

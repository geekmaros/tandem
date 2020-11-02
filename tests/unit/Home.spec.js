import { mount } from "@vue/test-utils";
import Home from "../../src/views/Home";

describe("Home.vue", () => {
  it("is the index page where users can add username to play the quiz game", async () => {
    const wrapper = mount(Home);
    await wrapper.find("[data-username]").setValue("Zuckerberg");
    await wrapper.find("form").trigger("submit.prevent");
  });
});

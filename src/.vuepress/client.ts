import { defineClientConfig } from "vuepress/client";
import ClassroomPolitics from "./components/ClassroomPolitics.vue";

export default defineClientConfig({
  enhance({ app }) {
    app.component("ClassroomPolitics", ClassroomPolitics);
  },
});

import { defineClientConfig } from "vuepress/client";
import { defineAsyncComponent } from "vue";
import JosephusAnimation from "./components/JosephusAnimation.vue";
import ClassroomPolitics from "./components/ClassroomPolitics.vue";

export default defineClientConfig({
  enhance({ app }) {
    app.component("ClassroomPolitics", ClassroomPolitics);
    app.component("JosephusAnimation", JosephusAnimation);
    app.component("HanoiAnimation", defineAsyncComponent(() => import("./components/HanoiAnimation.vue")));
  },
});

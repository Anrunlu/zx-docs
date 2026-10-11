<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import animationHtml from "./animations/monkey-peaches.html?raw";

const container = ref<HTMLElement>();
const frame = ref<HTMLIFrameElement>();
const frameHeight = ref(1250);
const fullScreen = ref(false);
const feedback = ref("");
let observer: ResizeObserver | undefined;

function resizeFrame(): void {
  const body = frame.value?.contentDocument?.body;
  if (!body) return;
  frameHeight.value = Math.ceil(body.getBoundingClientRect().height);
}

function onFrameLoad(): void {
  observer?.disconnect();
  const body = frame.value?.contentDocument?.body;
  if (!body) return;
  resizeFrame();
  observer = new ResizeObserver(resizeFrame);
  observer.observe(body);
}

async function toggleFullscreen(): Promise<void> {
  feedback.value = "";
  try {
    if (document.fullscreenElement === container.value) await document.exitFullscreen();
    else if (container.value?.requestFullscreen) await container.value.requestFullscreen();
    else feedback.value = "当前浏览器不支持全屏，请使用页面内演示。";
    await nextTick();
    resizeFrame();
  } catch {
    feedback.value = "当前浏览器无法进入全屏，请使用页面内演示。";
  }
}

function onFullscreenChange(): void {
  fullScreen.value = document.fullscreenElement === container.value;
  void nextTick(resizeFrame);
}

onMounted(() => {
  // 静态页面中的 iframe 可能在 Vue 接管页面前已加载完成。
  onFrameLoad();
  document.addEventListener("fullscreenchange", onFullscreenChange);
});
onBeforeUnmount(() => {
  observer?.disconnect();
  document.removeEventListener("fullscreenchange", onFullscreenChange);
});
</script>

<template>
  <section ref="container" class="monkey-peaches-animation" aria-label="猴子吃桃交互动画">
    <div class="monkey-peaches-toolbar">
      <span>设置天数后点击“应用”，逐步或自动观察桃子数量的逆推过程。</span>
      <button type="button" :aria-pressed="fullScreen" @click="toggleFullscreen">
        {{ fullScreen ? "退出全屏" : "全屏演示" }}
      </button>
    </div>
    <p v-if="feedback" role="status">{{ feedback }}</p>
    <iframe
      ref="frame"
      title="猴子吃桃逐日逆推与桃子数量动画"
      :srcdoc="animationHtml"
      :style="{ height: `${frameHeight}px` }"
      @load="onFrameLoad"
    />
  </section>
</template>

<style scoped>
.monkey-peaches-animation { margin: 1.5rem 0; border: 1px solid var(--vp-c-border, #dceaf5); border-radius: 16px; overflow: hidden; }
.monkey-peaches-toolbar { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 16px; font-size: 14px; }
.monkey-peaches-toolbar button { flex-shrink: 0; padding: 7px 12px; border: 1px solid var(--vp-c-border, #cddbe7); border-radius: 6px; background: var(--vp-c-bg, var(--bg-color, #fff)); color: var(--vp-c-text, var(--text-color, #333)); font: inherit; cursor: pointer; }
.monkey-peaches-toolbar button:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
iframe { display: block; width: 100%; border: 0; background: #f5f7fb; }
.monkey-peaches-animation:fullscreen { box-sizing: border-box; width: 100%; height: 100%; margin: 0; border: 0; border-radius: 0; overflow: auto; background: var(--vp-c-bg, var(--bg-color, #fff)); }
@media (max-width: 600px) { .monkey-peaches-toolbar { align-items: flex-start; flex-direction: column; } }
</style>

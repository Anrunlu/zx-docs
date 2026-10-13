<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import animationHtml from "./animations/lights-out.html?raw";

const container = ref<HTMLElement>();
const frame = ref<HTMLIFrameElement>();
const frameHeight = ref(1200);
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
  // 静态预渲染阶段不读取 iframe 或浏览器 API。
  onFrameLoad();
  document.addEventListener("fullscreenchange", onFullscreenChange);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  document.removeEventListener("fullscreenchange", onFullscreenChange);
});
</script>

<template>
  <section ref="container" class="lights-out-animation" aria-label="费解的开关交互动画">
    <div class="lights-out-toolbar">
      <span>选择左侧棋盘，演示第一行枚举、逐行推导和最优解回放。动画坐标从0开始。</span>
      <button type="button" :aria-pressed="fullScreen" @click="toggleFullscreen">
        {{ fullScreen ? "退出全屏" : "全屏演示" }}
      </button>
    </div>
    <p v-if="feedback" role="status">{{ feedback }}</p>
    <iframe
      ref="frame"
      title="费解的开关：枚举第一行并回放最优操作的动画"
      :srcdoc="animationHtml"
      :style="{ height: `${frameHeight}px` }"
      @load="onFrameLoad"
    />
  </section>
</template>

<style scoped>
.lights-out-animation { margin: 1.5rem 0; border: 1px solid var(--vp-c-border, #dceaf5); border-radius: 16px; overflow: hidden; }
.lights-out-toolbar { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 16px; font-size: 14px; }
.lights-out-toolbar button { flex-shrink: 0; padding: 7px 12px; border: 1px solid var(--vp-c-border, #cddbe7); border-radius: 6px; background: var(--vp-c-bg, var(--bg-color, #fff)); color: var(--vp-c-text, var(--text-color, #333)); font: inherit; cursor: pointer; }
.lights-out-toolbar button:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
iframe { display: block; width: 100%; border: 0; background: #151c2a; }
.lights-out-animation:fullscreen { box-sizing: border-box; width: 100%; height: 100%; margin: 0; border: 0; border-radius: 0; overflow: auto; background: var(--vp-c-bg, var(--bg-color, #fff)); }
@media (max-width: 600px) { .lights-out-toolbar { align-items: flex-start; flex-direction: column; } }
</style>

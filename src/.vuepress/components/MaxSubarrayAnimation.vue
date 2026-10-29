<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import animationHtml from "./animations/max-subarray.html?raw";

const container = ref<HTMLElement>();
const frame = ref<HTMLIFrameElement>();
const frameHeight = ref(1800);
const fullScreen = ref(false);
const feedback = ref("");
let observer: ResizeObserver | undefined;

function resizeFrame(): void {
  const body = frame.value?.contentDocument?.body;
  if (body) frameHeight.value = Math.ceil(body.getBoundingClientRect().height);
}

function onFrameLoad(): void {
  observer?.disconnect();
  const body = frame.value?.contentDocument?.body;
  if (!body) return;
  resizeFrame();
  if (typeof ResizeObserver !== "undefined") {
    observer = new ResizeObserver(resizeFrame);
    observer.observe(body);
  }
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
  // 浏览器 API 仅在客户端挂载、iframe 加载或用户事件中使用。
  onFrameLoad();
  document.addEventListener("fullscreenchange", onFullscreenChange);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  document.removeEventListener("fullscreenchange", onFullscreenChange);
});
</script>

<template>
  <section ref="container" class="max-subarray-animation" aria-label="最大子数组和交互动画">
    <div class="max-subarray-toolbar">
      <span>切换动态规划与分治演示，观察结尾状态、历史最优和跨界合并；下标从0开始。</span>
      <button type="button" :aria-pressed="fullScreen" @click="toggleFullscreen">
        {{ fullScreen ? "退出全屏" : "全屏演示" }}
      </button>
    </div>
    <p v-if="feedback" class="max-subarray-feedback" role="status">{{ feedback }}</p>
    <iframe
      ref="frame"
      title="最大子数组和：动态规划、滚动变量与分治四项摘要"
      :srcdoc="animationHtml"
      :style="{ height: `${frameHeight}px` }"
      @load="onFrameLoad"
    />
  </section>
</template>

<style scoped>
.max-subarray-animation { margin: 1.5rem 0; border: 1px solid var(--vp-c-border, #dceaf5); border-radius: 16px; overflow: hidden; }
.max-subarray-toolbar { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 16px; font-size: 14px; }
.max-subarray-toolbar button { flex-shrink: 0; padding: 7px 12px; border: 1px solid var(--vp-c-border, #cddbe7); border-radius: 6px; background: var(--vp-c-bg, var(--bg-color, #fff)); color: var(--vp-c-text, var(--text-color, #333)); font: inherit; cursor: pointer; }
.max-subarray-toolbar button:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
.max-subarray-feedback { padding: 0 16px; font-size: 14px; }
iframe { display: block; width: 100%; border: 0; background: #f1f5f9; }
.max-subarray-animation:fullscreen { box-sizing: border-box; width: 100%; height: 100%; margin: 0; border: 0; border-radius: 0; overflow: auto; background: var(--vp-c-bg, var(--bg-color, #fff)); }
@media (max-width: 600px) { .max-subarray-toolbar { align-items: flex-start; flex-direction: column; } }
</style>

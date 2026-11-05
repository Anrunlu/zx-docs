<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import animationHtml from "./animations/min-cost-climbing-stairs.html?raw";

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
  <section ref="container" class="min-cost-climbing-stairs-animation" aria-label="最小花费爬楼梯交互动画">
    <div class="min-cost-climbing-stairs-toolbar">
      <span>先看小人怎么跳、怎么付钱；每一步同步写出算式，再推出通用公式与状态表。</span>
      <button type="button" :aria-pressed="fullScreen" @click="toggleFullscreen">
        {{ fullScreen ? "退出全屏" : "全屏演示" }}
      </button>
    </div>
    <p v-if="feedback" class="min-cost-climbing-stairs-feedback" role="status">{{ feedback }}</p>
    <iframe
      ref="frame"
      title="最小花费爬楼梯：路径故事、逐步公式与状态表演示"
      :srcdoc="animationHtml"
      :style="{ height: `${frameHeight}px` }"
      @load="onFrameLoad"
    />
  </section>
</template>

<style scoped>
.min-cost-climbing-stairs-animation { margin: 1.5rem 0; border: 1px solid var(--vp-c-border, #dceaf5); border-radius: 16px; overflow: hidden; }
.min-cost-climbing-stairs-toolbar { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 16px; font-size: 14px; }
.min-cost-climbing-stairs-toolbar button { flex-shrink: 0; padding: 7px 12px; border: 1px solid var(--vp-c-border, #cddbe7); border-radius: 6px; background: var(--vp-c-bg, var(--bg-color, #fff)); color: var(--vp-c-text, var(--text-color, #333)); font: inherit; cursor: pointer; }
.min-cost-climbing-stairs-toolbar button:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
.min-cost-climbing-stairs-feedback { padding: 0 16px; font-size: 14px; }
iframe { display: block; width: 100%; border: 0; background: #f7f7f5; }
.min-cost-climbing-stairs-animation:fullscreen { box-sizing: border-box; width: 100%; height: 100%; margin: 0; border: 0; border-radius: 0; overflow: auto; background: var(--vp-c-bg, var(--bg-color, #fff)); }
@media (max-width: 600px) { .min-cost-climbing-stairs-toolbar { align-items: flex-start; flex-direction: column; } }
</style>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { usePageFrontmatter, withBase } from "@vuepress/client";

interface Material {
  title: string;
  summary?: string;
  points?: string[];
  discussion?: string;
  url?: string;
  linkText?: string;
}

interface Session {
  date: string;
  title?: string;
  presenter?: string;
  organization?: string;
  materials?: Material[];
}

interface PoliticsConfig {
  title?: string;
  presenter?: string;
  organization?: string;
  sessions?: Session[];
}

const frontmatter = usePageFrontmatter<{ classroomPolitics?: PoliticsConfig }>();
const config = computed(() => frontmatter.value.classroomPolitics ?? {});
const sessions = computed(() => config.value.sessions ?? []);
const selectedDate = ref("");
const page = ref(0);
const deck = ref<HTMLElement>();
const presenting = ref(false);
const session = computed(() => sessions.value.find((item) => item.date === selectedDate.value) ?? sessions.value[0]);
const materials = computed(() => session.value?.materials ?? []);
const pageCount = computed(() => materials.value.length + 1);
const material = computed(() => materials.value[page.value - 1]);
const title = computed(() => session.value?.title ?? config.value.title ?? "课前时政5分钟");
const presenter = computed(() => session.value?.presenter ?? config.value.presenter ?? "待填写");
const organization = computed(() => session.value?.organization ?? config.value.organization ?? "网络空间安全学院");
const dateLabel = computed(() => {
  const date = String(session.value?.date ?? "");
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  return match ? `${match[1]}年${Number(match[2])}月${Number(match[3])}日` : date;
});

watch(sessions, (items) => {
  if (!items.some((item) => item.date === selectedDate.value)) selectedDate.value = items[0]?.date ?? "";
}, { immediate: true });
watch(session, () => { page.value = 0; });
watch(pageCount, (count) => { page.value = Math.min(page.value, count - 1); });

function move(offset: number): void {
  page.value = Math.max(0, Math.min(pageCount.value - 1, page.value + offset));
}

async function togglePresentation(): Promise<void> {
  if (presenting.value) {
    if (document.fullscreenElement === deck.value) await document.exitFullscreen();
    presenting.value = false;
  } else {
    presenting.value = true;
    await nextTick();
    try {
      await deck.value?.requestFullscreen?.();
    } catch {
      // 浏览器不支持全屏时仍可使用铺满窗口的演示模式。
    }
  }
  await nextTick();
  deck.value?.focus({ preventScroll: true });
}

function onFullscreenChange(): void {
  if (!document.fullscreenElement) presenting.value = false;
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape" && presenting.value) {
    void togglePresentation();
    return;
  }
  const target = event.target as HTMLElement;
  if (target.closest("input, select, textarea, a")) return;
  if (target.closest("button") && [" ", "Enter"].includes(event.key)) return;
  if (["ArrowRight", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    move(1);
  } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    move(-1);
  } else if (event.key === "Home" || event.key === "End") {
    event.preventDefault();
    page.value = event.key === "Home" ? 0 : pageCount.value - 1;
  }
}

function safeUrl(url?: string): string | undefined {
  return url && /^https?:\/\//i.test(url) ? url : undefined;
}

onMounted(() => document.addEventListener("fullscreenchange", onFullscreenChange));
onBeforeUnmount(() => document.removeEventListener("fullscreenchange", onFullscreenChange));
</script>

<template>
  <section
    v-if="session"
    ref="deck"
    class="politics-deck"
    :class="{ 'is-presenting': presenting }"
    tabindex="0"
    aria-label="课堂时政演示，使用左右方向键翻页"
    @keydown="onKeydown"
  >
    <div class="politics-toolbar">
      <label class="politics-date-picker">
        课堂日期
        <select v-model="selectedDate" aria-label="选择课堂日期">
          <option v-for="item in sessions" :key="item.date" :value="item.date">{{ item.date }}</option>
        </select>
      </label>
      <button type="button" :aria-pressed="presenting" @click="togglePresentation">
        {{ presenting ? "退出全屏" : "全屏演示" }}
      </button>
    </div>

    <div class="politics-stage">
      <img class="politics-background" :src="withBase('/assets/image/classroom-politics-bg.png')" alt="" />
      <div v-if="page === 0" class="politics-cover">
        <h2 class="politics-cover-title" :class="{ 'is-long': title.length > 12 }">{{ title }}</h2>
        <p class="politics-presenter">主讲人：{{ presenter }}</p>
        <p class="politics-organization">{{ organization }}</p>
        <p class="politics-date">{{ dateLabel }}</p>
      </div>
      <div v-else-if="material" class="politics-material">
        <div class="politics-material-heading">
          <span>{{ title }}</span>
          <span>{{ dateLabel }}</span>
        </div>
        <article :key="`${selectedDate}-${page}`" class="politics-material-body" tabindex="0" :aria-label="material.title">
          <p class="politics-material-number">时政材料 {{ String(page).padStart(2, '0') }}</p>
          <h2>{{ material.title }}</h2>
          <p v-if="material.summary" class="politics-summary">{{ material.summary }}</p>
          <ul v-if="material.points?.length" class="politics-points">
            <li v-for="(point, index) in material.points" :key="index">{{ point }}</li>
          </ul>
          <p v-if="material.discussion" class="politics-discussion"><strong>课堂讨论</strong>{{ material.discussion }}</p>
          <a v-if="safeUrl(material.url)" class="politics-source" :href="safeUrl(material.url)" target="_blank" rel="noopener noreferrer">
            {{ material.linkText || "打开学习材料" }} <span aria-hidden="true">↗</span>
            <span class="politics-sr-only">（在新标签页打开）</span>
          </a>
        </article>
        <p class="politics-material-footer">{{ organization }} · 主讲人：{{ presenter }}</p>
      </div>
    </div>

    <nav class="politics-navigation" aria-label="演示翻页">
      <button type="button" :disabled="page === 0" @click="move(-1)">上一页</button>
      <span aria-live="polite">{{ page + 1 }} / {{ pageCount }} · {{ page === 0 ? "封面" : "时政材料" }}</span>
      <button type="button" :disabled="page === pageCount - 1" @click="move(1)">下一页</button>
    </nav>
  </section>
  <p v-else>请在文档的 classroomPolitics.sessions 中添加课堂内容。</p>
</template>

<style scoped>
.politics-deck {
  --politics-red: #c00000;
  margin: 1.5rem 0;
  outline-offset: 4px;
}
.politics-toolbar, .politics-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  font-size: 14px;
}
.politics-date-picker { display: flex; align-items: center; gap: 8px; }
.politics-deck button, .politics-deck select {
  padding: 7px 12px;
  border: 1px solid #c0000033;
  border-radius: 6px;
  background: var(--vp-c-bg, var(--bg-color, #fff));
  color: var(--vp-c-text, var(--text-color, #333));
  font: inherit;
  cursor: pointer;
}
.politics-deck button:hover:not(:disabled) { border-color: var(--politics-red); color: var(--politics-red); }
.politics-deck button:disabled { opacity: .4; cursor: default; }
.politics-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  container-type: inline-size;
  color: var(--politics-red);
  background: #fff2e8;
  font-family: "Songti SC", "STSong", "SimSun", "Noto Serif CJK SC", serif;
}
.politics-background { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }
.politics-cover { position: absolute; inset: 0; text-align: center; }
.politics-cover p { position: absolute; left: 7%; right: 7%; margin: 0 !important; line-height: 1.4 !important; overflow-wrap: anywhere; }
.politics-cover-title {
  position: absolute;
  top: 25%;
  left: 7%;
  right: 7%;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  color: var(--politics-red) !important;
  font-family: inherit !important;
  font-size: 9cqw !important;
  font-weight: 400 !important;
  line-height: 1.25 !important;
  overflow-wrap: anywhere;
}
.politics-cover-title.is-long { top: 18%; max-height: 32%; overflow-y: auto; font-size: 5.2cqw !important; }
.politics-presenter { top: 54%; font-size: 4.5cqw; }
.politics-organization { top: 71%; font-size: 3.1cqw; }
.politics-date { top: 79%; font-size: 3.1cqw; }
.politics-material { position: absolute; inset: 0; }
.politics-material-heading { position: absolute; top: 5%; left: 9%; right: 9%; display: flex; justify-content: space-between; gap: 3cqw; font-size: clamp(10px, 1.8cqw, 26px); line-height: 1.2; }
.politics-material-heading span:first-child { max-height: 2.4em; overflow-y: auto; }
.politics-material-heading span:last-child { flex-shrink: 0; white-space: nowrap; }
.politics-material-body { position: absolute; top: 18%; left: 9%; right: 9%; bottom: 24%; overflow: auto; padding: 1.5cqw 2cqw; background: #fffaf0d9; scrollbar-width: thin; scrollbar-color: #c0000055 transparent; }
.politics-material-number { margin: 0 0 1cqw !important; font-size: clamp(10px, 1.6cqw, 24px); }
.politics-material-body h2 { margin: 0 0 1.7cqw !important; padding: 0 !important; border: 0 !important; font-family: inherit !important; font-size: clamp(18px, 3.7cqw, 60px) !important; line-height: 1.35 !important; color: var(--politics-red) !important; }
.politics-summary, .politics-points { margin: 0 0 1.5cqw !important; font-size: clamp(14px, 2.2cqw, 36px); line-height: 1.65 !important; color: #4b2924; }
.politics-points { padding-left: 2.5cqw; }
.politics-discussion { margin: 1.5cqw 0 !important; padding-left: 1.2cqw; border-left: .25cqw solid var(--politics-red); font-size: clamp(14px, 2cqw, 32px); line-height: 1.6 !important; color: #4b2924; }
.politics-discussion strong { display: block; color: var(--politics-red); }
.politics-source { display: inline-block; font-size: clamp(14px, 2cqw, 32px); color: var(--politics-red) !important; text-decoration: underline; text-underline-offset: .3em; }
.politics-material-footer { position: absolute; bottom: 17%; left: 9%; right: 9%; margin: 0 !important; text-align: center; font-size: 1.7cqw; }
.politics-sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.politics-deck.is-presenting {
  position: fixed;
  inset: 0;
  z-index: 1100;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 12px 24px;
  background: #181818;
  color: #f5f5f5;
}
.is-presenting .politics-stage, .is-presenting .politics-toolbar, .is-presenting .politics-navigation { width: min(100%, calc((100dvh - 140px) * 16 / 9)); flex-shrink: 0; }
@media (max-width: 600px) {
  .politics-toolbar, .politics-navigation { font-size: 12px; gap: 6px; }
  .politics-deck button, .politics-deck select { padding: 6px 8px; }
  .politics-deck.is-presenting { padding: 8px; }
  .politics-material-body { overflow-y: auto; }
}
</style>

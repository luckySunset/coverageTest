<script setup>
import { computed, onUnmounted, ref } from 'vue'

// 1. 星级评分：支持悬停预览、点击评分、清空
const rating = ref(0)
const hoverRating = ref(0)
const ratingLabels = ['点击星星评分', '很差', '一般', '还不错', '很棒', '非常好']
const previewRating = computed(() => hoverRating.value || rating.value)
const ratingLabel = computed(() => ratingLabels[previewRating.value] || '')
const setRating = (value) => { rating.value = value }
const clearRating = () => {
  rating.value = 0
  hoverRating.value = 0
}

// 2. 掷骰子：带滚动动画，记录最近结果
const diceFaces = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
const dice = ref(1)
const rolling = ref(false)
const rollCount = ref(0)
const history = ref([])
let rollTimer = null
const rollDice = () => {
  if (rolling.value) return
  rolling.value = true
  let ticks = 0
  rollTimer = setInterval(() => {
    dice.value = Math.floor(Math.random() * 6) + 1
    ticks += 1
    if (ticks >= 8) {
      clearInterval(rollTimer)
      rollTimer = null
      rolling.value = false
      rollCount.value += 1
      history.value = [dice.value, ...history.value].slice(0, 8)
    }
  }, 80)
}
onUnmounted(() => {
  if (rollTimer) clearInterval(rollTimer)
})

// 3. 折叠问答：手风琴，一次只展开一项
const faqs = [
  { question: 'Vue 3 的响应式是怎么工作的？', answer: '通过 Proxy 拦截对象读写，配合依赖收集与触发更新，让模板在数据变化时自动重新渲染。' },
  { question: 'Vite 的开发服务器为什么快？', answer: '开发阶段使用原生 ES Module 按需编译，不需要先打包整个应用，启动和热更新都非常迅速。' },
  { question: '这段页面的覆盖率数据从哪来？', answer: 'vite-plugin-istanbul 在构建时注入探针，浏览器运行时把覆盖率写入本地，再由 gen-report.js 生成报告。' },
]
const openFaq = ref(-1)
const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? -1 : index
}

// 4. 密码强度检测：实时规则校验
const password = ref('')
const showPassword = ref(false)
const rules = computed(() => [
  { label: '至少 8 个字符', passed: password.value.length >= 8 },
  { label: '包含字母', passed: /[A-Za-z]/.test(password.value) },
  { label: '包含数字', passed: /\d/.test(password.value) },
  { label: '包含特殊字符', passed: /[^A-Za-z0-9]/.test(password.value) },
])
const strengthScore = computed(() => rules.value.filter((rule) => rule.passed).length)
const strengthLabel = computed(() => ['未输入', '较弱', '一般', '较强', '很强'][strengthScore.value] || '')
const togglePasswordVisibility = () => { showPassword.value = !showPassword.value }
</script>

<template>
  <div class="interactive-tools">
    <section class="card">
      <h2>4. 星级评分</h2>
      <div class="stars" @mouseleave="hoverRating = 0">
        <button
          v-for="star in 5"
          :key="star"
          type="button"
          class="star"
          :class="{ active: star <= previewRating }"
          :aria-label="`评 ${star} 星`"
          @mouseenter="hoverRating = star"
          @focus="hoverRating = star"
          @blur="hoverRating = 0"
          @click="setRating(star)"
        >★</button>
        <span class="rating-text">{{ ratingLabel }}<template v-if="rating">（{{ rating }} 星）</template></span>
      </div>
      <button type="button" class="ghost" @click="clearRating">清空评分</button>
    </section>

    <section class="card">
      <h2>5. 掷骰子</h2>
      <div class="dice-row">
        <div class="dice" :class="{ rolling }" aria-live="polite">{{ diceFaces[dice] }}</div>
        <div class="dice-info">
          <button type="button" :disabled="rolling" @click="rollDice">{{ rolling ? '滚动中…' : '掷一次' }}</button>
          <p class="tip">已掷 {{ rollCount }} 次 · 当前点数 {{ dice }}</p>
        </div>
      </div>
      <p v-if="history.length" class="tip">最近结果：{{ history.join('、') }}</p>
    </section>

    <section class="card">
      <h2>6. 折叠问答</h2>
      <div class="faq-list">
        <div v-for="(item, index) in faqs" :key="item.question" class="faq-item">
          <button type="button" class="faq-question" :aria-expanded="openFaq === index" @click="toggleFaq(index)">
            <span>{{ item.question }}</span>
            <span class="arrow">{{ openFaq === index ? '−' : '+' }}</span>
          </button>
          <p v-if="openFaq === index" class="faq-answer">{{ item.answer }}</p>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>7. 密码强度检测</h2>
      <div class="password-row">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="输入密码，实时检测强度"
        />
        <button type="button" class="ghost" @click="togglePasswordVisibility">
          {{ showPassword ? '隐藏' : '显示' }}
        </button>
      </div>
      <div class="strength-bar">
        <span :class="`strength-${strengthScore}`" :style="{ width: `${strengthScore * 25}%` }"></span>
      </div>
      <p class="tip">强度：{{ strengthLabel }}</p>
      <ul class="rule-list">
        <li v-for="rule in rules" :key="rule.label" :class="{ passed: rule.passed }">
          {{ rule.passed ? '✓' : '○' }} {{ rule.label }}
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
  text-align: left;
}

h2 {
  font-size: 1.2rem;
  margin: 0 0 16px;
  color: #0f172a;
}

button {
  background: #41b883;
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover:not(:disabled) {
  background: #34a06f;
}

button:disabled {
  opacity: 0.6;
  cursor: wait;
}

button.ghost {
  background: #eef2f7;
  color: #475569;
  margin-left: 12px;
}

button.ghost:hover {
  background: #e2e8f0;
}

.stars {
  display: flex;
  align-items: center;
  gap: 4px;
}

.star {
  background: transparent;
  color: #d8dee9;
  font-size: 1.8rem;
  padding: 0 2px;
  line-height: 1.2;
}

.star:hover {
  background: transparent;
}

.star.active {
  color: #f59e0b;
}

.rating-text {
  margin-left: 10px;
  color: #64748b;
  font-size: 0.9rem;
}

.dice-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.dice {
  width: 72px;
  height: 72px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  font-size: 3rem;
  color: #0f172a;
}

.dice.rolling {
  animation: shake 0.16s linear infinite;
}

@keyframes shake {
  0% { transform: rotate(-8deg); }
  50% { transform: rotate(8deg); }
  100% { transform: rotate(-8deg); }
}

.dice-info .tip {
  margin-top: 10px;
}

.faq-list {
  display: grid;
  gap: 8px;
}

.faq-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  color: #334155;
  text-align: left;
  font-weight: 500;
}

.faq-question:hover {
  background: #eef2f7;
}

.arrow {
  font-size: 1.2rem;
  line-height: 1;
}

.faq-answer {
  margin: 0;
  padding: 12px 16px;
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.7;
}

.password-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

input {
  border: 1px solid #d8dee9;
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  flex: 1;
  min-width: 0;
}

input:focus {
  border-color: #41b883;
  box-shadow: 0 0 0 3px rgba(65, 184, 131, 0.15);
}

.strength-bar {
  height: 6px;
  background: #eef2f7;
  border-radius: 999px;
  margin-top: 14px;
  overflow: hidden;
}

.strength-bar span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: #ef4444;
  transition: width 0.2s, background 0.2s;
}

.strength-bar span.strength-2 { background: #f59e0b; }
.strength-bar span.strength-3 { background: #3b82f6; }
.strength-bar span.strength-4 { background: #41b883; }

.rule-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  padding: 0;
  margin: 12px 0 0;
  color: #94a3b8;
  font-size: 0.85rem;
}

.rule-list li.passed {
  color: #2f855a;
}

.tip {
  color: #64748b;
  font-size: 0.85rem;
  margin: 12px 0 0;
}

@media (max-width: 520px) {
  .rule-list {
    grid-template-columns: 1fr;
  }
}
</style>

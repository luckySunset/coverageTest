<script setup>
import { computed, ref } from 'vue'

// 1. 计数器
const count = ref(0)
const countLabel = computed(() => (count.value % 2 === 0 ? '偶数' : '奇数'))
const change = (step) => { count.value += step }
const reset = () => { count.value = 0 }

// 2. 待办清单
const todos = ref([])
const draft = ref('')
const remaining = computed(() => todos.value.filter((item) => !item.done).length)
const addTodo = () => {
  const text = draft.value.trim()
  if (!text) return
  todos.value.push({ id: Date.now(), text, done: false })
  draft.value = ''
}
const toggleTodo = (item) => { item.done = !item.done }
const removeTodo = (id) => { todos.value = todos.value.filter((item) => item.id !== id) }

// 3. 文本反转
const text = ref('')
const reversedText = computed(() => [...text.value].reverse().join(''))
const textLength = computed(() => text.value.length)
</script>

<template>
  <div class="interactions">
    <section class="card">
      <h2>1. 计数器</h2>
      <div class="count-row">
        <button type="button" @click="change(-1)">-1</button>
        <span class="count-value">{{ count }}</span>
        <button type="button" @click="change(1)">+1</button>
        <button type="button" class="ghost" @click="reset">重置</button>
      </div>
      <p class="tip">当前是{{ countLabel }} · 由 computed 自动推导</p>
    </section>

    <section class="card">
      <h2>2. 待办清单</h2>
      <form class="todo-form" @submit.prevent="addTodo">
        <input v-model="draft" placeholder="输入待办事项，回车添加" />
        <button type="submit">添加</button>
      </form>
      <p v-if="todos.length" class="tip">还有 {{ remaining }} 项未完成</p>
      <p v-else class="tip">暂无待办，添加一条试试</p>
      <ul class="todo-list">
        <li v-for="item in todos" :key="item.id" :class="{ done: item.done }">
          <label>
            <input type="checkbox" :checked="item.done" @change="toggleTodo(item)" />
            <span>{{ item.text }}</span>
          </label>
          <button type="button" class="remove" @click="removeTodo(item.id)">删除</button>
        </li>
      </ul>
    </section>

    <section class="card">
      <h2>3. 文本反转</h2>
      <input v-model="text" class="text-input" placeholder="输入任意文字，实时反转" />
      <p class="tip">{{ textLength }} 个字符 · 反转结果：</p>
      <p class="result">{{ reversedText || '（等待输入）' }}</p>
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

button:hover {
  background: #34a06f;
}

button.ghost {
  background: #eef2f7;
  color: #475569;
}

button.ghost:hover {
  background: #e2e8f0;
}

button.remove {
  background: transparent;
  color: #ef4444;
  padding: 4px 8px;
}

button.remove:hover {
  background: #fef2f2;
}

.count-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.count-value {
  min-width: 56px;
  font-size: 1.6rem;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
}

.todo-form {
  display: flex;
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

.todo-list {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
  display: grid;
  gap: 8px;
}

.todo-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  background: #f8fafc;
  border-radius: 8px;
}

.todo-list label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #334155;
}

.todo-list label input {
  flex: none;
  accent-color: #41b883;
}

.todo-list li.done label span {
  text-decoration: line-through;
  color: #94a3b8;
}

.text-input {
  width: 100%;
}

.result {
  margin: 8px 0 0;
  padding: 12px 14px;
  background: #f1f5f9;
  border-radius: 8px;
  color: #0f172a;
  word-break: break-all;
  min-height: 44px;
}

.tip {
  color: #64748b;
  font-size: 0.85rem;
  margin: 12px 0 0;
}
</style>

<script setup>
const features = [
  { title: 'Vue 3.3.4', desc: '组合式 API、更好的 TypeScript 支持与性能优化' },
  { title: 'Vite 4.3.9', desc: '秒级冷启动、即时热更新与开箱即用的构建' },
  { title: '@vitejs/plugin-vue', desc: '为 Vite 提供单文件组件（SFC）编译支持' },
]
</script>

<template>
  <section class="feature-card">
    <h2>技术栈</h2>
    <ul>
      <li v-for="item in features" :key="item.title">
        <strong>{{ item.title }}</strong>
        <span>{{ item.desc }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.feature-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
  text-align: left;
}

h2 {
  font-size: 1.25rem;
  margin: 0 0 16px;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

li {
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 8px;
}

strong {
  display: block;
  color: #0f172a;
  margin-bottom: 4px;
}

span {
  color: #64748b;
  font-size: 0.9rem;
}
</style>

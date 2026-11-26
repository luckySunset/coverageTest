<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('Vue Router 4.2.2')

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="about">
    <section class="card">
      <h2>关于本页</h2>
      <p>这是通过 <code>vue-router</code> 导航到的「关于」页面。</p>
      <p>组件内的 <code>name</code> 当前为:<strong>{{ name }}</strong></p>
      <button type="button" @click="goHome">返回首页</button>
    </section>
  </div>
</template>

<style scoped>
.about {
  text-align: center;
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
}

h2 {
  font-size: 1.25rem;
  margin: 0 0 16px;
  color: #0f172a;
}

p {
  color: #64748b;
  line-height: 1.7;
}

strong {
  color: #0f172a;
}

button {
  margin-top: 12px;
  background: #41b883;
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 10px 22px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background: #34a06f;
}

code {
  background: #eef2f7;
  color: #334155;
  padding: 2px 6px;
  border-radius: 5px;
  font-size: 0.85em;
}
</style>

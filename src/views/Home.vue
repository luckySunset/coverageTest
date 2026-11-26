<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import Interactions from '../components/Interactions.vue'

const rrr = 1;
</script>

<template>
  <div class="home">
    <section class="hero">
      <svg class="logo" viewBox="0 0 261.76 226.69" xmlns="http://www.w3.org/2000/svg" aria-label="Vue logo">
        <path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883" />
        <path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#35495e" />
      </svg>
      <h1>Vite + Vue 3</h1>
      <p class="subtitle">工程已创建成功，开始你的开发之旅</p>
      <div class="badges">
        <span class="badge badge-vue">Vue 3.3.4</span>
        <span class="badge badge-vite">Vite 4.3.9</span>
        <span class="badge badge-router">Vue Router 4.2.2</span>
        <van-tag type="success" round>Vant 4.8.6</van-tag>
      </div>
    </section>

    <HelloWorld />

    <Interactions />
  </div>
</template>

<style scoped>
.home {
  text-align: center;
}

.hero {
  margin-bottom: 40px;
}

.logo {
  width: 96px;
  height: auto;
  margin-bottom: 20px;
}

h1 {
  font-size: 2.5rem;
  margin: 0 0 12px;
  background: linear-gradient(120deg, #41b883, #35495e);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  font-size: 1.05rem;
  color: #64748b;
  margin: 0 0 20px;
}

.badges {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
}

.badge-vue {
  background: #e6f7ef;
  color: #2f855a;
  border: 1px solid #b7e4cd;
}

.badge-vite {
  background: #f3ecff;
  color: #6d28d9;
  border: 1px solid #ddd0ff;
}

.badge-router {
  background: #e6f0ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
}
</style>

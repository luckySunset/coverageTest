<script setup>
</script>

<template>
  <main class="app">
    <nav class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
    </nav>
    <router-view />
  </main>
</template>

<style>
:root {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #2c3e50;
  background-color: #f6f8fa;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
}

.app {
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 24px 48px;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
  padding: 8px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}

.nav a {
  padding: 8px 20px;
  border-radius: 8px;
  color: #64748b;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

.nav a:hover {
  background: #f1f5f9;
}

.nav a.router-link-exact-active {
  background: #41b883;
  color: #ffffff;
}
</style>

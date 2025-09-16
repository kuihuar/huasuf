<template>
  <div id="app">
    <!-- 使用Vue Router的router-view -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Ensure full-height context */
html, body, #app { 
  height: 100%; 
}

/* On small screens (no fullpage.js), push footer to the bottom */
@media (max-width: 1199px) {
  .home-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  #fullpage {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .section.footer {
    margin-top: auto;
  }
}

/* 新闻页面特定样式 */
.news-page-active {
  overflow: auto !important;
}

.news-page-active #fullpage {
  display: none !important;
}

/* 公司页面特定样式 */
.company-page-active {
  overflow: auto !important;
}

.company-page-active #fullpage {
  display: none !important;
}
</style>

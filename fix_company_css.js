const fs = require('fs');

// 读取文件
let content = fs.readFileSync('src/views/Company.vue', 'utf8');

// 修复CSS结构，将pointer-events规则放在正确位置
content = content.replace(
  /\/\* 确保AOS元素在动画库未加载时也能显示 \*\/\n\[data-aos\] \{\n\/\* 覆盖AOS的pointer-events限制，确保导航链接可以点击 \*\/\n\.list_sj\[data-aos\] \{\n  pointer-events: auto !important;\n\}\n\n\.list_sj\[data-aos\] \* \{\n  pointer-events: auto !important;\n\}\n  opacity: 1 !important;\n  transform: none !important;\n\}/g,
  `/* 确保AOS元素在动画库未加载时也能显示 */
[data-aos] {
  opacity: 1 !important;
  transform: none !important;
}

/* 覆盖AOS的pointer-events限制，确保导航链接可以点击 */
.list_sj[data-aos] {
  pointer-events: auto !important;
}

.list_sj[data-aos] * {
  pointer-events: auto !important;
}`
);

// 清理重复的规则
content = content.replace(
  /\/\* 当AOS加载后，恢复正常的动画行为 \*\/\nhtml:not\(\.no-js\) \[data-aos\] \{\n\/\* 覆盖AOS的pointer-events限制，确保导航链接可以点击 \*\/\n\.list_sj\[data-aos\] \{\n  pointer-events: auto !important;\n\}\n\n\.list_sj\[data-aos\] \* \{\n  pointer-events: auto !important;\n\}\n  opacity: 0;\n  transform: translate3d\(0, 60px, 0\);\n\}/g,
  `/* 当AOS加载后，恢复正常的动画行为 */
html:not(.no-js) [data-aos] {
  opacity: 0;
  transform: translate3d(0, 60px, 0);
}`
);

// 写回文件
fs.writeFileSync('src/views/Company.vue', content);
console.log('CSS结构已修复');

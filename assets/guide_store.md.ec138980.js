import{o as n,c as s,a}from"./app.79936fe0.js";const t='{"title":"全局 store","description":"","frontmatter":{},"headers":[{"level":2,"title":"说明","slug":"说明"}],"relativePath":"guide/store.md","lastUpdated":1613801418778}',p={},o=a('<h1 id="全局-store"><a class="header-anchor" href="#全局-store" aria-hidden="true">#</a> 全局 store</h1><p>convue 默认会加载 /src/store 目录下的 .js|.ts 文件，并且在 vuex 中自动配置。</p><p>文件的内容结构与 vuex 统一，如下</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  mutations<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n  actions<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n  getters<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre></div><h2 id="说明"><a class="header-anchor" href="#说明" aria-hidden="true">#</a> 说明</h2><p>/src/store 下的 index[.js|.ts] 会直接加载 vuex 项，其他文件会以模块的形式配置。</p><p>比如存在 index.js 和 user.js 两个文件。</p><p>index.js</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n    text<span class="token operator">:</span> <span class="token string">&#39;hello&#39;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre></div><p>user.js</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n    name<span class="token operator">:</span> <span class="token string">&#39;convue&#39;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre></div><p>那么 vuex store 实际上是这种结构</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n    text<span class="token operator">:</span> <span class="token string">&#39;hello&#39;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  modules<span class="token operator">:</span> <span class="token punctuation">{</span>\n    user<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n        text<span class="token operator">:</span> <span class="token string">&#39;convue&#39;</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre></div><p>其他规则请<a href="/convue/config/store.html">参考 store 配置项</a>。</p>',14);p.render=function(a,t,p,e,c,u){return n(),s("div",null,[o])};export default p;export{t as __pageData};

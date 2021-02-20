import{o as n,c as s,a}from"./app.79936fe0.js";const p='{"title":"全局组件","description":"","frontmatter":{},"headers":[{"level":2,"title":"多级目录","slug":"多级目录"}],"relativePath":"zh/guide/components.md","lastUpdated":1613803125495}',t={},o=a('<h1 id="全局组件"><a class="header-anchor" href="#全局组件" aria-hidden="true">#</a> 全局组件</h1><p>convue 默认会注册 /src/components 目录下的 .vue|.js|.jsx|.ts|.tsx 文件为全局组件。</p><p>比如在 /src/components 下有一个 Hello.tsx 组件</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>Hello Convue<span class="token operator">!</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p>在页面中使用</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>\n<span class="token comment">// import Hello from &#39;/src/components/hello&#39;; 不需要加载注册</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">&lt;</span>hello<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>hello<span class="token operator">&gt;</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p>全局组件推荐用 lowercase 的写法，自定义组件用 大驼峰 的写法。</p><h2 id="多级目录"><a class="header-anchor" href="#多级目录" aria-hidden="true">#</a> 多级目录</h2><p>如果 /src/components 下还存在多级目录，那么组件的的命名会以 folder-file 的形式连接。</p><p>比如 src/components/app/navbar.tsx, 那么使用该组件的话需要加上 app 的前缀（app-navbar），更多层级以此类推。</p><p>其他规则请<a href="/convue/zh/config/component.html">参考 component 配置项</a>。</p>',11);t.render=function(a,p,t,e,c,l){return n(),s("div",null,[o])};export default t;export{p as __pageData};

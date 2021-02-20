import{o as n,c as a,a as s}from"./app.79936fe0.js";const t='{"title":"head 标签","description":"","frontmatter":{},"headers":[{"level":2,"title":"占位符","slug":"占位符"},{"level":2,"title":"全局设置","slug":"全局设置"},{"level":2,"title":"页面单独设置","slug":"页面单独设置"}],"relativePath":"zh/guide/head.md","lastUpdated":1613803130288}',p={},o=s('<h1 id="head-标签"><a class="header-anchor" href="#head-标签" aria-hidden="true">#</a> head 标签</h1><p>通常情况下，head 标签内包含了 title、meta 和 link 标签， srcript 标签我们通常写在 body 的最后面。</p><p>meta 标签同时也是 SEO 中重要的一环。</p><h2 id="占位符"><a class="header-anchor" href="#占位符" aria-hidden="true">#</a> 占位符</h2><ul><li>通过 \x3c!-- TITLE --\x3e 占位 title 标签的内容</li><li>通过 \x3c!-- HEAD --\x3e 占位 head 标签需要加载的 meta 和 link 标签</li><li>通过 \x3c!-- APP --\x3e 占位 vue 实例挂载的元素以及 loading</li></ul><div class="language-html"><pre><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span><span class="token comment">&lt;!-- TITLE --&gt;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>\n    <span class="token comment">&lt;!-- HEAD --&gt;</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>\n    <span class="token comment">&lt;!-- APP --&gt;</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>module<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n      <span class="token comment">// ...</span>\n    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h2 id="全局设置"><a class="header-anchor" href="#全局设置" aria-hidden="true">#</a> 全局设置</h2><p>在 vite.config.js 中的 convue 配置项中传入的为全局配置</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> convue <span class="token keyword">from</span> <span class="token string">&#39;convue&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token operator">...</span><span class="token function">convue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      head<span class="token operator">:</span> <span class="token punctuation">{</span>\n        title<span class="token operator">:</span> <span class="token string">&#39;Convue&#39;</span><span class="token punctuation">,</span>\n        meta<span class="token operator">:</span> <span class="token punctuation">[</span>\n          <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">&#39;language&#39;</span><span class="token punctuation">,</span> content<span class="token operator">:</span> <span class="token string">&#39;en-US&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">&#39;author&#39;</span><span class="token punctuation">,</span> content<span class="token operator">:</span> <span class="token string">&#39;ziping&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        link<span class="token operator">:</span> <span class="token punctuation">[</span>\n          <span class="token punctuation">{</span>\n            rel<span class="token operator">:</span> <span class="token string">&#39;dns-prefetch&#39;</span><span class="token punctuation">,</span>\n            href<span class="token operator">:</span> <span class="token string">&#39;https://www.googletagmanager.com&#39;</span><span class="token punctuation">,</span>\n            crossorigin<span class="token operator">:</span> <span class="token string">&#39;crossorigin&#39;</span><span class="token punctuation">,</span>\n          <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          <span class="token punctuation">{</span>\n            rel<span class="token operator">:</span> <span class="token string">&#39;dns-prefetch&#39;</span><span class="token punctuation">,</span>\n            href<span class="token operator">:</span> <span class="token string">&#39;https://www.google-analytics.com/analytics.js&#39;</span><span class="token punctuation">,</span>\n            crossorigin<span class="token operator">:</span> <span class="token string">&#39;crossorigin&#39;</span><span class="token punctuation">,</span>\n          <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p>如果 title 不传的话，默认会取 packgae.json 中的 name 字段。</p><h2 id="页面单独设置"><a class="header-anchor" href="#页面单独设置" aria-hidden="true">#</a> 页面单独设置</h2><p>我们也可以为某一个页面单独设置 head，最终该页面的 head 会包含全局设置的加上页面单独设置的内容。</p><p>同样是在 route 标签中使用 meta 对象。</p><div class="language-js"><pre><code><span class="token punctuation">{</span>\n  <span class="token comment">/* &lt;route&gt;\n  name: &#39;test&#39;\n  meta:\n    head:\n      title: Convue\n      meta:\n        -\n          name: language\n          content: en-US\n        -\n          name: author\n          content: ziping\n&lt;/route&gt; */</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p>其他规则请<a href="/convue/zh/config/head.html">参考 head 配置项</a>。</p>',15);p.render=function(s,t,p,e,c,l){return n(),a("div",null,[o])};export default p;export{t as __pageData};

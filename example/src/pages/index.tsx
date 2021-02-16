{/* <route>
  name: 'test'
  meta:
    title: 111
    layout: empty
    head:
      meta:
        -
          name: language
          content: en-US
        -
          name: author
          content: ziping
</route> */}

import { defineComponent, getCurrentInstance, ComponentInternalInstance, toRaw } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Index',
  setup() {
    const store = useStore();
    const route = useRoute();
    const { t } = useI18n();
    const instance: ComponentInternalInstance | null = getCurrentInstance();
    const toString = instance?.appContext.config.globalProperties.$toString;

    console.log(toRaw(route.meta));

    return () => (
      <div>
        <div>
          <hello></hello> World.
        </div>
        <span>
          {store.state.text} {store.state.user.name}.
        </span>

        <div>
          <a-button type="primary">Primary Button</a-button>
        </div>

        <div>{toString({ a: 1 })}</div>

        <div>{ t("Message") }</div>
      </div>
    );
  },
});

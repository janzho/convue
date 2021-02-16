import { defineComponent } from 'vue';

export default defineComponent({
  setup() {},
  render() {
    return (
      <div>
        <span>default layout</span>
        <router-view></router-view>
      </div>
    );
  },
});

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

export default ({ app }: any, inject: any) => {
  app.use(Antd);

  inject('toString', (obj: any) => {
    return JSON.stringify(obj);
  });
};

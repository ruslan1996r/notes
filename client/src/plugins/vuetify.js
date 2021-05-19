import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from "vuetify/es5/util/colors"
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.css';

Vue.use(Vuetify);

const opts = {
    iconfont: 'mdi',
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: colors.blue.darken2,
                accent: colors.grey.darken3,
                secondary: colors.amber.darken3,
                info: colors.teal.lighten1,
                warning: colors.amber.base,
                error: colors.deepOrange.accent4,
                success: colors.green.accent3,
                successDarken: '#00bc60',
                darkenText: '#212121'
            }
        }
    }
};

export default new Vuetify(opts);
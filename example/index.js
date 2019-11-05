/* eslint-disable import/no-extraneous-dependencies */
/*
 * @Author: 卓文理
 * @Email: zhuowenligg@gmail.com
 * @Date: 2019-11-05 10:19:55
 */

import Vue from 'vue';
import './input.sass';

export default new Vue({
    data() {
        return {
            indexs: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
            colors: [
                'd92424',
                'd924d9',
                '2424d9',
                '24d9d9',
                'd95124',
            ],
        };
    },
}).$mount('#app');

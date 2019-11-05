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
                'd9247f',
                'd924d9',
                '7f24d9',
                '2424d9',
                '247fd9',
                '24d9d9',
                'd97f24',
                'd95124',
            ],
        };
    },
}).$mount('#app');

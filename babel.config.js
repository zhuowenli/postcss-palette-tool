/*
 * @Author: 卓文理
 * @Email: zhuowenligg@gmail.com
 * @Date: 2019-11-01 10:57:16
 */

module.exports = {
    presets: [
        [
            '@babel/env',
            {
                targets: {
                    node: 8,
                },
            },
        ],
    ],
    plugins: [
        '@babel/plugin-proposal-object-rest-spread',
    ],
    // sourceType: 'unambiguous',
};

/*
 * @Author: 卓文理
 * @Email: zhuowenligg@gmail.com
 * @Date: 2019-11-01 11:05:47
 */

import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import plugin from '../src';

let from;
const read = (name) => fs.readFileSync(path.join(__dirname, name), 'utf8');

test('color', async () => {
    const input = read('color/input.css');
    const expected = read('color/expected.css');

    const result = await postcss()
        .use(plugin())
        .process(input, { from });

    expect(result.css).toBe(expected);
});

test('background', async () => {
    const input = read('background/input.css');
    const expected = read('background/expected.css');

    const result = await postcss()
        .use(plugin())
        .process(input, { from });

    expect(result.css).toBe(expected);
});

/*
 * @Author: 卓文理
 * @Email: zhuowenligg@gmail.com
 * @Date: 2019-11-01 10:54:20
 */

import postcss, { list } from 'postcss';
import rfc from 'reduce-function-call';
import tinycolor from 'tinycolor2';

const hueStep = 2; // 色相阶梯
const lightColorCount = 5; // 浅色数量，主色上 1 - 5
const darkColorCount = 4; // 深色数量，主色下 7 - 10
const saturationStep = 16; // 饱和度阶梯，浅色部分
const saturationStep2 = 5; // 饱和度阶梯，深色部分
const brightnessStep1 = 5; // 亮度阶梯，浅色部分
const brightnessStep2 = 15; // 亮度阶梯，深色部分

/**
 * 获取色相渐变
 *
 * 对于冷暖色调在减淡与加深的时候进行不同的处理，如冷色调减淡的时候变亮的同时叠加暖色，使得色相更暖
 * 再根据颜色值、色号与主色色号(6)差的绝对值、减淡/加深这三个参数获取渐变后的色值
 * 其中 HSV 的三个值都经过了渐变调整 (即色号1-10 递增时H值为渐变增加)
 *
 * @param {HSV} hsv
 * @param {Number} i 叠加系数
 * @param {Boolean} isLight 是否亮色
 * @returns
 */
function getHue(hsv, i, isLight) {
    let hue;

    // 根据色相不同，色相转向不同
    if (hsv.h >= 60 && hsv.h <= 240) {
        // 冷色调
        // 减淡变亮 色相顺时针旋转 更暖
        // 加深变暗 色相逆时针旋转 更冷
        hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i;
    } else {
        // 暖色调
        // 减淡变亮 色相逆时针旋转 更暖
        // 加深变暗 色相顺时针旋转 更冷
        hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i;
    }

    if (hue < 0) {
        hue += 360;
    } else if (hue >= 360) {
        hue -= 360;
    }

    return Math.round(hue);
}

/**
 * 获取饱和度渐变
 *
 * 对于减淡与加深的饱和度进行了不同的处理，其中减淡递减的值更大
 * 在减淡的过程中饱和度会迅速下降，而由于主色的饱和度一般较高，因此加深的时候饱和度不必增张过快
 * 尤其是最深的颜色，进行了特殊处理，使得 9 号色与 10 号色的饱和度相差无几。
 *
 * @param {HSV} hsv
 * @param {Number} i 叠加系数
 * @param {Boolean} isLight 是否亮色
 * @returns
 */
function getSaturation(hsv, i, isLight) {
    // grey color don't change saturation
    if (hsv.h === 0 && hsv.s === 0) {
        return hsv.s;
    }

    let saturation;
    if (isLight) {
        // 减淡变亮 饱和度迅速降低
        saturation = Math.round(hsv.s * 100) - saturationStep * i;
    } else if (i === darkColorCount) {
        // 加深变暗-最暗 饱和度提高
        saturation = Math.round(hsv.s * 100) + saturationStep;
    } else {
        // 加深变暗 饱和度缓慢提高
        saturation = Math.round(hsv.s * 100) + saturationStep2 * i;
    }

    // 边界值修正
    if (saturation > 100) {
        saturation = 100;
    }

    // 第一格的 s 限制在 6-10 之间
    if (isLight && i === lightColorCount && saturation > 10) {
        saturation = 10;
    }
    if (saturation < 6) {
        saturation = 6;
    }
    return Math.round(saturation);
}

/**
 * 获取明度渐变
 *
 * 对于减淡与加深的明度进行了不同的处理，其中加深递减的值更大，说明加深的过程中明度会迅速下降
 * 这是由于主色的明度一般较高，因此减淡的时候明度不宜增长过多。
 *
 * @param {HSV} hsv
 * @param {Number} i 叠加系数
 * @param {Boolean} isLight 是否亮色
 * @returns
 */
function getValue(hsv, i, isLight) {
    if (isLight) {
        // 减淡变亮
        return Math.round(hsv.v * 100) + brightnessStep1 * i;
    }

    // 加深变暗幅度更大
    return Math.round(hsv.v * 100) - brightnessStep2 * i;
}

export default postcss.plugin('postcss-palette-tool', () => (css) => {
    css.walk((node) => {
        if (node.type === 'decl') {
            if (!/((?:palette)\()(.*)(\))/.test(node.value)) {
                return;
            }

            node.value = rfc(node.value, 'palette', (body) => {
                // index = 6 为主色
                const [color, index = 6] = list.comma(body);

                if (!color) return body;

                // 是否亮色
                const isLight = index <= 6;

                // 通过 tinycolor 获取 HSV 对象
                const hsv = tinycolor(color).toHsv();

                // 叠加系数
                const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;

                // 返回叠加后的颜色
                return tinycolor({
                    h: getHue(hsv, i, isLight),
                    s: getSaturation(hsv, i, isLight),
                    v: getValue(hsv, i, isLight),
                }).toHexString();
            });
        }
    });
});

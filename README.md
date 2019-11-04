<h3 align="center">postcss-palette-tool</h3>
<p align="center">
    <a target="_blank" href="https://www.npmjs.com/package/postcss-palette-tool" title="Npm">
        <img src="https://img.shields.io/npm/v/postcss-palette-tool" alt="">
    </a>
</p>

> 🎨 [PostCSS](https://github.com/postcss/postcss) plugin to mixin monochromatic colors scheme

Color palettes calculator of [Ant Design](https://ant.design/docs/spec/colors).

## Install

```
npm install --dev postcss-palette-tool
```

## Usage

Add to `postcss.config.js`:

```js
module.exports = {
    plugins: [
        require('postcss-palette-tool'),
    ],
};
```

This plugin can mix a color based on a variable and then output a new color.

before:

```css
body {
    color: palette(#d92424, 1);
    background: palette(#24acd9, 8) radial-gradient(palette(#24acd9, 9), #ffffff);
}
```

after:

```css
body {
    color: #fff2f0;
    background: #0a638c radial-gradient(#024366, #ffffff);
}
```

## Options

| var     | desc      | required |
| ------- | --------- | -------- |
| color   | css color | ✔️ |
| level   | 1 - 10 (6 is default color) | ✔️ |

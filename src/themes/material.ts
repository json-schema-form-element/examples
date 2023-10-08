import {
	themeFromSourceColor,
	applyTheme,
	argbFromHex,
} from '@material/material-color-utilities';

const theme = themeFromSourceColor(argbFromHex('#003a90'), [
	// { name: 'custom-1', value: argbFromHex('#ff0000'), blend: true },
]);
applyTheme(theme, {
	target: document.body,
	dark: true,
});

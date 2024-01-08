# Sketchy
Sketchy is a simple, light, and fast browser extension that allows you to setup a slideshow from Google Image Search result for your drawing session.  
Note that **Sketchy is still at its alpha stage, and thus likely to contain bugs and issues**. Sketchy is released under MIT license, so **use at your own discretion** and if you encounter any bugs please report to [issue](https://github.com/ktoshima/sketchy/issues).

日本語の説明はreadme-jp.mdを参照のこと。
## How to install
### Load built package
We are still working on publishing Sketchy on extension platforms. Currently this is the easiest way to install Sketchy to your browser.
1. Download and unzip the latest release from [releases](https://github.com/ktoshima/sketchy/releases) for your browser of choice.
2. Use your browser's "load extension from local file" feature to load the extracted extension
	- For Google Chrome, see [here](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked).
	- For Firefox, see [here](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing).
### Build yourself
Alternatively, you can build the extension yourself. Follow the instrutions after cloning this repo to your local machine;
1. Install [Node.js](https://nodejs.org/), then run:
```bash
npm install
```
2. Run the following and it will create `dist` folder, which includes all files necessary for Sketchy. Sketchy is largely written in [React](https://react.dev/) and compiled using [webpack](https://webpack.js.org/). Build command is written in `package.json` and build configuration is written in `webpack.config.js`, so you can tweak parameters in those files.
```bash
npm run build:prod
```

3. Load extension from local file by choosing `dist` folder. Refer to the previous section on how to load extension from local files to your browser.

## How to use
1. 

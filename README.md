# Chrome-NEO

[![Build
Status](https://travis-ci.org/bradtaniguchi/chrome-neo.svg?branch=master)](https://travis-ci.org/bradtaniguchi/chrome-neo)

This program was written as the Senior project for Bradley Taniguchi at
California State University Dominguez Hills, for the Spring 2017 semester.  
This program is a Google Chrome extension that utilizes data from asterank.com, and NeoWs feed. Both of which get their data from NASA's Small body Database.
The extension itself uses angularjs and bootstrap frameworks.

---

## Deprecation notice

Due to chrome's deprecation of manifest V2 (see more [here](https://developer.chrome.com/blog/resuming-the-transition-to-mv3/)) **this extension will stop working as of June 2024**.

I have a [replacement](https://github.com/bradtaniguchi/chrome-neo-plus) being built using newer technologies for this extension, but I wont make a guarantee that it will be ready in time.

As such expect this extension to stop working in the future, and I wont be updating it to work with manifest V3. If you have actually used this small project of mine, thank you! I hope you enjoyed it!

## Installation

Be sure to have node and bower installed on your workstation.  
To install the project dependencies, and front-end dependencies use the following commands.

```bash
npm install
bower install
```

To to run the gulp build run:

```bash
gulp
```

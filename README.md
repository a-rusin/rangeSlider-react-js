# RangeSlider React JavaScript component

## _Tesk task for Neo Stack Technology company ([NST](https://www.neostk.com/))_

Hello!\
This is my test task for NST company: customizable range slider component (widget) for JavaScript with no external dependencies.\
**Warning!** In fact, this is a complete copy of my previously written component on Vanilla JS ([link to the project on GitHub](https://github.com/a-rusin/rangeSlider-vanilla-JS)), but here I decided to rewrite the component on React.\
The slider works as follows. To begin with, the user selects the year range (year switcher), then during the transition to the month section (month switcher), the slider remembers the current values of the minimum and maximum slider dipozone, and accepts them for the second slider (by month) for the minimum and maximum values, respectively. In the second slider, a more precise slider setting is selected (a more accurate date range).

## Features

-   React!
-   No dependencies!
-   Totally responsive!
-   Control over minDate, maxDate and current date values!
-   CSS Customization
-   Simple API to interact with the value!
-   Unlimited use of the slider on the page

## Tested in:

-   Chrome 110
-   Mozilla Firefox 110.0.1

Should also work in all major browsers, but need to test.

## Example

![Example picture 1](https://i.ibb.co/PDnrMnY/example-img1.jpg)\
![Example picture 2](https://i.ibb.co/23w4S3T/example-img2.jpg)

An example of default initialization:

```javascript
<div className="wrapper">
    <RangeSlider minDate="2014" maxDate="2021" minSelectedDate="0-2015" maxSelectedDate="0-2016" />
</div>
```

## Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Installation

#### Simple download

Download the files and move them to a folder in your project.\
For example:

```javascript
<div className="wrapper">
    <RangeSlider minDate="2014" maxDate="2021" minSelectedDate="0-2015" maxSelectedDate="0-2016" />
</div>
```

## Props

##### minDate

Type: `string`\
Required field. Minimum value of the year

##### maxDate

Type: `string`\
Required field. Maximum value of the year

##### minSelectedDate

Type: `string`\
Required field. A mark for the minimum selected start date, as well as a mark for the minimum value of the tooltip. It must be entered in the format 'month-year'. **Important!** The month index starts from 0, where 0 is January, 11 is December. For example '01-2021' (you can remove the first zero) - February 2021

##### maxSelectedDate

Type: `string`\
By analogy with minSelectedDate, only the maximum selected date.

## CSS customization

This component has the ability to customize the slider for your needs. To do this, go to the `range-slider.css` file and change the CSS variable settings for yourself at the beginning of the styles.

-   `--color-primary` - color of link (switchers), tooltips text
-   `--color-secondary` - color of progress, slider thumb
-   `--color-tooltip-bg` - background color tooltips
-   `--color-ruler1` - color of rules text 1 (light)
-   `--color-ruler2` - color of rules text 2 (dark)
-   `--color-slider-bg` - background color slider

## License

MIT

**Free Software, Hell Yeah!**\
Alexandr Rusin, 2023 (c)

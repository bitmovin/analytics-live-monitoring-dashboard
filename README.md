# Bitmovin Live Monitoring Dashboard

This dashboard lets you see your live streams’ performance in real-time. It shows you

- how many people are watching your stream,
- how many people had to rebuffer and
- how many errors occurred and what were the most frequent errors.

## Installation

Clone this repository and open the project directory in your command line.
This project uses the [Yarn package manager](https://yarnpkg.com/lang/en/)¹.
To install the dependencies, run

```bash
yarn install
```

## Opening the dashboard

Run `yarn start`¹ to start the application. This should automatically open a browser window.
If it doesn’t, open [http://localhost:3000/](http://localhost:3000/) in your browser. Enter your
Bitmovin API key and your live stream’s performance metrics will appear. You’ll find the API key
in your [Bitmovin Account](https://dashboard.bitmovin.com/account).

¹ If you don't want to use Yarn, you can alternatively run `npm install` and `npm start`.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone git@github.com:monddelmundo/blockchain-node.git

# Go into the repository
$ cd blockchain-node

# Install typescript for node
$ npm i -g ts-node typescript

# Install dependencies
$ npm install

# Run the app
$ npm start -- --<parameter> <value>
```

## Parameters available

- token (usage: `npm start -- --token BTC`)
- date (usage: `npm start -- --date YYYY-MM-DD`)

*Note*: Both parameters can be used at the same time (usage: `npm start -- --token BTC --date YYYY-MM-DD`).

Initially used node version 18.12.1 on developing this.
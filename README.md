# Cookie Clicker

A project based on cookie clicker game http://orteil.dashnet.org/cookieclicker/

## Requirements

For development, you will only need Node.js installed on your environement.

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You can use [YARN](https://yarnpkg.com) instead of npm if you like.
You should be able to run the following command after the installation procedure
below.
```
    $ node --version
    v0.10.24

    $ npm --version
    1.3.21
```

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.
```
    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```
If everything when fine, you should run
```
    brew install node
```
#### Node installation on Linux
```
    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs
```

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

---

## Install
```
    $ git clone https://github.com/piotpap663/cookieclick.git
    $ cd cookieclick-master
```
    and run
```
    $ npm install
```
    or
```
    $ yarn install
```

---

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

---

## Start & watch
```
    $ npm dev-server
```
    or 
    if you use yarn
```
    $ yarn run dev-server
```
    It will run app on localhost server
    Just check the ip and port on your command lines
    Put the address in your browser and it works
    Default: localhost:8080

---

## Simple build for production
```
    $ npm run build
```
    or
    if you use yarn
```
    $ yarn run build
```

---

## Author

* **Piotr Papiernik** - [LinkedIn](https://linkedin.com/in/piotr-papiernik/) 

---

## License

This project is licensed under the MIT License
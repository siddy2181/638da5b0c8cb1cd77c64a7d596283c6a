# Smart Queue System

## Requirements

For running this project in development, you will only need Node.js installed on your environement.
And please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your Editor (not mandatory).





   ## Clone and Setup 
   ```sh
   $ git clone https://github.com/siddy2181/638da5b0c8cb1cd77c64a7d596283c6a.git
   $ cd 638da5b0c8cb1cd77c64a7d596283c6a
  ```
  ### Install Dependencies
  The package.jason folder contains all the dependencies under #dependencies. The following command installs all the dependencies required to run the project
  
   ```sh 
   $ npm install
   ```

### Configure api

Open `\638da5b0c8cb1cd77c64a7d596283c6a\src\api\makeRequest.js` and `\638da5b0c8cb1cd77c64a7d596283c6a\src\api\postRequest.js`then edit it with the url where you have setup:
the backend api.


## Start & watch
   ```sh
    $ npm start
    $ open http://localhost:3000
```

## Update sources

Some packages usages might change so you should run `npm prune` & `npm install` often.
A common way to update is by doing

    $ git pull
    $ npm prune
    $ npm install

To run those 3 commands you can just do

    $ npm run pull

---

## Unit Testing


### With Jest and Enzyme
````
$jest
````

## Languages & tools
### IDE

Webstorm by Jetbrains


### JavaScript

- [React](http://facebook.github.io/react) is used for UI.
- Used `create-react-app` for setup and initiate project
- [Jquery] 

### Bootstrap

- For templeting and styling
- Theme used : https://bootswatch.com/3/flatly/

### Libraries used
- react-bootstrap https://www.npmjs.com/package/react-bootstrap
- BigInteger.js https://www.npmjs.com/package/big-integer






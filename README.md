# dh-dev-application
Application for DatHuis trying to convince them I know what I am doing! Here goes...

## Quick start guide
```
yarn setup
yarn start
```

Then open up the url [http://localhost:3000/](http://localhost:3000/).

## External library justification
In this section I will explain every library that was used and why. As part of the assignment was to use as little as possible I wanted to explain my reasoning behind the external libraries that were used.

### express / express-graphql / graphql
These libraries were used to set up a backend graphql server to host the .json data for our client code to connect to. These are widely used libraries and very stable. Don't try to implement your own graphql server, trust me. We've done it in smalltalk and it is tedious!

### react / react-dom
Hard to fulfill a react developer position without using react.

### react-scripts
react-scripts saves a lot of configuration that you only have to do once. I wanted to focus on the actual meat and potatoes of the app for as much time as possible so took a small shortcut here.
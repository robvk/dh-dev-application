# dh-dev-application
Application for DatHuis trying to convince them I know what I am doing! Here goes...

I've tried to think of the high-level choices that have been made and answering them in this readme. In certain parts of the code I have also added comments for smaller considerations that I had while building. Hopefully this gives a little insight into why I did certain things. If I missed something or you want to discuss something then feel free to ask!

## Quick start guide
In the main directory (dh-dev-application):
```
yarn
yarn setup
yarn start
```
This will setup both the server and client and then start both. You can also start server and/or client separately by going into the respective directory and running the same commands.

It should open up a browser automatically but if that fails: [http://localhost:3000/](http://localhost:3000/).

A tester remarked that it didn't work automatically for him on MacOS which seemed to be a problem of the concurrently library (even though they say they are cross-platform). He had to do the steps manually using 2 terminals. For both server and client it is the following in the respective directories:

```
yarn
yarn start
```

## Application structure
```
client
├── public
└── src
|   └── api
|   └── assets
|   └── components
|   └── containers
|   └── lib
|   └── pages
server
└── src
    └── db
    └── queries
    └── types
```

### client structure
- `public` public facing client code
- `api` all code to communicate with our server or possible other parts of the web
- `assets` all our images
- `components` all our functional, stateless, dumb components that just put things on the screen
- `containers` all our state handling containers that handle logic
- `lib` a place to put shared code
- `pages` the page components of our app, any routing will go between these components

The goal is to allow maximal reusage of views (components) for consistency and get our logic (containers) and navigation (pages) separated from them as that is the meat of the application. If any of the directories become huge it is possible to add subdirectories to categorize more.

This is how I would do it with my current experience, but have always worked in very isolated repositories. Don't have experience in huge code bases outside of smalltalk so am open to suggestions.

### server structure
- `db` our database code
- `queries` the definitions for all possible graphql queries
- `types` our graphql types

### test code
In most directories there is a `__tests__` directory that has the test code for all files in that directory. This is a nice compromise between not having test files cluttering up the directory, but keeping them close to where the component lives. Snapshots are then in a `__snapshots__` directory.

### scss files
For now the scss files are next to the component as there aren't that many yet. If it becomes bigger these can be moved to a sub `css` directory (comparable to `__tests__`). Exactly for the same reason this has already been done for test code.

## External library justification
In this section I will explain every library that was used and why. As part of the assignment was to use as little as possible I wanted to explain my reasoning behind the external libraries that were used. Pretty much all of these are hugely supported, safe to use libraries and don't think they will be surprising.

### express / express-graphql / graphql
These libraries were used to set up a backend graphql server to host the .json data for our client code to connect to. These are widely used libraries and very stable. Don't try to implement your own graphql server, trust me. We've done it in smalltalk and it is tedious!

### axios
To send our http request to the server.

### lodash
Has many nice, optimised functions and supports ie11!

### react / react-dom
Hard to fulfill a react developer position without using react.

### react-scripts
react-scripts is installed as part of the create-react-app process and saves a lot of configuration that you only have to do once. Added the sass builder though.

### classnames
A simple library to add class names based on js expressions. It is recommended by the react team and very simple so expect no problems using it.

### jest, supertest, enzyme
These are all the test packages. Supertest to test express servers, jest for both client and server, enzyme for easier react component support.

### flow-typed
This adds a nice flow-typed where flow can get typing for our used external libraries (axios/lodash are both represented) so that flow can also check if we use those correctly.

### concurrently
Just for setup purposes to allow me to setup and start client and server at the same time and make the quick start very quick.

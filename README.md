# MERN 2024 Udemy/IBM Course

This project follows the 2024 edition course for IBM Skillsbuild MERN Stack. This is the practical portion of the course for learners to get hands-on with development, testing, deployment, and operations; presented through Udemy courtesy of Per Scholas' Alumni upskilling program.

#### Resources

[Jobify](https://jobify.live/) - Live running App that the project should look like when complete

[MERN Jobify v2](https://github.com/john-smilga/mern-jobify-v2) - A completed project Git Repo by the instructor, sometimes needed in the course such as for acquiring images used

[VITE](https://vitejs.dev/guide/) - The app is built using Vite (pronounced 'veet')

Coding Addict - [Default Starter Video](https://youtu.be/UDdyGNlQK5w)

[Generate Favicons](https://favicon.io/)

[React Router](https://reactrouter.com/en/main)

[Styled Components Docs](https://styled-components.com/)

[Styled Components Course](https://www.udemy.com/course/styled-components-tutorial-and-project-course/?referralCode=9DABB172FCB2625B663F)

[Hipster Ipsum](https://hipsum.co/)

[Cool Images](https://undraw.co/)

[React Context](https://react.dev/learn/passing-data-deeply-with-context)

[React Icons](https://react-icons.github.io/react-icons/)

## Part 1 - The Client

### 1. Create React App

The app is built using the following NPM command with the React template, though other options are available, such as using Vue. Different versions of Vite require minimum versions of NPM and Node.

```sh
npm create vite@latest client -- --template react
```

once created, enter the project with `cd client` and run the following command to install starter packages.

```sh
npm i
```

At any point after this, the app may be ran using the following command, and may be found at http://localhost:5173/

```sh
npm run dev
```

### 2. Remove Boilerplate

The following changes are done to clean up the default project to begin the Jobify project:

- delete App.css
- remove all code from index.css
- replace the code in App.jsx with the following

```jsx
const App = () => {
  return <h1>Jobify App</h1>;
};
export default App;
```

(this can be done quickly with the VSCode extension ES7+ React/Redux/React-Native snippets by dsznajder, by entering snippet `rcep`)

### 3. Retrieve Project Assets

For the following step, it is instructed to download the source zip for the completed project repository by the instructor, listed above under [resources](#resources). Once downloaded, unzip (or enter the zip) and go into assets via `mern-jobify-v2-main -> client -> src -> assets`, copy everything inside, then paste into our project's `assets` folder, replacing what was initially inside. With assets added, open `index.css` inside assets and copy/paste the code into `index.css` at the `src` level. Do the same with the `README.md` to move it to a higher level.

Dev note: I wanted to recite the steps in greater detail than the initial README provided, to better retain the information and to get some practice in documenting. The README will evolve as I go through the course and will be visible through versions.

The instructor provided the following links in case there are any questions regarding his styling style:

- Coding Addict - [Default Starter Video](https://youtu.be/UDdyGNlQK5w)
- Repo - [Default Starter Repo](https://github.com/john-smilga/default-starter)

With that done, next we move the favicon file `favicon.ico` from `assets` into the `public` folder and in `index.html` change the icon reference path to match the new icon. While in `index.html` we also change the default Vite app title to match our project: "Jobify":

```html
<head>
  <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
  <title>Jobify</title>
</head>
```

You can also generate your own favicons for this or other projects at the website suggested by the instructor: [Generate Favicons](https://favicon.io/)

### 4. Install Packages (Optional)

For the sake of not having to stop and restart the server over and over down the line, there is the optional suggestion to install every library that will be used to this project at this point in time. The following command is given to install and note that specific versions of these libraries are given since they could be modified at any time regardless of when taking this course:

```sh
npm install @tanstack/react-query@4.29.5 @tanstack/react-query-devtools@4.29.6 axios@1.3.6 dayjs@1.11.7 react-icons@4.8.0 react-router-dom@6.10.0 react-toastify@9.1.2 recharts@2.5.0 styled-components@5.3.10

```

Dev note: NPM reported a high severity vulnerability in Axios. A fix was available so I ran `npm audit fix` to resolve it. Noting in case something happens with Axios down the line.

### 5. Router

In this lesson [React Router](https://reactrouter.com/en/main) is used, as of version 6.4 major improvements were madek, so it is recommended to use this version or later by the instructor. In 6.4+, pages are treated as independent entities so there is less need for a global state.

#### A. Setup the Router

To start, add react router by running the following command in the terminal. The instructor used version 6.10.0 but mentions that the latest version is fine as well.

```sh
npm i react-router-dom
```

Once the package is installed, go to `App.jsx` and import `createBrowserRouter` to create the app's initial router. Afterwards, change the return for the App's main method to a `RouterProvider`, passing in our router to the property `router`.

#### B. Create Pages

Now we're going to need a `pages` directory to hold every page used in the project, located under the `src` directory. All of the following pages must be added (the instructor uses the snippet `rafce` to quickly generate boilerplate code to later edit):

- AddJob.jsx
- Admin.jsx
- AllJobs.jsx
- DashboardLayout.jsx
- DeleteJob.jsx
- EditJob.jsx
- Error.jsx
- HomeLayout.jsx
- Landing.jsx
- Login.jsx
- Profile.jsx
- Register.jsx
- Stats.jsx

Sample boilerplate:

```jsx
const AddJob = () => {
  return <h1>AddJob</h1>;
};
export default AddJob;
```

#### C. Using the Index for Importing & Exporting

To make importing pages smoother, we make use of `pages/index.js` to export the component pages then import recommended pages into `App.jsx`. The following is an snippet of what `App.jsx` would look like with new imports:

App.jsx

```jsx
import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  ...
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
  },
]);
```

#### D. React Router's Link Component

React router has a way of moving around a site's internal pages by using a `<Link>` component. Again, the Link component only works for moving between pages of the project, not for external linking. For external linking, you would still need to use anchor tags: `<a href="...">...</a>`.

Here is an example using `Register.jsx`:

```jsx
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <Link to='/login'>Login Page</Link>
    </div>
  );
};
export default Register;
```

#### E. Nested Routes

React router allows for routes to be nested, that is for multiple child routes to have a parent route. For this project, the home page will be the parent route and the register, login, and dashboard will be children routes. Looking at the pages inside the router in `App.jsx`, the home page at path `/` is chosen to be the parent and login, dashboard, and register are to go inside the parent route's `children` property as an object array. Then in `Homelayout.jsx` (which is our home page per `App.jsx`), we can add a navbar which using react router's `<outlet>` component, will render the homepage's children elements as links for navigating.

#### F. Index (Home) Page

To have a nonempty home page, an index is required and an additional child is added to the home route for the project. The Landing page will server as the home page while HomeLayout serves as a sort of home container:

App.jsx

```jsx
{
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
...
      ]
}
```

#### G. Error Page

Errors will eventually happen, to be better prepared a visual error page will be useful using an error element. The instructor says that at this point all we really care about is a 404 response. React router provides another useful property in `errorElement`. For now, just sharing the error with the console is enough, but later on the page will be fleshed out for error handling.

App.jsx

```jsx
{
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    ...
}
```

Error.jsx

```jsx
import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>Error Page !!!</h1>
      <Link to='/'>back home</Link>
    </div>
  );
};
export default Error;
```

### 6. The Landing Page

#### A. Styled Components

The Styled Components library is used from here on out for giving a powerful styling toolset that allows styling for components, implementing js logic for styles, and avoids style collision through its naming conventions.

- [Styled Components Docs](https://styled-components.com/)
- [Styled Components Course](https://www.udemy.com/course/styled-components-tutorial-and-project-course/?referralCode=9DABB172FCB2625B663F)

To begin, Styled Components needs to be added to our project through npm terminal command:
(Dev note: I will be using version 5.3.10 as in the course instructions)

```sh
npm install styled-components@5.3.10
```

As a tip for easily visualizing styled-component style code in your work, the instructor recommends the extenstion `vscode-styled-components` (I downloaded the one with Styled Components as the author) as it will show color syntax that's more legible and aligned with how VS Code displays regular CSS. The instructor also brings to attention using dev tools, that styled components creates unique class names, which avoids pitfalls in using repetitive class names normally, unless it is a global class.

Here is an example of using a styled component in `Landing.jsx`:

```jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: red;
  color: white;
`;

const Landing = () => {
  return (
    <div>
      <h1>Landing</h1>
      <StyledButton>Click Me</StyledButton>
    </div>
  );
};

export default Landing;
```

#### B. Tutorial: Style An Entire React Component

Next for the landing page, it is general practice to use a wrapper to contain the page in a styled component. An example below:

```js
const Wrapper = styled.el``;

const Component = () => {
  return (
    <Wrapper>
      <h1> Component</h1>
    </Wrapper>
  );
};
```

#### C. The Landing Page

The instructor has a quick jump to a more-complete project where he has created a `assets/wrappers` directory full of wrapper components that automatically contain all the corresponding styling for the pages used in the project. Here he mentions that the styling rundowns will be in optional videos and we can choose to skip them.
The landing page will have some filler text and the instructor tells us about a resource for generating filler text to pad out a website known as [Hipster Ipsum](https://hipsum.co/)

#### D. A Logo Component

Since the Logo will be used in multiple places, it would be a good idea to give it its own component and just import it whenever it is needed. For this, we set up a new `components` folder under `src` and add the new component. As with pages, there will be a `index.js` file that will handle exporting all components in the `components` directory.

The logo for this project was created using Figma, a common industry tool for web design. The instructor also brings up [Cool Images](https://undraw.co/) as a favorite, as the site has many professional illustrations that are customizeable to your site's color scheme, with download options for svg or png.

### 7. The Error Page

There is only one anticipated error for this project, and that is when a user attempts to reach a page that doesn't exist such as `jobi.fy/hello`. The response status code for this error would be 404 and as such, we display a 404 message when a page isn't found, otherwise giving a generic 'unknown error' message to the user.

### 8. The Register Page

The registration page will introduce the `form` react component, to take in user input. In the first input element for name, we are told about the `required` property which tells the browser to prevent form submission until the field is no longer empty or has a selection (in the case of radio buttons or checkboxes). If the field is empty, a validation message will be output to the user, prompting them for an input. Another recommendation the instructor uses is the `defaultValue` property, as when we reach testing, we will have at least one new user form filled out by default.

#### A. FormRow Component

Since we know there will be multiple inputs, not just one single input field, we can create a component to import into the form basing the type of input on props.

### 9. The Login Page

With the Registration page completed, it will be easy to create a sort of mirror with the Login page as a lot of components are shared between them. In the demonstration, the instructor also showed that adding a component that isn't imported yet will show us the non-404 error message page. This gave me an opportunity to check the styling and I found that I was missing a div to give the page styling consistency in displaying items in a vertical manner.

### 10. Dashboard Pages

The dashboard is where the majority of the logic for the frontend is held. To start, now the dashboard route inside `App.jsx` will have children of its own, as shown in the snippet below:

App.jsx

```jsx
 {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
          },

          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
          },
        ],
      },
```

#### A. Navbar, BigSidebar and SmallSidebar

Three new components are introduced that will be important for the dashboard structure: the navbar, a big sidebar for larger screens and a small sidebar for smaller screens and mobile devices.

#### B. Dashboard Context

Now we are introduced to React's hooks, using states for sidebar display and dark theme. More importantly, we also begin to use Context. Context allows a parent component to pass down props to its children more easily than the usual way of passing props between components. read: [React Context](https://react.dev/learn/passing-data-deeply-with-context).

#### C. React Icons

Once more it's time for a library to install via npm. This time we will be using [React Icons](https://react-icons.github.io/react-icons/) for our navbar:

```sh
npm install react-icons@4.8.0
```

dev note: I installed the most recent version of react icons.

#### D. Links

To handle the links for our react icons, we create a new utilities directory with a file `links.jsx`.

#### E. SmallSidebar

The Small sidebar code is written and the dashboard context is utilized for toggling the bar, showing or not showing the sidebar content depending on its state. There is also use of a map to display every link as its own navlink button. When writing the code for the small sidebar, the instructor showcases why "add job" in `links.jsx` uses path '.': it is because '.' means to use the parent's path, i.e. the dashboard route. '/dashboard' could also be used but for simplicity's sake, '.' is much shorter and cleaner.

#### F. NavLinks

Since the nav links will be used in both of the sidebars, the instructor suggests moving the code to its own component, `NavLinks.jsx`.

#### G. Big Sidebar

The big sidebar is created just as the small sidebar even importing the new NavLinks component to create the links. The Instructor flips the showSidebar logic for the big one as it is his preferred layout, and creates a prop for NavLinks `isBigSidebar` that will prevent clicking a page from collapsing/hiding the big sidebar.

#### H. LogoutContainer

For the next step, we create a component to create a dropdown button for logging out the user. Of course, at the moment there is no actual logout functionality but the component now exists and is styled.

#### I. ThemeToggle

For a fun, modern tool most websites use, we will make a component for a toggle button to switch the website between light mode and dark mode.

#### J. Dark Theme - Logic

The logic for the dark theme toggling as shown in `DashboardLayout.jsx`:

```jsx
const toggleDarkTheme = () => {
  const newDarkTheme = !isDarkTheme;
  setIsDarkTheme(newDarkTheme);
  document.body.classList.toggle('dark-theme', newDarkTheme);
  localStorage.setItem('darkTheme', newDarkTheme);
};
```

#### K. Accessing Dark Theme Globally

For the dark theme to apply to pages outside those tied to the dashboard (i.e. register, login, home, etc.) there must be a check at the highest level, in `App.jsx`. The dark theme state is made global by saving it in local storage on the user's machine. There is a small bug regarding this code found by the instructor and instead of passing a constant, instead the checkDefaultTheme function is exported from `App.jsx` to `DashboardLayout.jsx` and in the Dashboard file, the function is passed as the initial state for `isDarkTheme`.

## Part 2 - The Server

### 1. Folder Setup

The project needs to be restructured to prepare for the server portion of the application. Before moving everything, the instructor makes a strong remark to remove any existing git repository from the client project folder in case we made one. As I made one, I had to remove my repo using one of the following commands (The instructor makes a note that the Windows commands were shared by students and he has not personally tested them.):

Mac

```sh
rm -rf .git
```

Windows

```sh
rmdir -Force -Recurse .git
```

```sh
rd /s /q .git
```

To check if the repository was removed, run the git command `git status` and look for the following output: "fatal: Not a git repository (or any of the parent directories): .git"

Once certain that there's no .git folder in client, create a directory for `jobify` and drag the client folder into it. Next, drag the README file out of client into the jobify directory.

### 2. Setup Server

To start setting up the server, we need a package json, and we can do that by running the following command:

```sh
npm init -y
```

In the jobify directory, create file `server.js` and write a simple console log. Run the following command, and if your log message comes back then the file is correctly set up:

```sh
node server
```

### 3. ES6 Modules

Inside the `package.json` file, we add the property "type" with a value of "module" to set up ES6 modules for the server. Next we create two different test files to reiterate the difference between default exports and named exports. When using Node and ES6 modules, we _need_ to put the extension in the name: `'./test.js'`. When using named imports, it's also important that names _must_ match.

test.js

```
//this is a default export
const someValue = 'some value';
export default someValue;

//this is a named export
export const value = 42;
```

### 4. Source Control

At this point, we can start setting up for git version control but first the instructor tells us to create a `.gitignore` at the top level and we can just copy everything from the same-named file inside the client directory. We can also clean up and remove the test files we created.

### 5. Install Packages and Setup Install Script

run the following command to install all the packages that will be used:

```sh
npm install bcryptjs@2.4.3 concurrently@8.0.1 cookie-parser@1.4.6 dayjs@1.11.7 dotenv@16.0.3 express@4.18.2 express-async-errors@3.1.1 express-validator@7.0.1 http-status-codes@2.2.0 jsonwebtoken@9.0.0 mongoose@7.0.5 morgan@1.10.0 multer@1.4.5-lts.1 nanoid@4.0.2 nodemon@2.0.22 cloudinary@1.37.3 dayjs@1.11.9 datauri@4.1.0 helmet@7.0.0 express-rate-limit@6.8.0 express-mongo-sanitize@2.2.0
```

Inside `package.json` add the following script, it will be used when deploying the project, to add all the packages needed:

```json
"scripts": {
    "setup-project": "npm i && cd client && npm i"
  },
```

- install packages in root and client

```sh
npm run setup-project
```

### 6. Setup Basic Express

For our server we want to install express and nodemon with the following command:

```sh
npm i express@4.18.2 nodemon@2.0.22
```

[Express Docs](https://expressjs.com/)

Express is a fast and minimalist web application framework for Node.js. It simplifies the process of building web applications by providing a robust set of features for handling HTTP requests, routing, middleware, and more. Express allows you to create server-side applications and APIs easily, with a focus on simplicity and flexibility.

[Nodemon Docs](https://nodemon.io/)

Nodemon is a development tool that improves the developer experience. It monitors your Node.js application for any changes in the code and automatically restarts the server whenever a change is detected. This eliminates the need to manually restart the server after every code modification, making the development process more efficient and productive. Nodemon is commonly used during development to save time and avoid the hassle of manual server restarts.

We will be setting up a basic server that will be listening on PORT 5100. To see how express runs, we will also set up a basic home page with 'hello world' as an example.

server.js

```js
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(5100, () => {
  console.log('server running....');
});
```

We'll also need to set up a script with nodemon package so that the server will run on command.

package.json

```json
"scripts": {
    "dev": "nodemon server.js"
  },
```

### 7. Thunder Client

Thunder Client is a popular Visual Studio Code extension that facilitates API testing and debugging. It provides a user-friendly interface for making HTTP requests and viewing the responses, allowing developers to easily test APIs, examine headers, and inspect JSON/XML payloads. Thunder Client offers features such as environment variables, request history, and the ability to save and organize requests for efficient development workflows.

[Thunder Client](https://www.thunderclient.com/)

dev note: installed Thunder Client extension by author of same name (Thunder Client) and tested GET request at `http://localhost:5100/`

### 8. Setup Express Middleware to Accept JSON

To be able to accept JSON, Express needs an extra line of code seen at the top of the following, we also test it out:

server.js

```js
app.use(express.json());

app.post('/', (req, res) => {
  console.log(req);

  res.json({ message: 'Data received', data: req.body });
});
```

### 9. Morgan and Dotenv

[Morgan](https://www.npmjs.com/package/morgan)

HTTP request logger middleware for node.js

[Dotenv](https://www.npmjs.com/package/dotenv)

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

```sh
npm i morgan@1.10.0 dotenv@16.0.3
```

Since morgan is middleware, we have to import it into our server:

```js
import morgan from 'morgan';

app.use(morgan('dev'));
```

After trying out morgan, we want to create a .env file and add .env to the .gitignore list so it doesn't get added to the git repo. Inside of the `.env` file we will add variables `PORT` and `NODE_ENV` because production will inject something else. Back in `server.js` we also import dotenv and add code to check the Node environment and add another check for the Port just for the visual helper.

### 10. New Features (optional)

The instructor showcases some new Node features as of ver 6, however these will not be strictly used in this course:

- fetch API
- global await (top-level await)
- watch mode

```js
try {
  const response = await fetch(
    'https://www.course-api.com/react-useReducer-cart-project'
  );
  const cartData = await response.json();
  console.log(cartData);
} catch (error) {
  console.log(error);
}
```

package.json

```json
 "scripts": {
    "watch": "node --watch server.js "
  },
```

### 11. Basic CRUD

In this project we will be using a jobs array where each item is an object with following properties: id, company, position. With all applications we want to be able to Create, Read, Update, and Delete items, so we will create routes to handle CRUD operations.

#### A. Get All Jobs

[Nanoid](https://www.npmjs.com/package/nanoid)

The nanoid package is a software library used for generating unique and compact identifiers in web applications or databases. It creates short and URL-safe IDs by combining random characters from a set of 64 characters. Nanoid is a popular choice due to its simplicity, efficiency, and collision-resistant nature.

```sh
npm i nanoid@4.0.2
```

server.js

```js
import { nanoid } from 'nanoid';

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
];

app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});
```

#### B. Create, FindOne, Modify and Delete

Next we want to write and execute the following:

- Add a route for creating one job and test it with Thunder Client.
- Add a route for retrieving a job by id from the database and test it with the Thunder Client.
- Add a route for updating a job by id from the database and test it with the Thunder Client.
- Add a route for deleting a job by id from the database and test it with the Thunder Client.

(NOTE: every time nodemon restarts, the job ids will be reset, hence the api url needs to be updated by getting all then copying one id, or hard code a job id. THIS APPLIES TO READ, UPDATE, AND DELETE ROUTES)

### 12. Not Found and Error Middleware

The "not found" middleware in Express.js is used when a request is made to a route that does not exist. It catches these requests and responds with a 404 status code, indicating that the requested resource was not found.

On the other hand, the "error" middleware in Express.js is used to handle any errors that occur during the processing of a request. It is typically used to catch unexpected errors or exceptions that are not explicitly handled in the application code. It logs the error and sends a 500 status code, indicating an internal server error.

In summary, the "not found" middleware is specifically designed to handle requests for non-existent routes, while the "error" middleware is a catch-all for handling unexpected errors that occur during request processing.

```js
// not found middleware
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

// error middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
});
```

### 13. Controller and Router

To clean up `server.js`, we can separate the routes into their own files, a controller and a router. We move the jobs array and the functions to `jobController.js` and in `jobRouter.js` use an instance of an Express Router to match the routes to the corresponding requests. With that code separated `server.js` has all routing reduced to two easy lines of code:

```js
import jobRouter from './routers/jobRouter.js';
app.use('/api/v1/jobs', jobRouter);
```

### 14. MongoDB and Atlas

[MongoDb](https://www.mongodb.com/)

MongoDB is a popular NoSQL database that provides a flexible and scalable approach to storing and retrieving data. It uses a document-oriented model, where data is organized into collections of JSON-like documents. MongoDB offers high performance, horizontal scalability, and easy integration with modern development frameworks, making it suitable for handling diverse data types and handling large-scale applications.

MongoDB Atlas is a fully managed cloud database service provided by MongoDB, offering automated deployment, scaling, and monitoring of MongoDB clusters, allowing developers to focus on building their applications without worrying about infrastructure management.

Create a MongoDB Atlas account and set up a free server with criteria:

- create database user & password for authentication type
- connect from 'local environment' and whitelist IP '0.0.0.0'
- connection as 'drivers' -> Node.js w/ version '5.5 or later'

#### A. Mongoosejs

[Mongoose](https://mongoosejs.com/)

Mongoose is an Object Data Modeling (ODM) library for Node.js that provides a straightforward and elegant way to interact with MongoDB. It allows developers to define schemas and models for their data, providing structure and validation. Mongoose also offers features like data querying, middleware, and support for data relationships, making it a powerful tool for building MongoDB-based applications.

```sh
npm i mongoose@7.0.5
```

server.js

```js
import mongoose from 'mongoose';

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
```

### 15. Job Model

We create a new models directory and begin a `JobModel.js` file as the first model. We define a mongoose schema and define job properties. In the properties, we even use enums, according to the instructor "enum is a data type represents a field with a predefined set of values."

#### A. Create Job

Going back into `jobController.js`, we rewrite createJob's code using the job model we just made.

Dev note: fun fact, the Thunder Client version as of this moment no longer allows off-client/MongoDB API testing and returns the following: "Businesses are prohibited from using the free version, as it constitutes a violation of the terms." Following some reddit posts, I will be using VSCode extension Flashpost by Subas Raj instead.

```js
import Job from '../models/JobModel.js';

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const job = await Job.create({ company, position });
  res.status(201).json({ job });
};
```

#### B. Try / Catch & express-async-errors

We also add a try-catch block for createJob as there is a possibility of async errors that fall outside the current constraints. Adding a try-catch is one way to handle these errors, but we could also use a package to handle these...

The "express-async-errors" package is an Express.js middleware that helps handle errors that occur within asynchronous functions. It catches unhandled errors inside async/await functions and forwards them to Express.js's error handling middleware, preventing the Node.js process from crashing. It simplifies error handling in Express.js applications by allowing you to write asynchronous code without worrying about manually catching and forwarding errors.

[Express Async Errors](https://www.npmjs.com/package/express-async-errors)

```sh
npm i express-async-errors@3.1.1
```

Important: set up the import at the top of `server.js`!!!

```js
import 'express-async-errors';
```

#### C. Get All Jobs, Get Single Job, Delete Job, and Update Job

Continue rewriting the controller functionality to use the MongoDB database instead of the local array, test the requests using Thunder Client (still using Flashpost instead).

### 16. Status Codes Library

A library for HTTP status codes is useful because it provides a comprehensive and standardized set of codes that represent the outcome of HTTP requests. It allows developers to easily understand and handle different scenarios during web development, such as successful responses, client or server errors, redirects, and more. By using a status code library, developers can ensure consistent and reliable communication between servers and clients, leading to better error handling and improved user experience.

[Http Status Codes](https://www.npmjs.com/package/http-status-codes)

```sh
npm i http-status-codes@2.2.0
```

The following status codes are going to be used in the project, as per the instructor:

- 200 OK OK
- 201 CREATED Created
- 400 BAD_REQUEST Bad Request
- 401 UNAUTHORIZED Unauthorized
- 403 FORBIDDEN Forbidden
- 404 NOT_FOUND Not Found
- 500 INTERNAL_SERVER_ERROR Internal Server Error

### 17. Custom Error Class

We will be using a custom made error class to distinguish specific errors down the line. The following notes are preexisting from the instructor:

errors/customErrors.js

```js
import { StatusCodes } from 'http-status-codes';
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
```

This code defines a custom error class NotFoundError that extends the built-in Error class in JavaScript. The NotFoundError class is designed to be used when a requested resource is not found, and it includes a status code of 404 to indicate this.

Here's a breakdown of the code:

class NotFoundError extends Error: This line defines a new class NotFoundError that extends the built-in Error class. This means that NotFoundError inherits all of the properties and methods of the Error class, and can also define its own properties and methods.

constructor(message): This is the constructor method for the NotFoundError class, which is called when a new instance of the class is created. The message parameter is the error message that will be displayed when the error is thrown.

super(message): This line calls the constructor of the Error class and passes the message parameter to it. This sets the error message for the NotFoundError instance.

this.name = "NotFoundError": This line sets the name property of the NotFoundError instance to "NotFoundError". This is a built-in property of the Error class that specifies the name of the error.

this.statusCode = 404: This line sets the statusCode property of the NotFoundError instance to 404. This is a custom property that is specific to the NotFoundError class and indicates the HTTP status code that should be returned when this error occurs.

By creating a custom error class like NotFoundError, you can provide more specific error messages and properties to help with debugging and error handling in your application.

#### A. Implementing a Custom Error

Inside of `jobController.js` we can import our new class and change the logic for missing resources as below:

```js
if (!job) throw new NotFoundError(`no job with id : ${id}`);
```

We also move the middleware code from the server file into it's own file and directory; `middleware/errorHandlerMiddleware.js`. After separating the code, remember to import the code back into `server.js`:

```js
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

app.use(errorHandlerMiddleware);
```

#### B. Bad Request, Unauthenticated, and Unauthorized Errors

Continuing with custom errors, we want to get the following ready as well:

- 400 BAD_REQUEST Bad Request
- 401 UNAUTHORIZED Unauthorized
- 403 FORBIDDEN Forbidden

### 18. Validation Layer & Express Validator

We want to have a validation layer, because we want our controller to be as slim as possible and not bloat it with logic that could go in another module.

[Express Validator](https://express-validator.github.io/docs/)

```sh
npm i express-validator@7.0.1
```

The instructor creates a test route to showcase that it is possible to have a valid request in code, that we don't want to pass. He writes the following code in `server.js` and shows us in Thunder Client that having no name in the request body still gives a 200 response and a message of "hello " but we want a missing request body to return with response 404:

```js
app.post('/api/v1/test', (req, res) => {
  const { name } = req.body;
  res.json({ msg: `hello ${name}` });
});
```

Now we can use express validator to create a validation check in our test to make sure the name is nonempty:

```js
import { body, validationResult } from 'express-validator';

app.post(
  '/api/v1/test',
  [body('name').notEmpty().withMessage('name is required')],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
  (req, res) => {
    const { name } = req.body;
    res.json({ msg: `hello ${name}` });
  }
);
```

#### A. Validation Middleware

Depending on the amount of validation checks used, the code can get bloated, so the instructor recommends more middleware to separate the logic.

### 19. Setup Constants

For more abstraction, we separate create a new utilities directory and a constants file at `utils/constants.js`. Then we can import the new objects into our job model.

### 20. Validate Create Job

Since we know the validation middleware works, we remove the test route and test validation and begin writing validation for Jobs. We can test our new validation using the request body provided by the instructor below (test Create route specifically):

```json
{
  "company": "coding addict",
  "position": "backend-end",
  "jobStatus": "pending",
  "jobType": "full-time",
  "jobLocation": "florida"
}
```

### 21. Validate ID Parameter

For our other routes, we use the ID parameter, so we need some validation for these ID inputs as well.
After adding validation for cases of 'id not found' we can remove the checks from the controllers and make those leaner.

### 22. The User Model

At this stage it we are advised by the instructor to wipe the database to restart from scratch; He shows us how to drop a database over on MongoDB Atlas. Next, we start with the second model of project: Users.

### 23. User Controller and Router

Now that we'll users have a model, we need a way to interact with them by creating and logging them in. We start by creating the structure and basic functionality for a controller and a router:

controllers/authController.js

```js
export const register = async (req, res) => {
  res.send('register');
};
export const login = async (req, res) => {
  res.send('register');
};
```

routers/authRouter.js

```js
import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;
```

server.js

```js
import authRouter from './routers/authRouter.js';

app.use('/api/v1/auth', authRouter);
```

#### A. Create User - Initial Setup

Now we edit `authController.js` to actually create a user based on the schema then persist it on the database. We are also given user json to send as the request body on Thunder Client (or Flashpost):

```json
{
  "name": "john",
  "email": "john@gmail.com",
  "password": "secret123",
  "lastName": "smith",
  "location": "my city"
}
```

### 24. Validate User

At the moment, there is no validation for users, so anything can be put in the request body. We'll fix that by starting a new validation check in `validationMiddleware.js`.

#### A. Admin Role

The instructor gives us a short rundown about the admin role and creates a simple case where the first user of the site is automatically an admin. Here is the snippet in `authController.js`:

```js
// first registered user is an admin
const isFirstAccount = (await User.countDocuments()) === 0;
req.body.role = isFirstAccount ? 'admin' : 'user';

const user = await User.create(req.body);
```

#### B. Hash Passwords

We never ever should keep passwords as raw strings on databases. It's a huge security concern and we should always hash passwords before they are stored. We'll be using [bcryptjs](https://www.npmjs.com/package/bcryptjs) to encrypt passwords for users in our project.

```sh
npm i bcryptjs@2.4.3

```

`const salt = await bcrypt.genSalt(10);`
This line generates a random "salt" value that will be used to hash the password. A salt is a random value that is added to the password before hashing, which helps to make the resulting hash more resistant to attacks like dictionary attacks and rainbow table attacks. The genSalt() function in bcrypt generates a random salt value using a specified "cost" value. The cost value determines how much CPU time is needed to calculate the hash, and higher cost values result in stronger hashes that are more resistant to attacks.

In this example, a cost value of 10 is used to generate the salt. This is a good default value that provides a good balance between security and performance. However, you may need to adjust the cost value based on the specific needs of your application.

`const hashedPassword = await bcrypt.hash(password, salt);`
This line uses the generated salt value to hash the password. The hash() function in bcrypt takes two arguments: the password to be hashed, and the salt value to use for the hash. It then calculates the hash value using a one-way hash function and the specified salt value.

The resulting hash value is a string that represents the hashed password. This string can then be stored in a database or other storage mechanism to be compared against the user's password when they log in.

By using a salt value and a one-way hash function, bcrypt helps to ensure that user passwords are stored securely and are resistant to attacks like password cracking and brute-force attacks.

###### 1. BCRYPT VS BCRYPTJS

bcrypt and bcryptjs are both popular libraries for hashing passwords in Node.js applications. However, bcryptjs is considered to be a better choice for a few reasons:

Cross-platform compatibility: bcrypt is a native Node.js module that uses C++ bindings, which can make it difficult to install and use on some platforms. bcryptjs, on the other hand, is a pure JavaScript implementation that works on any platform.

Security: While both bcrypt and bcryptjs use the same underlying algorithm for hashing passwords, bcryptjs is designed to be more resistant to certain types of attacks, such as side-channel attacks.

Ease of use: bcryptjs has a simpler and more intuitive API than bcrypt, which can make it easier to use and integrate into your application.

Overall, while bcrypt and bcryptjs are both good choices for hashing passwords in Node.js applications, bcryptjs is considered to be a better choice for its cross-platform compatibility, improved security, ease of use, and ongoing maintenance.

### 25. Setup Password Utils

Once again, to ensure the controllers are as lean as possible, we will move the password encryption into its own file, `utils/passwordUtils.js` and then import the functionality into the controller.

### 26. Login User Validation

For logging in, the instructor says the approach will be different from before, we will start with validation. To begin with, validation for logging in will be similar to registration, but we are only looking for email and password. Then within email, we don't need the custom check and in password, we don't need a length check; these will be very basic non-empty checks and a email-format check.

#### A. Unauthenticated Error

Now we will add the authentication functionality to check existing emails and matching passwords. We want to make sure a user with a matching email exists in the database, and if that email does exist, we then want to check if the password hash matches the one in the database paired to the email. We create a new function to compare passwords in `passwordUtils.js`:

```js
export async function comparePassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
```

### 27. JSON Web Token

A JSON Web Token (JWT) is a compact and secure way of transmitting data between parties. It is often used to authenticate and authorize users in web applications and APIs. JWTs contain information about the user and additional metadata, and can be used to securely transmit this information

[Useful Resource](https://jwt.io/introduction)

```sh
npm i jsonwebtoken@9.0.0
```

We will be creating a new utility for our project's tokens at `utils/tokenUtils.js`, and we add 2 new env variables as seen below. Reminder for adding ENV variables! Restart your server so they can take effect!

```js
import jwt from 'jsonwebtoken';

export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};
```

JWT_SECRET represents the secret key used to sign the JWT. When creating a JWT, the payload (data) is signed with this secret key to generate a unique token. The secret key should be kept secure and should not be disclosed to unauthorized parties.

JWT_EXPIRES_IN specifies the expiration time for the JWT. It determines how long the token remains valid before it expires. The value of JWT_EXPIRES_IN is typically provided as a duration, such as "1h" for one hour or "7d" for seven days. Once the token expires, it is no longer considered valid and can't be used for authentication or authorization purposes.

These environment variables (JWT_SECRET and JWT_EXPIRES_IN) are read from the system environment during runtime, allowing for flexibility in configuration without modifying the code.

We can test our token by decoding it at [JWT](https://jwt.io/).

#### A. HTTP-Only Cookie

An HTTP-only cookie is a cookie that can't be accessed by JavaScript running in the browser. It is designed to help prevent cross-site scripting (XSS) attacks, which can be used to steal cookies and other sensitive information.

##### 1. HTTP-Only Cookie VS Local Storage

An HTTP-only cookie is a type of cookie that is designed to be inaccessible to JavaScript running in the browser. It is primarily used for authentication purposes and is a more secure way of storing sensitive information like user tokens. Local storage, on the other hand, is a browser-based storage mechanism that is accessible to JavaScript, and is used to store application data like preferences or user-generated content. While local storage is convenient, it is not a secure way of storing sensitive information as it can be accessed and modified by JavaScript running in the browser.

authControllers.js

```js
const oneDay = 1000 * 60 * 60 * 24;

res.cookie('token', token, {
  httpOnly: true,
  expires: new Date(Date.now() + oneDay),
  secure: process.env.NODE_ENV === 'production',
});

res.status(StatusCodes.CREATED).json({ msg: 'user logged in' });
```

```js
const oneDay = 1000 * 60 * 60 * 24;
```

This line defines a constant oneDay that represents the number of milliseconds in a day. This value is used later to set the expiration time for the cookie.

```js
res.cookie('token', token, {...});:
```

This line sets a cookie with the name "token" and a value of token, which is the JWT that was generated for the user. The ... represents an object containing additional options for the cookie.

httpOnly: true: This option makes the cookie inaccessible to JavaScript running in the browser. This helps to prevent cross-site scripting (XSS) attacks, which can be used to steal cookies and other sensitive information.

expires: new Date(Date.now() + oneDay): This option sets the expiration time for the cookie. In this case, the cookie will expire one day from the current time (as represented by Date.now() + oneDay).

secure: process.env.NODE_ENV === 'production': This option determines whether the cookie should be marked as secure or not. If the NODE_ENV environment variable is set to "production", then the cookie is marked as secure, which means it can only be transmitted over HTTPS. This helps to prevent man-in-the-middle (MITM) attacks, which can intercept and modify cookies that are transmitted over unsecured connections.

jobsController.js

```js
export const getAllJobs = async (req, res) => {
  console.log(req);
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};
```

### 28. Clean DB + Connect User and Job

Before we continue we want to make sure our database is fresh so we drop the jobs and user tables. Next we add the following to `models/User.js`:

```js
const JobSchema = new mongoose.Schema(
  {
    ....
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
```

### 29. Auth Middleware

To link Users and Jobs, we're going to need more middleware and we set up the structure in `middleware/authMiddleware.js`:

```js
export const authenticateUser = async (req, res, next) => {
  console.log('auth middleware');
  next();
};
```

Then put it before the job router in `server.js`:

```js
import { authenticateUser } from './middleware/authMiddleware.js';

app.use('/api/v1/jobs', authenticateUser, jobRouter);
```

### 30. Cookie Parser

In order to be able to interact with the cookie on the server, the instructor tells us about [Cookie Parser](https://www.npmjs.com/package/cookie-parser). The following command will install the package:

```sh
npm i cookie-parser
```

After that just import it to `server.js` and tell the server to use it:

```js
import cookieParser from 'cookie-parser';
app.use(cookieParser());
```

#### A. Access the Token

Now that we have cookie parser we can access the cookie's content, and we can start setting up token verification. We start by taking the token out of the current cookie, if there is any, and throw an authentication error if there isn't. The setup is in the snippet below:

```js
import { UnauthenticatedError } from '../customErrors.js';

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError('authentication invalid');
  }
  next();
};
```

#### B. Verify the Token

We set up a token check, but the instructor shows us that there's a catch. There isn't a check to distinguish admins from regular users. The instructor starts by setting up a new utility function to decode the token, then imports it into `authMiddleware.js`:

```js
import { UnauthenticatedError } from '../customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError('authentication invalid');
  }

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};
```

To showcase the token authentication, the instructor adds a log to `jobController.js` and shows us in the terminal that we will be distinguishing admins from regular users.

```js
export const getAllJobs = async (req, res) => {
  console.log(req.user); //right here
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};
```

### 31. Refactor Create Job

Now we'll begin connecting users to jobs by linking the job's `createdBy` property to the logged in user's `userId` inside `jobController.js`:

```js
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
```

### 32. Check Permissions

We want to check to make sure only users who created the job can view specific jobs. We go into `validationMiddleware.js`:

```js
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
       ...
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route');
        }

        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};
...
export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id ${value}`);
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw UnauthorizedError('not authorized to access this route');
  }),
]);
```

### 33. Logout User Functionality

Since users can log in, we also want them to be able to log out. We add a new logout function to `controllers/authController.js` that expires the token immediately. We also need to add the route to `routes/authRouter.js`:

```js
import { Router } from 'express';
const router = Router();
import { logout } from '../controllers/authController.js';

router.get('/logout', logout);

export default router;
```

note: no middleware needed (yet?)

### 34. User Routes

In order to manipulate User data, we'll need user routes, and to interact with user routes we'll need a user controller:

```js
import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import Job from '../models/Job.js';

export const getCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'get current user' });
};

export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'application stats' });
};

export const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'update user' });
};
```

next comes the user router:

```js
import { Router } from 'express';
const router = Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from '../controllers/userController.js';

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', getApplicationStats);
router.patch('/update-user', updateUser);
export default router;
```

server.js

```js
import userRouter from './routers/userRouter.js';

app.use('/api/v1/users', authenticateUser, userRouter);
```

#### A. Get Current User Functionality

We add the functionality to getCurrentUser, however, when we test it we can see the password hash in the response. Even seeing a hash is a major security issue, so we go back into the user model and add functionality to hide the password.

#### B. Update User

For updating our user, we need a validation function to ensure the request has the necessary data. We're given sample JSON to import into our Thunder Client request easily:

```json
{
  "name": "john",
  "email": "john@gmail.com",
  "lastName": "smith",
  "location": "florida"
}
```

#### C. Application Stats

```js
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};
```

```js
export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};
```

```js
import { authorizePermissions } from '../middleware/authMiddleware.js';

router.get('/admin/app-stats', [
  authorizePermissions('admin'),
  getApplicationStats,
]);
```

### 35. Setup a Proxy

A proxy in front-end development is a server that acts as an intermediary between the client-side app and an external API, helping to bypass security restrictions and handle requests to different domains. It allows the front-end app to make API requests through the proxy, which forwards the requests to the external API and returns the responses back to the app.

- only in dev environment
- a must, since cookies are sent back to the same server
- spin up both servers (our own and vite dev)

To run the server open one terminal and run command: `npm run dev`. To run the vite dev server (client) open a second terminal and run command: `cd client && npm run dev`

add the following test route to our `server.js`:

```js
app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});
```

Inside the client main at `client/src/main.jsx` add the following:

```js
fetch('http://localhost:5100/api/v1/test')
  .then((res) => res.json())
  .then((data) => console.log(data));
```

Next, in `client/vite.config.js` copy/paste this code to avoid any typo errors:

```js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5100/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

Now go back to the `main.jsx` in the client and cut out the localhost:

```js
fetch('/api/v1/test')
  .then((res) => res.json())
  .then((data) => console.log(data));
```

This code configures a proxy rule for the development server, specifically for requests that start with /api. Let's go through each property:

'/api': This is the path to match. If a request is made to the development server with a path that starts with /api, the proxy rule will be applied.
target: 'http://localhost:5100/api': This specifies the target URL where the requests will be redirected. In this case, any request that matches the /api path will be forwarded to http://localhost:5100/api.

changeOrigin: true: When set to true, this property changes the origin of the request to match the target URL. This can be useful when working with CORS (Cross-Origin Resource Sharing) restrictions.

rewrite: (path) => path.replace(/^\/api/, ''): This property allows you to modify the path of the request before it is forwarded to the target. In this case, the rewrite function uses a regular expression (/^\/api/) to remove the /api prefix from the path. For example, if a request is made to /api/users, the rewritten path will be /users.

To summarize, these lines of code configure a proxy rule for requests starting with /api on the development server. The requests will be redirected to http://localhost:5100/api, with the /api prefix removed from the path.

### 36. Concurrently

The concurrently npm package is a utility that allows you to run multiple commands concurrently in the same terminal window. It provides a convenient way to execute multiple tasks or processes simultaneously.

```sh
npm i concurrently@8.0.1
```

After installing, go to `package.json` and look at the scripts, we'll be

```json
"scripts": {
    "setup-project": "npm i && cd client && npm i",
    "server": "nodemon server",
    "client": "cd client && npm run dev",
    "dev": "concurrently --kill-others-on-fail \" npm run server\" \" npm run client\""
  },
```

By default, when a command fails, concurrently continues running the remaining commands. However, when --kill-others-on-fail is specified, if any of the commands fail, concurrently will immediately terminate all the other running commands.

### 37. Axios

Axios is a popular JavaScript library that simplifies the process of making HTTP requests from web browsers or Node.js. It provides a simple and elegant API for performing asynchronous HTTP requests, supporting features such as making GET, POST, PUT, and DELETE requests, handling request and response headers, handling request cancellation, and more.

[Axios Docs](https://axios-http.com/docs/intro)

The instructor recommends the Axios library to help with requests, but know that this package is meant for the client. NOTE: This should have been installed way back in the client portion of the course, if you are missing the package however, use `cd client` to jump into the client folder then run the following to install axios:

```sh
npm i axios@1.3.6
```

An example of using axios for a request in `main.jsx`:

```js
import axios from 'axios';

const data = await axios.get('/api/v1/test');
console.log(data);
```

##### A. Custom Instance

The instructor showcases separation and recommends using a utility to add another layer to the app. Here is `utils/customFetch.js`:

```js
import axios from 'axios';
const customFetch = axios.create({
  baseURL: '/api/v1',
});

export default customFetch;
```

and then import it into `main.jsx`

```js
import customFetch from './utils/customFetch.js';

const data = await customFetch.get('/test');
console.log(data);
```

#### B. Typical Form Submission

```js
import { useState } from 'react';
import axios from 'axios';
const MyForm = () => {
  const [value, setValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await axios.post('url', { value });
  };

  return <form onSubmit={handleSubmit}>.....</form>;
};

export default MyForm;
```

## Part 3 - Connect the Front and Back

### 1. React Router - Action

Route actions are the "writes" to route loader "reads". They provide a way for apps to perform data mutations with simple HTML and HTTP semantics while React Router abstracts away the complexity of asynchronous UI and revalidation. This gives you the simple mental model of HTML + HTTP (where the browser handles the asynchrony and revalidation) with the behavior and UX capabilities of modern SPAs.

Register.jsx

```js
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';

const Register = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        ...
      </Form>
    </Wrapper>
  );
};
export default Register;
```

We also need to add an action to our register path inside `App.jsx`:

```jsx
{
  path: 'register',
  element: <Register />,
  action: () => {
   console.log('hello there');
   return null;
    },
},
```

### 2. Register User

- FormData API

[FormData API - JS Nuggets](https://youtu.be/5-x4OUM-SP8)
[FormData API - React ](https://youtu.be/WrX5RndZIzw)

Register still needs functionality to actually parse the data users place in the form, so we take the info from the request and organize it into an object. Then we make the post request to the server to persist new users. The instructor also shows us that within axios' bulky response, we can still find and see our validation layer error messages if users try submitting invalid info like short passwords or no names.

Register.jsx

```js
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    return redirect('/login');
  } catch (error) {
    return error;
  }
};
```

App.jsx

```jsx
import { action as registerAction } from './pages/Register';

{
  path: 'register',
  element: <Register />,
  action:registerAction
},
```

### 3. useNavigation() and navigation.state

This hook tells you everything you need to know about a page navigation to build pending navigation indicators and optimistic UI on data mutations. Things like:

- Global loading indicators
- Adding busy indicators to submit buttons

Navigation State

idle - There is no navigation pending.
submitting - A route action is being called due to a form submission using POST, PUT, PATCH, or DELETE
loading - The loaders for the next routes are being called to render the next page

Register.jsx

```js
const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form'>
        ....
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        ...
      </Form>
    </Wrapper>
  );
};
export default Register;
```

### 4. React-Toastify

Import and set up the react-toastify library.
NOTE: This should already be installed to the client from the initial setup!

[React Toastify](https://fkhadra.github.io/react-toastify/introduction)

```sh
npm i react-toastify@9.1.2
```

To use toasts first we need to add a toast container to `main.jsx`:

```js
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer position='top-center' />
  </React.StrictMode>
);
```

Now we can add toasts to `Register.jsx`, for successful registration or for our error popups:

```js
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
```

### 5. Login User

```js
import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>login</h4>
        <FormRow type='email' name='email' defaultValue='john@gmail.com' />
        <FormRow type='password' name='password' defaultValue='secret123' />
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <button type='button' className='btn btn-block'>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
```

#### A. Access Action Data (optional)

The instructor shows us another way we could display our messages by using the `useActionData` hook.

```js
import { useActionData } from 'react-router-dom';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: '' };
  if (data.password.length < 3) {
    errors.msg = 'password too short';
    return errors;
  }
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    // toast.error(error?.response?.data?.msg);
    errors.msg = error.response.data.msg;
    return errors;
  }
};

const Login = () => {
  const errors = useActionData();

  return (
    <Wrapper>
      <Form method='post' className='form'>
        ...
        {errors && <p style={{ color: 'red' }}>{errors.msg}</p>}
        ...
      </Form>
    </Wrapper>
  );
};
export default Login;
```

### 6. Get Current User

Each route can define a "loader" function to provide data to the route element before it renders.

Like actions, loaders must return a value!

DashboardLayout.jsx

```jsx
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';

export const loader = async () => {
  try {
    const { data } = await customFetch('/users/current-user');
    return data;
  } catch (error) {
    return redirect('/');
  }
};


const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const { user } = useLoaderData();

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
         ...
            <div className='dashboard-page'>
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;

```

### 7. Logout User

DashboardLayout.jsx

```js
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashboardLayout = () => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
  };
};
```

### 8. Jobs Pages

#### A. AddJob - Structure

pages/AddJob.jsx

```js
import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>add job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' />
          <FormRow type='text' name='company' />
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={user.location}
          />

          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
```

##### 1. Select Input

```js
<div className='form-row'>
  <label htmlFor='jobStatus' className='form-label'>
    job status
  </label>
  <select
    name='jobStatus'
    id='jobStatus'
    className='form-select'
    defaultValue={JOB_TYPE.FULL_TIME}
  >
    {Object.values(JOB_TYPE).map((itemValue) => {
      return (
        <option key={itemValue} value={itemValue}>
          {itemValue}
        </option>
      );
    })}
  </select>
</div>
```

##### 2. FormRowSelect Component

components/FormRowSelect.jsx

```js
const FormRowSelect = ({ name, labelText, list, defaultValue = '' }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className='form-select'
        defaultValue={defaultValue}
      >
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
```

pages/AddJob.jsx

```js
<FormRowSelect
  labelText='job status'
  name='jobStatus'
  defaultValue={JOB_STATUS.PENDING}
  list={Object.values(JOB_STATUS)}
  />
<FormRowSelect
  name='jobType'
  labelText='job type'
  defaultValue={JOB_TYPE.FULL_TIME}
  list={Object.values(JOB_TYPE)}
  />
```

##### 3. Create Job Functionality

Now we want to add the functionality for actually creating a job on the server into `AddJob.jsx`:

```js
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/jobs', data);
    toast.success('Job added successfully');
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
```

##### 4. Pending Class and Redirect

At the moment, when a job is submitting, the `Add Job` link on the big side nav turns yellow, so we overwrite the `.pending` selector in the `BigSidebar.js` wrapper:

```css
.pending {
  background: var(--background-color);
}
```

When successful, we want to redirect the user, so we change the return beneath toast.success to `redirect('all-jobs')` inside `AddJob.jsx`.

##### 5. Add Job - CSS(optional)

wrappers/DashboardFormPage.js

```js
import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  .form-title {
    margin-bottom: 2rem;
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
  }
  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default Wrapper;
```

#### B. All Jobs - Structure

- create JobsContainer and SearchContainer (export)
- handle loader in App.jsx

```js
import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get('/jobs');
    return {
      data,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobs = () => {
  const { data } = useLoaderData();

  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};
export default AllJobs;
```

##### 1. Setup All Jobs Context

```js
const AllJobsContext = createContext();

const AllJobs = () => {
  const { data } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
```

##### 2. Render Jobs

For displaying individual jobs we create a job component `Job.jsx`. Then we start setting up the displaying of jobs inside `JobsContainer.jsx` (at the moment Job only has headers but if we see headers that say 'Job' we're on the right track):

```js
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';

import { useAllJobsContext } from '../pages/AllJobs';

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs } = data;
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
```

##### 3. JobsContainer - CSS (optional)

wrappers/JobsContainer.js

```js
import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 1120px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;
export default Wrapper;
```

##### 4. Dayjs and Job Component

Dev note: this is another client-side package that should have been installed earlier! Check `client/package-lock.json`.

```sh
npm i dayjs@1.11.7
```

[Dayjs Docs](https://day.js.org/docs/en/installation/installation)

We create a plain JobInfo component since it would be reused code and begin adding elements to the `Job.jsx` component.

```js
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import { Form } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}) => {
  const date = day(createdAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>

        <footer className='actions'>
          <Link className='btn edit-btn'>Edit</Link>
          <Form>
            <button type='submit' className='btn delete-btn'>
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
```

Once we finish with Job and know the props we want to pass, we can write `JobInfo.jsx`:

```js
import Wrapper from '../assets/wrappers/JobInfo';

const JobInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='job-icon'>{icon}</span>
      <span className='job-text'>{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
```

##### 5. JobInfo & Job - CSS (optional)

`wrappers/JobInfo.js`

```js
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  .job-icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--text-secondary-color);
    }
  }
  .job-text {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
  }
`;
export default Wrapper;
```

`wrappers/Job.js`

```js
import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.5rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--text-secondary-color);
      letter-spacing: var(--letter-spacing);
    }
  }

  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
    align-items: center;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: center;
    width: 100px;
    height: 30px;
    display: grid;
    align-items: center;
  }
  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }
  .edit-btn,
  .delete-btn {
    height: 30px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
  }
  .edit-btn {
    margin-right: 0.5rem;
  }
`;

export default Wrapper;
```

#### C. Edit Job - Setup

Job.jsx

```js
<Link to={`../edit-job/${_id}`} className='btn edit-btn'>
  Edit
</Link>
```

pages/EditJob.jsx

```js
import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async () => {
  return null;
};
export const action = async () => {
  return null;
};

const EditJob = () => {
  return <h1>EditJob Page</h1>;
};
export default EditJob;
```

- import EditJob page

  App.jsx

```js
import { loader as editJobLoader } from './pages/EditJob';
import { action as editJobAction } from './pages/EditJob';


{
  path: 'edit-job/:id',
  element: <EditJob />,
  loader: editJobLoader,
  action: editJobAction,
},
```

pages/EditJob.jsx

```js
export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect('/dashboard/all-jobs');
  }
};
export const action = async () => {
  return null;
};

const EditJob = () => {
  const params = useParams();
  console.log(params);
  const { job } = useLoaderData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return <h1>EditJob Page</h1>;
};
export default EditJob;
```

##### 1. Edit Job - Complete

```js
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success('Job edited successfully');
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditJob = () => {
  const { job } = useLoaderData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' defaultValue={job.position} />
          <FormRow type='text' name='company' defaultValue={job.company} />
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={job.jobLocation}
          />

          <FormRowSelect
            name='jobStatus'
            labelText='job status'
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name='jobType'
            labelText='job type'
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
```

#### D. Delete Job

Job.jsx

```js
<Form method='post' action={`../delete-job/${_id}`}>
  <button type='submit' className='btn delete-btn'>
    Delete
  </button>
</Form>
```

pages/DeleteJob.jsx

```js
import { redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export async function action({ params }) {
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success('Job deleted successfully');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
  return redirect('/dashboard/all-jobs');
}
```

App.jsx

```js
import { action as deleteJobAction } from './pages/DeleteJob';

 { path: 'delete-job/:id', action: deleteJobAction },
```

### 9. Admin Page

pages/Admin.jsx

```js
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';

import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';
export const loader = async () => {
  try {
    const response = await customFetch.get('/users/admin/app-stats');
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page');
    return redirect('/dashboard');
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();

  return (
    <Wrapper>
      <h2>admin page</h2>
    </Wrapper>
  );
};
export default Admin;
```

App.jsx

```js
import { loader as adminLoader } from './pages/Admin';

{
  path: 'admin',
  element: <Admin />,
  loader: adminLoader,
},

```

NavLinks.jsx

```js
{
  links.map((link) => {
    const { text, path, icon } = link;
    const { role } = user;
    if (role !== 'admin' && path === 'admin') return;
  });
}
```

#### A. StatItem Component

- create StatItem.jsx
- import/export

  StatItem.jsx

```js
import Wrapper from '../assets/wrappers/StatItem';

const StatItem = ({ count, title, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  );
};

export default StatItem;
```

Admin.jsx

```js
import { StatItem } from '../components';

const Admin = () => {
  const { users, jobs } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        title='current users'
        count={users}
        color='#e9b949'
        bcg='#fcefc7'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title='total jobs'
        count={jobs}
        color='#647acb'
        bcg='#e0e8f9'
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};
export default Admin;
```

#### B. Admin - CSS (optional)

wrappers/StatsContainer.js

```js
import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`;
export default Wrapper;
```

wrappers/StatItem.js

```js
import styled from 'styled-components';

const Wrapper = styled.article`
  padding: 2rem;
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  border-bottom: 5px solid ${(props) => props.color};
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 50px;
    color: ${(props) => props.color};
    line-height: 2;
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: left;
    margin-top: 0.5rem;
    font-size: 1.25rem;
  }
  .icon {
    width: 70px;
    height: 60px;
    background: ${(props) => props.bcg};
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  }
`;

export default Wrapper;
```

### 10. Profile Page

#### A. Avatar Image

Before setting up the page, the instructor advises us to get two images, they can be from anywhere, one resource he suggests is [pexels](https://www.pexels.com/search/person/).

#### B. Setup Public Folder

ES6 handles `__dirname` differently than other versions, so the instructor tells us to add some additional middleware to `server.js`:

```js
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './public')));
```

After installing the middleware, the instructor shows us that after moving the image into the root directory, he can go to the browser and (if the server is running) view it at `http://localhost:5100/imageName`.

#### C. Profile Page - Initial Setup

Before continuing, the instructor tells us we'll have to drop the jobs and users tables from our database. This is because we'll have to update the model to add avatar properties as seen in this snippet from `models/UserModel.js`:

```js
const UserSchema = new mongoose.Schema({
  ...
  avatar: String,
  avatarPublicId: String,
});
```

Dev note: After cleaning the databases, the instructor creates a user. Before doing that, also restart the server just in case!

#### D. Profile Page - Structure

pages/Profile.jsx

```js
import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>profile</h4>

        <div className='form-center'>
          <div className='form-row'>
            <label htmlFor='image' className='form-label'>
              Select an image file (max 0.5 MB):
            </label>
            <input
              type='file'
              id='avatar'
              name='avatar'
              className='form-input'
              accept='image/*'
            />
          </div>
          <FormRow type='text' name='name' defaultValue={name} />
          <FormRow
            type='text'
            labelText='last name'
            name='lastName'
            defaultValue={lastName}
          />
          <FormRow type='email' name='email' defaultValue={email} />
          <FormRow type='text' name='location' defaultValue={location} />
          <button
            className='btn btn-block form-btn'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'save changes'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
```

#### E. Profile Page - Action

- import/export action (App.jsx)

```js
export const action = async ({ request }) => {
  const formData = await request.formData();

  const file = formData.get('avatar');
  if (file && file.size > 500000) {
    toast.error('Image size too large');
    return null;
  }

  try {
    await customFetch.patch('/users/update-user', formData);
    toast.success('Profile updated successfully');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};
```

#### F. Update User - Server

```sh
npm i multer@1.4.5
```

Multer is a popular middleware package for handling multipart/form-data in Node.js web applications. It is commonly used for handling file uploads. Multer simplifies the process of accepting and storing files submitted through HTTP requests by providing an easy-to-use API. It integrates seamlessly with Express.js and allows developers to define upload destinations, file size limits, and other configurations.

Dev note: SHOULD ALREADY BE INSTALLED, check root `package.json` or `package-lock.json`

- create middleware/multerMiddleware.js
- setup multer

```js
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // set the directory where uploaded files will be stored
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    // set the name of the uploaded file
    cb(null, fileName);
  },
});
const upload = multer({ storage });

export default upload;
```

routes/userRouter.js

```js
import upload from '../middleware/multerMiddleware.js';

router.patch(
  '/update-user',
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser
);
```

First, the multer package is imported.

Then, a storage object is created using multer.diskStorage(). This object specifies the configuration for storing uploaded files. In this case, the destination function determines the directory where the uploaded files will be saved, which is set to 'public/uploads'. The filename function defines the name of the uploaded file, which is set to the original filename.

Next, a multer middleware is created by passing the storage object as a configuration option. This multer middleware will be used to handle file uploads in the application.

In this case, upload is an instance of the Multer middleware that was created earlier. The .single() method is called on this instance to indicate that only one file will be uploaded. The argument 'avatar' specifies the name of the field in the HTTP request that corresponds to the uploaded file.

When this middleware is used in an HTTP route handler, it will process the incoming request and extract the file attached to the 'avatar' field. Multer will then save the file according to the specified storage configuration, which includes the destination directory and filename logic defined earlier. The uploaded file can be accessed in the route handler using req.file.

#### G. Cloudinary - Create Account/Get API Keys

Make an account at [Cloudinary](https://cloudinary.com/), the instructor highly suggests doing so in order to be able to persist images. Without it, any time the server sleeps all images will be lost.

Cloudinary is a cloud-based media management platform that helps businesses store, optimize, and deliver images and videos across the web. It provides developers with an easy way to upload, manipulate, and serve media assets, enabling faster and more efficient delivery of visual content on websites and applications. Cloudinary also offers features like automatic resizing, format conversion, and responsive delivery to ensure optimal user experiences across different devices and network conditions.

.env

```sh
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
```

#### Cloudinary - Setup Instance

```sh
npm i cloudinary@1.37.3
```

server

```js
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
```

#### Update User Controller

controllers/userController.js

```js
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: 'update user' });
};
```

#### Logout Container

```js
{
  user.avatar ? (
    <img src={user.avatar} alt='avatar' className='img' />
  ) : (
    <FaUserCircle />
  );
}
```

#### Submit Btn Component

- create component SubmitBtn (export/import)
- add all classes, including'.form-btn'
- setup in Register,Login, AddJob, EditJob, Profile
- make sure to add formBtn prop

```js
import { useNavigation } from 'react-router-dom';
const SubmitBtn = ({ formBtn }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <button
      type='submit'
      className={`btn btn-block ${formBtn && 'form-btn'}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'submitting...' : 'submit'}
    </button>
  );
};
export default SubmitBtn;
```

#### Test User

- create test user
- feel free to use one of the chatGPT options

```json
{
  "name": "Zippy",
  "email": "test@test.com",
  "password": "secret123",
  "lastName": "ShakeAndBake",
  "location": "Codeville"
}
{
  "name": "Chuckleberry",
  "email": "test@test.com",
  "password": "secret123",
  "lastName": "Gigglepants",
  "location": "Laughterland"
}

{
  "name": "Bubbles McLaughster",
  "email": "test@test.com",
  "password": "secret123",
  "lastName": "Ticklebottom",
  "location": "Giggle City"
}


{
  "name": "Gigglesworth",
  "email": "test@test.com",
  "password": "secret123",
  "lastName": "Snickerdoodle",
  "location": "Chuckleburg"
}
```

#### Test User - Login Page

```js
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    };
    try {
      await customFetch.post('/auth/login', data);
      toast.success('take a test drive');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      ...
        <button type='button' className='btn btn-block' onClick={loginDemoUser}>
          explore the app
        </button>
        ...
      </Form>
    </Wrapper>
  );
};
export default Login;
```

#### Test User - Restrict Access

authMiddleware

```js
import {
  BadRequestError,
} from '../errors/customErrors.js';

export const authenticateUser = (req, res, next) => {
  ...
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === 'testUserId';
    req.user = { userId, role, testUser };
    next();
  }
  ....
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError('Demo User. Read Only!');
  }
  next();
};

```

- add to updateUser, createJob, updateJob, deleteJob

#### Mock Data

[Mockaroo ](https://www.mockaroo.com/)

```json
{
  "company": "Cogidoo",
  "position": "Help Desk Technician",
  "jobLocation": "Vyksa",
  "jobStatus": "pending",
  "jobType": "part-time",
  "createdAt": "2022-07-25T21:26:23Z"
}
```

- rename and save json in utils

#### Populate DB

- create populate.js
- setup for test user and admin

```js
import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Job from './models/JobModel.js';
import User from './models/UserModel.js';
try {
  await mongoose.connect(process.env.MONGO_URL);
  // const user = await User.findOne({ email: 'john@gmail.com' });
  const user = await User.findOne({ email: 'test@test.com' });

  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log('Success!!!');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
```

#### Stats - Setup

- create controller
- setup route and thunder client
- install/setup dayjs on the server

jobController.js

```js
import mongoose from 'mongoose';
import day from 'dayjs';

export const showStats = async (req, res) => {
  const defaultStats = {
    pending: 22,
    interview: 11,
    declined: 4,
  };

  let monthlyApplications = [
    {
      date: 'May 23',
      count: 12,
    },
    {
      date: 'Jun 23',
      count: 9,
    },
    {
      date: 'Jul 23',
      count: 3,
    },
  ];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
```

#### Stats - Complete Server Functionality

[MongoDB Docs](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)

The MongoDB aggregation pipeline is like a factory line for data. Data enters, it goes through different stages like cleaning, sorting, or grouping, and comes out at the end changed in some way. It's a way to process data inside MongoDB.

jobController.js

```js
export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
```

#### Commentary

```js
let stats = await Job.aggregate([
  { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
  { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
]);
```

let stats = await Job.aggregate([ ... ]); This line says we're going to perform an aggregation operation on the Job collection in MongoDB and save the result in a variable called stats. The await keyword is used to wait for the operation to finish before continuing, as the operation is asynchronous (i.e., it runs in the background).

{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } } This is the first stage of the pipeline. It filters the jobs so that only the ones created by the user specified by req.user.userId are passed to the next stage. The new mongoose.Types.ObjectId(req.user.userId) part converts req.user.userId into an ObjectId (which is the format MongoDB uses for ids).

{ $group: { _id: '$jobStatus', count: { $sum: 1 } } } This is the second stage of the pipeline. It groups the remaining jobs by their status (the jobStatus field). For each group, it calculates the count of jobs by adding 1 for each job ({ $sum: 1 }), and stores this in a field called count.

```js
let monthlyApplications = await Job.aggregate([
  { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
  {
    $group: {
      _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
      count: { $sum: 1 },
    },
  },
  { $sort: { '_id.year': -1, '_id.month': -1 } },
  { $limit: 6 },
]);
```

let monthlyApplications = await Job.aggregate([ ... ]); This line indicates that an aggregation operation will be performed on the Job collection in MongoDB. The result will be stored in the variable monthlyApplications. The await keyword ensures that the code waits for this operation to complete before proceeding, as it is an asynchronous operation.

{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } } This is the first stage of the pipeline. It filters the jobs to only those created by the user identified by req.user.userId.

{ $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 } } } This is the second stage of the pipeline. It groups the remaining jobs based on the year and month when they were created. For each group, it calculates the count of jobs by adding 1 for each job in the group.

{ $sort: { '\_id.year': -1, '\_id.month': -1 } } This is the third stage of the pipeline. It sorts the groups by year and month in descending order. The -1 indicates descending order. So it starts with the most recent year and month.

{ $limit: 6 } This is the fourth and last stage of the pipeline. It limits the output to the top 6 groups, after sorting. This is effectively getting the job count for the last 6 months.

So, monthlyApplications will be an array with up to 6 elements, each representing the number of jobs created by the user in a specific month and year. The array will be sorted by year and month, starting with the most recent.

#### Stats - Front-End Setup

- create four components
- StatsContainer and ChartsContainer (import/export)
- AreaChart, BarChart (local)

pages/Stats.jsx

```js
import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
export const loader = async () => {
  try {
    const response = await customFetch.get('/jobs/stats');
    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
```

#### Stats Container

```js
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';
const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: 'pending applications',
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },
    {
      title: 'interviews scheduled',
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];
  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
```

#### ChartsContainer

```js
import { useState } from 'react';

import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
```

#### Charts

[recharts](https://recharts.org/en-US/)

- in the client

```sh
npm i recharts@2.5.0
```

#### Area Chart

```js
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd' />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
```

#### Bar Chart

```js
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3 ' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey='count' fill='#2cb1bc' barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
```

#### Charts CSS (optional)

wrappers/ChartsContainer.js

```js
import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`;

export default Wrapper;
```

#### Get All Jobs - Server

jobController.js

Query parameters, also known as query strings or URL parameters, are used to pass information to a web server through the URL of a webpage. They are typically appended to the end of a URL after a question mark (?) and separated by ampersands (&). Query parameters consist of a key-value pair, where the key represents the parameter name and the value represents the corresponding data being passed. They are commonly used in web applications to provide additional context or parameters for server-side processing or to filter and sort data.

```js
export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }
  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};
```

#### Search Container

- setup log in AllJobs loader

```js
import { FormRow, FormRowSelect, SubmitBtn } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          {/* search position */}

          <FormRow type='search' name='search' defaultValue='a' />
          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue='all'
          />
          <FormRowSelect
            labelText='job type'
            name='jobType'
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue='all'
          />
          <FormRowSelect
            name='sort'
            defaultValue='newest'
            list={[...Object.values(JOB_SORT_BY)]}
          />

          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>
          {/* TEMP!!!! */}
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
```

#### All Jobs Loader

AllJobs.jsx

```js
import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
const AllJobsContext = createContext();
export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const { data } = await customFetch.get('/jobs', {
      params,
    });

    return {
      data,
      searchValues: { ...params },
    };
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};
export default AllJobs;

export const useAllJobsContext = () => useContext(AllJobsContext);
```

```js
const params = Object.fromEntries([
  ...new URL(request.url).searchParams.entries(),
]);
```

new URL(request.url): This creates a new URL object by passing the request.url to the URL constructor. The URL object provides various methods and properties to work with URLs.

.searchParams: The searchParams property of the URL object gives you access to the query parameters in the URL. It is an instance of the URLSearchParams class, which provides methods to manipulate and access the parameters.

.entries(): The entries() method of searchParams returns an iterator containing arrays of key-value pairs for each query parameter. Each array contains two elements: the parameter name and its corresponding value.

([...new URL(request.url).searchParams.entries()]): The spread operator ... is used to convert the iterator obtained from searchParams.entries() into an array. This allows us to pass the array to the Object.fromEntries() method.

Object.fromEntries(): This static method creates an object from an array of key-value pairs. It takes an iterable (in this case, the array of parameter key-value pairs) and returns a new object where the keys and values are derived from the iterable.

Putting it all together, the code retrieves the URL from the request.url property, extracts the search parameters using the searchParams property, converts them into an array of key-value pairs using entries(), and finally uses Object.fromEntries() to create an object with the parameter names as keys and their corresponding values. The resulting object, params, contains all the search parameters from the URL.

#### Submit Form Programmatically

- setup default values from the context
- remove SubmitBtn
- add onChange to FormRow, FormRowSelect and all inputs

SearchContainer.js

```js
import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';
const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;

  const submit = useSubmit();

  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          {/* search position */}

          <FormRow
            type='search'
            name='search'
            defaultValue={search}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText='job type'
            name='jobType'
            defaultValue={jobType}
            list={['all', ...Object.values(JOB_TYPE)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name='sort'
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
```

#### Debounce

[JS Nuggets - Debounce](https://youtu.be/tYx6pXdvt1s)

In JavaScript, debounce is a way to limit how often a function gets called. It helps prevent rapid or repeated function executions by introducing a delay. This is useful for tasks like handling user input, where you want to wait for a pause before triggering an action to avoid unnecessary processing.

```js
const debounce = (onChange) => {
  let timeout;
  return (e) => {
    const form = e.currentTarget.form;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onChange(form);
    }, 2000);
  };
};
<FormRow
  type='search'
  name='search'
  defaultValue={search}
  onChange={debounce((form) => {
    submit(form);
  })}
/>;
```

#### Pagination - Setup

- create PageBtnContainer

JobsContainer.jsx

```js
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';
import { useAllJobsContext } from '../pages/AllJobs';

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages } = data;
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
```

#### Basic PageBtnContainer

```js
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <Wrapper>
      <button
        className='btn prev-btn'
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => (
          <button
            className={`btn page-btn ${pageNumber === currentPage && 'active'}`}
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        className='btn next-btn'
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
```

#### Complex - PageBtnContainer

```js
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && 'active'}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // Add the first page button
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );
    // Add the dots before the current page if there are more than 3 pages
    if (currentPage > 3) {
      pageButtons.push(
        <span className='page-btn dots' key='dots-1'>
          ....
        </span>
      );
    }
    // one before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage - 1, activeClass: false })
      );
    }

    // Add the current page button
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage, activeClass: true })
      );
    }

    // one after current page
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage + 1, activeClass: false })
      );
    }
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className=' page-btn dots' key='dots+1'>
          ....
        </span>
      );
    }

    // Add the last page button
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );

    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className='prev-btn'
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>{renderPageButtons()}</div>
      <button
        className='btn next-btn'
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
```

#### PageBtnContainer CSS (optional)

wrappers/PageBtnContainer.js

```js
import styled from 'styled-components';

const Wrapper = styled.section`
  height: 6rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 1rem;
  .btn-container {
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    display: flex;
  }
  .page-btn {
    background: transparent;
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500);
    border-radius: var(--border-radius);
    cursor:pointer:
  }
  .active{
    background:var(--primary-500);
        color: var(--white);

  }
  .prev-btn,.next-btn{
    background: var(--background-secondary-color);
    border-color: transparent;
        border-radius: var(--border-radius);

    width: 100px;
    height: 40px;
        color: var(--primary-500);
text-transform:capitalize;
letter-spacing:var(--letter-spacing);
display:flex;
align-items:center;
justify-content:center;
gap:0.5rem;
cursor:pointer;
  }
  .prev-btn:hover,.next-btn:hover{
    background:var(--primary-500);
        color: var(--white);
        transition:var(--transition);
  }
.dots{
  display:grid;
  place-items:center;
  cursor:text;
}
`;
export default Wrapper;
```

#### Local Build

- remove default values from inputs in Register and Login
- navigate to client and build front-end

```sh
cd client && npm run build
```

- copy/paste all the files/folders

  - from client/dist
  - to server(root)/public

- in server.js point to index.html

```js
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});
```

#### Deploy On Render

[Render](https://render.com/)

- sign up of for account
- create git repository

#### Build Front-End on Render

- add script
- change path

package.json

```js
 "scripts": {
    "setup-production-app": "npm i && cd client && npm i && npm run build",
  },
```

server.js

```js
app.use(express.static(path.resolve(__dirname, './client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});
```

#### Test Locally

- remove client/dist and client/node_modules
- remove node_modules and package-lock.json (optional)
- run "npm run setup-production-app", followed by "node server"

#### Test in Production

- change build command on render

```sh
npm run setup-production-app
```

- push up to github

#### Upload Image As Buffer

- remove public folder

```sh
npm i datauri@4.1.0
```

middleware/multerMiddleware.js

```js
import multer from 'multer';
import DataParser from 'datauri/parser.js';
import path from 'path';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const parser = new DataParser();

export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};

export default upload;
```

controller/userController.js

```js
import { formatImage } from '../middleware/multerMiddleware.js';

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: 'update user' });
};
```

#### Setup Global Loading

- create loading component (import/export)
- check for loading in DashboardLayout page

components/Loading.jsx

```js
const Loading = () => {
  return <div className='loading'></div>;
};

export default Loading;
```

DashboardLayout.jsx

```js
import { useNavigation } from 'react-router-dom';
import { Loading } from '../components';

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <Wrapper>
      ...
      <div className='dashboard-page'>
        {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
      </div>
      ...
    </Wrapper>
  );
};
```

#### React Query

React Query is a powerful library that simplifies data fetching, caching, and synchronization in React applications. It provides a declarative and intuitive way to manage remote data by abstracting away the complex logic of fetching and caching data from APIs. React Query offers features like automatic background data refetching, optimistic updates, pagination support, and more, making it easier to build performant and responsive applications that rely on fetching and manipulating data.

[React Query Docs](https://tanstack.com/query/v4/docs/react/overview)

- in the client

```sh
npm i @tanstack/react-query@4.29.5 @tanstack/react-query-devtools@4.29.6
```

App.jsx

```js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
```

#### Page Error Element

- create components/ErrorElement

```js
import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return <h4>There was an error...</h4>;
};
export default ErrorElement;
```

Stats.jsx

```js
export const loader = async () => {
  const response = await customFetch.get('/jobs/stats');
  return response.data;
};
```

App.jsx

```js
{
  path: 'stats',
  element: <Stats />,
  loader: statsLoader,
  errorElement: <h4>There was an error...</h4>
},
```

```js
{
  path: 'stats',
  element: <Stats />,
  loader: statsLoader,
  errorElement: <ErrorElement />,
},
```

#### First Query

- navigate to stats

Stats.jsx

```js
import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export const loader = async () => {
  return null;
};

const Stats = () => {
  const response = useQuery({
    queryKey: ['stats'],
    queryFn: () => customFetch.get('/jobs/stats'),
  });
  console.log(response);
  if (response.isLoading) {
    return <h1>Loading...</h1>;
  }
  return <h1>react query</h1>;
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
```

```js
const data = useQuery({
  queryKey: ['stats'],
  queryFn: () => customFetch.get('/jobs/stats'),
});
```

const data = useQuery({ ... });: This line declares a constant variable named data and assigns it the result of the useQuery hook. The useQuery hook is provided by React Query and is used to perform data fetching.

queryKey: ['stats'],: The queryKey property is an array that serves as a unique identifier for the query. In this case, the query key is set to ['stats'], indicating that this query is fetching statistics related to jobs.

queryFn: () => customFetch.get('/jobs/stats'),: The queryFn property specifies the function that will be executed when the query is triggered. In this case, it uses an arrow function that calls customFetch.get('/jobs/stats'). The customFetch object is likely a custom wrapper around the fetch function or an external HTTP client library, used to make the actual API request to retrieve job statistics.In React Query, the queryFn property expects a function that returns a promise. The promise should resolve with the data you want to fetch and store in the query cache.

customFetch.get('/jobs/stats'): This line is making an HTTP GET request to the /jobs/stats endpoint, which is the API route that provides the job statistics data.

#### Get Stats with React Query

```js
const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const response = await customFetch.get('/jobs/stats');
    return response.data;
  },
};

export const loader = async () => {
  return null;
};

const Stats = () => {
  const { isLoading, isError, data } = useQuery(statsQuery);

  if (isLoading) return <h4>Loading...</h4>;
  if (isError) return <h4>Error...</h4>;
  // after loading/error or ?.
  const { defaultStats, monthlyApplications } = data;

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
```

#### React Query in Stats Loader

App.jsx

```js
{
  path: 'stats',
  element: <Stats />,
  loader: statsLoader(queryClient),
  errorElement: <ErrorElement />,
},
```

Stats.jsx

```js
import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';

const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const response = await customFetch.get('/jobs/statss');
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);
  return data;
};

const Stats = () => {
  const { data } = useQuery(statsQuery);
  const { defaultStats, monthlyApplications } = data;

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
```

#### React Query for Current User

DashboardLayout.jsx

```js
const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch('/users/current-user');
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect('/');
  }
};

const Dashboard = ({ prefersDarkMode, queryClient }) => {
  const { user } = useQuery(userQuery)?.data;
};
```

#### Invalidate Queries

Login.jsx

```js
export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await axios.post('/api/v1/auth/login', data);
      queryClient.invalidateQueries();
      toast.success('Login successful');
      return redirect('/dashboard');
    } catch (error) {
      toast.error(error.response.data.msg);
      return error;
    }
  };
```

DashboardLayout.jsx

```js
const logoutUser = async () => {
  navigate('/');
  await customFetch.get('/auth/logout');
  queryClient.invalidateQueries();
  toast.success('Logging out...');
};
```

Profile.jsx

```js
export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('avatar');
    if (file && file.size > 500000) {
      toast.error('Image size too large');
      return null;
    }
    try {
      await customFetch.patch('/users/update-user', formData);
      queryClient.invalidateQueries(['user']);
      toast.success('Profile updated successfully');
      return redirect('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return null;
    }
  };
```

#### All Jobs Query

AllJobs.jsx

```js
import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
const AllJobsContext = createContext();

const allJobsQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: [
      'jobs',
      search ?? '',
      jobStatus ?? 'all',
      jobType ?? 'all',
      sort ?? 'newest',
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/jobs', {
        params,
      });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValues: { ...params } };
  };

const AllJobs = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allJobsQuery(searchValues));
  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};
export default AllJobs;

export const useAllJobsContext = () => useContext(AllJobsContext);
```

#### Invalidate Jobs

AddJob.jsx

```js
export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/jobs', data);
      queryClient.invalidateQueries(['jobs']);
      toast.success('Job added successfully ');
      return redirect('all-jobs');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
```

EditJob.jsx

```js
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries(['jobs']);
      toast.success('Job edited successfully');
      return redirect('/dashboard/all-jobs');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
```

DeleteJob.jsx

```js
export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/jobs/${params.id}`);
      queryClient.invalidateQueries(['jobs']);
      toast.success('Job deleted successfully');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect('/dashboard/all-jobs');
  };
```

#### Edit Job Loader

```js
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';

const singleJobQuery = (id) => {
  return {
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect('/dashboard/all-jobs');
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries(['jobs']);

      toast.success('Job edited successfully');
      return redirect('/dashboard/all-jobs');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const EditJob = () => {
  const id = useLoaderData();

  const {
    data: { job },
  } = useQuery(singleJobQuery(id));

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' defaultValue={job.position} />
          <FormRow type='text' name='company' defaultValue={job.company} />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name='jobStatus'
            labelText='job status'
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name='jobType'
            labelText='job type'
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
```

#### Axios Interceptors

DashboardLayout.jsx

```js
const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const [isAuthError, setIsAuthError] = useState(false);

  const logoutUser = async () => {
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
    navigate('/');
  };

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);
  return (
    ...
  )
};

```

#### Security

```sh
npm install helmet express-mongo-sanitize express-rate-limit

```

Package: helmet
Description: helmet is a security package for Express.js applications that helps protect them by setting various HTTP headers to enhance security, prevent common web vulnerabilities, and improve overall application security posture.
Need: The package is needed to safeguard web applications from potential security threats, such as cross-site scripting (XSS) attacks, clickjacking, and other security exploits.

Package: express-mongo-sanitize
Description: express-mongo-sanitize is a middleware for Express.js that sanitizes user-supplied data coming from request parameters, body, and query strings to prevent potential NoSQL injection attacks on MongoDB databases.
Need: The package addresses the need to protect MongoDB databases from malicious attempts to manipulate data and helps ensure the integrity of data storage and retrieval.

Package: express-rate-limit
Description: express-rate-limit is an Express.js middleware that helps control and limit the rate of incoming requests from a specific IP address or a set of IP addresses to protect the server from abuse, brute-force attacks, and potential denial-of-service (DoS) attacks.
Need: This package is necessary to manage and regulate the number of requests made to the server within a given time frame, preventing excessive usage and improving the overall stability and performance of the application.

server.js

```js
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

app.use(helmet());
app.use(mongoSanitize());
```

routes/authRouter.js

```js
import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: { msg: 'IP rate limit exceeded, retry in 15 minutes.' },
});
router.post('/register', apiLimiter, validateRegisterInput, register);
router.post('/login', apiLimiter, validateLoginInput, login);
```

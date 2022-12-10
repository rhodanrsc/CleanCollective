# CleanCollective

## Table of Contents

- Description
- Technologies Used
- Software Requirements
- After fetching
- Installing Dependencies
- Functionality
- Contributors

## Description

The Clean Tech industry involves many different companies that strive for a better, cleaner future. It is populated with many big-name companies that attract most of the attention of investors. With the number of companies, startups struggle to gain exposure and find innovators and solutions to their problems. Clean Collective is a Clean Tech networking website that allows Clean Tech companies to connect and help each other find innovative solutions to create a more sustainable future.
## Technologies Used 
Technology | Description 
--- | --- 
MERN | This is the stack used during the development of the project. This stack includes: MongoDB, Express.js, React.js, and Node.js
MaterialUI | MaterialUI is a React component library that allows developers to worry less about the style and focus more on functionality.
PassportJS | PassportJS handled the authentication of users.
GitHub | GitHub allowed our team to simultaneously work on the project and collaborate with each other. 
VSCode | VSCode is an IDE used to develop Clean Collective. It supports GitHub using a downloadable interface. It also has a live share feature that allowed developers to make changes to files without the use of branches.
MongoDB Compass | Graphical user interface that helped manage the NoSQL MongoDB database.
Mongoose | A streamlined schema-based solution to model application data in MongoDB database.
Insomnia | Insomnia is an application that allowed for the testing of routes during development.
Axios | Axios is a React library that handles the routing of the pages
Formik | React library that simplifies the creation of forms. It is an open source form library for React and React Native.


## Software Requirements 

- MongoDB Community Server 
    - [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
    - Version: 5.0
- Node.js
    - [https://nodejs.org/en/](https://nodejs.org/en/)
    - Select the Recommended Version
- Express.js
    
    ```bash
    $ npm install express --save
    ```
    

## After Fetching 

- Change directory to ‘/my-app’
    
    ```bash
    cd my-app
    ```
    
- Install npm modules
    
    ```jsx
    npm install
    ```
    
- Change directory to ‘/backend’
    
    ```bash
    cd backend
    ```
    
- Install npm modules again
    
    ```bash
    npm install
    ```
    
- package.json contains a script that runs the front end and backend simultaneously
    
    ```bash
    cd ../
    npm start
    ```
    

## Installing Dependencies 

- There is a chance that an error will appear when installing the dependencies. If this error occurs, the server will not run. To resolve this issue, install the npm modules with the —legacy-peer-deps extension
  ```bash
  npm install --legacy-peer-deps
  ```
  
## Functionality 
User will be able to: |
--- |
Create accounts that hold information |
Edit user account information |
Create posts |
View and Comment on posts |
Like posts |
Create tags for Post |
Create a company page |

Company will be able to: |
--- |
Edit info |
Make public or private posts |
Make anonymous posts |
Create tags for posts |

## Contributors
Thanks go to:
Name | Roles
--- | ---
Rhodan Cervantes | UI/UX Design / Full-Stack
Julian Lee | Technical Program Manager / Front-End Developer
Hayley Mead | Lead Project Manager / Full-Stack Developer
Jimmy Van | Lead Back-End / Full-Stack Developer
Andy Diep | Head Front-End Developer
Paignton Wild | Lead Full-Stack Developer




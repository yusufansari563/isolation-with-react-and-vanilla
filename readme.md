# Art of isolation with React & Vanilla JS

Steps to run

## Start React Application
1. Clone the repository
2. Navigate to the project directory
3. Change directroy `cd web-component`
4. Run `npm install` to install dependencies
5. Run `npm start` to start the development server
6. Open your browser and navigate to `http://localhost:3000`

## Start Vanilla Application
1. Clone the repository
2. Navigate to the project directory
3. Change directroy `cd shadow-chat-component`
4. Run `npm install` to install dependencies
5. Run `npm start` to start the development server
6. Open your browser and navigate to `http://localhost:8080`

Individually you can access both in development mode!

# let's start as a single application

Open two different terminal and start the application in dev server
terminal one >>> 
`cd web-component`
npm start

terminal two >>> 
`cd shadow-chat-component`
npm start

Go to the `http://localhost:3000/#/login` you will be able to see basic login base which does not have any authentication directly click on "sign in" and then go to the chat section which is our vanilla js component with the CSS same as in both MFE but different properties we can use seemlessly.

CSS classes we are using like `flex` it has different property out of the shadow dom and inside of the shadow dom if you inspect you will be able to see

### Outside of shadow dom
![Screenshot 2025-04-25 010348](https://github.com/user-attachments/assets/da143a8e-4c90-4aeb-aa55-a6b9009d3822)

### inside of shadow dom
![Screenshot 2025-04-25 010515](https://github.com/user-attachments/assets/95a8b10b-5e45-4e59-b879-51ee7f500c3d)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

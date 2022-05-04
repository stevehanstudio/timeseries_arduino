# Time Series Temperature Data from Arudino

This project was for the Arudino IoT section of the course [CNIT 133I - Javascript for IoT and XR](https://www.coursicle.com/ccsf/courses/CNIT/133I/) at CCSF.  An [Arduino Uno](https://www.amazon.com/gp/product/B01D8KOZF4/ref=ppx_yo_dt_b_asin_title_o06_s00?ie=UTF8&psc=1) is used to read temperature sensor data from a thermister and displayed on an LCD.  The data is also send to a backend Node server through the serial port (COM7 on my Windows 10 PC).

The Node uses the Serialport library to read from the Arduino and uses Socket.io send the data to the React frontend.  The React frontend uses socket.io-client to read the data and displays it.  It was shows the data on a chart as it comes in.  There's switch to switch between celsius and fahrenheit that communicates with the backend through a POST request.

Typescript is used on both the Node server and the React frontend.

---
## Project Block Diagram

![Time Series Arduino Project Block Diagram](images/TimeSeriesArduinoProjectBlockDiagram.jpg)

---
## Project Folder Structure
```
├── README.md # This file.
├── .gitignore # Git untracked files.
├── images
│   └── TimeSeriesArduinoProjectBlockDiagram.jpg # Project block diagram.
├── timeseries-arduino
│   └── timeseries-arduino.ino - C source code to upload to Audino Uno
├── backend
│   ├── package.json # npm package manager configuration file for Node backend
│   ├── tsconfig.json # Typescript configuration file for Node backend
│   └── src
│       └──  index.ts # Node server using Socket.io and Express.
└── frontend
    ├── package.json # npm package manager configuration file for React frontend.
    ├── tsconfig.json # Typescript configuration file for React frontend
    └── public
        ├── index.html # Generated by create-react-app - not modified.
        ├── manifest.json # Generated by create-react-app - not modified.
        ├── logo192.png # Generated by create-react-app - not modified.
        ├── logo512.png # Generated by create-react-app - not modified.
        ├── robots.txt # Generated by create-react-app - not modified.
        ├── favicon.ico  # Generated by create-react-app - not modified.
        └── src
            ├── index.tsx # This is the root of the app.
            ├── index.css # Styling for the app.
            ├── App.tsx # Main app.
            ├── components
            │   ├── ShowTemp.tsx # Displays the temperature.
            │   ├── TempSwitch.tsx # Switch that switches between Celsius and Fahrenheit
            │   └── TimeSeriesChart.tsx # Displays time series chart of temperature data as it comes in.
            ├── contexts
            │   ├── AppContext.tsx # React Context API to manage state for the app.
            │   └── appReducer.tsx # Reducer for the state management of the app.
            ├── types
            │   └── Types.ts - Typescript type definitions. Not all here. Some are currently in the components.
            └── utils
                └── helpers.ts - Helper function that returns the temperature in °C & °F given the temperature in Kevin.
```
---
## Arduino Uno

Source: Elegoo Super Starter Kit for UNO V1.0.2019.09.17.pdf (pages 159-163)
![Components required for Arduino Uno](images/ArduinoComponentsRequired.jpg)

![Circuit diagram](images/Circuit.jpg)

![Wiring diagram](images/WiringDiagram.jpg)

---

## Installation Instructions

To run the app in the development mode, clone this repository, connect the Arduino Uno board to the serial port, then using the Arduino IDE, open the file timeseries-arduino/timeseries-arduino.ino, verify and upload to the board.

For the backend Node server, cd in to the backend folder and run
```
npm install
```
then run
```
npm start
```
then for the frontend React app, in another terminal cd in to frontend and run
```
npm install
```
then run
```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


# Time Series Temperature Data from Arudino

This project was for the Arudino IoT section of the course [CNIT 133I - Javascript for IoT and XR](https://www.coursicle.com/ccsf/courses/CNIT/133I/) at CCSF.  A [Arduino Uno](https://www.amazon.com/gp/product/B01D8KOZF4/ref=ppx_yo_dt_b_asin_title_o06_s00?ie=UTF8&psc=1) is used to read temperature sensor data from a thermister and displayed on an LCD.  The data is also send to a backend Node server through the serial port (COM7 on my Windows 10 PC).  The

Typescript is used on both the Node server and the React frontend.

## Project Block Diagram

![Time Series Arduino Project Block Diagram](images/TimeSeriesArduinoProjectBlockDiagram.jpg)


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



To recreate

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


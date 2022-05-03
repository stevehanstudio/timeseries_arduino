// https://www.youtube.com/watch?v=--KxxMaiwSE
#include <LiquidCrystal.h>

int tempPin = A0;

//                BS  E  D4 D5  D6 D7
LiquidCrystal lcd(7, 8, 9, 10, 11, 12);

float convertTemp(double tempK, char tempType) {
  float tempC = tempK - 273.15;
  if (tempType == 'C')
    return tempC;
  else
    return ((tempC * 9.0) / 5.0 + 32.0);
}

void displayLCD(double tempK, char tempType) {
  lcd.setCursor(0, 1);
  lcd.print(convertTemp(tempK, tempType));
  lcd.print((char)223);
  lcd.print(tempType);
  lcd.print(" ");
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(3, OUTPUT);
  analogWrite(3, 128);
  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("Temperature");
}

void loop() {
  static char tempType = 'C';
  int tempReading = analogRead(tempPin);
  double tempK = log(10000.0 * ((1024.0 / tempReading - 1)));

  tempK = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * tempK * tempK ))
               * tempK );
  Serial.println((float)tempK);  

  while(Serial.available() > 0) {
    char inByte = Serial.read();
    if (inByte == 'C' || inByte == 'F')
      tempType = inByte;
  }

  displayLCD(tempK, tempType);
  
  delay(5000);
}

# Tempora — Temperature Converter

A responsive Celsius/Fahrenheit/Kelvin converter for Oasis Infobyte Web Development & Designing, Level 1 Task 3.

## Features
- Numeric temperature input and source-unit selector
- Converts and displays Celsius, Fahrenheit, and Kelvin simultaneously
- Convert button and reset control
- Validation for blank/invalid values
- Absolute-zero validation with a friendly error
- Responsive layout and accessible live result/error regions
- Handles negative temperatures and avoids displaying negative zero

## Tech stack
- HTML5
- CSS3
- Vanilla JavaScript

## Conversion formulas
- Celsius to Fahrenheit: `F = C × 9/5 + 32`
- Fahrenheit to Celsius: `C = (F − 32) × 5/9`
- Celsius to Kelvin: `K = C + 273.15`
- Kelvin to Celsius: `C = K − 273.15`

## Run locally
Open `index.html` in a browser. Google Fonts are loaded online; fallback fonts are available.

## Suggested manual test cases
1. `0 °C` → `32 °F`, `273.15 K`
2. `100 °C` → `212 °F`, `373.15 K`
3. `32 °F` → `0 °C`, `273.15 K`
4. `0 K` → `-273.15 °C`, `-459.67 °F`
5. `-300 °C` → absolute-zero error
6. Empty input → validation message

## Before submission
Capture desktop and mobile screenshots and record a walkthrough showing valid conversions, unit selection, reset, and validation errors.

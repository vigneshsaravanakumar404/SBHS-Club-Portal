# SBHS Club Portal

## Introduction

The SBHS Club Portal is a web application designed to efficiently manage data for over 50 clubs and 3,000+ students at South Brunswick High School. It automates club attendance tracking, centralizes storage for club files, meeting schedules, and announcements, and integrates seamlessly with the school's Google accounts for easy access and management.
<div style="display: flex; justify-content: center; margin-top: 10px;">
  <img src="./Temp/Screenshot%20(289).png" alt="Centralized Storage" style="width: 60%; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.2);" />
</div>  

## Table of Contents

- [Features](#features)
- [Technologies](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)



## Features  

### 🌐 Google Account Integration  
Seamlessly integrates with school Google accounts for easy access and management:  
- **Autoaccount Creation**: For all members of the South Brunswick High School Google domain
- **Automatic Administrator Privileges**: Teachers (`@sbschools.org`) can create, manage, and oversee clubs.  
- **Automatic Student Privileges**: Students (`@sbstudents.org`) can join invited clubs and check in.  

### 🌙 Light & Dark Mode  
Choose between light and dark modes for a comfortable user experience.  

<div style="display: flex; justify-content: center; gap: 20px; margin-top: 10px;">
  <img src="./Temp/Screenshot%20(292).png" alt="Light Mode" style="width: 45%; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.2);" />
  <img src="./Temp/Screenshot%20(291).png" alt="Dark Mode" style="width: 45%; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.2);" />
</div>  

### 📌 Automated Attendance Tracking  
Enhances efficiency by verifying attendance through:  
- A **4-digit check-in code**  
- **Location proximity** or **school Wi-Fi connection**  

<div style="display: flex; justify-content: center; gap: 20px; margin-top: 10px;">
  <img src="./Temp/Screenshot%20(296).png" alt="Attendance Code" style="width: 45%; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.2);" />
  <img src="./Temp/Screenshot%20(287).png" alt="Verification Screen" style="width: 45%; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.2);" />
</div>  

### ✅ Administrator Check-in Management  
Admins can monitor and validate check-ins efficiently using the same **4-digit code + location/Wi-Fi verification** system.  

<div style="display: flex; justify-content: center; gap: 20px; margin-top: 10px;">
  <img src="./Temp/Screenshot%20(294).png" alt="Admin Check-ins" style="width: 45%; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.2);" />
  <img src="./Temp/Screenshot%20(297).png" alt="Check-in Logs" style="width: 45%; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.2);" />
</div>  

### 🪪 Consolidated Profile Section
A place to switch modes and logout. 

<div style="display: flex; justify-content: center; gap: 20px; margin-top: 10px;">
  <img src="./Temp/Screenshot 2024-05-29 123312.png" alt="Admin Check-ins" style="width: 45%; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.2);" />
  <img src="./Temp/Screenshot 2024-05-29 123317.png" alt="Check-in Logs" style="width: 45%; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.2);" />
</div>  

### 📁 Centralized Storage & Communication  
A unified platform for **club files, meeting schedules, and announcements**, ensuring streamlined communication.  

<div style="display: flex; justify-content: center; margin-top: 10px;">
  <img src="./Temp/Screenshot%20(289).png" alt="Centralized Storage" style="width: 60%; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.2);" />
</div>  


## Technologies

<table>
 <tr>
   <td align="center">
     <img src="https://raw.githubusercontent.com/vigneshsaravanakumar404/skill-icons/main/icons/JavaScript.svg" width="64" height="64" alt="Python">
   </td>
   <td align="center">
     <img src="https://raw.githubusercontent.com/vigneshsaravanakumar404/skill-icons/main/icons/TailwindCSS-Dark.svg" width="64" height="64" alt="Gradle icon">
   </td>
   <td align="center">
     <img src="https://raw.githubusercontent.com/vigneshsaravanakumar404/skill-icons/main/icons/TypeScript.svg" width="64" height="64" alt="IntelliJ IDEA icon">
   </td>
   <td align="center">
     <img src="https://raw.githubusercontent.com/vigneshsaravanakumar404/skill-icons/main/icons/Prisma.svg" width="64" height="64" alt="SVG">
   </td>
 </tr>
</table>

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/vigneshsaravanakumar404/SBHS-Club-Portal.git
   cd SBHS-Club-Portal
   ```

2. **Install Dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure the necessary environment variables, such as database connection strings and Google API credentials.

4. **Run Database Migrations**:
   If using Prisma, execute:
   ```bash
   npx prisma migrate deploy
   ```

5. **Start the Application**:
   ```bash
   npm start
   ```

## Configuration

The application can be customized through various configuration options:

- **Database**: Configure your database settings in the `.env` file.
- **Google Integration**: Set up Google API credentials to enable account integration.

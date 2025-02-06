# SBHS Club Portal

## Introduction  

The SBHS Club Portal is a web application designed to efficiently manage data for over 50 clubs and 3,000+ students at South Brunswick High School. It automates club attendance tracking, centralizes storage for club files, meeting schedules, and announcements, and integrates seamlessly with the school's Google accounts for easy access and management.  

<p align="center">
  <img src="./Temp/Screenshot%20(289).png" alt="Centralized Storage" width="60%">
</p>


## Table of Contents

- [Features](#features)
- [Technologies](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)



You're right—GitHub README files don’t support inline CSS like `border-radius` or `box-shadow`. Instead, here’s an optimized version that works well in GitHub’s Markdown rendering:  

---

## Features  

### 🌐 Google Account Integration  
Seamlessly integrates with school Google accounts for easy access and management:  
- **Automatic Administrator Privileges**: Teachers (`@schools.org`) can create, manage, and oversee clubs.  
- **Automatic Student Privileges**: Students (`@sbstudents.org`) can join invited clubs and check in.  

### 🌙 Light & Dark Mode  
Choose between light and dark modes for a comfortable user experience.  

| Dark Mode | Light Mode |  
|------------|------------|  
| ![Light Mode](./Temp/Screenshot%20(292).png) | ![Dark Mode](./Temp/Screenshot%20(291).png) |  

### 📌 Automated Attendance Tracking  
Enhances efficiency by verifying attendance through:  
- A **4-digit check-in code**  
- **Location proximity** or **school Wi-Fi connection**  

| Attendance Code | Verification Screen |  
|----------------|--------------------|  
| ![Attendance Code](./Temp/Screenshot%20(296).png) | ![Verification Screen](./Temp/Screenshot%20(287).png) |  

### ✅ Administrator Check-in Management  
Admins can monitor and validate check-ins efficiently using the same **4-digit code + location/Wi-Fi verification** system.  

| Create Check-ins | Check-in Logs |  
|----------------|-------------|  
| ![Admin Check-ins](./Temp/Screenshot%20(294).png) | ![Check-in Logs](./Temp/Screenshot%20(297).png) |  



Here’s the improved version formatted for GitHub’s Markdown:  

---

### 🪪 Consolidated Profile Section  
A place to switch modes and log out.  

| Profile View | Logout Option |  
|-------------|--------------|  
| ![Profile View](./Temp/Screenshot%202024-05-29%20123312.png) | ![Logout Option](./Temp/Screenshot%202024-05-29%20123317.png) |  


### 📁 Centralized Storage & Communication  
A unified platform for **club files, meeting schedules, and announcements**, ensuring streamlined communication.  

![Centralized Storage](./Temp/Screenshot%20(289).png)  



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

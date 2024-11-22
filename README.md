# Educational-Resources-Client-Training-Programs

This is the module 6 of the project, BizPoints: Loyalty Program Web Portal for AlphaBiz Solutions.

## [Built With] Technologies and Frameworks

1. **Backend**: JavaScript, NodeJS, Express
2. **Frontend**: ReactJS, HTML, CSS
3. **Database**: MongoDB
4. **Versioning**: GitHub, Git 

## Project Contributors:

| Name | Role |
| -------------- | ------------------ |
| Mansi Patel | Backend Developer |
| Vaishali Jadon | Frontend Developer |
| Eraj Zaidi | Frontend Developer |
| Rikhina Sarker | Backend Database Developer |
| Moaz Hameed | Cloud Database Developer |
-----------------------------------------
-----------------------------------------

# Setting up this ReactJS App with a NodeJS Server Connecting to Our MongoDB

This guide will walk you through handling the cloning and running processes to setup this ReactJS app with a NodeJS server that connects to MongoDB on your local environment.

## Prerequisites

Before you begin, make sure you have the following technologies installed:

- [Node.js and npm](https://nodejs.org/) (Node Package Manager) --> latest versions
- [MongoDB](https://www.mongodb.com/try/download/community) (locally or use a cloud service like MongoDB Atlas)

You can check if Node.js and npm are already installed by running the following commands in your terminal:

> node -v

> npm -v

1. Open your preferred IDE - VSCode Recommended

https://code.visualstudio.com/download

2. Install dependencies

Make sure you are in the **/src** folder and paste the command in your terminal
> npm install

3. Launch the client-side application

Make sure you are in the **/src** folder and paste the command in your terminal
> npm start

4. Launch the server-side to Connect to MongoDB

To connect to MongoDB, paste the following commands in **another** terminal
> cd server

> node server.js

## View the Full BizPoints Resources Portal User Guide Here
[BizPoints User Guide](public/User_Guide_for_BizPoints_Resources_Portal.pdf)

----------------------------------------
# BizPoints Module integration: MongoDB API Endpoints

| Model | API Endpoint | Response | Purpose
| ----------- | ---------------- | ------------ | -------------- |
| TrainingResource.js | GET /api/training-resources | ```[{"_id":"123","title":"Advanced Business"}]``` | Get list of all training resources from DB including their unique ID and title |
| TrainingResource.js | GET /api/training-resources/:title | ```{"_id":"123","title":"Advanced Business","type":"webinar","description":"A training resource for clients","pointsAwarded":25,"categories":["analytics","logical"],"isActive":true,"createdAt":"2024-11-20T17:07:13.047Z","updatedAt":"2024-11-20T17:07:13.047Z","__v":0}``` | Returns all information for a singular training resource |
| TrainingResource.js | PATCH /api/training-resources/:id | ```{"_id":"123","title":"Advanced Business Analytics","type":"webinar","description":"A training resource for clients","pointsAwarded":25,"categories":["analytics","logical"],"isActive":true,"createdAt":"2024-11-20T17:07:13.047Z","updatedAt":"2024-11-20T17:07:13.047Z","__v":0}``` | Updates the title of a specific training resource |
| TrainingResource.js | DELETE /api/training-resources/:id | ```{message: "Resource successfully deleted."}``` | Deletes the entire resource using its ID |
| ClientProgress.js | GET /api/client-progress | ```[{"_id":"456xyz","userId":"test_user_cps714","totalPointsEarned":25}]``` | Returns all the user data |
| ClientProgress.js | GET /api/client-progress/points-only | ```[{"totalPointsEarned":25}]``` | Returns only the points for each user |
| ClientProgress.js | PUT /api/client-progress/:id | ```{"_id":"456xyz","userId":"test_user_cps714","totalPointsEarned":50}``` | Updates the user's total points earned using their DB ID |

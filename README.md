# ABBSY Fitness Gym

ABBSY Fitness Gym website and desktop for ease us for each members and admins.

## Table of contents
- [Set up database](#setup database)
- [Installation](#installation)
- [License](#license)

## Setup database

```bash
# navigate to the migrations
cd node-backend/server/migrations
# manually copy the content of each sql inside the folder
# 1st step
# manually copy the database.sql and execute it
# 2nd step
# manually copy and paste it to your MySQL terminal
cd procedures
# 3rd step
# manually copy and paste it to your MySQL terminal
cd views
# last step
# manually copy and paste it to your MySQL terminal
cd seeders
```

## Installation

Step-by-step instructions on how to set up the project locally. If applicable include prerequisites.

```bash
# Clone the repositor
git clone https://github.com/vladiere/abssy-fitness-gym.git

# To run the server and navigate to node-backend/server
cd node-backend/server
# Install dependencies (if applicable)
npm i 
# To run server
npm run dev
# http://localhost:3000

# To run the frontend/client and navigate to quasar-frontend
cd quasar-frontend
# Install dependencies (if applicable)
# First install quasar-cli
npm i -g @quasar/cli
# To run the project
# for client with website app
quasar dev -m spa
# for client with desktop (Electron)
quasar dev -m electron

```

## License
- Apache2.0
- MIT License

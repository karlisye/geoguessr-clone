# GeoGuessr Clone

Geography game where players guess the location on the world map based on an image.
This application is made without the use of APIs, the calculations are done using math manually.

## Features

- **Authorization** - User registration and login
- **Leaderboard** - Compare scores with other players
- **Player History** - View your past games
- **Share Games** - Share your results with others
- **Gameplay**
  - Random location selection from 20+ world cities
  - Interactive map-based guessing
  - Distance calculation and scoring system
  - Round-by-round score tracking

## Screenshots

### Game View
![Game View](screenshots/game.png)
*Main gameplay screen with location image and interactive map*

## Tech Stack

**Frontend**
- React + Vite
- Inertia.js
- TailwindCSS v4

**Backend**
- Laravel
- MySQL
- Laravel Sail (Docker)

## Installation

### Prerequisites
- Docker Desktop
- Linux-based terminal (or WSL2 on Windows)

### Setup
1. Clone the repository

  - git clone https://github.com/karlisye/geoguessr-clone.git
  - cd geoguessr-clone

2. Install dependencies

  - docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php85-composer:latest \
    composer install --ignore-platform-reqs

  - docker run --rm \
    -v "$(pwd):/app" \
    -w /app \
    node:22 \
    npm install

3. Configure environment

  - cp .env.example .env
  - ./vendor/bin/sail php artisan key:generate

4. Setup database

  - ./vendor/bin/sail up -d
  - ./vendor/bin/sail php artisan migrate

5. Run

  - ./vendor/bin/sail npm run dev

6. Access application

 - In your browser: http://localhost

## Usage

### Getting Started
1. **Sign up** for a new account or **log in** if you already have one
2. Click the **Play Now** button from the home page to start a new game

### Playing the Game
1. **View the location image** displayed on screen
2. **Click on the map** (bottom right corner) where you think the location is
3. **Submit your guess** to see:
   - Distance from the actual location
   - Points earned for accuracy
4. **Complete 5 rounds** to finish the game

### After the Game
- View your **final score** and detailed round-by-round statistics
- **Share your results** using the share button to generate a shareable link
- Compare your performance on the **Leaderboard**

### Additional Features
- **Leaderboard**: Click the leaderboard button in the navigation bar to see top scores (try the sort function!)
- **Game History**: Hover over your profile icon and select "History" to view all your past games
- **Sign Out**: Access the sign out option from the profile dropdown menu

### Scoring System
Your score is calculated based on how close your guess is to the actual location. The closer you are, the more points you earn!

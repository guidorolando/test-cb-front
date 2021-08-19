# CRYPTO BETS FRONTEND
User interface and logic of game of CRYPTO BETS:

* Register players to a game with email and bet
* Game has a cyclic duration of time parameter
* A game execute when 2 o more players are registered
* Open a notification popup with email of winner of a game

###Pre condition
* Running backend and notification (https://github.com/guidorolando/test-cb-back, https://github.com/guidorolando/test-cb-notification)

# Getting Started

Change over environment file backend URL:

        export const environment = {
        production: false,
        backendUrl: 'http://localhost:8088'
        };        

Run Angular project:
  * install dependencies 

        npm install

  * run pproject

        ng serve

#SHOW APPLICATION

    http://localhost:4200/game
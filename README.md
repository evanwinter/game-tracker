# [game tracker]

### What

This is a web application I built to track the results of games played among friends and family. The plan is to build a companion app to present the results with data visualizations.

It currently supports tracking (1) the game you played, (2) the players involved, (3) the winning player, and (4) the date and time of the game.

It's primarily intended for personal use for now, but I am considering making a few changes that would make it more scalable for more users.

---

### Why

My goal was simply to make it super easy to track the results, because that way I'll actually keep up with it. 

I think it'll be cool to look at the results after a year or two, and not only compare scores but also look for interesting trends in the data. For example: it could be the case that a certain player always does better at night than in the morning; or that a certain group plays significantly more in the winter than others.

---

### How

The app has a survey-like flow where the user is asked questions (e.g. "What'd you play?") and shown a list of available options (e.g. list of games or players). If the desired option isn't in the list, the user can add it. It'll be included in the list on subsequent reloads.

The app is a progressive web app, meaning it's installable to devices' home screens and opens in a fullscreen UI like a native app would. This makes it easy to quick open up and log a game result.

---

### Specs

* __Front-end__: Gatsby (React) and SCSS
* __State management__: Redux
* __Caching__: IndexedDB
* __Database__: Firebase (Cloud Firestore)
* __Authentication__: Firebase (w/ Google account or Email/Password)
* __Other__: Offline-first; Progressive web app

---

### To Do

* Design -- Need to make it pretty still
* Scores -- Support for reporting game scores
* Ties -- Support for when two or more players "win"

---

### To Think About

#### Linking logged-in user to Player data

https://github.com/evanwinter/game-tracker/issues/1

# Team Member Contributions
## Kevin Gong
For this project, my main contribution was creating the database, handling all the HTTP requests,
and web scrapping. I created the database using SQLite and had three separate databases, players,
teams, and matches. For the HTTP requests, I created different GET requests for the server side and
also created ajax calls on the client side to retrieve the data. Finally, the web scrapping was a necessary
function to make the heat map that shows which quarter a player's shooting percentage is better/worst.
The web scrapping was done using packages such as Cheerio to help parse the pages easily.

## Neda Khanverdi
My main role for this project was helping with the design of the web app. I helped design the home page and then I worked on fixing all the design bugs throughout the other pages, helped make the design of all pages similar, and other front end programming throughout the web app. I also helped with creating some user flow by connecting certain pages together.

## David Wu
When starting this project, I contributed by providing suggestions on application ideas. In addition, I worked on milestones and provided feedback and suggestions on features/interactions to add into our application. In terms of design, I contributed by creating interface mockups and facilitating in our design-decisions process. I also contributed to development by coding mainly front-end code and some visualizations.



# Source Code Files
## /public/css/main.css
/main.css is one of our two .css files that we use to implement the visual design and stylistic elements of our application. We use .css files to ensure consistency across each web page in our application, as well as standardization across devices.

## /public/css/styles.css
/styles.css is one of our two .css files that we use to implement the visual design and stylistic elements of our application. We use .css files to ensure consistency across each web page in our application, as well as standardization across devices.

## /public/routes/index.js
/index.js is our Javascript route file that corresponds with /index.handlebars. It allows the user to see the page and have content loaded on that page.

## /public/routes/player.js
/player.js is our Javascript route file that corresponds with /player.handlebars. It allows the user to see the page and have content loaded on that page.

## /public/routes/team.js
/team.js is our Javascript route file that corresponds with /team.handlebars. It allows the user to see the page and have content loaded on that page.

## /public/routes/prediction.js
/prediction.js is our Javascript route file that corresponds with /prediction.handlebars. It allows the user to see the page and have content loaded on that page.

## /public/views/index.handlebars
/index.handlebars is our "Home" page for our application. When accessing /index.handlebars, the user can immediately see and navigate to all major features of our application, including players, teams, and predictions. To implement this page, we accessed team/player rankings from our database and loaded it onto the front-end of /index.handlebars.

## /public/views/player.handlebars
/player.handlebars is the main page for displaying player information, comparing players, and our data visualization for players. To implement this page, we used Javascript code on both /player.handlebars as well as in corresponding AJAX calls in /app.js to grab information from our back-end database. From this, we were able to populate the player information on the front-end.

## /public/views/prediction.handlebars
/prediction.handlebars is the main page for displaying predictive statistics on basketball games. The user, by selecting two teams, can compare the teams side-by-side and see a predictive score on which team would win. To implement this page, we used Javascript code on both /prediction.handlebars (for implementing logic) as well as corresponding AJAX calls in /app.js to grab information from our back-end database.

## /public/views/team.handlebars
/player.handlebars is the main page for displaying team information, comparing team, and our data visualization for teams. To implement this page, we used Javascript code on both /team.handlebars as well as in corresponding AJAX calls in /app.js to grab information from our back-end database. From this, we were able to populate the team information on the front-end.

## /app.js
/app.js is our Javascript file that connects the client-side to the server-side. It allows HTTP requests to grab information from our database to display on the front-end.

## /gamestatus.csv
/gamestatus.csv is our back-end .csv file/database that is used exclusively for our data visualization for teams. It contains games played and the win/loss status of each team. This allows the algorithm on our front-end to determine win percentages for each time when the user wants to see that information on the front-end.

## /nbagames.csv
/nbagames.csv is our back-end .csv file/database that stores information regarding games played and teams. The information contained in this file allows us to populate the front-end teams and prediction page.

## /NBAplayers.csv
/NBAplayers.csv is our back-end .csv file/database that stores information regarding each basketball player. The information contained in this file allows us to populate the front-end players page and the players data visualization.

## /package.json
/package.json is our file that contains information about our project, website, and code repository. This file also contains information on necessary dependencies that would need to be installed and utilized in order to have the website/app function correctly.



# Demo Video Link
https://vimeo.com/273739696

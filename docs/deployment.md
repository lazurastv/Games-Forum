# Backend
git init
git add .
git commit -m "Commit"
git remote add origin https://git.heroku.com/forum-graczy-backend.git
git push

Dodanie plikue system.properties w celu doprecyzowania wersji javy
Z logów wynika że trzeba użyć bazy danych, użyjemy postgresql

Logi serwera
heroku logs --tail
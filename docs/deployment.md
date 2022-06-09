# Backend

## Uwagi
Dodanie plikue system.properties w celu doprecyzowania wersji javy
Z logów wynika że trzeba użyć bazy danych, użyjemy postgresql

Logi serwera
heroku logs --tail

## Pierwszy raz
git init
git remote add origin https://git.heroku.com/forum-graczy-backend.git

## Deployment
git add .
git commit -m "Version 1.x.y"
git push

# Frontend

## Pierwszy raz
git init
git remote add origin https://git.heroku.com/forum-graczy.git

# Deployment

W frontend
npm run build
Kopiujemy zawartośc build do nginx/
I potem deployment tak samo jak w backendzie (wersja może być inna)
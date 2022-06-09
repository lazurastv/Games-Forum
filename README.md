# Forum-Graczy
Wersja testowa aplikacji. Pozwala na dostęp zasobów nginx z portu 3000,
czyli poprzez npm start. Oprócz portu 3000 aplikacja jest też na porcie ssl (https).

Sposób obsługi:  
Uruchomienie kontenera:  
docker-compose up --build  
Opcja --build ponownie buduje kontenery. Nie trzeba używać jeżeli pliki nie uległy zmianie.  
Żeby wygodnie edytować frontend robimy  
npm start  
w folderze frontend, potwierdzamy użycie innego portu i przechodzimy na stronę  
localhost:3001  
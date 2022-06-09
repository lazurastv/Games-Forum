# Forum-Graczy
Wersja testowa aplikacji. Pozwala na dostęp zasobów nginx z portu 3000,
czyli poprzez npm start. Oprócz portu 3000 aplikacja jest też na porcie ssl (https).

Sposób obsługi:  
Uruchomienie kontenera:  
docker-compose up --build  
Opcja --build ponownie buduje kontenery. Nie trzeba używać jeżeli pliki nie uległy zmianie.  
Żeby wygodnie edytować frontend robimy  
npm start  
w folderze frontend i przechodzimy na stronę  
http://localhost:3000  
Uwaga: http jest konieczne, inaczej nginx was przekieruje auutomatycznie na https  
Teraz strona będzie się odświeżać po dokonaniu zmian.

Na stronie https://localhost znajdziecie skompilowaną wersję frontu, taką jaka była w momencie  
builda kontenerów. Warto czasem weryfikować czy skompilowana wersja pokrywa się z testową.
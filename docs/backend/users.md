# User
Jest użytkownikiem naszego cudownego forum

## Klasa
- Long Id
- String Nazwa
- String ShortDescr
- String ImagePath
    - Jest ścieżką do zdjęcia profilowego
- String Role

## Serwis
- Add
    - Sprawdzamy czy nazwa użytkownika już nie istnieje
    - Sprawdzamy czy ShortDescr jest faktycznie short, wybierz jakąś długośc stringa którą uważasz za short
    - Nie obchodzi nasz jaki ImagePath chce użytkownik, generujemy go np w oparciu o hash aktualnego czasu albo nazwy użytkownika
    - Nie obchodzi nas jaką rolę chce użytkownik, automatycznie dajemy mu najniższą, czyli user
- Update, Delete, Get

## Kontroler
- Post
- Put, Delete, Get
    - Sprawdzamy po sesji czy jesteśmy zalogowani jako użytkownik, którego id podaliśmy
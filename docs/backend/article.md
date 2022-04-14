# Article
Moje uwagi do artykułu

## Klasa
- Wystarczy nam jeden path, imagePath można usunąć a contentPath zamienić na path
- Long authorId * ustawiany tylko przy add, nie zmieniany przy update *
- Nigdy nie tworzymy artykułu o konkretnym id, więc konstruktor z nim jest zbędny

## Serwis
- Wyjątki do oddzielnych klas
- Nie chcemy dostawać od użytkownika ścieżek do plików ani id autora
- Weryfikacja danych do oddzielnych metod w stylu verifyString(String string)

## Serwis
- Nie będziemy chcieli pobierać wszystkich artykułó naraz, lepsza będzie metoda poniżej
- Get po id, tagach, zakresie czasowym
# Rating
Jest oceną wystawioną przez użytkownika

## Klasa
- Long Id
- Long UserId
- Long GameId
    * oceny wystawiane są tylko dla gry
- int Value
    * od 1-10

## Serwis
- Get, Delete
- Add, Update
    * Sprawdzamy też, czy GameId jest faktycznie id gry, a nie recenzji czy artykułu
    * Tak samo sprawdzamy czy Value jest w zakresie 1-10

## Kontroler
- Get po Id, UserId, GameId
- Rola użytkownik+
    - Post, put, delete
        * jeśli nie admin tylko własne
# Session
Jest sesjami zalogowanych użytkowników

## Klasa
- Long id
    * Na dobrą sprawę id nie jest nam potrzebne, sid wystarczy. Jeśli nie da się bez id, to już niech będzie
- String sid
    * Losowa liczba w postaci base64, unikalna
- Long userId
- Date expires

## Serwis
- GetUser(String sid)
    * Zwraca użytkownika który ma przypisaną daną sesję, albo null jak nie ma
- AddUser(Long UserId)
    * Dodaje użytkownika i generuje dla niego sid, zwraca ten sid.
- Delete(String sid)
    * Używane przy wylogowaniu
- Refresh()
    * Usuwa wszystkie sesje które są już nieaktualne (Date.now() > expires)

Nie chcemy kontrolera, będziemy wykorzystywać serwis wewnętrznie
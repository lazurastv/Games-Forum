# Operacja edycji artykułu
1. Wchodzimy na link np. game-forum/articles/73
2. Get Artykuł jest dostępny dla każdego, więc api powinno zwrócić wynik po prostu
3. Klikamy edit article
4. Wysyłany jest request do roli do metody HasRole("creator")
5. Jak mamy, gui wyświetla edycję, jak nie, gui pokazuje że nie masz uprawnień.

Hakerzy oczywiście mają gdzieś gui, więc pomińmy odtąd gui i zobaczmy co byliby w stanie zrobić

1. Haker wysyła żądanie do delete articles metodą delete(73)
2. Używamy metody GetUser w session servicie żeby zobaczyć, kim jest zalogowany użytkownik
    * Jeśli nie ma takiej osoby w bazie, kończymy działanie i odrzucamy request
3. Sprawdzamy czy użytkownik ma rolę "creator" metodą HasRole(cookie.sid, "creator")
4. Okazuje się, że nie ma, więc kończymy działanie (no chyba że ma, ale wtedy haker hakuje coś do czego i tak ma dostęp xd)

Proponowałbym, żeby HasRole otrzymywało już sid, i hasRole samo sprawdzi kim jest zalogowany użytkownik
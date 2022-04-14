# Role
Jest rolą w forum

## Klasa
- Long Id
- ? Name
    - Będą tylko 3 role: użytkownik, redaktor, i administrator. Można więc zrobić enuma albo stringi sprawdzać jakoś.
    Proponuję nazwy user, creator, admin, ale chętnie usłyszę inne, szczególnie na redaktora

## Serwis
- Get po Id
- HasRole(String sid, String role)
    * Sprawdza, kim jest zalogowany użytkownik metodą GetUser(sid) z session servicu, następnie sprawdza czy teb użytkownik ma rolę {role} lub wyższą

Nie chcemy kontrolera do ról, będziemy używać metod wewnętrznie
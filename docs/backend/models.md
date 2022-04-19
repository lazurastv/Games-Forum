# Modele bazodanowe
Ten plik ma na celu objaśnić pola modeli które są mniej oczywiste od "tytuł".

## Content
Ponieważ Spring JPA kuleje, musieliśmy jemu dać laskę żeby nie utykał. Dlatego powstał model Content, po którym dziedziczą wszystkie trzy gwiazdy wieczoru: Artykuł, Gra i Recenzja. Artykuł to 1:1 Content, ale dzięki istnieniu Content JPA się na nas nie obrazi.
### Introduction
Nazwa "wstęp" ma sens w kontekście widoku artykułu, gdzie ten string jest tekstem widocznym przed główną treścią. Introduction jest jednak też używane jako krótki opis artykułu w kontekście zajawki artykułu. Ograniczony do 2048 znaków.
### Path
Pierwsze 8 znaków hasha zakodowanego w base64. Jest nazwą folderu w którym znajdziemy zdjęcie promujące artykuł oraz jego zawartość htmlową.
Ścieżka do zdjęcia: content/{path}/image.png
### Dodatkowe: zawartość
Artykuł nie ma pola zawartość, ponieważ jest ona zapisana w oddzielnym pliku, o ścieżce content/{path}/content.html
Uzasadnienie: główna zawartość artykułu może mieć spokojnie kilkadziesiąt kilobajtów rozmiaru, a co za tym idzie trzymanie tego w bazie danych będzie ją za bardzo obciążało.

## Game
Jest artykułem (Contentem) z dodatkowymi polami.
### EditorScore
Ocena wystawiona przez recenzję wystawioną przez naszego redaktora. Zawiera się w przedziale <1,10>.
### Ratings
Są to oceny wystawione przez zwykłych użytkowników. Również w zakresie <1,10>.

## Review
### Pluses, minuses
Listy plusów i minusów które potem są wykorzystywane do wyświetlania na widoku recenzji. Rzeczy w stylu +ładna grafika, -niskie fps

## App user
### Username
Nazwa użytkownika. Zaczyna się literą (plus utf-8) a potem zawiera dowolną liczbę liter, cyfr, oraz znaków specjalnych - i _
### Email
Od 1 do 64 znaków przed małpą, bloki składające się z liter, cyfr, -, _. Jak jest kropka to po kropce musi być nowy blok.
### Password
Hash hasła użytkownika. Samo hasło zanim zhashujemy sprawdzamy, czy zawiera min.:
- 8 znaków
- jedną dużą literę ascii
- jedną małą literę ascii
- jeden z następujących znaków: @#$%^&+=\\-_?!*(){}
Dodatkowo hasło nie może zawierać białych znaków.
### Short description
Krótki opis użytkownika widoczny na jego profilu.
### Profile picture path
Podobnie jak path w artykule, jest to 8 znaków base64 zakodowanego hasha. W kontekście użytkownika oznacza nazwę folderu, w którym znajdziemy jego zdjęcie profilowe.  
Ścieżka do zdjęcia profilowego użytkownika: user/{profilePicturePath}/image.png
### Role
Jedna z trzech możliwych ról: ADMIN, EDITOR, USER
### Enabled
To pole informuje nas o tym czy użytkownik potwierdził że jest posiadaczem swojego konta, otwierając link wysłany mu na emaila. Nie przewiduję ograniczać możliwości użytkownika jeżeli nie potwierdzi on posiadania konta.
### Locked
To pole jest informacją czy użytkownik został zbanowany.
### Last used
Data w której użytkownik logował się ostatnio.
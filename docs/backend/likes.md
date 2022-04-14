# Likes
Jest likiem/dislikiem zostawionym przez użytkownika na artykule (artykuł to wszystko, czyli artykuł, gra, i recenzja)

## Klasa
- Long Id
- Long UserId
- Long ArticleId
- Boolean Like
    * true = Like, false = Dislike

## Kontroler
- Get po Id, UserId ArticleId
- Rola użytkownik+
    * Post
    * Put
    * Delete po Id, UserId (kiedy kogoś zbanujemy / usuniemy)

Nie chcemy żeby użytkownik nam podawał UserId, z sesji chcemy je wyciągać.
Jeżeli nasza rola to nie administrator, możemy jedynie edytować i usuwać nasze własne liki oczywiście
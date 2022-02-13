# TagsArticles
Pogdybać nad lepszą nazwą niż TagsArticles. Jest relacją wiele do wielu między artykułem a tagiem

## Klasa
- Long Id
- Long TagId
- Long ArticleId

Artykuły, gry i recenzje mają wspólne id, więc bez obaw

## Kontroler
- Get dla danego ArticleId - będzie używane żeby pobrać tagi artykułu
- Get dla danego TagId - będzie używane przy filtrowaniu artykułów
- rola redaktor+
    - Post, Put, Delete
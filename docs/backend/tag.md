# Tag
Jest tagiem do artykułów

## Klasa
- Long Id
- String Name
- ? TagTypeString
    * ma mieć określone wartości, co najmniej dla: platforma, gatunek, specyfikacja, inne
    * Specyfikacja będzie po kropce miała rodzaj, np GPU
        * Czyli specyfikacja.GPU
    * Musimy więc zrobić listę wszystkich możliwych typów specyfikacji i gdzieś to trzymać. Czy w bazie czy jako const jakiś w javie, mi obojętne.
    * TagTypeString może być enum albo jak się da, to słownik stringów co sam zwraca error jak spróbujemy przypisać taki co nie istnieje

## Serwis
- Add sprawdzamy, czy type jest taki jakiego się spodziewamy.
    * Add zakładam że będzie używane, kiedy redaktor chce dodać specyfikację, której jeszcze nie ma, w stylu RTX 4080, albo tag który od niedawna stał się fajny, w stylu mem (bo napewno nie będziemy mieć ludzi zatrudnionych żeby aktualizowali tagi w oparciu o aktualne memy) Jeśli taga nie ma, wtedy my go dodamy
- Update nie ma
- Get po Type, Id
- Delete po Id (przyda się jak ktoś doda taga o nieciekawej treści)

## Kontroler
- Get po Id, TagTypeString
    * będzie używane żeby pokazywać dostępne tagi w danym kontekście, np kiedy chcemy dodać tag platformy

Nie będzie put, post, delete, wszystkie dostępne tagi chcę żeby były w bazie na start

## Extra
Jakiś skrypt co na razie dodaje kilka przykładowych tagów
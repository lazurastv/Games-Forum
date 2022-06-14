# Przyjęte standardy
Ten plik to miejsce na wszystkie standardy jakie przyjęliśmy
(rzeczy, które zostały zdecydowane, ale mogłyby być inaczej)

## Zdjęcia
- Zdjęcie profilowe użytkownika
	- Wymiary: 180x180
	- Ścieżka: user/{path}/profile.jpg
- Kwadratowe zdjęcie artykułu (np. na stronie głównej)
	- Wymiary: ?
	- Ścieżka: content/{path}/square.png
- Poziome zdjęcie artykułu
	- Wymiary: ?
	- Ścieżka: content/{path}/horizontal.png
- Pionowe zdjęcie gry / recenzji
	- Wymiary: ?
	- Ścieżka: content/{path}/vertical.png

## Zawartość artykułu
Ścieżka: content/{path}/content.json

## Nazwa folderu (path)
8 znaków base64, slash / zamieniony na podłogę -

## Hasło:
- brak pustych znaków
- min. 8 znaków
- min. 1 mała litera
- min. 1 duża litera
- min. 1 cyfra
- min. 1 znak specjalny
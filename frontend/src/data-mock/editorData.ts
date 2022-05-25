import { stringToHtml } from "../components/Editor/dataConversion";

// const article = '{"blocks":[{"key":"7k6cn","text":" Cyberpunk 2077 to najbardziej oczekiwana gra ostatnich lat.","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a29ri","text":" Stworzony przez rodzime studio CD Projekt RED erpeg akcji wzbudził ogromne zainteresowanie na długo przed premierą. Tym większe było rozczarowanie, gdy okazało się, że produkcja trafiła na rynek niedokończona, z\nwybrakowanymi mechanikami (opisywanymi w zapowiedziach), licznymi błędami i rażąco\nniską liczbą klatek na sekundę na konsolach starej generacji. Z racji tego, że historia V, osadzona w tętniącym życiem Night City, naszym zdaniem w ogóle nie powinna trafić na PlayStation 4 i Xboksy One (jest po prostu zbyt wymagająca\ntechnicznie, jak na możliwości tych sprzętów), zebraliśmy oceny dotyczące wyłącznie wersji pecetowej. O wydaniu\nnext-genowym nie wspominamy ani słowem, gdyż czekamy na wydanie zapowiadanej przez CD Projekt RED\naktualizacji, która przede wszystkim ma wprowadzić oprawę graficzną na nowy\npoziom.   ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ebqvl","text":"Cyberpunk 2077 to bardzo udana gra, z ciekawą fabułą, interesującymi postaciami i tętniącym życiem światem, ale popsuta przez dużą liczbę błędów (zwłaszcza na początku, w pierwszych miesiącach po premierze), a w przypadku konsol starej generacji - także przez wyraźnie pogorszoną grafikę i (pomimo tego) rażącą liczbę klatek na sekundę.  ","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
const article = {
  blocks: [
    {
      key: "7k6cn",
      text: " Cyberpunk 2077 to najbardziej oczekiwana gra ostatnich lat.  ",
      type: "header-four",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "f1a3n",
      text: "Stworzony przez rodzime studio CD Projekt RED erpeg akcji wzbudził ogromne zainteresowanie na długo przed premierą. Tym większe było rozczarowanie, gdy okazało się, że produkcja trafiła na rynek niedokończona, z wybrakowanymi mechanikami (opisywanymi w zapowiedziach), licznymi błędami i rażąco niską liczbą klatek na sekundę na konsolach starej generacji. Z racji tego, że historia V, osadzona w tętniącym życiem Night City, naszym zdaniem w ogóle nie powinna trafić na PlayStation 4 i Xboksy One (jest\npo prostu zbyt wymagająca technicznie, jak na możliwości tych sprzętów), zebraliśmy oceny dotyczące wyłącznie wersji pecetowej. O wydaniu next-genowym nie wspominamy ani słowem, gdyż czekamy na wydanie zapowiadanej przez CD Projekt RED aktualizacji, która przede wszystkim ma wprowadzić oprawę graficzną na nowy poziom.   ",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 115,
          style: "BOLD",
        },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: "88i3f",
      text: "Cyberpunk 2077 to bardzo udana gra, z ciekawą fabułą, interesującymi postaciami i tętniącym życiem światem, ale popsuta przez dużą liczbę błędów (zwłaszcza na początku, w pierwszych miesiącach po premierze),                         \na w przypadku konsol starej generacji - także przez wyraźnie pogorszoną grafikę i (pomimo tego) rażącą liczbę klatek na sekundę.  ",
      type: "blockquote",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 329,
          length: 7,
          style: "BOLD",
        },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: "ba5n3",
      text: "Rozważania, jakie towarzyszyły podróży V, mocno do mnie docierały, kilka momentów rozwalało błyskotliwością. Nawet jeśli część tej filozofii znamy skądinąd, wciąż ładnie platała się z emocjami. Tych zaś odczuwałem od groma. Bardzo zżyłem się z bohaterami, których spotkałem, chciałem „maksować” każde możliwe zadanie i odczuwałem niedosyt interakcji z lubianymi postaciami. A jednocześnie miałem satysfakcję z tych spotkań, które się zadziały, bo to jednak kawał świetnie wyreżyserowanych scenek był.  ",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 223,
          length: 150,
          style: "BOLD",
        },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: "12hlr",
      text: "Chyba po prostu chciałbym dostać więcej tego samego, nową historię i dopieszczoną mechanicznie wersję tego, co przeżyłem, z większą\nliczbą możliwości fabularnych i gameplayowych do sprawdzenia. Dla mojej wyobraźni stanowi to smaczniejszą pożywkę niż kolejna wycieczka do świata, któremu zagraża Białe Zimno.  ",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "6hsqa",
      text: " ",
      type: "atomic",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0,
        },
      ],
      data: {},
    },
    {
      key: "a2vmo",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {
    "0": {
      type: "IMAGE",
      mutability: "MUTABLE",
      data: {
        src: "https://cdn.pixabay.com/photo/2020/05/06/00/15/cyberpunk-5135622_960_720.jpg",
        height: "auto",
        width: "auto",
        alt: "",
        alignment: "center",
      },
    },
  },
};
const articleDangerousHtml = stringToHtml(JSON.stringify(article));
export { articleDangerousHtml };

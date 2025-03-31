# Rhiem Weather

## Setup

`config.sample.js` kopieren und zu `config.js` umbenennen.

Anschließend den Username und das Passwort für die *Meteomatics* API eintragen:

```javascript
const config = {
    meteomatics_username: '',
    meteomatics_password: '',
}

export { config }
```

Dann die Seite starten mit dem Befehl `npm run dev` für DEV und für Produktiv mit den Befehlen:

```
npm run build
npm run preview
```

## Features

- Suche per Postleitzahl oder Ortsname
- Folgende Wetterdaten werden angezeigt:
    - Vollständige Ortsbeschreibung (PLZ, Stadt, Staat, etc.)
    - Min., Max. und Ø Temperatur
    - Wetterlage als Icon und Beschreibung
    - Uhrzeit Sonnenaufgang
    - Uhrzeit Sonnenuntergang
    - UV-Index
    - Windstärke mit Pfeil für Windrichtung
    - Windböen
    - Niederschlag
- Aktuelle Uhrzeit in der Navigationsleiste
- Wetter und Ø Temperatur der Nächsten vier Tage
- Hintergrund wird dunkler oder heller abhängig von der aktuellen Wetterlage
- Geocode Lokalisierung
- Spechern der letzten Anfrage im LocalStorage
- Graph für Temperatur
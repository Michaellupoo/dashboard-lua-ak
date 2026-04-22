import React, { useMemo, useState } from "react";

const items = [
  {
    "luaId": "L1",
    "trackingRaw": "Bug 294465",
    "trackingId": "294465",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/294465",
    "tipo": "Bug",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "Manca nome macchina esatto",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "3",
    "competenza": "SoftEng",
    "dataApertura": "2026-03-12",
    "versioneBon": "1.4.0.873",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Braschi Paolo",
    "note": ""
  },
  {
    "luaId": "L2",
    "trackingRaw": "Bug 290641",
    "trackingId": "290641",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/290641",
    "tipo": "Bug",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "Si vedono testi in italiano e testi in inglese",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "2",
    "competenza": "SoftEng",
    "dataApertura": "2026-03-12",
    "versioneBon": "1.4.0.873",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Braschi Paolo",
    "note": ""
  },
  {
    "luaId": "L3",
    "trackingRaw": "Bug 294467",
    "trackingId": "294467",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/294467",
    "tipo": "Bug",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "Tabella azionamenti Icone download e upload invertite",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "3",
    "competenza": "SoftEng",
    "dataApertura": "2026-03-12",
    "versioneBon": "1.4.0.873",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Braschi Paolo",
    "note": ""
  },
  {
    "luaId": "L4",
    "trackingRaw": "Bug 294536",
    "trackingId": "294536",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/294536",
    "tipo": "Bug",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "Doppia selezione persistente tra menu Comandi",
    "stato": "Aperto",
    "statoCodice": 1,
    "gravita": "2",
    "competenza": "SoftEng",
    "dataApertura": "2026-03-13",
    "versioneBon": "1.4.0.873",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Lupo Michael",
    "note": "Su B0N, dopo essere entrati in Azzeramenti, passati in Attrezza e tornati in Comandi, restano selezionati contemporaneamente Azzeramenti e Continuo.\n"
  },
  {
    "luaId": "L5",
    "trackingRaw": "Feature 295000",
    "trackingId": "295000",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/295000",
    "tipo": "Feature",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "Pagina attivazione Mandrini: manca la possibilità di selezione e attivazione multipla e la possibilità di muoversi tra i mandrini e attivarli da tastiera",
    "stato": "Preso in carico",
    "statoCodice": 2,
    "gravita": "3",
    "competenza": "SoftEng",
    "dataApertura": "2026-03-13",
    "versioneBon": "1.4.0.873",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Lupo Michael",
    "note": ""
  },
  {
    "luaId": "L6",
    "trackingRaw": "Bug 295015",
    "trackingId": "295015",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/295015",
    "tipo": "Bug",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "Pagina attivazione Mandrini: al cambio tema i mandrini hanno lo stesso colore dello sfondo e non si vedono, si vedono solo i testi",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "3",
    "competenza": "SoftEng",
    "dataApertura": "2026-03-13",
    "versioneBon": "1.4.0.874",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Lupo Michael",
    "note": ""
  },
  {
    "luaId": "L7",
    "trackingRaw": "Bug 295003",
    "trackingId": "295003",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/295003",
    "tipo": "Bug",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "I pulsanti di Jog hanno la possibilità di essere \"scrollati\". Quando si effettua un Jog+/- e mentre tengo premuto esco dallo spazio del pulsante il Jog mi va avanti fino al finecorsa anche se rilascio il pulsante",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "1",
    "competenza": "SoftEng",
    "dataApertura": "2026-03-17",
    "versioneBon": "1.4.0.874",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Lupo Michael",
    "note": ""
  },
  {
    "luaId": "L8",
    "trackingRaw": "Bug 295193",
    "trackingId": "295193",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/295193",
    "tipo": "Bug",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "Edita Utensile da pagina Attrezza non apre correttamente Anagrafiche ma richiama l’ultima sezione visitata",
    "stato": "Aperto",
    "statoCodice": 1,
    "gravita": "2",
    "competenza": "SoftEng",
    "dataApertura": "2026-03-19",
    "versioneBon": "1.4.0.874",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Lupo Michael",
    "note": ""
  },
  {
    "luaId": "L9",
    "trackingRaw": "Feature 295631",
    "trackingId": "295631",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/295631",
    "tipo": "Feature",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "Nella nuova interfaccia della pagina Attivazione Mandrini non è più disponibile la sezione “Informazioni” presente nella vecchia interfaccia",
    "stato": "Aperto",
    "statoCodice": 1,
    "gravita": "3",
    "competenza": "SoftEng",
    "dataApertura": "2026-03-24",
    "versioneBon": "1.4.0.874",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Lupo Michael",
    "note": ""
  },
  {
    "luaId": "L10",
    "trackingRaw": null,
    "trackingId": null,
    "trackingUrl": null,
    "tipo": "LUA",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "Errore OPC-UA al lancuo del CN",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "1",
    "competenza": "AU",
    "dataApertura": "2026-03-12",
    "versioneBon": "1.4.0.874",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Candiotti Riccardo",
    "note": ""
  },
  {
    "luaId": "L11",
    "trackingRaw": null,
    "trackingId": null,
    "trackingUrl": null,
    "tipo": "LUA",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "Errore su lancio WRT – utility backup AV",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "1",
    "competenza": "AU",
    "dataApertura": "2026-03-12",
    "versioneBon": "1.4.0.874",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Candiotti Riccardo",
    "note": ""
  },
  {
    "luaId": "L12",
    "trackingRaw": null,
    "trackingId": null,
    "trackingUrl": null,
    "tipo": "LUA",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "Comportamento limite override",
    "stato": "Aperto",
    "statoCodice": 1,
    "gravita": "2",
    "competenza": "AU",
    "dataApertura": "2026-03-16",
    "versioneBon": "1.4.0.874",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Candiotti Riccardo",
    "note": ""
  },
  {
    "luaId": "L13",
    "trackingRaw": null,
    "trackingId": null,
    "trackingUrl": null,
    "tipo": "LUA",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "Pulsante softconsole “PMartire2” attivabile da distinta ma non utilizzabile",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "1",
    "competenza": "AU",
    "dataApertura": "2026-03-17",
    "versioneBon": "1.4.0.874",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Candiotti Riccardo",
    "note": ""
  },
  {
    "luaId": "L14",
    "trackingRaw": null,
    "trackingId": null,
    "trackingUrl": null,
    "tipo": "LUA",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "Comportamento non coerente gestione Reset Slot tra HMI e palmare su asse Z",
    "stato": "Preso in carico",
    "statoCodice": 2,
    "gravita": "2",
    "competenza": "AU",
    "dataApertura": "2026-03-18",
    "versioneBon": "1.4.0.874",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Candiotti Riccardo",
    "note": ""
  },
  {
    "luaId": "L15",
    "trackingRaw": null,
    "trackingId": null,
    "trackingUrl": null,
    "tipo": "LUA",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "Reset Slot non disponibile nei movimenti incrementali e “Vai a Quota”",
    "stato": "Preso in carico",
    "statoCodice": 2,
    "gravita": "2",
    "competenza": "AU",
    "dataApertura": "2026-03-19",
    "versioneBon": "1.4.0.874",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Candiotti Riccardo",
    "note": ""
  },
  {
    "luaId": "L16",
    "trackingRaw": null,
    "trackingId": null,
    "trackingUrl": null,
    "tipo": "LUA",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "Errore su file ISO OFFSET_FORA durante definizione origine e teste a forare",
    "stato": "Preso in carico",
    "statoCodice": 2,
    "gravita": "2",
    "competenza": "WRT",
    "dataApertura": "2026-03-20",
    "versioneBon": "1.4.0.874",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Candiotti Riccardo",
    "note": ""
  },
  {
    "luaId": "L17",
    "trackingRaw": null,
    "trackingId": null,
    "trackingUrl": null,
    "tipo": "LUA",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "Problema avvio simulazione bSolid per mancata partenza seconda istanza CN",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "2",
    "competenza": "AU",
    "dataApertura": "2026-03-24",
    "versioneBon": "1.4.0.874",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Candiotti Riccardo",
    "note": ""
  },
  {
    "luaId": "L18",
    "trackingRaw": null,
    "trackingId": null,
    "trackingUrl": null,
    "tipo": "LUA",
    "linea": "AK01",
    "macchina": "1000078971",
    "descrizione": "pulsanti non compatibili con il modello macchina",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "3",
    "competenza": "AU",
    "dataApertura": "2026-03-24",
    "versioneBon": "1.4.0.874",
    "versioneBSolid": "5.0.0.300",
    "versionePlc": "16.3.6.48",
    "apertoDa": "Candiotti Riccardo",
    "note": ""
  },
  {
    "luaId": "L19",
    "trackingRaw": null,
    "trackingId": null,
    "trackingUrl": null,
    "tipo": "LUA",
    "linea": "AK03",
    "macchina": "1000080956",
    "descrizione": "Mancanza pulsante reset slot",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "1",
    "competenza": "AU",
    "dataApertura": "2026-04-08",
    "versioneBon": "1.4.0.940",
    "versioneBSolid": "5.0.0.359",
    "versionePlc": "16.3.7.50",
    "apertoDa": "Lupo Michael",
    "note": ""
  },
  {
    "luaId": "L20",
    "trackingRaw": "Bug 296881",
    "trackingId": "296881",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/296881",
    "tipo": "Bug",
    "linea": "AK03",
    "macchina": "1000080956",
    "descrizione": "Mancanza dell'azzeramento \"Manuale/Globale\"",
    "stato": "Aperto",
    "statoCodice": 1,
    "gravita": "2",
    "competenza": "SoftEng",
    "dataApertura": "2026-04-08",
    "versioneBon": "1.4.0.957",
    "versioneBSolid": "5.0.0.359",
    "versionePlc": "16.3.7.50",
    "apertoDa": "Lupo Michael",
    "note": ""
  },
  {
    "luaId": "L21",
    "trackingRaw": "Feature 297450",
    "trackingId": "297450",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/297450",
    "tipo": "Feature",
    "linea": "AK03",
    "macchina": "1000080956",
    "descrizione": "In ambiente bSolid non prende i long press dei tasti della softconsole",
    "stato": "Preso in carico",
    "statoCodice": 2,
    "gravita": "1",
    "competenza": "SoftEng",
    "dataApertura": "2026-04-14",
    "versioneBon": "1.4.0.957",
    "versioneBSolid": "5.0.0.359",
    "versionePlc": "16.3.7.50",
    "apertoDa": "Lupo Michael",
    "note": ""
  },
  {
    "luaId": "L22",
    "trackingRaw": "Bug 297244",
    "trackingId": "297244",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/297244",
    "tipo": "Bug",
    "linea": "AK03",
    "macchina": "1000080956",
    "descrizione": "L’incremento dell’asse lineare viene azzerato dopo la selezione di un asse circolare",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "2",
    "competenza": "SoftEng",
    "dataApertura": "2026-04-13",
    "versioneBon": "1.4.0.957",
    "versioneBSolid": "5.0.0.359",
    "versionePlc": "16.3.7.50",
    "apertoDa": "Lupo Michael",
    "note": ""
  },
  {
    "luaId": "L23",
    "trackingRaw": "Bug 297243",
    "trackingId": "297243",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/297243",
    "tipo": "Bug",
    "linea": "AK03",
    "macchina": "1000080956",
    "descrizione": "Mandrini di riferimento in \"Vai a Quota\" compaiono solo dopo kill del datamanager",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "2",
    "competenza": "SoftEng",
    "dataApertura": "2026-04-13",
    "versioneBon": "1.4.0.957",
    "versioneBSolid": "5.0.0.359",
    "versionePlc": "16.3.7.50",
    "apertoDa": "Lupo Michael",
    "note": ""
  },
  {
    "luaId": "L24",
    "trackingRaw": null,
    "trackingId": null,
    "trackingUrl": null,
    "tipo": "LUA",
    "linea": "AK03",
    "macchina": "",
    "descrizione": "Mancano tasti di selezione battute frontali",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "2",
    "competenza": "AU",
    "dataApertura": "2026-03-13",
    "versioneBon": "1.4.0.957",
    "versioneBSolid": "5.0.0.359",
    "versionePlc": "16.3.7.50",
    "apertoDa": "Lupo Michael",
    "note": ""
  },
  {
    "luaId": "L25",
    "trackingRaw": "Feature 297476",
    "trackingId": "297476",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/297476",
    "tipo": "Feature",
    "linea": "AK03",
    "macchina": "1000080956",
    "descrizione": "Avvio modifica origini in Quota Misurata",
    "stato": "Aperto",
    "statoCodice": 1,
    "gravita": "1",
    "competenza": "SoftEng",
    "dataApertura": "2026-04-14",
    "versioneBon": "1.4.0.968",
    "versioneBSolid": "5.0.0.359",
    "versionePlc": "16.3.7.50",
    "apertoDa": "Lupo Michael",
    "note": ""
  },
  {
    "luaId": "L26",
    "trackingRaw": "Bug 297958",
    "trackingId": "297958",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/297958",
    "tipo": "Bug",
    "linea": "AK03",
    "macchina": "1000080956",
    "descrizione": "Loop e sovrapposizione di bSuite durante navigazione rapida tra pagine bSolid e non bSolid",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "2",
    "competenza": "SoftEng",
    "dataApertura": "2026-04-17",
    "versioneBon": "1.4.0.968",
    "versioneBSolid": "5.0.0.359",
    "versionePlc": "16.3.7.50",
    "apertoDa": "Lupo Michael",
    "note": ""
  },
  {
    "luaId": "L27",
    "trackingRaw": "Bug 297962",
    "trackingId": "297962",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/297962",
    "tipo": "Bug",
    "linea": "AK03",
    "macchina": "1000080956",
    "descrizione": "Ricerca campi tabella WTGEN non funzionante nei dati macchina AU su macchina 1000080956",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "2",
    "competenza": "SoftEng",
    "dataApertura": "2026-04-17",
    "versioneBon": "1.4.0.968",
    "versioneBSolid": "5.0.0.359",
    "versionePlc": "16.3.7.50",
    "apertoDa": "Lupo Michael",
    "note": ""
  },
  {
    "luaId": "L28",
    "trackingRaw": "Bug 297964",
    "trackingId": "297964",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/297964",
    "tipo": "Bug",
    "linea": "AK03",
    "macchina": "1000080956",
    "descrizione": "Splashscreen non visibile correttamente",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "2",
    "competenza": "SoftEng",
    "dataApertura": "2026-04-17",
    "versioneBon": "1.4.0.968",
    "versioneBSolid": "5.0.0.359",
    "versionePlc": "16.3.7.50",
    "apertoDa": "Lupo Michael",
    "note": ""
  },
  {
    "luaId": "L29",
    "trackingRaw": "Bug 298565",
    "trackingId": "298565",
    "trackingUrl": "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/298565",
    "tipo": "Bug",
    "linea": "AK03",
    "macchina": "1000080956",
    "descrizione": "Notifiche PLC: dopo il 256esimo messaggio non vengono visualizzati i successivi",
    "stato": "Aperto",
    "statoCodice": 1,
    "gravita": "2",
    "competenza": "SoftEng",
    "dataApertura": "2026-04-20",
    "versioneBon": "1.4.0.968",
    "versioneBSolid": "5.0.0.359",
    "versionePlc": "16.3.7.50",
    "apertoDa": "Lupo Michael",
    "note": ""
  },
  {
    "luaId": "L30",
    "trackingRaw": null,
    "trackingId": null,
    "trackingUrl": null,
    "tipo": "LUA",
    "linea": "AK03",
    "macchina": "1000080956",
    "descrizione": "File ISO Utility_Prod: Quando si apre la QBOX non fa inserire la X",
    "stato": "Chiuso",
    "statoCodice": 4,
    "gravita": "2",
    "competenza": "AU",
    "dataApertura": "2026-04-21",
    "versioneBon": "1.4.0.968",
    "versioneBSolid": "5.0.0.359",
    "versionePlc": "16.3.7.50",
    "apertoDa": "Lupo Michael",
    "note": ""
  }
];

const STATUS_LABELS = {
  1: "Aperto",
  2: "Preso in carico",
  3: "Risolto e da testare",
  4: "Ri-Testato e Chiuso",
};

const excelStateByLuaId = {
  L1: 4,
  L2: 4,
  L3: 4,
  L4: 4,
  L5: 4,
  L6: 4,
  L7: 4,
  L8: 1,
  L9: 1,
  L10: 4,
  L11: 4,
  L12: 1,
  L13: 4,
  L14: 4,
  L15: 4,
  L16: 4,
  L17: 4,
  L18: 4,
  L19: 4,
  L20: 4,
  L21: 2,
  L22: 1,
  L23: 4,
  L24: 3,
  L25: 1,
  L26: 2,
  L27: 2,
  L28: 1,
  L29: 1,
  L30: 2,
};

const statoClasses = {
  Aperto: "bg-slate-100 text-slate-700 border border-slate-200",
  "Preso in carico": "bg-blue-100 text-blue-700 border border-blue-200",
  "Risolto e da testare": "bg-green-50 text-green-700 border border-green-100",
  "Ri-Testato e Chiuso": "bg-green-300 text-green-900 border border-green-400",
};

const competenzaClasses = {
  SoftEng: "bg-sky-100 text-sky-700 border border-sky-200",
  AU: "bg-violet-100 text-violet-700 border border-violet-200",
  WRT: "bg-orange-100 text-orange-700 border border-orange-200",
};

const linee = ["AK01", "AK02", "AK03"];

function daysOpen(dateString) {
  if (!dateString) return 0;
  const start = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("it-IT");
}

export default function AkOpenItemsDashboard() {
  const [linea, setLinea] = useState("AK01");
  const [macchina, setMacchina] = useState("all");
  const [tipo, setTipo] = useState("all");
  const [stato, setStato] = useState("openOnly");
  const [search, setSearch] = useState("");
  const [competenza, setCompetenza] = useState("all");
  const [sortData, setSortData] = useState("dataDesc");

  const normalizedItems = useMemo(() => {
    return items.map((item) => {
      const statoCodice = excelStateByLuaId[item.luaId] ?? item.statoCodice;
      return {
        ...item,
        statoCodice,
        stato: STATUS_LABELS[statoCodice] || item.stato,
      };
    });
  }, []);

  const itemsLinea = useMemo(() => normalizedItems.filter((x) => x.linea === linea), [normalizedItems, linea]);

  const macchineDisponibili = useMemo(() => {
    const values = itemsLinea.map((x) => x.macchina).filter(Boolean);
    return [...new Set(values)].sort();
  }, [itemsLinea]);

  const righe = useMemo(() => {
    const q = search.trim().toLowerCase();
    return itemsLinea
      .filter((x) => macchina === "all" || x.macchina === macchina)
      .filter((x) => tipo === "all" || x.tipo === tipo)
      .filter((x) => competenza === "all" || x.competenza === competenza)
      .filter((x) => {
        if (stato === "openOnly") return x.statoCodice !== 4;
        if (stato === "all") return true;
        return x.stato === stato;
      })
      .filter((x) => {
        if (!q) return true;
        return [
          x.luaId,
          x.trackingRaw,
          x.descrizione,
          x.competenza,
          x.macchina,
          x.apertoDa,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(q));
      })
      .sort((a, b) => {
        const dateA = new Date(a.dataApertura).getTime();
        const dateB = new Date(b.dataApertura).getTime();

        if (sortData === "dataAsc") return dateA - dateB;
        if (sortData === "dataDesc") return dateB - dateA;

        const stateWeight = { Aperto: 0, "Preso in carico": 1, "Risolto e da testare": 2, "Ri-Testato e Chiuso": 3 };
        const s = (stateWeight[a.stato] ?? 99) - (stateWeight[b.stato] ?? 99);
        if (s !== 0) return s;
        return daysOpen(b.dataApertura) - daysOpen(a.dataApertura);
      });
  }, [itemsLinea, macchina, tipo, competenza, stato, search, sortData]);

  const counters = useMemo(() => {
    return {
      totale: righe.length,
      aperti: righe.filter((x) => x.statoCodice === 1).length,
      presiInCarico: righe.filter((x) => x.statoCodice === 2).length,
      risoltiDaTestare: righe.filter((x) => x.statoCodice === 3).length,
      chiusi: righe.filter((x) => x.statoCodice === 4).length,
    };
  }, [righe]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Dashboard LUA aperti in linea AK</h1>
              <p className="mt-1 text-sm text-slate-600">
                Dati caricati dal file Excel condiviso. I bug e le feature mantengono il link diretto al work item.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {linee.map((value) => (
              <button
                key={value}
                onClick={() => {
                  setLinea(value);
                  setMacchina("all");
                }}
                className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                  linea === value ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Macchina</label>
              <select
                value={macchina}
                onChange={(e) => setMacchina(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
              >
                <option value="all">Tutte</option>
                {macchineDisponibili.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Tipo</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
              >
                <option value="all">Tutti</option>
                <option value="Bug">Bug</option>
                <option value="Feature">Feature</option>
                <option value="LUA">LUA</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Competenza</label>
              <select
                value={competenza}
                onChange={(e) => setCompetenza(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
              >
                <option value="all">Tutte</option>
                <option value="SoftEng">SoftEng</option>
                <option value="AU">AU</option>
                <option value="WRT">WRT</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Stato</label>
              <select
                value={stato}
                onChange={(e) => setStato(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
              >
                <option value="openOnly">Solo aperti / in carico</option>
                <option value="all">Tutti</option>
                <option value="Aperto">Aperto</option>
                <option value="Preso in carico">Preso in carico</option>
                <option value="Risolto e da testare">Risolto e da testare</option>
                <option value="Ri-Testato e Chiuso">Ri-Testato e Chiuso</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Ordina per data</label>
              <select
                value={sortData}
                onChange={(e) => setSortData(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
              >
                <option value="dataDesc">Più recenti prima</option>
                <option value="dataAsc">Più vecchi prima</option>
                <option value="default">Priorità stato + anzianità</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Ricerca</label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="LUA, bug, descrizione, owner..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3">
          <StatCard title="Totale filtrati" value={counters.totale} />
          <StatCard title="Aperti" value={counters.aperti} />
          <StatCard title="Presi in carico" value={counters.presiInCarico} />
          <StatCard title="Risolti da testare" value={counters.risoltiDaTestare} />
          <StatCard title="Ri-Testati e Chiusi" value={counters.chiusi} />
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">Elenco item</h2>
          </div>

          {righe.length === 0 ? (
            <div className="px-6 py-10 text-sm text-slate-500">
              Nessun elemento trovato con i filtri attuali. Nel file caricato non risultano item per questa combinazione oppure AK02 non è popolata.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">LUA</th>
                    <th className="px-4 py-3 font-medium">Competenza</th>
                    <th className="px-4 py-3 font-medium">Bug / Feature</th>
                    <th className="px-4 py-3 font-medium">Tipo</th>
                    <th className="px-4 py-3 font-medium">Macchina</th>
                    <th className="px-4 py-3 font-medium">Descrizione</th>
                    <th className="px-4 py-3 font-medium">Stato</th>
                    <th className="px-4 py-3 font-medium">Gravità</th>
                    <th className="px-4 py-3 font-medium">Aperto da</th>
                    <th className="px-4 py-3 font-medium">Data apertura</th>
                    <th className="px-4 py-3 font-medium">Età (gg)</th>
                    <th className="px-4 py-3 font-medium">Versione b/On</th>
                    <th className="px-4 py-3 font-medium">Versione bSolid</th>
                    <th className="px-4 py-3 font-medium">Versione PLC</th>
                  </tr>
                </thead>
                <tbody>
                  {righe.map((row) => (
                    <tr key={`${row.linea}-${row.luaId}-${row.trackingRaw || row.descrizione}`} className="border-t border-slate-100 align-top">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.luaId}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${competenzaClasses[row.competenza] || "bg-slate-100 text-slate-700 border border-slate-200"}`}>
                          {row.competenza}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {row.trackingUrl ? (
                          <a
                            href={row.trackingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-blue-700 underline underline-offset-2"
                          >
                            {row.trackingRaw}
                          </a>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">{row.tipo}</td>
                      <td className="px-4 py-3">{row.macchina || "-"}</td>
                      <td className="px-4 py-3 min-w-[420px] text-slate-700">
                        <div>{row.descrizione}</div>
                        {row.note ? <div className="mt-1 text-xs text-slate-500">{row.note}</div> : null}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statoClasses[row.stato] || "bg-slate-100 text-slate-700"}`}>
                          {row.stato}
                        </span>
                      </td>
                      <td className="px-4 py-3">{row.gravita}</td>
                      <td className="px-4 py-3">{row.apertoDa}</td>
                      <td className="px-4 py-3">{formatDate(row.dataApertura)}</td>
                      <td className="px-4 py-3">{daysOpen(row.dataApertura)} gg</td>
                      <td className="px-4 py-3">{row.versioneBon}</td>
                      <td className="px-4 py-3">{row.versioneBSolid}</td>
                      <td className="px-4 py-3">{row.versionePlc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
      <div className="text-xs leading-tight text-slate-500">{title}</div>
      <div className="mt-1 text-2xl font-semibold leading-none text-slate-900">{value}</div>
    </div>
  );
}

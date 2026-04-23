import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";

const fallbackItems = [
  {
    luaId: "L1",
    trackingRaw: "Bug 294465",
    trackingId: "294465",
    trackingUrl: "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/294465",
    tipo: "Bug",
    linea: "AK01",
    macchina: "1000078971",
    descrizione: "Manca nome macchina esatto",
    stato: "Ri-Testato e Chiuso",
    statoCodice: 4,
    gravita: "3",
    competenza: "SoftEng",
    dataApertura: "2026-03-12",
    versioneBon: "1.4.0.873",
    versioneBSolid: "5.0.0.300",
    versionePlc: "16.3.6.48",
    apertoDa: "Braschi Paolo",
    note: "",
  },
  {
    luaId: "L20",
    trackingRaw: "Bug 296881",
    trackingId: "296881",
    trackingUrl: "http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/296881",
    tipo: "Bug",
    linea: "AK03",
    macchina: "1000080956",
    descrizione: "Mancanza dell'azzeramento Manuale/Globale",
    stato: "Aperto",
    statoCodice: 1,
    gravita: "2",
    competenza: "SoftEng",
    dataApertura: "2026-04-08",
    versioneBon: "1.4.0.957",
    versioneBSolid: "5.0.0.359",
    versionePlc: "16.3.7.50",
    apertoDa: "Lupo Michael",
    note: "",
  },
  {
    luaId: "L30",
    trackingRaw: null,
    trackingId: null,
    trackingUrl: null,
    tipo: "LUA",
    linea: "AK03",
    macchina: "1000080956",
    descrizione: "File ISO Utility_Prod: Quando si apre la QBOX non fa inserire la X",
    stato: "Preso in carico",
    statoCodice: 2,
    gravita: "2",
    competenza: "AU",
    dataApertura: "2026-04-21",
    versioneBon: "1.4.0.968",
    versioneBSolid: "5.0.0.359",
    versionePlc: "16.3.7.50",
    apertoDa: "Lupo Michael",
    note: "",
  },
];

const STATUS_LABELS = {
  1: "Aperto",
  2: "Preso in carico",
  3: "Risolto e da testare",
  4: "Ri-Testato e Chiuso",
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

const HEADER_ALIASES = {
  luaId: ["id", "id lua", "lua", "punto lua"],
  trackingRaw: ["bug / feature", "bug/feature", "bug feature", "tracking", "id tracciamento"],
  tipo: ["tipo"],
  linea: ["linea", "linea ak"],
  macchina: ["macchina", "matricola"],
  descrizione: ["descrizione", "bug feature o punto lua aperto e chiuso"],
  stato: ["stato", "stato attuale", "cod stato"],
  gravita: ["gravita", "gravità"],
  competenza: ["competenza"],
  dataApertura: ["data apertura"],
  versioneBon: ["versione b on", "versione b/on", "b on", "bon", "versione bon"],
  versioneBSolid: ["versione bsolid", "bsolid"],
  versionePlc: ["versione plc", "plc"],
  apertoDa: ["aperto da", "owner", "segnalato da"],
  note: ["note"],
};

function daysOpen(dateString) {
  if (!dateString) return 0;
  const start = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.max(0, Math.floor(diff / 86400000));
}

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("it-IT");
}

function normalizeHeader(value) {
  return String(value || "")
    .toLowerCase()
    .replaceAll("à", "a")
    .replaceAll("á", "a")
    .replaceAll("è", "e")
    .replaceAll("é", "e")
    .replaceAll("ì", "i")
    .replaceAll("ò", "o")
    .replaceAll("ù", "u")
    .replaceAll("/", " ")
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .split(" ")
    .filter(Boolean)
    .join(" ")
    .trim();
}

function findColumnIndex(headers, aliases) {
  const normalizedHeaders = headers.map(normalizeHeader);
  const normalizedAliases = aliases.map(normalizeHeader);
  return normalizedHeaders.findIndex((header) => normalizedAliases.includes(header));
}

function ensureLuaId(value, rowNumber) {
  const raw = String(value || "").trim();
  if (!raw) return `L${rowNumber}`;
  if (raw.toUpperCase().startsWith("L")) return raw.toUpperCase();
  const digits = raw.split("").filter((char) => char >= "0" && char <= "9").join("");
  return digits ? `L${digits}` : raw;
}

function extractTracking(value) {
  const text = String(value || "").trim();
  if (!text) return { trackingRaw: null, trackingId: null, tipo: "LUA" };
  const digits = text.split("").filter((char) => char >= "0" && char <= "9").join("");
  const lower = text.toLowerCase();
  let tipo = "LUA";
  if (lower.includes("bug")) tipo = "Bug";
  if (lower.includes("feature")) tipo = "Feature";
  return {
    trackingRaw: text,
    trackingId: digits || null,
    tipo,
  };
}

function normalizeStatusCode(value) {
  const raw = String(value || "").trim();
  if (!raw) return 1;
  const num = Number(raw);
  if ([1, 2, 3, 4].includes(num)) return num;
  const text = raw.toLowerCase();
  if (text.includes("preso")) return 2;
  if (text.includes("chiuso")) return 4;
  if (text.includes("ri test")) return 4;
  if (text.includes("ritest")) return 4;
  if (text.includes("testato")) return 4;
  if (text.includes("risolto") && text.includes("test")) return 4;
  if (text.includes("risolto")) return 3;
  if (text.includes("aperto")) return 1;
  return 1;
}

function normalizeDate(value) {
  if (value === null || value === undefined || value === "") return "";
  if (typeof value === "number") {
    const parsed = XLSX.SSF.parse_date_code(value);
    if (!parsed) return "";
    const date = new Date(parsed.y, parsed.m - 1, parsed.d);
    return date.toISOString().slice(0, 10);
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function buildTrackingUrl(trackingId) {
  return trackingId ? `http://tfsserver:8080/tfs/CDC_Software/B_ASG/_workitems/edit/${trackingId}` : null;
}

function parseWorkbook(buffer) {
  const workbook = XLSX.read(buffer, { type: "array" });
  const targetSheetName = workbook.SheetNames.find((name) => normalizeHeader(name) === "lua all") || workbook.SheetNames[0];
  const sheet = workbook.Sheets[targetSheetName];
  if (!sheet) return [];

  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "", raw: true });
  if (!rows.length) return [];

  const headerRowIndex = rows.findIndex((row) => {
    const normalized = row.map(normalizeHeader);
    return normalized.includes("linea") && (normalized.includes("competenza") || normalized.includes("descrizione"));
  });

  if (headerRowIndex < 0) return [];

  const headers = rows[headerRowIndex];
  const columnMap = Object.fromEntries(
    Object.entries(HEADER_ALIASES).map(([key, aliases]) => [key, findColumnIndex(headers, aliases)])
  );

  const readCell = (row, columnIndex) => (columnIndex >= 0 ? row[columnIndex] : "");
  const readLink = (sheetRowIndex, columnIndex) => {
    if (columnIndex < 0) return null;
    const address = XLSX.utils.encode_cell({ r: sheetRowIndex, c: columnIndex });
    const cell = sheet[address];
    return cell && cell.l ? cell.l.Target : null;
  };

  return rows
    .slice(headerRowIndex + 1)
    .map((row, index) => {
      const sheetRowIndex = headerRowIndex + 1 + index;
      const linea = String(readCell(row, columnMap.linea) || "").trim();
      const descrizione = String(readCell(row, columnMap.descrizione) || "").trim();
      const luaId = ensureLuaId(readCell(row, columnMap.luaId), index + 1);

      if (!linea && !descrizione && !luaId) return null;
      if (!["AK01", "AK02", "AK03"].some((ak) => linea.includes(ak))) return null;

      const tracking = extractTracking(readCell(row, columnMap.trackingRaw));
      const statoCodice = normalizeStatusCode(readCell(row, columnMap.stato));
      const tipoCell = String(readCell(row, columnMap.tipo) || "").trim();
      const competenza = String(readCell(row, columnMap.competenza) || "").trim();

      return {
        luaId,
        trackingRaw: tracking.trackingRaw,
        trackingId: tracking.trackingId,
        trackingUrl: readLink(sheetRowIndex + 1, columnMap.trackingRaw) || buildTrackingUrl(tracking.trackingId),
        tipo: tipoCell || tracking.tipo || "LUA",
        linea,
        macchina: String(readCell(row, columnMap.macchina) || "").trim(),
        descrizione,
        statoCodice,
        stato: STATUS_LABELS[statoCodice] || "Aperto",
        gravita: String(readCell(row, columnMap.gravita) || "").trim(),
        competenza,
        dataApertura: normalizeDate(readCell(row, columnMap.dataApertura)),
        versioneBon: String(readCell(row, columnMap.versioneBon) || "").trim(),
        versioneBSolid: String(readCell(row, columnMap.versioneBSolid) || "").trim(),
        versionePlc: String(readCell(row, columnMap.versionePlc) || "").trim(),
        apertoDa: String(readCell(row, columnMap.apertoDa) || "").trim(),
        note: String(readCell(row, columnMap.note) || "").trim(),
      };
    })
    .filter(Boolean);
}

export default function AkOpenItemsDashboard() {
  const [items, setItems] = useState(fallbackItems);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [linea, setLinea] = useState("AK01");
  const [macchina, setMacchina] = useState("all");
  const [tipo, setTipo] = useState("all");
  const [stato, setStato] = useState("all");
  const [search, setSearch] = useState("");
  const [competenza, setCompetenza] = useState("all");
  const [sortData, setSortData] = useState("dataDesc");

  const itemsLinea = useMemo(() => items.filter((item) => String(item.linea || "").includes(linea)), [items, linea]);

  const macchineDisponibili = useMemo(() => {
    const values = itemsLinea.map((item) => item.macchina).filter(Boolean);
    return [...new Set(values)].sort();
  }, [itemsLinea]);

  const righe = useMemo(() => {
    const q = search.trim().toLowerCase();
    return itemsLinea
      .filter((item) => macchina === "all" || item.macchina === macchina)
      .filter((item) => tipo === "all" || item.tipo === tipo)
      .filter((item) => competenza === "all" || item.competenza === competenza)
      .filter((item) => {
        if (stato === "all") return true;
        if (stato === "openOnly") return item.statoCodice !== 4;
        return item.stato === stato;
      })
      .filter((item) => {
        if (!q) return true;
        return [item.luaId, item.trackingRaw, item.descrizione, item.competenza, item.macchina, item.apertoDa]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(q));
      })
      .sort((a, b) => {
        const dateA = new Date(a.dataApertura || "1970-01-01").getTime();
        const dateB = new Date(b.dataApertura || "1970-01-01").getTime();
        if (sortData === "dataAsc") return dateA - dateB;
        if (sortData === "dataDesc") return dateB - dateA;
        const stateWeight = { Aperto: 0, "Preso in carico": 1, "Risolto e da testare": 2, "Ri-Testato e Chiuso": 3 };
        const delta = (stateWeight[a.stato] ?? 99) - (stateWeight[b.stato] ?? 99);
        if (delta !== 0) return delta;
        return daysOpen(b.dataApertura) - daysOpen(a.dataApertura);
      });
  }, [itemsLinea, macchina, tipo, competenza, stato, search, sortData]);

  const counters = useMemo(() => ({
    totale: righe.length,
    aperti: righe.filter((item) => item.statoCodice === 1).length,
    presiInCarico: righe.filter((item) => item.statoCodice === 2).length,
    risoltiDaTestare: righe.filter((item) => item.statoCodice === 3).length,
    chiusi: righe.filter((item) => item.statoCodice === 4).length,
  }), [righe]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Dashboard LUA aperti in linea AK</h1>
              <p className="mt-1 text-sm text-slate-600">
                Carica il file Excel LUA: la colonna LUA usa l'ID del file, gli stati vengono letti dal workbook e i link bug/feature vengono mantenuti.
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <label className="text-xs font-medium text-slate-600">Upload Excel LUA</label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={async (event) => {
                  const file = event.target.files && event.target.files[0];
                  if (!file) return;
                  try {
                    setUploadError("");
                    const buffer = await file.arrayBuffer();
                    const parsedItems = parseWorkbook(buffer);
                    if (!parsedItems.length) {
                      setUploadError("Il file non contiene righe leggibili oppure le colonne non corrispondono al tracciato atteso.");
                      return;
                    }
                    setItems(parsedItems);
                    setUploadedFileName(file.name);
                    setLinea("AK01");
                    setMacchina("all");
                  } catch {
                    setUploadError("Errore durante la lettura del file Excel.");
                  }
                }}
                className="block w-[220px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 file:mr-2 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white"
              />
              {uploadedFileName ? <div className="text-[11px] text-slate-500">{uploadedFileName}</div> : null}
              {uploadError ? <div className="text-[11px] text-red-600">{uploadError}</div> : null}
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
                className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${linea === value ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Macchina</label>
              <select value={macchina} onChange={(e) => setMacchina(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">
                <option value="all">Tutte</option>
                {macchineDisponibili.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Tipo</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">
                <option value="all">Tutti</option>
                <option value="Bug">Bug</option>
                <option value="Feature">Feature</option>
                <option value="LUA">LUA</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Competenza</label>
              <select value={competenza} onChange={(e) => setCompetenza(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">
                <option value="all">Tutte</option>
                <option value="SoftEng">SoftEng</option>
                <option value="AU">AU</option>
                <option value="WRT">WRT</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Stato</label>
              <select value={stato} onChange={(e) => setStato(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">
                <option value="all">Tutti</option>
                <option value="openOnly">Solo aperti / in carico</option>
                <option value="Aperto">Aperto</option>
                <option value="Preso in carico">Preso in carico</option>
                <option value="Risolto e da testare">Risolto e da testare</option>
                <option value="Ri-Testato e Chiuso">Ri-Testato e Chiuso</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Ordina per data</label>
              <select value={sortData} onChange={(e) => setSortData(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">
                <option value="dataDesc">Più recenti prima</option>
                <option value="dataAsc">Più vecchi prima</option>
                <option value="default">Priorità stato + anzianità</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Ricerca</label>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="LUA, bug, descrizione, owner..." className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
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
            <div className="px-6 py-10 text-sm text-slate-500">Nessun elemento trovato con i filtri attuali.</div>
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
                          {row.competenza || "-"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {row.trackingUrl ? (
                          <a href={row.trackingUrl} target="_blank" rel="noreferrer" className="font-medium text-blue-700 underline underline-offset-2">
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
                      <td className="px-4 py-3">{row.gravita || "-"}</td>
                      <td className="px-4 py-3">{row.apertoDa || "-"}</td>
                      <td className="px-4 py-3">{formatDate(row.dataApertura)}</td>
                      <td className="px-4 py-3">{daysOpen(row.dataApertura)} gg</td>
                      <td className="px-4 py-3">{row.versioneBon || "-"}</td>
                      <td className="px-4 py-3">{row.versioneBSolid || "-"}</td>
                      <td className="px-4 py-3">{row.versionePlc || "-"}</td>
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

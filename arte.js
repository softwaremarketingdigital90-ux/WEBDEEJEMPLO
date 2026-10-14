/* ============================================================
   ARTE: una ilustración propia por plato (viewBox 64x64).
   Si pones una foto real en img/<id>.jpg, la foto reemplaza
   automáticamente a la ilustración (ver LEEME en la carpeta img).
   ============================================================ */
(function () {
  const K = "#0E1B2E";
  const S = `stroke="${K}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
  const svg = inner => `<svg viewBox="0 0 64 64" aria-hidden="true">${inner}</svg>`;

  // Piezas reutilizables
  const camaron = (x, y, r = 0, col = "#FF5A3C") =>
    `<g transform="translate(${x} ${y}) rotate(${r})" fill="none" stroke-linecap="round">
      <path d="M0 0c-3-8 6-12 10-7 3 4-1 9-5 9" stroke="${K}" stroke-width="8"/>
      <path d="M0 0c-3-8 6-12 10-7 3 4-1 9-5 9" stroke="${col}" stroke-width="4.5"/></g>`;
  const hojas = `<g fill="#4CAF50" stroke="${K}" stroke-width="1.6"><ellipse cx="22" cy="14" rx="4" ry="2" transform="rotate(-25 22 14)"/><ellipse cx="40" cy="12" rx="4" ry="2" transform="rotate(20 40 12)"/><ellipse cx="32" cy="9" rx="3.4" ry="1.8"/></g>`;
  const limon = `<g transform="translate(46 17) rotate(18)"><path d="M-10 0a10 10 0 0 1 20 0z" fill="#9BD65B" ${S} stroke-width="2.4"/><path d="M-6 -1a6 6 0 0 1 12 0z" fill="#E8F7C0"/></g>`;
  const tazon = (relleno, extra = "") =>
    `${relleno}<path d="M5 32h54c0 16-12 26-27 26S5 48 5 32z" fill="#fff" ${S}/><path d="M13 42c6-4 11-4 17 0s11 4 17 0" fill="none" stroke="#1F4FD8" stroke-width="3" stroke-linecap="round"/>${extra}`;
  const montanita = (col = "#FFE3C6") => `<path d="M11 33c0-15 9-21 21-21s21 6 21 21z" fill="${col}" ${S}/>`;
  const vaso = (liquido, extra = "") =>
    `<path d="M15 14h34l-4 42H19z" fill="#fff" ${S}/><path d="M17.600 26h28.800l-2.200 28H19.800z" fill="${liquido}"/><path d="M15 14h34l-4 42H19z" fill="none" ${S}/>
     <rect x="24" y="32" width="9" height="9" rx="2" fill="#fff" opacity=".65" transform="rotate(-10 28 36)"/><rect x="34" y="40" width="8" height="8" rx="2" fill="#fff" opacity=".6" transform="rotate(12 38 44)"/>${extra}`;

  const ARTE = {};

  // ---------- Ceviches ----------
  ARTE.c1 = svg(tazon(montanita() + camaron(15, 28, -10) + camaron(27, 24, 6) + camaron(38, 29, -4) + hojas + limon));
  ARTE.c2 = svg(tazon(montanita("#FFEBD3") + camaron(15, 28, -10) + camaron(36, 26, 4) +
    `<g ${S} stroke-width="2.4"><rect x="25" y="16" width="9" height="9" rx="2" fill="#fff" transform="rotate(14 29 20)"/><rect x="43" y="22" width="8" height="8" rx="2" fill="#FFF6E6" transform="rotate(-12 47 26)"/></g>
     <ellipse cx="22" cy="22" rx="5.500" ry="4" fill="#5A4A6B" stroke="${K}" stroke-width="2.4"/><path d="M19 21c2-2 4-2 6 0" stroke="#fff" stroke-width="1.400" fill="none" opacity=".7"/>` + hojas + limon));
  ARTE.c3 = svg(tazon(montanita("#FFD9C2") +
    `<g stroke="${K}" stroke-width="2.4"><ellipse cx="20" cy="24" rx="6" ry="4.500" fill="#4A3B5C" transform="rotate(-18 20 24)"/><ellipse cx="33" cy="19" rx="6" ry="4.500" fill="#5A4A6B" transform="rotate(10 33 19)"/><ellipse cx="44" cy="26" rx="6" ry="4.500" fill="#4A3B5C" transform="rotate(-8 44 26)"/></g>
     <g fill="#E8392B" stroke="${K}" stroke-width="1.600"><circle cx="27" cy="27" r="3"/><circle cx="39" cy="15" r="2.600"/><circle cx="14" cy="28" r="2.600"/></g>` + hojas + limon));
  ARTE.c4 = svg(tazon(montanita("#FFF3E4") +
    `<g ${S} stroke-width="2.4" fill="#fff"><rect x="15" y="20" width="9" height="9" rx="2" transform="rotate(-14 19 24)"/><rect x="27" y="14" width="9" height="9" rx="2" transform="rotate(12 31 18)"/><rect x="39" y="22" width="9" height="9" rx="2" transform="rotate(-6 43 26)"/><rect x="25" y="25" width="8" height="8" rx="2" fill="#FFF6E6" transform="rotate(20 29 29)"/></g>
     <path d="M13 17c5-5 10-4 13 0M36 31c5-4 10-3 14 1" fill="none" stroke="#8E3B8E" stroke-width="3" stroke-linecap="round"/>` + hojas + limon));

  // ---------- Platos fuertes ----------
  ARTE.f1 = svg(
    `<g fill="none" stroke="#9FB8FF" stroke-width="2.600" stroke-linecap="round"><path d="M22 14c-3-3 3-5 0-9M32 14c-3-3 3-5 0-9M42 14c-3-3 3-5 0-9"/></g>
     <path d="M5 28h54c0 18-11 30-27 30S5 46 5 28z" fill="#fff" ${S}/>
     <ellipse cx="32" cy="28" rx="27" ry="7" fill="#F0A24B" ${S}/>
     <g ${S} stroke-width="2.200"><rect x="14" y="24" width="10" height="7" rx="3" fill="#FFF1C9" transform="rotate(-12 19 27)"/><rect x="39" y="25" width="10" height="7" rx="3" fill="#FFF1C9" transform="rotate(10 44 28)"/><path d="M26 25c3-3 9-3 12 0-1 4-10 4-12 0z" fill="#FF9B85"/></g>
     <g fill="none" stroke="#8E3B8E" stroke-width="2.600" stroke-linecap="round"><path d="M17 31c3 2 7 1 8-1M33 31c3 2 7 1 9 0M26 22c2-2 5-2 7 0"/></g>
     <path d="M12 42c6-4 12-4 18 0s12 4 20-1" fill="none" stroke="#1F4FD8" stroke-width="3" stroke-linecap="round"/>`);
  ARTE.f2 = svg(
    `<ellipse cx="32" cy="44" rx="29" ry="12" fill="#fff" ${S}/><ellipse cx="32" cy="44" rx="20" ry="7" fill="none" stroke="#CFE0FF" stroke-width="2.400"/>
     <path d="M11 42c0-14 9-22 21-22s21 8 21 22c0 5-9 9-21 9s-21-4-21-9z" fill="#FFE8B0" ${S}/>
     ${camaron(16, 38, -20, "#FF7A5C")}${camaron(29, 31, 6, "#FF5A3C")}${camaron(40, 40, -8, "#FF7A5C")}
     <g fill="#4CAF50"><circle cx="24" cy="44" r="1.800"/><circle cx="36" cy="46" r="1.800"/><circle cx="46" cy="34" r="1.800"/><circle cx="20" cy="30" r="1.800"/></g>`);
  ARTE.f3 = svg(
    `<ellipse cx="32" cy="44" rx="29" ry="12" fill="#fff" ${S}/>
     <path d="M6 33c8-11 24-13 36-3l14-9v24l-14-9C30 46 14 45 6 33z" fill="#FFB627" ${S}/>
     <path d="M20 25v16M27 24v18M34 26v14" stroke="${K}" stroke-width="2" stroke-linecap="round" opacity=".55"/>
     <circle cx="14" cy="31" r="2.600" fill="${K}"/>
     <g fill="#E8C14A" ${S} stroke-width="2.400"><circle cx="16" cy="50" r="5.500"/><circle cx="28" cy="53" r="5.500"/></g>
     <path d="M44 48c3-3 8-3 11 0" stroke="#4CAF50" stroke-width="3.400" fill="none" stroke-linecap="round"/>`);
  ARTE.f4 = svg(
    `<g fill="none" stroke-linecap="round">
      <path d="M16 36c-6 6 3 8-2 16M26 40c-3 6 4 8 0 14M38 40c3 6-4 8 0 14M48 36c6 6-3 8 2 16" stroke="${K}" stroke-width="9"/>
      <path d="M16 36c-6 6 3 8-2 16M26 40c-3 6 4 8 0 14M38 40c3 6-4 8 0 14M48 36c6 6-3 8 2 16" stroke="#E6859A" stroke-width="5.200"/></g>
     <ellipse cx="32" cy="24" rx="17" ry="16" fill="#E6859A" ${S}/>
     <path d="M20 16c3-4 7-5 10-5" stroke="#fff" stroke-width="2.600" fill="none" opacity=".6" stroke-linecap="round"/>
     <circle cx="25" cy="27" r="3.600" fill="#fff" stroke="${K}" stroke-width="2"/><circle cx="39" cy="27" r="3.600" fill="#fff" stroke="${K}" stroke-width="2"/>
     <circle cx="26" cy="27.500" r="1.600" fill="${K}"/><circle cx="40" cy="27.500" r="1.600" fill="${K}"/>
     <path d="M28 34c3 2 5 2 8 0" stroke="${K}" stroke-width="2.200" fill="none" stroke-linecap="round"/>`);

  // ---------- Entradas ----------
  ARTE.e1 = svg(
    `<g ${S} stroke-width="2.600">
      <rect x="6" y="30" width="40" height="13" rx="6.500" fill="#FFD25E" transform="rotate(-24 26 36)"/>
      <rect x="20" y="30" width="40" height="13" rx="6.500" fill="#FFB627" transform="rotate(16 40 36)"/>
      <rect x="10" y="42" width="40" height="13" rx="6.500" fill="#FFE08A" transform="rotate(-6 30 48)"/></g>
     <g fill="${K}" opacity=".35"><circle cx="18" cy="26" r="1.200"/><circle cx="46" cy="30" r="1.200"/><circle cx="30" cy="48" r="1.200"/></g>
     <path d="M44 12c4-3 9-2 11 2" stroke="#FF5A3C" stroke-width="3.400" fill="none" stroke-linecap="round"/>`);
  ARTE.e2 = svg(
    `<path d="M4 36a22 22 0 0 1 44 0z" fill="#D99A4E" ${S} transform="translate(12 -8) scale(.78)"/>
     <path d="M6 48a26 26 0 0 1 52 0z" fill="#E8A95B" ${S}/>
     <path d="M6 48h52" stroke="${K}" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round"/>
     <path d="M16 38c4-8 12-12 22-10" stroke="#F6D08E" stroke-width="3.400" fill="none" stroke-linecap="round" opacity=".8"/>
     <path d="M10 56h44" stroke="${K}" stroke-width="3" stroke-linecap="round"/>`);
  ARTE.e3 = svg(
    `<ellipse cx="32" cy="52" rx="28" ry="6" fill="${K}" opacity=".18"/>
     <circle cx="20" cy="38" r="14" fill="#E3B04B" ${S}/><circle cx="46" cy="40" r="12" fill="#D99A2E" ${S}/>
     <circle cx="34" cy="22" r="13" fill="#FFF3B0" ${S}/><circle cx="34" cy="22" r="8" fill="#FFD86B"/>
     <path d="M12 32c3-5 8-7 12-6M40 33c2-3 6-4 9-3" stroke="#F6D08E" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>
     <path d="M30 22c2 2 4 2 6 0" stroke="${K}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".5"/>`);

  // ---------- Bebidas y postres ----------
  const rodaLimon = `<g transform="translate(47 13)"><circle r="10" fill="#F4E04D" ${S}/><circle r="7" fill="#FFF7A8"/><path d="M0-7v14M-6-3.500l12 7M-6 3.500l12-7" stroke="#F4E04D" stroke-width="1.800"/></g>`;
  ARTE.b1 = svg(vaso("#F4F27A") + `<path d="M36 4l-5 30" stroke="#FF5A3C" stroke-width="4" stroke-linecap="round"/>` + rodaLimon +
    `<g fill="#4CAF50" stroke="${K}" stroke-width="1.600"><ellipse cx="22" cy="26" rx="5" ry="2.600" transform="rotate(-30 22 26)"/></g>`);
  ARTE.b2 = svg(vaso("#FFAA2B") + `<path d="M36 4l-5 30" stroke="#1F4FD8" stroke-width="4" stroke-linecap="round"/>` +
    `<g transform="translate(47 15) rotate(-14)"><circle r="11" fill="#7B4A9E" ${S}/><circle r="7.500" fill="#FFD25E"/><g fill="${K}"><circle cx="-2" cy="-2" r="1.300"/><circle cx="2.500" cy="-3" r="1.300"/><circle cx="0" cy="2" r="1.300"/><circle cx="-3.500" cy="2.500" r="1.300"/><circle cx="3.500" cy="2" r="1.300"/></g></g>`);
  ARTE.b3 = svg(
    `<path d="M6 52V30c0-3 2-5 5-5h42c3 0 5 2 5 5v22z" fill="#FFF3D6" ${S}/>
     <path d="M6 40h52M6 46h52" stroke="#F1DDB0" stroke-width="2.200"/>
     <path d="M6 30c5 7 9-3 15 1s9 6 15 0 11 5 17-1c2-2 5-1 5-1v-3c0-3-2-5-5-5H11c-3 0-5 2-5 5z" fill="#fff" ${S}/>
     <g fill="#fff" stroke="${K}" stroke-width="1.400"><circle cx="18" cy="35" r="1.600"/><circle cx="34" cy="38" r="1.600"/><circle cx="47" cy="34" r="1.600"/></g>
     <circle cx="32" cy="17" r="6" fill="#E8392B" ${S}/><path d="M32 11c1-4 4-6 7-6" stroke="#4CAF50" stroke-width="2.600" fill="none" stroke-linecap="round"/>
     <path d="M2 54h60" stroke="${K}" stroke-width="3" stroke-linecap="round"/>`);

  // ---------- Combos ----------
  ARTE.combo = svg(
    `<g transform="translate(-2 10) scale(.78)">${tazon(montanita() + camaron(15, 28, -10) + camaron(30, 24, 6) + hojas)}</g>
     <g transform="translate(30 6) scale(.62)">${vaso("#F4F27A")}</g>
     <path d="M4 58h56" stroke="${K}" stroke-width="3" stroke-linecap="round"/>`);

  // Respaldo por categoría y acceso público
  ARTE.cat = { ceviches: ARTE.c1, fuertes: ARTE.f3, entradas: ARTE.e1, bebidas: ARTE.b1, combos: ARTE.combo };
  window.ARTE = ARTE;
})();

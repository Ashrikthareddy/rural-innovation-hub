import { writeFileSync } from 'fs';
import { join } from 'path';

const base = 'c:/Users/LENOVO/Desktop/rural-ai/public/images';

/* ── INNOVATIONS ──────────────────────────────────────────────── */

const solarDryer = `<svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0d2137"/><stop offset="100%" stop-color="#3a7bd5"/></linearGradient>
  <linearGradient id="gnd" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#9e7b3a"/><stop offset="100%" stop-color="#5c4209"/></linearGradient>
  <linearGradient id="woodSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#8d5524"/><stop offset="100%" stop-color="#5c3010"/></linearGradient>
  <linearGradient id="woodTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#b07d40"/><stop offset="100%" stop-color="#7a501e"/></linearGradient>
  <linearGradient id="panelFace" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0a1628"/><stop offset="100%" stop-color="#0d2b50"/></linearGradient>
  <linearGradient id="glassOverlay" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#d0ecff" stop-opacity="0.55"/><stop offset="100%" stop-color="#80bfea" stop-opacity="0.25"/></linearGradient>
  <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fffce0"/><stop offset="40%" stop-color="#fdd835"/><stop offset="100%" stop-color="#ff8f00" stop-opacity="0"/></radialGradient>
  <filter id="drpShadow"><feDropShadow dx="4" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.35"/></filter>
  <filter id="softShadow"><feDropShadow dx="2" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.2"/></filter>
</defs>
<rect width="800" height="520" fill="url(#sky)"/>
<ellipse cx="220" cy="374" rx="310" ry="55" fill="#000" opacity="0.15"/>
<ellipse cx="600" cy="385" rx="230" ry="48" fill="#000" opacity="0.10"/>
<rect y="408" width="800" height="112" fill="url(#gnd)"/>
<line x1="0" y1="424" x2="800" y2="424" stroke="#7a5512" stroke-width="1" opacity="0.5"/>
<!-- Sun -->
<circle cx="710" cy="80" r="56" fill="url(#sunGlow)" opacity="0.9"/>
<circle cx="710" cy="80" r="34" fill="#fdd835"/>
<g stroke="#fdd835" stroke-width="2.2" stroke-linecap="round" opacity="0.6">
  <line x1="710" y1="30" x2="710" y2="18"/><line x1="710" y1="130" x2="710" y2="142"/>
  <line x1="660" y1="80" x2="648" y2="80"/><line x1="760" y1="80" x2="772" y2="80"/>
  <line x1="675" y1="45" x2="666" y2="36"/><line x1="745" y1="115" x2="754" y2="124"/>
  <line x1="745" y1="45" x2="754" y2="36"/><line x1="675" y1="115" x2="666" y2="124"/>
</g>
<!-- Heat-ray lines -->
<line x1="682" y1="107" x2="510" y2="152" stroke="#ffd54f" stroke-width="1.5" stroke-dasharray="9 6" opacity="0.45"/>
<line x1="668" y1="118" x2="395" y2="158" stroke="#ffd54f" stroke-width="1.5" stroke-dasharray="9 6" opacity="0.38"/>
<line x1="650" y1="128" x2="280" y2="163" stroke="#ffd54f" stroke-width="1.5" stroke-dasharray="9 6" opacity="0.30"/>
<!-- Ground shadow of dryer -->
<ellipse cx="360" cy="410" rx="215" ry="14" fill="#000" opacity="0.22"/>
<!-- Main dryer body: back face -->
<polygon points="95,180 545,152 545,400 95,400" fill="url(#woodSide)" filter="url(#drpShadow)"/>
<!-- Top solar panel cover -->
<polygon points="95,180 545,152 545,185 95,213" fill="url(#panelFace)"/>
<!-- Solar panel cells grid -->
<g stroke="#1565c0" stroke-width="0.7" opacity="0.40">
  <line x1="165" y1="155" x2="165" y2="211"/><line x1="240" y1="153" x2="240" y2="209"/>
  <line x1="315" y1="152" x2="315" y2="207"/><line x1="390" y1="151" x2="390" y2="206"/>
  <line x1="465" y1="151" x2="465" y2="205"/>
  <line x1="95" y1="200" x2="545" y2="172"/>
</g>
<polygon points="100,182 315,168 315,172 100,186" fill="#90caf9" opacity="0.18"/>
<!-- Glass front face -->
<polygon points="95,213 545,185 545,400 95,400" fill="url(#glassOverlay)" stroke="#90caf9" stroke-width="1.4"/>
<polygon points="110,218 195,212 195,395 110,395" fill="#fff" opacity="0.04"/>
<!-- Interior absorber -->
<polygon points="106,220 534,193 534,393 106,393" fill="#111" opacity="0.75"/>
<!-- Shelf 1 rail -->
<polygon points="116,272 524,252 524,263 116,283" fill="#607d8b"/>
<!-- Shelf 2 rail -->
<polygon points="116,325 524,305 524,316 116,336" fill="#607d8b"/>
<!-- Shelf 3 rail -->
<polygon points="116,372 524,353 524,362 116,381" fill="#607d8b"/>
<!-- Produce shelf 1: tomatoes -->
<g>
  <ellipse cx="148" cy="264" rx="11" ry="9" fill="#c62828"/>
  <ellipse cx="175" cy="262" rx="11" ry="9" fill="#d32f2f"/>
  <ellipse cx="202" cy="261" rx="11" ry="9" fill="#e53935"/>
  <ellipse cx="229" cy="259" rx="11" ry="9" fill="#b71c1c"/>
  <ellipse cx="256" cy="258" rx="11" ry="9" fill="#c62828"/>
  <ellipse cx="283" cy="257" rx="11" ry="9" fill="#d32f2f"/>
  <ellipse cx="310" cy="256" rx="11" ry="9" fill="#c62828"/>
  <ellipse cx="337" cy="255" rx="11" ry="8" fill="#e53935"/>
  <ellipse cx="364" cy="254" rx="11" ry="8" fill="#c62828"/>
  <ellipse cx="391" cy="253" rx="11" ry="8" fill="#b71c1c"/>
  <ellipse cx="418" cy="252" rx="11" ry="8" fill="#d32f2f"/>
  <ellipse cx="445" cy="251" rx="10" ry="8" fill="#c62828"/>
  <ellipse cx="471" cy="250" rx="10" ry="7" fill="#e53935"/>
  <ellipse cx="497" cy="249" rx="9" ry="7" fill="#c62828"/>
  <line x1="148" y1="255" x2="151" y2="248" stroke="#2e7d32" stroke-width="1.5"/>
  <line x1="229" y1="250" x2="232" y2="243" stroke="#2e7d32" stroke-width="1.5"/>
  <line x1="310" y1="247" x2="313" y2="240" stroke="#2e7d32" stroke-width="1.5"/>
  <line x1="391" y1="244" x2="394" y2="237" stroke="#2e7d32" stroke-width="1.5"/>
</g>
<!-- Produce shelf 2: turmeric -->
<g>
  <ellipse cx="146" cy="316" rx="12" ry="7" fill="#f9a825"/>
  <ellipse cx="174" cy="315" rx="12" ry="7" fill="#f57f17"/>
  <ellipse cx="202" cy="314" rx="12" ry="7" fill="#fbc02d"/>
  <ellipse cx="230" cy="313" rx="12" ry="7" fill="#f9a825"/>
  <ellipse cx="258" cy="312" rx="12" ry="7" fill="#f57f17"/>
  <ellipse cx="286" cy="311" rx="12" ry="7" fill="#f9a825"/>
  <ellipse cx="314" cy="310" rx="12" ry="7" fill="#fbc02d"/>
  <ellipse cx="342" cy="309" rx="12" ry="7" fill="#f9a825"/>
  <ellipse cx="370" cy="308" rx="12" ry="7" fill="#f57f17"/>
  <ellipse cx="398" cy="307" rx="12" ry="7" fill="#f9a825"/>
  <ellipse cx="426" cy="306" rx="11" ry="6" fill="#fbc02d"/>
  <ellipse cx="452" cy="306" rx="10" ry="6" fill="#f9a825"/>
  <ellipse cx="477" cy="305" rx="10" ry="6" fill="#f57f17"/>
</g>
<!-- Produce shelf 3: green leaves/herbs -->
<g>
  <ellipse cx="146" cy="364" rx="13" ry="6" fill="#2e7d32" opacity="0.8"/>
  <ellipse cx="174" cy="363" rx="13" ry="6" fill="#388e3c" opacity="0.8"/>
  <ellipse cx="202" cy="362" rx="13" ry="6" fill="#1b5e20" opacity="0.8"/>
  <ellipse cx="230" cy="361" rx="13" ry="6" fill="#2e7d32" opacity="0.8"/>
  <ellipse cx="258" cy="360" rx="13" ry="6" fill="#388e3c" opacity="0.8"/>
  <ellipse cx="286" cy="359" rx="13" ry="6" fill="#2e7d32" opacity="0.8"/>
  <ellipse cx="314" cy="358" rx="13" ry="6" fill="#1b5e20" opacity="0.8"/>
  <ellipse cx="342" cy="357" rx="13" ry="6" fill="#2e7d32" opacity="0.8"/>
  <ellipse cx="370" cy="356" rx="12" ry="6" fill="#388e3c" opacity="0.8"/>
  <ellipse cx="396" cy="355" rx="12" ry="6" fill="#2e7d32" opacity="0.8"/>
  <ellipse cx="421" cy="355" rx="11" ry="5" fill="#1b5e20" opacity="0.8"/>
  <ellipse cx="446" cy="354" rx="10" ry="5" fill="#2e7d32" opacity="0.8"/>
</g>
<!-- Frame edges -->
<polygon points="95,178 545,150 549,155 99,183" fill="#a07840"/>
<polygon points="545,150 549,155 549,403 545,400" fill="#7a4a2e"/>
<polygon points="95,400 545,400 549,403 99,403" fill="#6b3e23"/>
<polygon points="95,178 99,183 99,403 95,400" fill="#9e6040"/>
<!-- Legs -->
<rect x="80" y="398" width="22" height="40" rx="4" fill="#4e342e" filter="url(#softShadow)"/>
<rect x="534" y="398" width="22" height="40" rx="4" fill="#4e342e" filter="url(#softShadow)"/>
<!-- Vent holes bottom -->
<rect x="80" y="362" width="18" height="32" rx="4" fill="#263238" stroke="#546e7a" stroke-width="1"/>
<line x1="84" y1="370" x2="94" y2="370" stroke="#78909c" stroke-width="1"/>
<line x1="84" y1="378" x2="94" y2="378" stroke="#78909c" stroke-width="1"/>
<line x1="84" y1="385" x2="94" y2="385" stroke="#78909c" stroke-width="1"/>
<!-- Label card -->
<rect x="18" y="436" width="248" height="62" rx="7" fill="#000" fill-opacity="0.62"/>
<text x="142" y="459" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="700" fill="#fff">Solar Crop Dryer</text>
<text x="142" y="481" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="11.5" fill="#fdd835">Post-Harvest Technology · Est. ₹2,800</text>
</svg>`;

const rainwater = `<svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="stormSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1c2e40"/><stop offset="100%" stop-color="#34495e"/></linearGradient>
  <linearGradient id="roofG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7f5539"/><stop offset="100%" stop-color="#53342a"/></linearGradient>
  <linearGradient id="wallG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#d9c5a0"/><stop offset="100%" stop-color="#b09a76"/></linearGradient>
  <linearGradient id="tankG" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#1a527a"/><stop offset="50%" stop-color="#2980b9"/><stop offset="100%" stop-color="#1a527a"/></linearGradient>
  <linearGradient id="waterG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5dade2"/><stop offset="100%" stop-color="#1a5276"/></linearGradient>
  <radialGradient id="tankShine" cx="30%" cy="20%" r="60%"><stop offset="0%" stop-color="#fff" stop-opacity="0.2"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>
  <filter id="sh2"><feDropShadow dx="3" dy="6" stdDeviation="5" flood-color="#000" flood-opacity="0.3"/></filter>
</defs>
<rect width="800" height="520" fill="url(#stormSky)"/>
<rect y="400" width="800" height="120" fill="#4a5c2e"/>
<line x1="0" y1="414" x2="800" y2="414" stroke="#3a4c20" stroke-width="1.5"/>
<!-- Rain clouds -->
<g opacity="0.80">
  <ellipse cx="300" cy="60" rx="120" ry="48" fill="#4a5568"/>
  <ellipse cx="230" cy="72" rx="80" ry="40" fill="#4a5568"/>
  <ellipse cx="370" cy="68" rx="90" ry="44" fill="#5a6272"/>
  <ellipse cx="600" cy="50" rx="90" ry="40" fill="#4a5568"/>
  <ellipse cx="665" cy="62" rx="75" ry="38" fill="#5a6272"/>
</g>
<!-- Rain drops -->
<g fill="#88c0e8" opacity="0.65">
  <rect x="190" y="115" width="2.5" height="12" rx="1.2"/>
  <rect x="220" y="120" width="2.5" height="12" rx="1.2"/>
  <rect x="255" y="110" width="2.5" height="12" rx="1.2"/>
  <rect x="290" y="118" width="2.5" height="12" rx="1.2"/>
  <rect x="325" y="113" width="2.5" height="12" rx="1.2"/>
  <rect x="360" y="120" width="2.5" height="12" rx="1.2"/>
  <rect x="395" y="109" width="2.5" height="12" rx="1.2"/>
  <rect x="145" y="128" width="2.5" height="10" rx="1.2"/>
  <rect x="175" y="135" width="2.5" height="10" rx="1.2"/>
  <rect x="210" y="138" width="2.5" height="10" rx="1.2"/>
  <rect x="240" y="130" width="2.5" height="10" rx="1.2"/>
  <rect x="275" y="140" width="2.5" height="10" rx="1.2"/>
  <rect x="310" y="133" width="2.5" height="10" rx="1.2"/>
  <rect x="350" y="142" width="2.5" height="10" rx="1.2"/>
  <rect x="545" y="108" width="2.5" height="12" rx="1.2"/>
  <rect x="575" y="116" width="2.5" height="12" rx="1.2"/>
  <rect x="610" y="104" width="2.5" height="12" rx="1.2"/>
  <rect x="645" y="120" width="2.5" height="12" rx="1.2"/>
  <rect x="680" y="112" width="2.5" height="12" rx="1.2"/>
</g>
<!-- House shadow -->
<ellipse cx="290" cy="412" rx="195" ry="14" fill="#000" opacity="0.22"/>
<!-- House walls -->
<rect x="95" y="245" width="380" height="170" fill="url(#wallG)" filter="url(#sh2)"/>
<!-- Window -->
<rect x="135" y="285" width="70" height="60" rx="3" fill="#aed6f1" stroke="#8b9fa8" stroke-width="2"/>
<line x1="170" y1="285" x2="170" y2="345" stroke="#8b9fa8" stroke-width="1.5"/>
<line x1="135" y1="315" x2="205" y2="315" stroke="#8b9fa8" stroke-width="1.5"/>
<!-- Door -->
<rect x="325" y="310" width="65" height="105" rx="4" fill="#8b5e3c" stroke="#6b452c" stroke-width="2"/>
<circle cx="381" cy="362" r="5" fill="#c7a040"/>
<!-- Roof peak -->
<polygon points="72,248 285,142 498,248" fill="url(#roofG)" filter="url(#sh2)"/>
<polygon points="72,248 285,142 295,148 82,256" fill="#6e4030"/>
<!-- Roof overhang -->
<line x1="72" y1="248" x2="498" y2="248" stroke="#6e4030" stroke-width="4"/>
<!-- Gutter on roof edge -->
<rect x="62" y="246" width="450" height="12" rx="5" fill="#546e7a" stroke="#37474f" stroke-width="1.5"/>
<!-- Gutter downspout left -->
<rect x="66" y="258" width="12" height="90" rx="4" fill="#607d8b"/>
<!-- Filter mesh box -->
<rect x="56" y="346" width="32" height="28" rx="4" fill="#455a64" stroke="#546e7a" stroke-width="1.5"/>
<text x="72" y="362" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" fill="#cfd8dc">FILTER</text>
<!-- Pipe from filter to tank -->
<path d="M72,374 Q72,395 200,395 Q340,395 340,400" fill="none" stroke="#607d8b" stroke-width="8" stroke-linejoin="round"/>
<path d="M72,374 Q72,395 200,395 Q340,395 340,400" fill="none" stroke="#78909c" stroke-width="3" stroke-linejoin="round"/>
<!-- Overflow pipe on right -->
<rect x="490" y="258" width="12" height="70" rx="4" fill="#607d8b"/>
<path d="M496,328 Q496,360 580,360" fill="none" stroke="#607d8b" stroke-width="8" stroke-linejoin="round"/>
<!-- Storage tank -->
<rect x="290" y="390" width="120" height="50" rx="8" fill="#2c3e50" filter="url(#sh2)"/>
<ellipse cx="350" cy="390" rx="60" ry="20" fill="#34495e"/>
<ellipse cx="350" cy="390" rx="58" ry="18" fill="url(#tankG)"/>
<!-- Water level -->
<rect x="292" y="406" width="116" height="32" rx="0" fill="url(#waterG)" opacity="0.75"/>
<rect x="292" y="406" width="116" height="5" rx="0" fill="#fff" opacity="0.12"/>
<!-- Tank top rim -->
<ellipse cx="350" cy="390" rx="60" ry="20" fill="none" stroke="#546e7a" stroke-width="2.5"/>
<!-- Tank shine -->
<ellipse cx="350" cy="390" rx="60" ry="20" fill="url(#tankShine)"/>
<!-- Tank legs -->
<rect x="302" y="436" width="15" height="24" rx="3" fill="#2c3e50"/>
<rect x="380" y="436" width="15" height="24" rx="3" fill="#2c3e50"/>
<!-- Tap on tank -->
<rect x="402" y="416" width="18" height="10" rx="3" fill="#bdc3c7"/>
<rect x="418" y="419" width="8" height="5" rx="2" fill="#95a5a6"/>
<!-- Water drop from tap -->
<ellipse cx="428" cy="432" rx="4" ry="6" fill="#5dade2" opacity="0.7"/>
<!-- Large ground tank right side -->
<ellipse cx="640" cy="350" rx="95" ry="28" fill="#263238"/>
<rect x="545" y="350" width="190" height="90" fill="#2c3e50" filter="url(#sh2)"/>
<ellipse cx="640" cy="440" rx="95" ry="28" fill="#263238"/>
<ellipse cx="640" cy="350" rx="93" ry="26" fill="url(#tankG)"/>
<rect x="547" y="380" width="186" height="68" fill="url(#waterG)" opacity="0.55"/>
<rect x="547" y="380" width="186" height="5" fill="#fff" opacity="0.15"/>
<ellipse cx="640" cy="350" rx="93" ry="26" fill="url(#tankShine)"/>
<ellipse cx="640" cy="350" rx="93" ry="26" fill="none" stroke="#546e7a" stroke-width="2"/>
<!-- Pipe from small tank to large tank -->
<path d="M420,430 Q500,430 543,395" fill="none" stroke="#607d8b" stroke-width="9" stroke-linejoin="round"/>
<path d="M420,430 Q500,430 543,395" fill="none" stroke="#78909c" stroke-width="3.5" stroke-linejoin="round"/>
<!-- Capacity text on large tank -->
<text x="640" y="405" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="12" fill="#90caf9" font-weight="600">5000 L</text>
<!-- Label card -->
<rect x="18" y="440" width="270" height="58" rx="7" fill="#000" fill-opacity="0.6"/>
<text x="153" y="463" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="700" fill="#fff">Rooftop Rainwater Harvesting</text>
<text x="153" y="484" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="11" fill="#90caf9">Water Management · Est. ₹1,500</text>
</svg>`;

const dripIrrigation = `<svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a3a1a"/><stop offset="100%" stop-color="#2e5c1a"/></linearGradient>
  <linearGradient id="soilG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6b4226"/><stop offset="100%" stop-color="#3e2212"/></linearGradient>
  <linearGradient id="tankBd" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#37474f"/><stop offset="50%" stop-color="#546e7a"/><stop offset="100%" stop-color="#37474f"/></linearGradient>
  <linearGradient id="waterIn" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#29b6f6"/><stop offset="100%" stop-color="#01579b"/></linearGradient>
  <radialGradient id="tankShine" cx="30%" cy="25%" r="55%"><stop offset="0%" stop-color="#fff" stop-opacity="0.25"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>
  <filter id="shd"><feDropShadow dx="3" dy="6" stdDeviation="5" flood-color="#000" flood-opacity="0.35"/></filter>
</defs>
<rect width="800" height="520" fill="url(#bg1)"/>
<!-- Sky with subtle gradient -->
<rect width="800" height="290" fill="#1b3a5c" opacity="0.7"/>
<!-- Sun -->
<circle cx="700" cy="68" r="42" fill="#ffd54f" opacity="0.85"/>
<g stroke="#ffd54f" stroke-width="2" stroke-linecap="round" opacity="0.5">
  <line x1="700" y1="18" x2="700" y2="8"/><line x1="700" y1="118" x2="700" y2="128"/>
  <line x1="650" y1="68" x2="640" y2="68"/><line x1="750" y1="68" x2="760" y2="68"/>
  <line x1="665" y1="33" x2="658" y2="26"/><line x1="735" y1="103" x2="742" y2="110"/>
  <line x1="735" y1="33" x2="742" y2="26"/><line x1="665" y1="103" x2="658" y2="110"/>
</g>
<!-- Ground -->
<rect y="360" width="800" height="160" fill="url(#soilG)"/>
<line x1="0" y1="374" x2="800" y2="374" stroke="#5c3010" stroke-width="1.5"/>
<!-- Plant rows -->
<g>
  <!-- Row of 5 plants -->
  <g transform="translate(100,0)">
    <rect x="0" y="310" width="10" height="55" rx="3" fill="#4e342e"/>
    <ellipse cx="5" cy="310" rx="30" ry="38" fill="#2e7d32"/>
    <ellipse cx="5" cy="295" rx="22" ry="28" fill="#388e3c"/>
    <ellipse cx="5" cy="285" rx="14" ry="18" fill="#43a047"/>
  </g>
  <g transform="translate(220,0)">
    <rect x="0" y="310" width="10" height="55" rx="3" fill="#4e342e"/>
    <ellipse cx="5" cy="310" rx="30" ry="38" fill="#2e7d32"/>
    <ellipse cx="5" cy="295" rx="22" ry="28" fill="#388e3c"/>
    <ellipse cx="5" cy="285" rx="14" ry="18" fill="#43a047"/>
  </g>
  <g transform="translate(340,0)">
    <rect x="0" y="310" width="10" height="55" rx="3" fill="#4e342e"/>
    <ellipse cx="5" cy="310" rx="30" ry="38" fill="#2e7d32"/>
    <ellipse cx="5" cy="295" rx="22" ry="28" fill="#388e3c"/>
    <ellipse cx="5" cy="285" rx="14" ry="18" fill="#43a047"/>
  </g>
  <g transform="translate(460,0)">
    <rect x="0" y="310" width="10" height="55" rx="3" fill="#4e342e"/>
    <ellipse cx="5" cy="310" rx="30" ry="38" fill="#2e7d32"/>
    <ellipse cx="5" cy="295" rx="22" ry="28" fill="#388e3c"/>
    <ellipse cx="5" cy="285" rx="14" ry="18" fill="#43a047"/>
  </g>
  <g transform="translate(580,0)">
    <rect x="0" y="310" width="10" height="55" rx="3" fill="#4e342e"/>
    <ellipse cx="5" cy="310" rx="30" ry="38" fill="#2e7d32"/>
    <ellipse cx="5" cy="295" rx="22" ry="28" fill="#388e3c"/>
    <ellipse cx="5" cy="285" rx="14" ry="18" fill="#43a047"/>
  </g>
</g>
<!-- Tank elevated on stand -->
<rect x="62" y="168" width="26" height="120" rx="4" fill="#455a64"/>
<rect x="106" y="168" width="26" height="120" rx="4" fill="#455a64"/>
<!-- Tank diagonal braces -->
<line x1="62" y1="288" x2="134" y2="168" stroke="#546e7a" stroke-width="5" stroke-linecap="round"/>
<line x1="134" y1="288" x2="62" y2="168" stroke="#546e7a" stroke-width="5" stroke-linecap="round"/>
<!-- Tank body -->
<ellipse cx="100" cy="145" rx="70" ry="24" fill="#455a64"/>
<rect x="30" y="145" width="140" height="130" fill="url(#tankBd)" filter="url(#shd)"/>
<ellipse cx="100" cy="275" rx="70" ry="24" fill="#37474f"/>
<ellipse cx="100" cy="275" rx="68" ry="22" fill="#455a64"/>
<!-- Water level -->
<rect x="32" y="178" width="136" height="95" fill="url(#waterIn)" opacity="0.65"/>
<rect x="32" y="178" width="136" height="8" rx="0" fill="#fff" opacity="0.18"/>
<!-- Tank shine overlay -->
<ellipse cx="100" cy="145" rx="70" ry="24" fill="url(#tankShine)"/>
<ellipse cx="100" cy="145" rx="70" ry="24" fill="none" stroke="#546e7a" stroke-width="2.5"/>
<!-- Capacity label -->
<text x="100" y="230" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="14" fill="#b0bec5" font-weight="600">500 L</text>
<!-- Main pipe from tank -->
<rect x="92" y="288" width="18" height="30" rx="4" fill="#607d8b"/>
<!-- Valve -->
<rect x="84" y="310" width="34" height="14" rx="5" fill="#78909c" stroke="#546e7a" stroke-width="1.5"/>
<rect x="100" y="305" width="7" height="12" rx="2" fill="#9e9e9e"/>
<!-- Lateral pipe main -->
<rect x="100" y="322" width="530" height="12" rx="5" fill="#607d8b"/>
<!-- Sub-laterals and drip emitters -->
<g>
  <rect x="105" y="334" width="8" height="32" rx="3" fill="#546e7a"/>
  <ellipse cx="109" cy="370" rx="5" ry="7" fill="#29b6f6" opacity="0.8"/>
  <ellipse cx="107" cy="378" rx="3" ry="4" fill="#039be5" opacity="0.7"/>
  <ellipse cx="111" cy="380" rx="3" ry="4" fill="#0288d1" opacity="0.6"/>

  <rect x="225" y="334" width="8" height="32" rx="3" fill="#546e7a"/>
  <ellipse cx="229" cy="370" rx="5" ry="7" fill="#29b6f6" opacity="0.8"/>
  <ellipse cx="227" cy="378" rx="3" ry="4" fill="#039be5" opacity="0.7"/>
  <ellipse cx="231" cy="380" rx="3" ry="4" fill="#0288d1" opacity="0.6"/>

  <rect x="345" y="334" width="8" height="32" rx="3" fill="#546e7a"/>
  <ellipse cx="349" cy="370" rx="5" ry="7" fill="#29b6f6" opacity="0.8"/>
  <ellipse cx="347" cy="378" rx="3" ry="4" fill="#039be5" opacity="0.7"/>
  <ellipse cx="351" cy="380" rx="3" ry="4" fill="#0288d1" opacity="0.6"/>

  <rect x="465" y="334" width="8" height="32" rx="3" fill="#546e7a"/>
  <ellipse cx="469" cy="370" rx="5" ry="7" fill="#29b6f6" opacity="0.8"/>
  <ellipse cx="467" cy="378" rx="3" ry="4" fill="#039be5" opacity="0.7"/>
  <ellipse cx="471" cy="380" rx="3" ry="4" fill="#0288d1" opacity="0.6"/>

  <rect x="585" y="334" width="8" height="32" rx="3" fill="#546e7a"/>
  <ellipse cx="589" cy="370" rx="5" ry="7" fill="#29b6f6" opacity="0.8"/>
  <ellipse cx="587" cy="378" rx="3" ry="4" fill="#039be5" opacity="0.7"/>
  <ellipse cx="591" cy="380" rx="3" ry="4" fill="#0288d1" opacity="0.6"/>
</g>
<!-- Soil moisture halos -->
<ellipse cx="109" cy="385" rx="30" ry="12" fill="#01579b" opacity="0.18"/>
<ellipse cx="229" cy="385" rx="30" ry="12" fill="#01579b" opacity="0.18"/>
<ellipse cx="349" cy="385" rx="30" ry="12" fill="#01579b" opacity="0.18"/>
<ellipse cx="469" cy="385" rx="30" ry="12" fill="#01579b" opacity="0.18"/>
<ellipse cx="589" cy="385" rx="30" ry="12" fill="#01579b" opacity="0.18"/>
<!-- Label -->
<rect x="18" y="440" width="260" height="58" rx="7" fill="#000" fill-opacity="0.65"/>
<text x="148" y="463" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="700" fill="#fff">Low Cost Drip Irrigation</text>
<text x="148" y="484" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="11" fill="#80cbc4">Water Conservation · Est. ₹3,200</text>
</svg>`;

const farmingTool = `<svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="wsBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1c2026"/><stop offset="100%" stop-color="#2d3540"/></linearGradient>
  <linearGradient id="steelG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#9e9e9e"/><stop offset="40%" stop-color="#e0e0e0"/><stop offset="100%" stop-color="#616161"/></linearGradient>
  <linearGradient id="handleG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a1887f"/><stop offset="100%" stop-color="#5d4037"/></linearGradient>
  <linearGradient id="tableG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4e342e"/><stop offset="100%" stop-color="#3e2723"/></linearGradient>
  <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="metalShd"><feDropShadow dx="4" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.5"/></filter>
</defs>
<rect width="800" height="520" fill="url(#wsBg)"/>
<!-- Workshop shelf/wall background -->
<rect x="0" y="0" width="800" height="380" fill="#1a2130" opacity="0.8"/>
<line x1="0" y1="380" x2="800" y2="380" stroke="#3a4555" stroke-width="2"/>
<!-- Workshop table -->
<rect x="40" y="330" width="720" height="50" rx="5" fill="url(#tableG)" filter="url(#metalShd)"/>
<rect x="40" y="330" width="720" height="8" rx="5" fill="#6d4c41"/>
<!-- Table legs -->
<rect x="65" y="378" width="25" height="80" rx="4" fill="#4e342e"/>
<rect x="710" y="378" width="25" height="80" rx="4" fill="#4e342e"/>
<!-- Background tools hanging -->
<g opacity="0.25">
  <rect x="75" y="60" width="8" height="200" rx="4" fill="#9e9e9e"/>
  <ellipse cx="79" cy="60" rx="14" ry="10" fill="#9e9e9e"/>
  <rect x="130" y="40" width="8" height="160" rx="4" fill="#9e9e9e"/>
  <ellipse cx="134" cy="40" rx="18" ry="12" fill="#9e9e9e"/>
  <rect x="660" y="50" width="8" height="180" rx="4" fill="#9e9e9e"/>
  <polygon points="655,50 675,50 664,20" fill="#9e9e9e"/>
  <rect x="710" y="70" width="8" height="150" rx="4" fill="#9e9e9e"/>
  <ellipse cx="714" cy="70" rx="16" ry="14" fill="#9e9e9e"/>
  <ellipse cx="714" cy="70" rx="8" ry="7" fill="#1c2026"/>
</g>
<!-- MAIN MULTI-PURPOSE TOOL -->
<!-- Handle -->
<rect x="350" y="200" width="28" height="220" rx="10" fill="url(#handleG)" filter="url(#metalShd)"/>
<rect x="353" y="205" width="7" height="210" rx="3" fill="#a1887f" opacity="0.4"/>
<!-- Handle wrap grooves -->
<g fill="none" stroke="#4e342e" stroke-width="2.5" opacity="0.5">
  <line x1="350" y1="245" x2="378" y2="245"/>
  <line x1="350" y1="265" x2="378" y2="265"/>
  <line x1="350" y1="285" x2="378" y2="285"/>
  <line x1="350" y1="305" x2="378" y2="305"/>
  <line x1="350" y1="325" x2="378" y2="325"/>
  <line x1="350" y1="345" x2="378" y2="345"/>
  <line x1="350" y1="365" x2="378" y2="365"/>
  <line x1="350" y1="385" x2="378" y2="385"/>
</g>
<!-- Collar / tang section -->
<rect x="343" y="192" width="42" height="20" rx="5" fill="#616161" stroke="#424242" stroke-width="2"/>
<!-- Attachment: trowel head top -->
<polygon points="310,100 418,100 440,195 288,195" fill="url(#steelG)" filter="url(#metalShd)"/>
<!-- Cutting edge bevel top -->
<polygon points="310,100 418,100 422,108 306,108" fill="#e0e0e0"/>
<!-- Center ridge on blade -->
<line x1="364" y1="100" x2="364" y2="195" stroke="#bdbdbd" stroke-width="2.5"/>
<!-- Tilling teeth bottom of attachment -->
<g fill="url(#steelG)" filter="url(#metalShd)">
  <polygon points="310,356 334,356 334,420 322,440 310,420"/>
  <polygon points="340,356 364,356 364,420 352,440 340,420"/>
  <polygon points="370,356 394,356 394,420 382,440 370,420"/>
  <!-- Tooth edge highlights -->
  <polygon points="310,356 312,356 312,418 310,420" fill="#e0e0e0"/>
  <polygon points="340,356 342,356 342,418 340,420" fill="#e0e0e0"/>
  <polygon points="370,356 372,356 372,418 370,420" fill="#e0e0e0"/>
</g>
<!-- Connector plate between handle and teeth -->
<rect x="296" y="325" width="136" height="38" rx="5" fill="#757575" stroke="#424242" stroke-width="2"/>
<!-- Bolts on plate -->
<circle cx="312" cy="344" r="6" fill="#424242" stroke="#9e9e9e" stroke-width="1.5"/>
<circle cx="416" cy="344" r="6" fill="#424242" stroke="#9e9e9e" stroke-width="1.5"/>
<circle cx="364" cy="336" r="6" fill="#424242" stroke="#9e9e9e" stroke-width="1.5"/>
<circle cx="364" cy="356" r="6" fill="#424242" stroke="#9e9e9e" stroke-width="1.5"/>
<!-- Metric ruler alongside -->
<rect x="470" y="120" width="22" height="310" rx="4" fill="#f5f5f5" stroke="#9e9e9e" stroke-width="1.5"/>
<g fill="none" stroke="#9e9e9e" stroke-width="1">
  <line x1="470" y1="150" x2="492" y2="150"/>
  <line x1="470" y1="170" x2="492" y2="170"/>
  <line x1="470" y1="190" x2="492" y2="190"/>
  <line x1="470" y1="210" x2="492" y2="210"/>
  <line x1="470" y1="230" x2="492" y2="230"/>
  <line x1="470" y1="250" x2="492" y2="250"/>
  <line x1="470" y1="270" x2="492" y2="270"/>
  <line x1="470" y1="290" x2="492" y2="290"/>
  <line x1="470" y1="310" x2="492" y2="310"/>
  <line x1="470" y1="330" x2="492" y2="330"/>
  <line x1="470" y1="350" x2="492" y2="350"/>
  <line x1="470" y1="370" x2="492" y2="370"/>
  <line x1="470" y1="390" x2="492" y2="390"/>
  <line x1="470" y1="410" x2="492" y2="410"/>
</g>
<!-- Annotation lines -->
<line x1="440" y1="148" x2="535" y2="148" stroke="#ffd54f" stroke-width="1.2" stroke-dasharray="6 4" opacity="0.7"/>
<text x="538" y="152" font-family="Arial,sans-serif" font-size="11" fill="#ffd54f">Hardened steel blade</text>
<line x1="382" y1="218" x2="535" y2="218" stroke="#90caf9" stroke-width="1.2" stroke-dasharray="6 4" opacity="0.7"/>
<text x="538" y="222" font-family="Arial,sans-serif" font-size="11" fill="#90caf9">Quick-release collar</text>
<line x1="394" y1="390" x2="535" y2="390" stroke="#a5d6a7" stroke-width="1.2" stroke-dasharray="6 4" opacity="0.7"/>
<text x="538" y="394" font-family="Arial,sans-serif" font-size="11" fill="#a5d6a7">Tilling teeth (3 prongs)</text>
<line x1="378" y1="330" x2="535" y2="295" stroke="#ef9a9a" stroke-width="1.2" stroke-dasharray="6 4" opacity="0.7"/>
<text x="538" y="299" font-family="Arial,sans-serif" font-size="11" fill="#ef9a9a">Wooden handle</text>
<!-- Label -->
<rect x="18" y="436" width="290" height="62" rx="7" fill="#000" fill-opacity="0.62"/>
<text x="163" y="459" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="700" fill="#fff">Manual Multi-Purpose Farming Tool</text>
<text x="163" y="481" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="11" fill="#80cbc4">Field Equipment · Est. ₹850</text>
</svg>`;

const bicyclePump = `<svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="fieldBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1565c0"/><stop offset="60%" stop-color="#1976d2"/><stop offset="100%" stop-color="#0d47a1"/></linearGradient>
  <linearGradient id="landG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#388e3c"/><stop offset="30%" stop-color="#2e7d32"/><stop offset="100%" stop-color="#6d4c41"/></linearGradient>
  <linearGradient id="steelBike" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ef5350"/><stop offset="100%" stop-color="#b71c1c"/></linearGradient>
  <linearGradient id="wheelG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#616161"/><stop offset="100%" stop-color="#212121"/></linearGradient>
  <linearGradient id="waterG2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#40c4ff"/><stop offset="100%" stop-color="#0277bd"/></linearGradient>
  <filter id="shBike"><feDropShadow dx="3" dy="6" stdDeviation="5" flood-color="#000" flood-opacity="0.4"/></filter>
</defs>
<rect width="800" height="520" fill="url(#fieldBg)"/>
<!-- Sky clouds -->
<ellipse cx="200" cy="70" rx="100" ry="38" fill="#1e88e5" opacity="0.4"/>
<ellipse cx="150" cy="78" rx="70" ry="30" fill="#1e88e5" opacity="0.3"/>
<ellipse cx="600" cy="55" rx="90" ry="36" fill="#1e88e5" opacity="0.35"/>
<!-- Ground -->
<rect y="360" width="800" height="160" fill="url(#landG)"/>
<line x1="0" y1="374" x2="800" y2="374" stroke="#33691e" stroke-width="2"/>
<!-- Water canal -->
<rect x="0" y="390" width="160" height="30" rx="8" fill="#0277bd" opacity="0.4"/>
<!-- Ground shadow for bicycle -->
<ellipse cx="350" cy="372" rx="200" ry="16" fill="#000" opacity="0.25"/>
<!-- BICYCLE FRAME -->
<!-- Rear wheel -->
<circle cx="200" cy="340" r="78" fill="url(#wheelG)" filter="url(#shBike)"/>
<circle cx="200" cy="340" r="74" fill="none" stroke="#424242" stroke-width="6"/>
<circle cx="200" cy="340" r="60" fill="none" stroke="#757575" stroke-width="2.5"/>
<circle cx="200" cy="340" r="14" fill="#424242"/>
<circle cx="200" cy="340" r="10" fill="#616161"/>
<!-- Rear wheel spokes -->
<g stroke="#9e9e9e" stroke-width="1.5">
  <line x1="200" y1="266" x2="200" y2="326"/><line x1="200" y1="354" x2="200" y2="414"/>
  <line x1="126" y1="340" x2="186" y2="340"/><line x1="214" y1="340" x2="274" y2="340"/>
  <line x1="148" y1="288" x2="191" y2="330"/><line x1="209" y1="350" x2="252" y2="392"/>
  <line x1="252" y1="288" x2="209" y2="330"/><line x1="148" y1="392" x2="191" y2="350"/>
</g>
<!-- Front wheel -->
<circle cx="500" cy="340" r="78" fill="url(#wheelG)" filter="url(#shBike)"/>
<circle cx="500" cy="340" r="74" fill="none" stroke="#424242" stroke-width="6"/>
<circle cx="500" cy="340" r="60" fill="none" stroke="#757575" stroke-width="2.5"/>
<circle cx="500" cy="340" r="14" fill="#424242"/>
<circle cx="500" cy="340" r="10" fill="#616161"/>
<!-- Front wheel spokes -->
<g stroke="#9e9e9e" stroke-width="1.5">
  <line x1="500" y1="266" x2="500" y2="326"/><line x1="500" y1="354" x2="500" y2="414"/>
  <line x1="426" y1="340" x2="486" y2="340"/><line x1="514" y1="340" x2="574" y2="340"/>
  <line x1="448" y1="288" x2="491" y2="330"/><line x1="509" y1="350" x2="552" y2="392"/>
  <line x1="552" y1="288" x2="509" y2="330"/><line x1="448" y1="392" x2="491" y2="350"/>
</g>
<!-- Frame: chain stay, seat stay, top tube, down tube, seat tube -->
<g fill="url(#steelBike)" filter="url(#shBike)">
  <!-- Chain stay -->
  <polygon points="200,340 340,300 350,312 208,352"/>
  <!-- Seat stay -->
  <polygon points="200,330 268,200 280,206 212,336"/>
  <!-- Top tube -->
  <polygon points="270,200 440,192 440,204 270,212"/>
  <!-- Down tube -->
  <polygon points="440,200 350,310 356,322 448,208"/>
  <!-- Seat tube -->
  <polygon points="332,295 350,190 362,190 350,300"/>
</g>
<!-- Fork -->
<polygon points="440,200 500,340 508,338 448,198" fill="url(#steelBike)"/>
<polygon points="440,200 492,340 500,340 448,198" fill="#c62828"/>
<!-- Seat -->
<ellipse cx="284" cy="186" rx="42" ry="12" fill="#212121" stroke="#424242" stroke-width="2"/>
<rect x="282" y="186" width="10" height="20" rx="3" fill="#424242"/>
<!-- Handlebars -->
<rect x="432" y="168" width="10" height="38" rx="4" fill="#424242"/>
<rect x="416" y="168" width="40" height="10" rx="5" fill="#616161"/>
<rect x="416" y="165" width="12" height="16" rx="4" fill="#212121"/>
<rect x="448" y="165" width="12" height="16" rx="4" fill="#212121"/>
<!-- Pedal/crank -->
<circle cx="350" cy="300" r="16" fill="#424242" stroke="#616161" stroke-width="2"/>
<line x1="334" y1="300" x2="318" y2="322" stroke="#616161" stroke-width="6" stroke-linecap="round"/>
<rect x="308" y="318" width="32" height="9" rx="4" fill="#9e9e9e"/>
<!-- PUMP MECHANISM attached to crank/wheel -->
<!-- Pump cylinder -->
<rect x="195" y="256" width="24" height="88" rx="8" fill="#607d8b" stroke="#455a64" stroke-width="2" filter="url(#shBike)"/>
<rect x="199" y="258" width="8" height="84" rx="4" fill="#90a4ae" opacity="0.4"/>
<!-- Pump piston rod connecting to crank -->
<line x1="207" y1="256" x2="340" y2="300" stroke="#78909c" stroke-width="8" stroke-linecap="round"/>
<line x1="207" y1="256" x2="340" y2="300" stroke="#b0bec5" stroke-width="3" stroke-linecap="round"/>
<!-- Pump output pipe going to field -->
<path d="M207,342 Q180,360 120,368 Q80,372 60,385" fill="none" stroke="#607d8b" stroke-width="10" stroke-linecap="round"/>
<path d="M207,342 Q180,360 120,368 Q80,372 60,385" fill="none" stroke="#90a4ae" stroke-width="4" stroke-linecap="round"/>
<!-- Water stream from output -->
<path d="M55,385 Q40,398 20,415" fill="none" stroke="url(#waterG2)" stroke-width="6" stroke-linecap="round" opacity="0.85"/>
<!-- Water droplets -->
<ellipse cx="18" cy="418" rx="5" ry="7" fill="#40c4ff" opacity="0.75"/>
<ellipse cx="30" cy="428" rx="4" ry="5" fill="#29b6f6" opacity="0.65"/>
<ellipse cx="8" cy="432" rx="4" ry="6" fill="#4fc3f7" opacity="0.7"/>
<!-- Label -->
<rect x="530" y="200" width="250" height="62" rx="7" fill="#000" fill-opacity="0.65"/>
<text x="655" y="223" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">Bicycle-Powered Water Pump</text>
<text x="655" y="245" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="11" fill="#80cbc4">Irrigation Tech · Est. ₹1,200</text>
</svg>`;

const grainCleaner = `<svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="shopBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a1a2e"/><stop offset="100%" stop-color="#16213e"/></linearGradient>
  <linearGradient id="woodBox" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8d6e63"/><stop offset="100%" stop-color="#4e342e"/></linearGradient>
  <linearGradient id="woodSide2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#6d4c41"/><stop offset="100%" stop-color="#4e342e"/></linearGradient>
  <linearGradient id="metalDisc" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#b0bec5"/><stop offset="50%" stop-color="#eceff1"/><stop offset="100%" stop-color="#78909c"/></linearGradient>
  <linearGradient id="grainIn" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f9a825"/><stop offset="100%" stop-color="#e65100"/></linearGradient>
  <filter id="shMach"><feDropShadow dx="5" dy="10" stdDeviation="8" flood-color="#000" flood-opacity="0.5"/></filter>
  <filter id="shSoft"><feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000" flood-opacity="0.3"/></filter>
</defs>
<rect width="800" height="520" fill="url(#shopBg)"/>
<!-- Barn/workshop background planks -->
<g fill="#1a1a2e" stroke="#0d0d1a" stroke-width="1">
  <rect x="0" y="0" width="65" height="520"/>
  <rect x="68" y="0" width="65" height="520"/>
  <rect x="136" y="0" width="65" height="520"/>
  <rect x="204" y="0" width="65" height="520"/>
  <rect x="272" y="0" width="800" height="520"/>
</g>
<!-- Floor -->
<rect y="420" width="800" height="100" fill="#212121"/>
<line x1="0" y1="422" x2="800" y2="422" stroke="#333" stroke-width="2"/>
<!-- Ground shadow -->
<ellipse cx="375" cy="424" rx="240" ry="12" fill="#000" opacity="0.3"/>
<!-- Main machine body (wooden box) -->
<polygon points="140,140 530,140 510,420 160,420" fill="url(#woodBox)" filter="url(#shMach)"/>
<!-- Side shading -->
<polygon points="530,140 570,155 548,424 510,420" fill="url(#woodSide2)"/>
<!-- Wood grain lines on front -->
<g stroke="#5d4037" stroke-width="1" opacity="0.3">
  <line x1="145" y1="160" x2="520" y2="160"/>
  <line x1="148" y1="200" x2="518" y2="200"/>
  <line x1="152" y1="240" x2="514" y2="240"/>
  <line x1="156" y1="280" x2="510" y2="280"/>
  <line x1="160" y1="320" x2="506" y2="320"/>
  <line x1="163" y1="360" x2="502" y2="360"/>
  <line x1="166" y1="400" x2="500" y2="400"/>
</g>
<!-- Top frame of box -->
<rect x="136" y="134" width="398" height="20" rx="4" fill="#a1887f" stroke="#6d4c41" stroke-width="2"/>
<!-- Fan disc (circle side view) -->
<circle cx="360" cy="245" r="88" fill="url(#metalDisc)" filter="url(#shSoft)"/>
<circle cx="360" cy="245" r="82" fill="none" stroke="#90a4ae" stroke-width="2.5"/>
<!-- Fan blades -->
<g fill="#9e9e9e" stroke="#78909c" stroke-width="1">
  <polygon points="360,200 372,240 360,248 348,240"/>
  <polygon points="360,290 372,250 360,242 348,250"/>
  <polygon points="315,245 355,233 363,245 355,257"/>
  <polygon points="405,245 365,233 357,245 365,257"/>
  <polygon points="326,211 354,238 352,248 340,244"/>
  <polygon points="394,279 366,252 368,242 380,246"/>
  <polygon points="394,211 366,238 368,248 380,244"/>
  <polygon points="326,279 354,252 352,242 340,246"/>
</g>
<!-- Fan hub -->
<circle cx="360" cy="245" r="22" fill="#546e7a" stroke="#37474f" stroke-width="2"/>
<circle cx="360" cy="245" r="12" fill="#37474f"/>
<circle cx="360" cy="245" r="6" fill="#263238"/>
<!-- Fan axle shaft sticking out right -->
<rect x="440" y="240" width="60" height="14" rx="5" fill="#78909c"/>
<!-- Hand crank -->
<circle cx="530" cy="247" r="22" fill="url(#metalDisc)" stroke="#546e7a" stroke-width="2.5"/>
<circle cx="530" cy="247" r="10" fill="#455a64"/>
<rect x="526" y="225" width="8" height="40" rx="3" fill="#9e9e9e"/>
<circle cx="530" cy="222" r="8" fill="#263238" stroke="#546e7a" stroke-width="1.5"/>
<!-- Grain input hopper on top -->
<polygon points="270,80 440,80 420,138 290,138" fill="#a1887f" stroke="#6d4c41" stroke-width="2"/>
<polygon points="270,80 290,80 290,138 270,138" fill="#8d6e63" opacity="0.6"/>
<!-- Hopper opening top -->
<ellipse cx="355" cy="80" rx="85" ry="18" fill="#795548" stroke="#6d4c41" stroke-width="2"/>
<!-- Grain particles falling into hopper -->
<g fill="url(#grainIn)">
  <ellipse cx="340" cy="64" rx="5" ry="4"/>
  <ellipse cx="362" cy="58" rx="5" ry="4"/>
  <ellipse cx="380" cy="67" rx="5" ry="4"/>
  <ellipse cx="352" cy="50" rx="4" ry="3"/>
  <ellipse cx="373" cy="50" rx="4" ry="3"/>
  <ellipse cx="330" cy="53" rx="4" ry="3"/>
  <ellipse cx="345" cy="42" rx="3.5" ry="3"/>
  <ellipse cx="365" cy="40" rx="3.5" ry="3"/>
  <ellipse cx="382" cy="44" rx="3" ry="2.5"/>
</g>
<!-- Grain stream through machine interior -->
<g fill="url(#grainIn)" opacity="0.55">
  <ellipse cx="330" cy="155" rx="4" ry="3"/>
  <ellipse cx="350" cy="168" rx="4" ry="3"/>
  <ellipse cx="370" cy="160" rx="4" ry="3"/>
  <ellipse cx="340" cy="180" rx="4" ry="3"/>
  <ellipse cx="360" cy="190" rx="4" ry="3"/>
  <ellipse cx="380" cy="178" rx="4" ry="3"/>
</g>
<!-- Cleaned grain output tray -->
<polygon points="155,390 260,390 280,420 135,420" fill="#5d4037" stroke="#4e342e" stroke-width="2"/>
<polygon points="260,390 280,420 285,416 265,386" fill="#4e342e"/>
<!-- Grain in output tray -->
<g fill="#f9a825">
  <ellipse cx="175" cy="408" rx="5" ry="4"/>
  <ellipse cx="193" cy="405" rx="5" ry="4"/>
  <ellipse cx="211" cy="408" rx="5" ry="4"/>
  <ellipse cx="229" cy="405" rx="5" ry="4"/>
  <ellipse cx="247" cy="408" rx="5" ry="4"/>
  <ellipse cx="186" cy="413" rx="4" ry="3"/>
  <ellipse cx="204" cy="415" rx="4" ry="3"/>
  <ellipse cx="222" cy="413" rx="4" ry="3"/>
  <ellipse cx="240" cy="415" rx="4" ry="3"/>
</g>
<!-- Chaff/waste output on right -->
<path d="M508,390 Q540,395 560,418" fill="none" stroke="#8d6e63" stroke-width="10" stroke-linecap="round"/>
<g fill="#8d6e63" opacity="0.6">
  <ellipse cx="566" cy="416" rx="9" ry="5"/>
  <ellipse cx="575" cy="422" rx="7" ry="4"/>
  <ellipse cx="556" cy="423" rx="8" ry="5"/>
  <ellipse cx="582" cy="415" rx="6" ry="4"/>
</g>
<!-- Labels with arrows -->
<rect x="590" y="60" width="190" height="42" rx="6" fill="#000" fill-opacity="0.5"/>
<text x="685" y="78" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#ffd54f">Grain Input Hopper</text>
<line x1="440" y1="78" x2="590" y2="78" stroke="#ffd54f" stroke-width="1.2" stroke-dasharray="5 4" opacity="0.7"/>
<text x="685" y="96" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#90caf9">Hand-cranked Fan</text>
<line x1="530" y1="247" x2="590" y2="96" stroke="#90caf9" stroke-width="1.2" stroke-dasharray="5 4" opacity="0.7"/>
<!-- Label card -->
<rect x="18" y="440" width="270" height="58" rx="7" fill="#000" fill-opacity="0.62"/>
<text x="153" y="462" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="700" fill="#fff">Portable Grain Cleaning Machine</text>
<text x="153" y="483" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="11" fill="#ffd54f">Post-Harvest · Est. ₹2,100</text>
</svg>`;

const solarDryer2 = `<svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a2e1a"/><stop offset="100%" stop-color="#2a4a2a"/></linearGradient>
  <linearGradient id="panelFill" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0a1628"/><stop offset="100%" stop-color="#0d2b50"/></linearGradient>
  <linearGradient id="absorberG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a1a1a"/><stop offset="100%" stop-color="#0a0a0a"/></linearGradient>
  <linearGradient id="hotAirG" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ff8f00" stop-opacity="0.6"/><stop offset="100%" stop-color="#ff8f00" stop-opacity="0"/></linearGradient>
  <filter id="glowHot"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect width="800" height="520" fill="url(#bg2)"/>
<rect width="800" height="520" fill="#111" opacity="0.4"/>
<!-- Cross-section title background -->
<rect width="800" height="50" fill="#000" opacity="0.5"/>
<text x="400" y="32" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="17" font-weight="700" fill="#fff" letter-spacing="1">CROSS-SECTION TECHNICAL VIEW — SOLAR DRYER</text>
<!-- Solar glazing (transparent cover) -->
<polygon points="60,80 680,80 680,180 60,430" fill="none" stroke="#64b5f6" stroke-width="2" stroke-dasharray="6 3"/>
<polygon points="60,80 680,80 680,180 60,430" fill="#a8d8f0" opacity="0.12"/>
<text x="200" y="72" font-family="Arial,sans-serif" font-size="11" fill="#64b5f6">Glass Cover (4mm tempered)</text>
<!-- Absrober plate -->
<polygon points="70,150 670,150 670,180 70,420" fill="url(#absorberG)"/>
<polygon points="70,150 670,150 674,155 74,155" fill="#333"/>
<text x="200" y="144" font-family="Arial,sans-serif" font-size="11" fill="#ef9a9a">Black Absorber Plate</text>
<!-- Insulation layer bottom -->
<polygon points="70,420 670,180 674,185 74,425" fill="#5d4037"/>
<polygon points="74,425 674,185 674,210 74,450" fill="#795548"/>
<text x="530" y="172" font-family="Arial,sans-serif" font-size="11" fill="#bcaaa4">Insulation Layer</text>
<line x1="530" y1="175" x2="530" y2="198" stroke="#bcaaa4" stroke-width="1.2" stroke-dasharray="4 3"/>
<!-- Drying chamber -->
<polygon points="70,155 670,155 670,180 70,420" fill="#1e1e1e" opacity="0.7"/>
<!-- Shelves in cross-section -->
<line x1="75" y1="238" x2="668" y2="218" stroke="#607d8b" stroke-width="4"/>
<line x1="75" y1="305" x2="668" y2="280" stroke="#607d8b" stroke-width="4"/>
<line x1="75" y1="370" x2="668" y2="340" stroke="#607d8b" stroke-width="4"/>
<!-- Air flow paths (arrows through drying channel) -->
<g opacity="0.75">
  <!-- Entry cool air left -->
  <path d="M60,415 L90,395" stroke="#80cbc4" stroke-width="2.5" fill="none" marker-end="url(#arrowCool)"/>
  <path d="M90,395 L350,298 L620,222" stroke="#ff8f00" stroke-width="2.5" fill="none" opacity="0.55"/>
  <path d="M90,370 L350,270 L620,196" stroke="#ff8f00" stroke-width="2.5" fill="none" opacity="0.4"/>
  <path d="M90,345 L350,246 L620,172" stroke="#ff8f00" stroke-width="2.5" fill="none" opacity="0.3"/>
  <!-- Exit hot air right arrows -->
  <polygon points="668,162 680,158 672,170" fill="#ff8f00" opacity="0.7"/>
  <polygon points="668,180 680,176 672,188" fill="#ff8f00" opacity="0.55"/>
</g>
<!-- Sun rays entering from top -->
<g stroke="#fdd835" stroke-width="1.8" stroke-dasharray="8 5" opacity="0.5">
  <line x1="150" y1="82" x2="150" y2="155"/>
  <line x1="250" y1="82" x2="250" y2="155"/>
  <line x1="350" y1="82" x2="350" y2="155"/>
  <line x1="450" y1="82" x2="450" y2="155"/>
  <line x1="550" y1="82" x2="550" y2="163"/>
  <line x1="640" y1="82" x2="640" y2="167"/>
</g>
<!-- Produce on shelves (side slices) -->
<g fill="#c62828" opacity="0.75">
  <ellipse cx="140" cy="232" rx="9" ry="6"/>
  <ellipse cx="180" cy="231" rx="9" ry="6"/>
  <ellipse cx="220" cy="230" rx="9" ry="6"/>
  <ellipse cx="260" cy="229" rx="9" ry="6"/>
  <ellipse cx="300" cy="228" rx="9" ry="6"/>
  <ellipse cx="340" cy="227" rx="9" ry="6"/>
  <ellipse cx="380" cy="226" rx="9" ry="6"/>
  <ellipse cx="420" cy="225" rx="9" ry="6"/>
  <ellipse cx="460" cy="224" rx="9" ry="6"/>
  <ellipse cx="500" cy="223" rx="9" ry="6"/>
</g>
<g fill="#f9a825" opacity="0.75">
  <ellipse cx="140" cy="299" rx="10" ry="5"/>
  <ellipse cx="182" cy="297" rx="10" ry="5"/>
  <ellipse cx="224" cy="295" rx="10" ry="5"/>
  <ellipse cx="266" cy="293" rx="10" ry="5"/>
  <ellipse cx="308" cy="291" rx="10" ry="5"/>
  <ellipse cx="350" cy="290" rx="10" ry="5"/>
  <ellipse cx="392" cy="288" rx="10" ry="5"/>
  <ellipse cx="434" cy="286" rx="10" ry="5"/>
  <ellipse cx="476" cy="284" rx="10" ry="5"/>
</g>
<g fill="#388e3c" opacity="0.7">
  <ellipse cx="140" cy="365" rx="11" ry="5"/>
  <ellipse cx="184" cy="362" rx="11" ry="5"/>
  <ellipse cx="228" cy="359" rx="11" ry="5"/>
  <ellipse cx="272" cy="356" rx="11" ry="5"/>
  <ellipse cx="316" cy="354" rx="11" ry="5"/>
  <ellipse cx="360" cy="351" rx="11" ry="5"/>
  <ellipse cx="404" cy="348" rx="11" ry="5"/>
  <ellipse cx="448" cy="346" rx="11" ry="5"/>
</g>
<!-- Temperature indicators -->
<rect x="700" y="100" width="80" height="120" rx="6" fill="#000" fill-opacity="0.55"/>
<text x="740" y="120" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#ccc">TEMP.</text>
<text x="740" y="138" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#ff8f00" font-weight="700">62°C</text>
<text x="740" y="154" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="#ccc">Chamber</text>
<line x1="720" y1="162" x2="760" y2="162" stroke="#333" stroke-width="1"/>
<text x="740" y="178" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#4fc3f7" font-weight="700">28°C</text>
<text x="740" y="194" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="#ccc">Ambient</text>
<!-- Legend -->
<rect x="700" y="240" width="85" height="100" rx="6" fill="#000" fill-opacity="0.5"/>
<line x1="710" y1="258" x2="730" y2="258" stroke="#ff8f00" stroke-width="2.5"/>
<text x="734" y="261" font-family="Arial,sans-serif" font-size="10" fill="#ff8f00">Hot air</text>
<line x1="710" y1="276" x2="730" y2="276" stroke="#80cbc4" stroke-width="2.5"/>
<text x="734" y="279" font-family="Arial,sans-serif" font-size="10" fill="#80cbc4">Cool air</text>
<line x1="710" y1="294" x2="730" y2="294" stroke="#fdd835" stroke-width="2.5" stroke-dasharray="6 4"/>
<text x="734" y="297" font-family="Arial,sans-serif" font-size="10" fill="#fdd835">Solar ray</text>
<line x1="710" y1="312" x2="730" y2="312" stroke="#607d8b" stroke-width="3"/>
<text x="734" y="315" font-family="Arial,sans-serif" font-size="10" fill="#90a4ae">Shelf wire</text>
<!-- Label card -->
<rect x="18" y="450" width="280" height="54" rx="7" fill="#000" fill-opacity="0.62"/>
<text x="158" y="472" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">Solar Dryer — Technical Cross-Section</text>
<text x="158" y="492" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="11" fill="#fdd835">Post-Harvest Technology · Ravi Kumar</text>
</svg>`;

/* ── FARMER AVATARS ───────────────────────────────────────────── */

const makeFarmerSVG = (name, bg1, bg2, skinLight, skinDark, shirtColor, shirtDark, turbanColor, turbDark, detailColor) => `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="bgG_${name}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${bg1}"/>
    <stop offset="100%" stop-color="${bg2}"/>
  </linearGradient>
  <linearGradient id="skinG_${name}" x1="0.3" y1="0" x2="0.7" y2="1">
    <stop offset="0%" stop-color="${skinLight}"/>
    <stop offset="100%" stop-color="${skinDark}"/>
  </linearGradient>
  <linearGradient id="shirtG_${name}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${shirtColor}"/>
    <stop offset="100%" stop-color="${shirtDark}"/>
  </linearGradient>
  <linearGradient id="turbanG_${name}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${turbanColor}"/>
    <stop offset="100%" stop-color="${turbDark}"/>
  </linearGradient>
  <radialGradient id="faceLight_${name}" cx="38%" cy="30%" r="60%">
    <stop offset="0%" stop-color="${skinLight}" stop-opacity="0.7"/>
    <stop offset="100%" stop-color="${skinDark}" stop-opacity="0"/>
  </radialGradient>
  <clipPath id="circleClip_${name}">
    <circle cx="100" cy="100" r="98"/>
  </clipPath>
  <filter id="soften_${name}"><feGaussianBlur stdDeviation="1.2"/></filter>
</defs>
<circle cx="100" cy="100" r="100" fill="url(#bgG_${name})"/>
<!-- Shoulder / body -->
<ellipse cx="100" cy="196" rx="75" ry="50" fill="url(#shirtG_${name})" clip-path="url(#circleClip_${name})"/>
<ellipse cx="100" cy="178" rx="55" ry="22" fill="url(#shirtG_${name})"/>
<!-- Neck -->
<rect x="88" y="148" width="24" height="28" rx="10" fill="url(#skinG_${name})"/>
<!-- Head shape - slightly oval, natural proportions -->
<ellipse cx="100" cy="112" rx="42" ry="46" fill="url(#skinG_${name})"/>
<!-- Face lighting -->
<ellipse cx="100" cy="112" rx="42" ry="46" fill="url(#faceLight_${name})"/>
<!-- Ear left -->
<ellipse cx="58" cy="116" rx="8" ry="11" fill="${skinDark}"/>
<ellipse cx="59" cy="116" rx="5" ry="8" fill="${skinLight}" opacity="0.5"/>
<!-- Ear right -->
<ellipse cx="142" cy="116" rx="8" ry="11" fill="${skinDark}"/>
<ellipse cx="141" cy="116" rx="5" ry="8" fill="${skinLight}" opacity="0.5"/>
<!-- Eyebrows -->
<path d="M78,96 Q87,91 96,95" fill="none" stroke="#3d2b1f" stroke-width="2.5" stroke-linecap="round"/>
<path d="M104,95 Q113,91 122,96" fill="none" stroke="#3d2b1f" stroke-width="2.5" stroke-linecap="round"/>
<!-- Eye sockets (shadow) -->
<ellipse cx="87" cy="108" rx="11" ry="8" fill="${skinDark}" opacity="0.35"/>
<ellipse cx="113" cy="108" rx="11" ry="8" fill="${skinDark}" opacity="0.35"/>
<!-- Eyes: whites -->
<ellipse cx="87" cy="108" rx="9" ry="7" fill="#fff"/>
<ellipse cx="113" cy="108" rx="9" ry="7" fill="#fff"/>
<!-- Irises -->
<circle cx="87" cy="108" r="5.5" fill="${detailColor}"/>
<circle cx="113" cy="108" r="5.5" fill="${detailColor}"/>
<!-- Pupils -->
<circle cx="87" cy="108" r="3" fill="#1a1a1a"/>
<circle cx="113" cy="108" r="3" fill="#1a1a1a"/>
<!-- Eye catch lights -->
<circle cx="89" cy="106" r="1.5" fill="#fff"/>
<circle cx="115" cy="106" r="1.5" fill="#fff"/>
<!-- Lower eyelid shadow -->
<path d="M78,111 Q87,116 96,111" fill="none" stroke="${skinDark}" stroke-width="1.2" opacity="0.4" stroke-linecap="round"/>
<path d="M104,111 Q113,116 122,111" fill="none" stroke="${skinDark}" stroke-width="1.2" opacity="0.4" stroke-linecap="round"/>
<!-- Nose bridge shadow -->
<line x1="100" y1="100" x2="100" y2="124" stroke="${skinDark}" stroke-width="1.5" opacity="0.3"/>
<!-- Nose -->
<ellipse cx="100" cy="124" rx="8" ry="6" fill="${skinDark}" opacity="0.4"/>
<path d="M93,126 Q100,130 107,126" fill="none" stroke="${skinDark}" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
<!-- Nostrils -->
<ellipse cx="95" cy="127" rx="3" ry="2.5" fill="${skinDark}" opacity="0.55"/>
<ellipse cx="105" cy="127" rx="3" ry="2.5" fill="${skinDark}" opacity="0.55"/>
<!-- Lips -->
<path d="M90,138 Q95,135 100,136 Q105,135 110,138" fill="none" stroke="#7a3e30" stroke-width="2" stroke-linecap="round"/>
<path d="M90,138 Q100,144 110,138" fill="#9e5040" stroke="none" opacity="0.55"/>
<!-- Philtrum -->
<line x1="100" y1="130" x2="100" y2="136" stroke="${skinDark}" stroke-width="1.2" opacity="0.35"/>
<!-- Chin crease -->
<path d="M94,150 Q100,154 106,150" fill="none" stroke="${skinDark}" stroke-width="1.2" opacity="0.3"/>
<!-- Turban/head covering -->
<ellipse cx="100" cy="73" rx="42" ry="30" fill="url(#turbanG_${name})"/>
<path d="M60,82 Q65,55 100,48 Q135,55 140,82" fill="url(#turbanG_${name})"/>
<path d="M60,82 Q65,58 100,50 Q135,58 140,82" fill="none" stroke="${turbDark}" stroke-width="1.5" opacity="0.4"/>
<!-- Turban fold lines -->
<path d="M67,78 Q100,62 133,78" fill="none" stroke="${turbDark}" stroke-width="1.2" opacity="0.45" stroke-linecap="round"/>
<path d="M72,68 Q100,55 128,68" fill="none" stroke="${turbDark}" stroke-width="1" opacity="0.35" stroke-linecap="round"/>
<!-- Collar detail -->
<path d="M86,172 L100,178 L114,172" fill="none" stroke="${shirtDark}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

/* ── WRITE ALL FILES ──────────────────────────────────────────── */

const innovations = [
  ['solar-dryer.svg', solarDryer],
  ['rainwater-harvest.svg', rainwater],
  ['drip-irrigation.svg', dripIrrigation],
  ['farming-tool.svg', farmingTool],
  ['bicycle-pump.svg', bicyclePump],
  ['grain-cleaner.svg', grainCleaner],
  ['solar-dryer-2.svg', solarDryer2],
];

for (const [file, content] of innovations) {
  writeFileSync(join(base, 'innovations', file), content, 'utf8');
  console.log('✓', file);
}

// Farmer avatars with distinct color schemes
const farmers = [
  ['ravi-kumar.svg', makeFarmerSVG('ravi', '#1a3a5c', '#0d2137', '#c68642', '#8b5a2b', '#1565c0', '#0d47a1', '#e53935', '#b71c1c', '#4e342e')],
  ['suresh-reddy.svg', makeFarmerSVG('suresh', '#1b4332', '#0a2e1a', '#bf8659', '#8b5a2b', '#2e7d32', '#1b5e20', '#f9a825', '#e65100', '#3e2723')],
  ['mahesh-patel.svg', makeFarmerSVG('mahesh', '#4a148c', '#1a0050', '#c99a6b', '#8d5524', '#6a1b9a', '#4a148c', '#f57f17', '#e65100', '#4e342e')],
  ['lakshmi-devi.svg', makeFarmerSVG('lakshmi', '#880e4f', '#3e0020', '#d2956a', '#a0522d', '#c2185b', '#880e4f', '#4caf50', '#2e7d32', '#3e2723')],
  ['ramesh-yadav.svg', makeFarmerSVG('ramesh', '#0d3a26', '#001a0d', '#c09060', '#8b6332', '#00695c', '#004d40', '#1565c0', '#0d47a1', '#4e342e')],
  ['default-avatar.svg', makeFarmerSVG('default', '#263238', '#102027', '#b08050', '#7a5030', '#37474f', '#263238', '#78909c', '#546e7a', '#3e2723')],
];

for (const [file, content] of farmers) {
  writeFileSync(join(base, 'farmers', file), content, 'utf8');
  console.log('✓', file);
}

console.log('\nAll professional SVGs written successfully!');

// ==========================================
// 🧠 MEDENİ GÖKALP MASTER ENGINE JS DOSYASI
// ==========================================

let activeTabId = 'dersler';
let isDragging = false; 
let currentModalElementNum = 79;
let activeCategoryFilter = null; 

// --- 🔘 KİLİTLENMEYEN MOBİL SEKME KONTROLÜ ---
function switchTab(tabId) {
    activeTabId = tabId;
    document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
    const targetContent = document.getElementById(`tab-${tabId}`);
    if (targetContent) targetContent.classList.remove('hidden');
    
    const tabButtons = ['dersler', '3d', 'elementler', 'guvenlik', 'galeri', 'youtube'];
    tabButtons.forEach(id => {
        const btn = document.getElementById(`btn-${id}`);
        if (btn) {
            if (id === tabId) {
                btn.classList.add('active-tab');
                btn.classList.remove('text-slate-400');
                btn.classList.add('text-white');
            } else {
                btn.classList.remove('active-tab');
                btn.classList.remove('text-white');
                btn.classList.add('text-slate-400');
            }
        }
    });
    if (tabId === '3d' && typeof onWindowResize === 'function') {
        setTimeout(onWindowResize, 50);
    }
    document.activeElement.blur();
    window.scrollTo(0, 0);
}

// --- 📂 118 ELEMENT MATRİS VE AKTİF FİLTRE VERİ TABANI ---
const names = ["Hidrojen","Helyum","Lityum","Berilyum","Bor","Karbon","Azot","Oksijen","Flor","Neon","Sodyum","Magnezyum","Alüminyum","Silisyum","Fosfor","Kükürt","Klor","Argon","Potasyum","Kalsiyum","Skandiyum","Titanyum","Vanadyum","Krom","Manganez","Demir","Kobalt","Nikel","Bakır","Çinko","Galyum","Germanyum","Arsenik","Selenyum","Brom","Kripton","Rubidyum","Stronsiyum","İtriyum","Zirkonyum","Niyobyum","Molibden","Teknesyum","Rutenyum","Rodyum","Paladyum","Gümüş","Kadmiyum","İndiyum","Kalay","Antimon","Tellür","İyot","Ksenon","Sezyum","Baryum","Lantan","Seryum","Praseodim","Neodimyum","Prometyum","Samaryum","Europiyum","Gadolinyum","Terbiyum","Disprozyum","Holmiyum","Erbiyum","Tulyum","İterbiyum","Lutesyum","Hafniyum","Tantal","Volfram","Renyum","Osmiyum","İridyum","Platin","Altın","Cıva","Talyum","Kurşun","Bizmuth","Polonyum","Astat","Radon","Fransiyum","Radyum","Aktinyum","Toryum","Protaktinyum","Uranyum","Neptünyum","Plutonyum","Amerikyum","Küriyum","Berkelyum","Kaliforniyum","Aynştaynyum","Fermiyum","Mendelevyum","Nobelyum","Lavrensiyum","Rutherfordiyum","Dubniyum","Seaborgeyum","Bohriyum","Hassiyum","Maytneriyum","Darmstadtiyum","Röntgenyum","Kopernikyum","Nihonyum","Flerovyum","Moskovyum","Livermoryum","Tennessin","Oganesson"];
const symbols = ["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr","Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe","Cs","Ba","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"];
const masses = [1.008, 4.002, 6.94, 9.012, 10.81, 12.011, 14.007, 15.999, 18.998, 20.18, 22.99, 24.305, 26.982, 28.085, 30.974, 32.06, 35.45, 39.948, 39.098, 40.078, 44.956, 47.867, 50.942, 51.996, 54.938, 55.845, 58.933, 58.693, 63.546, 65.38, 69.723, 72.63, 74.922, 78.971, 79.904, 83.798, 85.468, 87.62, 88.906, 91.224, 92.906, 95.95, 98, 101.07, 102.91, 106.42, 107.87, 112.41, 114.82, 118.71, 121.76, 127.6, 126.9, 131.29, 132.91, 137.33, 138.91, 140.12, 140.91, 144.24, 145, 150.36, 151.96, 157.25, 158.93, 162.5, 164.93, 167.26, 168.93, 173.05, 174.97, 178.49, 180.95, 183.84, 186.21, 190.23, 192.22, 195.08, 196.97, 200.59, 204.38, 207.2, 208.98, 209, 210, 222, 223, 226, 227, 232.04, 231.04, 238.03, 237, 244, 243, 247, 247, 251, 252, 257, 258, 259, 262, 267, 268, 269, 270, 269, 278, 281, 280, 285, 286, 289, 289, 293, 294, 294];

function getElementCategory(n) {
    if (n === 1 || (n >= 6 && n <= 8) || (n >= 15 && n <= 16) || n === 34) return "Ametaller";
    if ([2, 10, 18, 36, 54, 86, 118].includes(n)) return "Soygazlar";
    if ([3, 11, 19, 37, 55, 87].includes(n)) return "Alkali Metaller";
    if ([4, 12, 20, 38, 56, 88].includes(n)) return "Toprak Alkali Metaller";
    if ([9, 17, 35, 53, 85, 117].includes(n)) return "Halojenler";
    if ([5, 14, 32, 33, 51, 52, 84].includes(n)) return "Yarı Metaller";
    if (n >= 57 && n <= 71) return "Lantanit"; if (n >= 89 && n <= 103) return "Aktinit";
    if ([13, 31, 49, 50, 81, 82, 83, 113, 114, 115, 116].includes(n)) return "Toprak Metalleri";
    return "Geçiş Metalleri";
}

function getGridCoords(num) {
    if (num === 1) return { row: 2, col: 2 }; if (num === 2) return { row: 2, col: 19 };
    if (num >= 3 && num <= 4) return { row: 3, col: num - 1 }; if (num >= 5 && num <= 10) return { row: 3, col: num + 9 };
    if (num >= 11 && num <= 12) return { row: 4, col: num - 9 }; if (num >= 13 && num <= 18) return { row: 4, col: num + 1 };
    if (num >= 19 && num <= 36) return { row: 5, col: num - 17 }; if (num >= 37 && num <= 54) return { row: 6, col: num - 35 };
    if (num === 55) return { row: 7, col: 2 }; if (num === 56) return { row: 7, col: 3 };
    if (num >= 57 && num <= 71) return { row: 10, col: num - 57 + 4 }; if (num >= 72 && num <= 86) return { row: 7, col: num - 72 + 5 };
    if (num === 87) return { row: 8, col: 2 }; if (num === 88) return { row: 8, col: 3 };
    if (num >= 89 && num <= 103) return { row: 11, col: num - 89 + 4 }; return { row: 8, col: num - 104 + 5 };
}

function toggleCategoryFilter(catName) {
    activeCategoryFilter = (activeCategoryFilter === catName) ? null : catName;
    renderElementsGrid(globalElements);
}

function renderElementsGrid(list) {
    const container = document.getElementById('periodic-matrix-container'); if (!container) return; container.innerHTML = '';
    for (let g = 1; g <= 18; g++) { container.innerHTML += `<div class="text-center text-[10px] font-bold text-slate-600 self-end pb-1" style="grid-row: 1; grid-column: ${g + 1};">${g}</div>`; }
    for (let p = 1; p <= 7; p++) { container.innerHTML += `<div class="flex items-center justify-center text-[10px] font-bold text-slate-600 pr-1" style="grid-row: ${p + 1}; grid-column: 1;">${p}</div>`; }

    // Birebir Ferrumone Aktif Filtre Panelleri
    const legends = [
        { id: "Alkali Metaller", name: "Alkali Metaller", color: "#ef4444", row: 3, col: 4 },
        { id: "Toprak Alkali Metaller", name: "Toprak Alkali Metaller", color: "#f97316", row: 3, col: 6 },
        { id: "Lantanit/Aktinit", name: "Lantanit & Aktinit", color: "#a855f7", row: 3, col: 8 },
        { id: "Geçiş Metalleri", name: "Geçiş Metalleri", color: "#3b82f6", row: 3, col: 10 },
        { id: "Toprak Metalleri", name: "Toprak Metalleri", color: "#06b6d4", row: 3, col: 12 },
        { id: "Yarı Metaller", name: "Yarı Metaller", color: "#eab308", row: 4, col: 4 },
        { id: "Ametaller", name: "Ametaller", color: "#10b981", row: 4, col: 6 },
        { id: "Halojenler", name: "Halojenler", color: "#84cc16", row: 4, col: 8 },
        { id: "Soygazlar", name: "Soygazlar", color: "#ec4899", row: 4, col: 10 }
    ];

    legends.forEach(l => {
        let activeStyle = activeCategoryFilter === l.id ? "border-white bg-slate-900 scale-105 opacity-100 ring-1 ring-white/40" : (activeCategoryFilter ? "opacity-20 border-slate-850" : "border-slate-850 opacity-100");
        container.innerHTML += `<div onclick="toggleCategoryFilter('${l.id}')" class="border rounded-xl p-1 flex flex-col items-center justify-center text-center select-none cursor-pointer transition-all ${activeStyle}" style="grid-row: ${l.row}; grid-column: ${l.col} / span 2;"><div class="w-5 h-0.5 mb-1 rounded" style="background-color: ${l.color};"></div><span class="text-[9px] font-black tracking-tight" style="color: ${l.color};">${l.name}</span></div>`;
    });

    container.innerHTML += `
        <div class="border border-dashed border-purple-950/40 rounded-xl flex items-center justify-center text-center bg-purple-950/5 select-none" style="grid-row: 7; grid-column: 4;"><span class="text-[9px] font-bold text-purple-500/50">57-71</span></div>
        <div class="border border-dashed border-purple-950/40 rounded-xl flex items-center justify-center text-center bg-purple-950/5 select-none" style="grid-row: 8; grid-column: 4;"><span class="text-[9px] font-bold text-purple-500/50">89-103</span></div>
        <div style="grid-row: 9; grid-column: 1 / span 19; height: 12px;"></div>`;

    const searchVal = document.getElementById('element-search') ? document.getElementById('element-search').value.toLowerCase() : "";

    list.forEach(el => {
        const coords = getGridCoords(el.n); let colorStyle = getCatStyle(el.cat);
        let isCatMatch = activeCategoryFilter === "Lantanit/Aktinit" ? ["Lantanit", "Aktinit"].includes(el.cat) : el.cat === activeCategoryFilter;
        let matchesCategory = !activeCategoryFilter || isCatMatch;
        let matchesSearch = !searchVal || el.name.toLowerCase().includes(searchVal) || el.s.toLowerCase().includes(searchVal);
        let isVisible = matchesCategory && matchesSearch;

        let dimmingStyle = !isVisible ? "opacity: 0.08; filter: grayscale(90%); pointer-events: none;" : ((activeCategoryFilter || searchVal) ? "transform: scale(1.03); font-weight: bold; box-shadow: 0 0 12px rgba(255,255,255,0.08);" : "");
        container.innerHTML += `<div onclick="openElementDetail(${el.n})" class="p-1 bg-[#0f1422] border rounded-xl flex flex-col items-center justify-center text-center shadow-md hover:scale-105 transition-all cursor-pointer ${colorStyle}" style="grid-row: ${coords.row}; grid-column: ${coords.col}; ${dimmingStyle}"><span class="text-[8px] text-slate-500 font-bold self-start pl-0.5">${el.n}</span><span class="text-xs font-black tracking-tight text-white mt-[-2px]">${el.s}</span><span class="text-[8px] font-medium text-slate-400 truncate w-full mt-0.5">${el.name}</span></div>`;
    });
}

// --- 🔬 3. DEEP VERİ MODEL YAPILARI VE DETAY REHBERLERİ ---
const elementDatabase = {
    1: { eng:"Hydrogen", state:"Gaz", period:1, group:1, desc: "Evrenin en hafif elementidir. Yıldızların füzyon yakıtıdır.", config: "1s¹", shells: "1", density: "0.089 g/L", electronegativity: "2.20", melt: "-259.1 °C", discoverer: "Henry Cavendish", history:"1766'da Cavendish asit reaksiyonlarında keşfetti.", isotope:"1H, 2H (Deuterium), 3H (Tritium)", usages:["Amonyak sentezi", "Roket yakıtı"], bio:"Su yapısında vücudun %10'udur.", interesting:["1A'dadır ama metal değildir."], notes:["Asit katyon temeli."], sss:[{q:"Yanıcı mıdır?", a:"Evet, patlayıcı bir yakıttır."}] },
    2: { eng:"Helium", state:"Gaz", period:1, group:18, desc: "Reaksiyona girmeyen tamamen inert soy gazdır.", config: "1s²", shells: "2", density: "0.178 g/L", electronegativity: "n/a", melt: "-272.2 °C", discoverer: "Lockyer", history:"Güneş tutulması spektrum çizgilerinden bulundu.", isotope:"3He, 4He", usages:["MR cihazı kriyojenik soğutma"], bio:"Tamamen inerttir.", interesting:["Değerlik elektron sayısı 2'dir ama 8A'dadır."], notes:["Dublet kuralı örneğidir."], sss:[{q:"Neden ses inceltir?", a:"Yoğunluğu havadan azdır, ses dalgası hızlı iletilir."}] },
    6: { eng:"Carbon", state:"Katı", period:2, group:14, desc: "Yaşamın temel taşıdır. Dört kovalent bağ kurar.", config: "[He] 2s² 2p²", shells: "2|4", density: "2.26 g/cm³", electronegativity: "2.55", melt: "3550 °C", discoverer: "Antik çağ", history:"Kömür formunda tarih öncesinden beri bilinir.", isotope:"12C, 13C, 14C (Yaş tayini)", usages:["Çelik katkısı", "Grafen nanotüpler"], bio:"Tüm organik bileşiklerin iskeletidir.", interesting:["Hem en yumuşak (grafit) hem en sert (elmas) olabilir."], notes:["Organik kimya hibritleşme temeli."], sss:[{q:"Allotrop nedir?", a:"Aynı atomların uzayda farklı dizilmesidir."}] },
    13: { eng:"Aluminium", state:"Katı", period:3, group:13, desc: "Yerkabuğunda en çok bulunan amfoter metaldir.", config: "[Ne] 3s² 3p¹", shells: "2|8|3", density: "2.70 g/cm³", electronegativity: "1.61", melt: "660.3 °C", discoverer: "Ørsted", history:"1825'te alüminyum klorürün potasyum ile indirgenmesiyle bulundu.", isotope:"27Al", usages=["Uçak gövdesi imalatı", "Elektrik iletim hatları"], bio:"Fonksiyonu yoktur, yüksek birikimi toksiktir.", interesting:["Yüzeyindeki Al2O3 katmanı korozyona tam bariyerdir."], notes:["Hem asitle hem kuvvetli bazla H2 gazı üretir."], sss:[{q:"Amfoter metal ne demektir?", a:"Asitlere karşı baz, bazlara karşı asit gibi davranan demektir."}] },
    79: { eng:"Gold", state:"Katı", period:6, group:11, desc: "Tam soy metaldir. Paslanmaya karşı doğadaki en dirençli elementtir.", config: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹", shells: "2|8|18|32|18|1", density: "19.3 g/cm³", electronegativity: "2.54", melt: "1064.2 °C", discoverer: "Antik çağ", history:"MÖ 5000'lerden beri işlenmektedir. Latince 'aurum' kelimesinden gelir.", isotope:"197Au", usages=["Mikroelektronik kontak kaplamaları", "JWST teleskop aynaları yansıtma filmi", "LFIA gebelik test nanopartikülleri"], bio:"İnerttir, LFIA test hatlarında plazmonik renk üretir.", interesting:["6s orbital büzülmesi relativistik kütle artışıyla sarı renk yansıtır."], notes:["d10 6s1 küresel simetri anomalisi taşır. Soru bankalarının gözdesidir."], sss:[{q:"Kral suyu nedir?", a:"3 hacim HCl ve 1 hacim HNO3 karışımı güçlü asit kokteylidir."}] }
};

function openElementDetail(num) {
    currentModalElementNum = num; const el = globalElements.find(x => x.n === num); if (!el) return;
    let colorStyle = getCatStyle(el.cat); document.getElementById('m-badge-container').className = `w-24 h-24 border rounded-2xl flex flex-col items-center justify-center text-center shadow-lg bg-slate-950/50 ${colorStyle}`;
    document.getElementById('modal-breadcrumb').innerText = `Periyodik Tablo / ${el.name}`;
    document.getElementById('m-num').innerText = el.n; document.getElementById('m-sym').innerText = el.s; document.getElementById('m-mass').innerText = el.m;
    document.getElementById('m-name').innerHTML = `${el.name} (${el.s})`;
    
    let targetData = elementDatabase[num] || { eng: "Element", state: "Katı", period: Math.ceil(num/18), group: (num%18===0)?18:num%18, desc: `${el.name} müfredat analiz verisidir.`, config: "n/a", shells: "n/a", density: "n/a", electronegativity: "n/a", melt: "n/a", discoverer: "Bilinmiyor", notes: "Grup trendlerine uyumludur.", sss: [{ q: "Atom numarası?", a: "Çekirdeğindeki resmi proton sayısıdır." }] };

    document.getElementById('m-desc').innerText = targetData.desc;
    document.getElementById('m-history-text').innerText = targetData.history || 'Antik çağlardan beri bilinen element serilerindendir.';
    document.getElementById('m-isotope-text').innerText = targetData.isotope || 'Doğal kütle numarası izotop dağılımları müfredata uygundur.';
    document.getElementById('m-bio-text').innerText = targetData.bio || 'Canlı dokularında toksik birikim etkisi saptanmamıştır.';
    document.getElementById('m-tags').innerHTML = `<span class="text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-white font-medium">${el.cat}</span><span class="text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-slate-400">Periyot ${targetData.period || Math.ceil(num/18)}</span><span class="text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-slate-400">Grup ${targetData.group || ((num%18===0)?18:num%18)}</span>`;
    document.getElementById('m-grid-props').innerHTML = `<div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Konfigürasyon</div><div class="text-xs font-bold text-white">${targetData.config}</div></div><div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Kabuklar</div><div class="text-xs font-bold text-white">${targetData.shells}</div></div><div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Yoğunluk</div><div class="text-xs font-bold text-white">${targetData.density}</div></div><div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Elektronegatiflik</div><div class="text-xs font-bold text-white">${targetData.electronegativity}</div></div><div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Erime</div><div class="text-xs font-bold text-white">${targetData.melt}</div></div><div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Keşfeden</div><div class="text-xs font-bold text-slate-300">${targetData.discoverer}</div></div>`;
    document.getElementById('m-notes-text').innerText = targetData.notes || 'Grup eğilimlerine uygundur.';
    document.getElementById('m-sss-container').innerHTML = (targetData.sss || []).map(x => `<div class="bg-[#0a0d16] p-2 rounded-xl border border-slate-850"><div class="text-xs font-bold text-white">${x.q}</div><div class="text-xs text-slate-400 mt-0.5">${x.a}</div></div>`).join('');
    
    const prevEl = globalElements.find(x => x.n === num - 1); const nextEl = globalElements.find(x => x.n === num + 1);
    document.getElementById('modal-btn-prev').innerText = prevEl ? `← ${prevEl.name}` : "Başlangıç";
    document.getElementById('modal-btn-next').innerText = nextEl ? `${nextEl.name} →` : "Bitiş";
    document.getElementById('element-modal').classList.remove('hidden'); document.getElementById('modal-scroll-content').scrollTop = 0;
}

function closeModal() { document.getElementById('element-modal').classList.add('hidden'); }
function navigateElement(dir) { let t = currentModalElementNum + dir; if(t >= 1 && t <= 118) openElementDetail(t); }
function toggleFullScreenContainer() { if (!document.fullscreenElement) document.documentElement.requestFullscreen(); else document.exitFullscreen(); }

// --- 🔒 4. DERS AKORDEON MODÜLÜ ---
const defaultTopics = [{ id: "t1", name: "01 Modern Atom Modeli", desc: "Elektron konfigürasyonları.", checked: false, link: "" }, { id: "t2", name: "02 Gazlar", desc: "Kinetik teori bağıntıları.", checked: false, link: "" }];
function renderAytTopics() {
    let list = JSON.parse(localStorage.getItem('custom_topic_list')) || defaultTopics;
    const container = document.getElementById('ayt-topics-container'); if(!container) return; container.innerHTML = '';
    list.forEach(topic => {
        const hasLink = topic.link && topic.link.trim().startsWith('http');
        container.innerHTML += `<div class="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden"><div class="p-3 flex items-center justify-between bg-slate-950/40 hover:bg-slate-950/80 cursor-pointer" onclick="toggleAccordion('${topic.id}')"><div class="flex items-center space-x-3 min-w-0 flex-1"><input type="checkbox" ${topic.checked ? 'checked' : ''} onchange="toggleTopicCheck('${topic.id}', this.checked)" onclick="event.stopPropagation();" class="w-4.5 h-4.5 rounded text-blue-600 bg-slate-700"><span class="text-xs font-bold text-slate-200 truncate" id="title-text-${topic.id}">${topic.name}</span></div><div class="flex items-center space-x-2.5 shrink-0" onclick="event.stopPropagation();"><button onclick="openTopicLink('${topic.id}')" class="text-[10px] bg-slate-800 hover:bg-blue-900 text-slate-400 px-2 py-1 rounded border border-slate-700 ${hasLink ? '' : 'hidden'}" id="go-${topic.id}">Aç</button><i class="fa-solid fa-chevron-down text-slate-500 text-xs" id="arrow-${topic.id}"></i></div></div><div id="body-${topic.id}" class="hidden p-3 border-t border-slate-850 bg-slate-900/40 space-y-3"><input type="text" value="${topic.name}" oninput="updateTopicName('${topic.id}', this.value)" class="bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs w-full text-white focus:outline-none"><input type="text" value="${topic.link || ''}" placeholder="Müfredat Linki..." oninput="updateTopicLink('${topic.id}', this.value)" class="bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs w-full text-white focus:outline-none"><button onclick="deleteTopic('${topic.id}')" class="text-[10px] text-rose-400 underline">Sil</button></div></div>`;
    });
}
function toggleAccordion(id) { const b = document.getElementById(`body-${id}`), a = document.getElementById(`arrow-${id}`); if(b && a) { b.classList.toggle('hidden'); a.classList.toggle('rotate-180'); } }
function updateTopicName(id, val) { let list = JSON.parse(localStorage.getItem('custom_topic_list')) || defaultTopics; let t = list.find(x => x.id === id); if(t) { t.name = val; localStorage.setItem('custom_topic_list', JSON.stringify(list)); document.getElementById(`title-text-${id}`).innerText = val; } }
function updateTopicLink(id, val) { let list = JSON.parse(localStorage.getItem('custom_topic_list')) || defaultTopics; let t = list.find(x => x.id === id); if(t) { t.link = val; localStorage.setItem('custom_topic_list', JSON.stringify(list)); const btn = document.getElementById(`go-${id}`); if(btn) { if(val.trim().startsWith('http')) btn.classList.remove('hidden'); else btn.classList.add('hidden'); } } }
function openTopicLink(id) { let list = JSON.parse(localStorage.getItem('custom_topic_list')); let t = list.find(x => x.id === id); if(t && t.link) window.open(t.link.trim(), '_blank'); }
function toggleTopicCheck(id, chk) { let list = JSON.parse(localStorage.getItem('custom_topic_list')); let t = list.find(x => x.id === id); if(t) { t.checked = chk; localStorage.setItem('custom_topic_list', JSON.stringify(list)); } }
function addNewTopic() { const n = document.getElementById('new-topic-name'); if(!n.value.trim()) return; let list = JSON.parse(localStorage.getItem('custom_topic_list')) || []; list.push({ id: "topic_" + Date.now(), name: n.value.trim(), checked: false, link: "" }); localStorage.setItem('custom_topic_list', JSON.stringify(list)); n.value = ''; renderAytTopics(); }
function resetTopicsToDefault() { localStorage.setItem('custom_topic_list', JSON.stringify(defaultTopics)); renderAytTopics(); }
function deleteTopic(id) { let list = JSON.parse(localStorage.getItem('custom_topic_list')); list = list.filter(x => x.id !== id); localStorage.setItem('custom_topic_list', JSON.stringify(list)); renderAytTopics(); }

// --- 🎥 5. VİDEO VE 3D GEOMETRİK MOTORU (13 REPLİKA GERİ GELDİ) ---
const defaultVideos = [{ name: "1. Sodyum Klorür Kristal Örgüsü (Tuz-Su)", file: "NaCl-H2O.MP4" }];
function renderVideoList() {
    let list = JSON.parse(localStorage.getItem('custom_video_list')) || defaultVideos;
    const container = document.getElementById('dynamic-video-container'); if(!container) return; container.innerHTML = '';
    list.forEach((item) => {
        container.innerHTML += `<div class="w-full bg-slate-900 rounded border border-slate-850 flex justify-between items-center p-2.5"><button onclick="playCloudVideo('${item.file}')" class="text-xs font-medium text-slate-300 truncate hover:text-cyan-400 text-left"><i class="fa-solid fa-circle-play mr-2 text-cyan-400"></i>${item.name}</button></div>`;
    });
}
function playCloudVideo(f) { const v = document.getElementById('main-panel-video'); v.src = `./videos/${f}`; document.getElementById('video-player-container').classList.remove('hidden'); v.play(); }

let scene, camera, renderer, currentGroup;
const glassMat = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.25, shininess: 120, side: THREE.DoubleSide });
const blueLiquidMat = new THREE.MeshPhongMaterial({ color: 0x0284c7, transparent: true, opacity: 0.8 });
const pinkLiquidMat = new THREE.MeshPhongMaterial({ color: 0xdb2777, transparent: true, opacity: 0.85 });
const yellowLiquidMat = new THREE.MeshPhongMaterial({ color: 0xeab308, transparent: true, opacity: 0.75 });

function init3D() {
    const container = document.getElementById('canvas-3d'); if(!container) return;
    scene = new THREE.Scene(); scene.background = new THREE.Color(0x05070f);
    camera = new THREE.PerspectiveCamera(65, container.clientWidth / container.clientHeight, 0.1, 1000); camera.position.set(0, 0, 7);
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const pLight = new THREE.PointLight(0xffffff, 1.5, 15); pLight.position.set(2, 4, 3); scene.add(pLight);
    renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement); change3DModel('beherglas');
    function animate() { requestAnimationFrame(animate); if (currentGroup && !isDragging && activeTabId === '3d') currentGroup.rotation.y += 0.005; renderer.render(scene, camera); } animate();
    window.addEventListener('resize', onWindowResize);
}

function change3DModel(type) {
    if (currentGroup) scene.remove(currentGroup); currentGroup = new THREE.Group();
    if (type === 'beherglas') {
        currentGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 3.2, 32, 1, true), glassMat));
        const b = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.05, 32), glassMat); b.position.y = -1.6; currentGroup.add(b);
        const l = new THREE.Mesh(new THREE.CylinderGeometry(1.36, 1.36, 1.8, 32), blueLiquidMat); l.position.y = -0.7; currentGroup.add(l);
    } else if (type === 'erlenmayer') {
        const b = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 1.6, 2.6, 32, 1, true), glassMat); b.position.y = -0.2;
        const n = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.8, 32, 1, true), glassMat); n.position.y = 1.5;
        const l = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 1.5, 1.4, 32), pinkLiquidMat); l.position.y = -0.8; currentGroup.add(b, n, l);
    } else if (type === 'cambalon') {
        currentGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 32), glassMat));
        const n = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.6, 32, 1, true), glassMat); n.position.y = 1.3;
        const l = new THREE.Mesh(new THREE.SphereGeometry(1.46, 32, 16, 0, Math.PI*2, Math.PI/2, Math.PI/2), yellowLiquidMat); l.position.y = -0.4; currentGroup.add(n, l);
    } else if (type === 'deneytupu') {
        const t = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 3.4, 32, 1, true), glassMat);
        const l = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.37, 2.0, 32), blueLiquidMat); l.position.y = -0.5; currentGroup.add(t, l);
    } else if (type === 'balonjoje') {
        const s = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), glassMat); s.position.y = -1.0;
        const n = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 2.6, 32, 1, true), glassMat); n.position.y = 0.9;
        const r = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.02, 8, 32), new THREE.MeshBasicMaterial({ color: 0xffffff })); r.rotation.x = Math.PI/2; r.position.y = 0.8; currentGroup.add(s, n, r);
    } else if (type === 'ayirmahunisi') {
        const b = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 0.2, 2.4, 32, 1, true), glassMat); b.position.y = 0.6;
        const l1 = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 0.6, 1.0, 32), yellowLiquidMat); l1.position.y = 1.0;
        const l2 = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.2, 1.0, 32), blueLiquidMat); l2.position.y = 0.0; currentGroup.add(b, l1, l2);
    } else if (type === 'derecelisilindir') {
        const c = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 4.6, 32, 1, true), glassMat);
        const l = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 3.0, 32), blueLiquidMat); l.position.y = -0.9; currentGroup.add(c, l);
    } else if (type === 'buret') {
        const t = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 5.8, 16, 1, true), glassMat);
        const l = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 4.0, 16), pinkLiquidMat); l.position.y = 0.6; currentGroup.add(t, l);
    } else if (type === 'pipet') {
        const b = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), glassMat); b.scale.set(1, 2.2, 1); currentGroup.add(b);
    } else if (type === 'dalton') {
        currentGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.8, 32, 32), new THREE.MeshPhongMaterial({ color: 0x475569 })));
    } else if (type === 'thomson') {
        currentGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.8, 32, 32), new THREE.MeshPhongMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.4 })));
    } else if (type === 'rutherford') {
        currentGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), new THREE.MeshPhongMaterial({ color: 0xef4444 })));
    } else if (type === 'bohr') {
        currentGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshPhongMaterial({ color: 0xef4444 })));
    }
    scene.add(currentGroup);
}
function onWindowResize() { const c = document.getElementById('canvas-3d'); if(c && renderer) { camera.aspect = c.clientWidth / c.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(c.clientWidth, c.clientHeight); } }

document.addEventListener('DOMContentLoaded', () => { switchTab('dersler'); renderAytTopics(); renderElementsGrid(globalElements); renderVideoList(); init3D(); document.querySelectorAll('.text-save').forEach(i => { const id = i.getAttribute('data-id'); const s = localStorage.getItem(id); if (s) i.value = s; i.addEventListener('input', () => localStorage.setItem(id, i.value)); }); });
</script>

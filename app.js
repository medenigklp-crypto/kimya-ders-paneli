// ==========================================
// 🔘 MEDENİ GÖKALP KİMYA PANELİ MASTER MOTORU
// ==========================================

// --- 📋 1. SEKMELER VE STANDART NAVİGASYON ---
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

// --- 📊 2. FERRUMONE İNTERAKTİF MATRİS MOTORU ---
function toggleCategoryFilter(catName) {
    activeCategoryFilter = (activeCategoryFilter === catName) ? null : catName;
    renderElementsGrid(globalElements);
}

function renderElementsGrid(list) {
    const container = document.getElementById('periodic-matrix-container');
    if (!container) return;
    container.innerHTML = '';
    
    // 18 Sütun Başlık İndekslerini Çiz
    for (let g = 1; g <= 18; g++) { 
        container.innerHTML += `<div class="text-center text-[10px] font-bold text-slate-600 self-end pb-1" style="grid-row: 1; grid-column: ${g + 1};">${g}</div>`; 
    }
    // 7 Periyot Sol İndekslerini Çiz
    for (let p = 1; p <= 7; p++) { 
        container.innerHTML += `<div class="flex items-center justify-center text-[10px] font-bold text-slate-600 pr-1" style="grid-row: ${p + 1}; grid-column: 1;">${p}</div>`; 
    }

    // Ortadaki İnteraktif Kategori Filtre Butonları
    const legends = [
        { id: "Alkali Metaller", name: "Alkali Metal", color: "#ef4444", row: 3, col: 4 },
        { id: "Toprak Alkali Metaller", name: "Toprak Alkali", color: "#f97316", row: 3, col: 6 },
        { id: "Lantanit/Aktinit", name: "Lantanit & Aktinit", color: "#a855f7", row: 3, col: 8 },
        { id: "Geçiş Metalleri", name: "Geçiş Metali", color: "#3b82f6", row: 3, col: 10 },
        { id: "Toprak Metalleri", name: "Toprak Metali", color: "#06b6d4", row: 3, col: 12 },
        { id: "Yarı Metaller", name: "Yarı Metal", color: "#eab308", row: 4, col: 4 },
        { id: "Ametaller", name: "Ametal", color: "#10b981", row: 4, col: 6 },
        { id: "Halojenler", name: "Halojen", color: "#84cc16", row: 4, col: 8 },
        { id: "Soygazlar", name: "Soy Gaz", color: "#ec4899", row: 4, col: 10 }
    ];

    legends.forEach(l => {
        let activeStyle = activeCategoryFilter === l.id ? "border-white bg-slate-900 scale-105 opacity-100 ring-1 ring-white/40" : (activeCategoryFilter ? "opacity-20 border-slate-850" : "border-slate-850 opacity-100");
        container.innerHTML += `
            <div onclick="toggleCategoryFilter('${l.id}')" class="border rounded-xl p-1 flex flex-col items-center justify-center text-center select-none cursor-pointer transition-all ${activeStyle}" style="grid-row: ${l.row}; grid-column: ${l.col} / span 2;">
                <div class="w-5 h-0.5 mb-1 rounded" style="background-color: ${l.color};"></div>
                <span class="text-[9px] font-black tracking-tight" style="color: ${l.color};">${l.name}</span>
            </div>`;
    });

    // Ara Boşlukları ve lantanit/aktinit Bağlantı Kutularını Enjekte Et
    container.innerHTML += `
        <div class="border border-dashed border-purple-950/40 rounded-xl flex items-center justify-center text-center bg-purple-950/5 select-none" style="grid-row: 7; grid-column: 4;"><span class="text-[9px] font-bold text-purple-500/50">57-71</span></div>
        <div class="border border-dashed border-purple-950/40 rounded-xl flex items-center justify-center text-center bg-purple-950/5 select-none" style="grid-row: 8; grid-column: 4;"><span class="text-[9px] font-bold text-purple-500/50">89-103</span></div>
        <div style="grid-row: 9; grid-column: 1 / span 19; height: 12px;"></div>`;

    const searchVal = document.getElementById('element-search') ? document.getElementById('element-search').value.toLowerCase() : "";

    // 118 Elementin Tam Çizim ve Karartma (Dimming) Döngüsü
    globalElements.forEach(el => {
        const coords = getGridCoords(el.n); 
        let colorStyle = getCatStyle(el.cat);
        
        let isCatMatch = activeCategoryFilter === "Lantanit/Aktinit" ? ["Lantanit", "Aktinit"].includes(el.cat) : el.cat === activeCategoryFilter;
        let matchesCategory = !activeCategoryFilter || isCatMatch;
        let matchesSearch = !searchVal || el.name.toLowerCase().includes(searchVal) || el.s.toLowerCase().includes(searchVal);
        let isVisible = matchesCategory && matchesSearch;

        let dimmingStyle = !isVisible ? "opacity: 0.08; filter: grayscale(90%); pointer-events: none; transform: scale(0.95);" : ((activeCategoryFilter || searchVal) ? "transform: scale(1.03); font-weight: bold; box-shadow: 0 0 12px rgba(255,255,255,0.08);" : "");
        
        container.innerHTML += `
            <div onclick="openElementDetail(${el.n})" class="p-1 bg-[#0f1422] border rounded-xl flex flex-col items-center justify-center text-center shadow-md hover:scale-105 transition-all cursor-pointer ${colorStyle}" style="grid-row: ${coords.row}; grid-column: ${coords.col}; ${dimmingStyle}">
                <span class="text-[8px] text-slate-500 font-bold self-start pl-0.5">${el.n}</span>
                <span class="text-xs font-black tracking-tight text-white mt-[-2px]">${el.s}</span>
                <span class="text-[8px] font-medium text-slate-400 truncate w-full mt-0.5">${el.name}</span>
            </div>`;
    });
}
function filterElements(q) { renderElementsGrid(globalElements); }

// --- 🎯 3. DETAY PENCERESİ VE BÜYÜK ANALİZ MODÜLÜ ---
function openElementDetail(num) {
    currentModalElementNum = num;
    const el = globalElements.find(x => x.n === num);
    if (!el) return;
    
    let colorStyle = getCatStyle(el.cat);
    document.getElementById('m-badge-container').className = `w-24 h-24 border rounded-2xl flex flex-col items-center justify-center text-center shadow-lg bg-slate-950/50 ${colorStyle}`;
    document.getElementById('modal-breadcrumb').innerText = `Periyodik Tablo / ${el.name}`;
    document.getElementById('m-num').innerText = el.n;
    document.getElementById('m-sym').innerText = el.s;
    document.getElementById('m-mass').innerText = el.m;
    document.getElementById('m-name').innerHTML = `${el.name} (${el.s})`;
    
    // Varsayılan Dinamik Kimya Analiz Kartı Kalıbı
    let targetData = elementDatabase[num] || {
        eng: "Element", state: "Katı", period: Math.ceil(num/18), group: (num%18===0)?18:num%18,
        desc: `${el.name}, periyodik sistemin ${el.cat} grubuna ait kararlı bir elementtir.`,
        config: "n/a", shells: "n/a", density: "n/a", electronegativity: "n/a", melt: "n/a", boil: "n/a", discoverer: "Bilinmiyor",
        history: "Müfredat inceleme ve atom teorileri başlığı altında yapısal özellikleri analiz edilir.",
        isotope: "Doğal kütle numarası izotop dağılımları kararlılık trendine uygundur.",
        usages: ["Laboratuvar araştırma test süreçleri", "Genel endüstriyel alaşımların imalatı"],
        bio: "Canlı organizma dokularında spesifik toksik reaksiyon yaratmaz.",
        inter: ["Soru bankalarında ve denemelerde periyodik özellik trend sorularında sıkça karşımıza çıkar."],
        notes: ["Valans katmanı elektron dağılımı grup karakterini belirler."],
        sss: [{ q: `${el.name} atom numarası kaçtır?`, a: `Bu elementin resmi atom numarası çekirdeğindeki proton sayısını simgeleyen ${num} değeridir.` }]
    };

    document.getElementById('m-desc').innerText = targetData.desc;
    document.getElementById('m-history-text').innerText = targetData.history;
    document.getElementById('m-isotope-text').innerText = targetData.isotope;
    document.getElementById('m-bio-text').innerText = targetData.bio;
    
    document.getElementById('m-tags').innerHTML = `
        <span class="text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-white font-medium">${el.cat}</span>
        <span class="text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-slate-400">Periyot ${targetData.period || Math.ceil(num/18)}</span>
        <span class="text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-slate-400">Grup ${targetData.group || ((num%18===0)?18:num%18)}</span>
        <span class="text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-slate-400">${targetData.state || 'Katı'}</span>`;
        
    document.getElementById('m-grid-props').innerHTML = `
        <div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Konfigürasyon</div><div class="text-xs font-bold text-white mt-1">${targetData.config}</div></div>
        <div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Kabuklar</div><div class="text-xs font-bold text-white mt-1">${targetData.shells}</div></div>
        <div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Yoğunluk</div><div class="text-xs font-bold text-white mt-1">${targetData.density}</div></div>
        <div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Elektronegatiflik</div><div class="text-xs font-bold text-white mt-1">${targetData.electronegativity}</div></div>
        <div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Erime Noktası</div><div class="text-xs font-bold text-white mt-1">${targetData.melt}</div></div>
        <div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Keşfeden</div><div class="text-xs font-bold text-slate-300 mt-1">${targetData.discoverer}</div></div>`;
        
    document.getElementById('m-usages-list').innerHTML = targetData.usages.map(x => `<li class="text-xs text-slate-300 leading-relaxed">• ${x}</li>`).join('');
    document.getElementById('m-interesting-list').innerHTML = targetData.interesting.map(x => `<li>${x}</li>`).join('');
    document.getElementById('m-notes-list').innerHTML = targetData.notes.map(x => `<li class="text-xs text-slate-300 leading-relaxed">• ${x}</li>`).join('');
    
    document.getElementById('m-sss-container').innerHTML = targetData.sss.map(x => `
        <div class="bg-[#0a0d16] p-2.5 rounded-xl border border-slate-850">
            <div class="text-xs font-bold text-white">${x.q}</div>
            <div class="text-xs text-slate-400 mt-1 leading-relaxed">${x.a}</div>
        </div>`).join('');
        
    const prevEl = globalElements.find(x => x.n === num - 1); 
    const nextEl = globalElements.find(x => x.n === num + 1);
    document.getElementById('modal-btn-prev').innerText = prevEl ? `← ${prevEl.name}` : "Başlangıç";
    document.getElementById('modal-btn-next').innerText = nextEl ? `${nextEl.name} →` : "Bitiş";
    
    document.getElementById('element-modal').classList.remove('hidden'); 
    document.getElementById('modal-scroll-content').scrollTop = 0;
}

function closeModal() { document.getElementById('element-modal').classList.add('hidden'); }
function navigateElement(dir) { let t = currentModalElementNum + dir; if(t >= 1 && t <= 118) openElementDetail(t); }
function toggleFullScreenContainer() { if (!document.fullscreenElement) document.documentElement.requestFullscreen(); else document.exitFullscreen(); }

// --- 🔒 4. AKORDEON DERS MÜFREDAT MODÜLÜ ---
const defaultTopics = [{ id: "t1", name: "01 Modern Atom Modeli", desc: "Elektron dizilimleri.", checked: false, link: "" }, { id: "t2", name: "02 Gazlar", desc: "İdeal gaz yasaları.", checked: false, link: "" }];
function renderAytTopics() {
    let list = JSON.parse(localStorage.getItem('custom_topic_list')) || defaultTopics;
    const container = document.getElementById('ayt-topics-container'); if(!container) return;
    container.innerHTML = '';
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

// --- 🎥 5. VİDEOLAR VE 3D LABORATUVAR ALTYAPISI ---
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
    } else if (type === 'dalton') {
        currentGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.8, 32, 32), new THREE.MeshPhongMaterial({ color: 0x475569 })));
    }
    scene.add(currentGroup);
}
function onWindowResize() { const c = document.getElementById('canvas-3d'); if(c && renderer) { camera.aspect = c.clientWidth / c.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(c.clientWidth, c.clientHeight); } }

// Önyükleme Dinamik Tetikleyici Adımları
document.addEventListener('DOMContentLoaded', () => { 
    switchTab('dersler'); 
    renderAytTopics(); 
    renderElementsGrid(globalElements); 
    renderVideoList(); 
    init3D(); 
    document.querySelectorAll('.text-save').forEach(i => { 
        const id = i.getAttribute('data-id'); 
        const s = localStorage.getItem(id); 
        if (s) i.value = s; 
        i.addEventListener('input', () => localStorage.setItem(id, i.value)); 
    }); 
});
</script>

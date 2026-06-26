<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Medeni Gökalp Kimya Paneli</title>
    
    <link rel="icon" type="image/png" href="logo .png">
    <link rel="apple-touch-icon" href="logo .png">
    
    <meta name="theme-color" content="#060813">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

    <style>
        body { -webkit-tap-highlight-color: transparent; user-select: none; overflow-x: hidden; background-color: #060813; }
        .active-tab { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; }
        #canvas-3d { width: 100%; height: 360px; background-color: #05070f; border-radius: 0.75rem; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 4px; height: 5px; }
        ::-webkit-scrollbar-track { background: #060813; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 9px; }

        .cat-ametal { border-color: #10b981 !important; color: #10b981; background-color: rgba(16, 185, 129, 0.03); }
        .cat-soygaz { border-color: #ec4899 !important; color: #ec4899; background-color: rgba(236, 72, 153, 0.03); }
        .cat-alkali { border-color: #ef4444 !important; color: #ef4444; background-color: rgba(239, 68, 68, 0.03); }
        .cat-toprak-alkali { border-color: #f97316 !important; color: #f97316; background-color: rgba(249, 115, 22, 0.03); }
        .cat-halojen { border-color: #84cc16 !important; color: #84cc16; background-color: rgba(132, 204, 22, 0.03); }
        .cat-yarimetal { border-color: #eab308 !important; color: #eab308; background-color: rgba(234, 179, 8, 0.03); }
        .cat-gecis { border-color: #3b82f6 !important; color: #3b82f6; background-color: rgba(59, 130, 246, 0.03); }
        .cat-toprak-metali { border-color: #06b6d4 !important; color: #06b6d4; background-color: rgba(6, 182, 212, 0.03); }
        .cat-lantanit-aktinit { border-color: #a855f7 !important; color: #a855f7; background-color: rgba(168, 85, 247, 0.03); }
    </style>
</head>
<body class="text-slate-100 font-sans min-h-screen flex flex-col overflow-x-hidden">

    <header class="bg-[#0b0f19] border-b border-slate-800 p-4 sticky top-0 z-40 shadow-md flex justify-between items-center w-full">
        <div class="flex items-center space-x-3">
            <img src="logo .png" alt="Logo" class="h-8 w-auto object-contain select-none rounded">
            <h1 class="text-md font-bold tracking-wide bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Medeni Gökalp Kimya Paneli <span class="text-xs font-semibold text-slate-400">v2.7</span>
            </h1>
        </div>
        <div class="text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800 shrink-0">
            <i class="fa-solid fa-shield-halved text-emerald-500 mr-1"></i> Koruma Aktif
        </div>
    </header>

    <main class="flex-1 p-3 max-w-7xl w-full mx-auto pb-24 box-border overflow-x-hidden">
        
        <section id="tab-dersler" class="tab-content space-y-4">
            <div class="bg-[#0e1322] p-4 rounded-xl border border-slate-800 shadow-lg">
                <h2 class="text-base font-bold mb-1 text-blue-400 flex items-center"><i class="fa-solid fa-graduation-cap mr-2"></i> Müfredat & Ders Yönetimi</h2>
                <p class="text-[11px] text-slate-400 mb-3">Konuların üzerine tıklayarak detayları açabilir, Goodnotes isimlerini ve linklerini düzenleyebilirsiniz.</p>
                <div class="p-3 bg-slate-950 rounded-lg border border-slate-900 space-y-2 mb-4">
                    <div class="text-xs font-bold text-slate-400 tracking-wider uppercase flex justify-between items-center">
                        <span>Yeni Konu / Başlık Ekle</span>
                        <button onclick="resetTopicsToDefault()" class="text-[10px] text-rose-400 underline">Sıfırla</button>
                    </div>
                    <div class="grid grid-cols-1 gap-2">
                        <input type="text" id="new-topic-name" placeholder="Konu Başlığı (Örn: 02 Gazlar)" class="bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white focus:outline-none">
                        <input type="text" id="new-topic-desc" placeholder="Kısa Açıklama Notu (Opsiyonel)" class="bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white focus:outline-none">
                    </div>
                    <button onclick="addNewTopic()" class="w-full bg-blue-600 text-xs font-bold py-2 rounded shadow-md">Konu Ekle</button>
                </div>
                <div id="ayt-topics-container" class="space-y-2"></div>
            </div>
        </section>

        <section id="tab-3d" class="tab-content space-y-4 hidden">
            <div class="bg-[#0e1322] p-4 rounded-xl border border-slate-800 shadow-lg">
                <h2 class="text-base font-bold text-emerald-400 flex items-center mb-2"><i class="fa-solid fa-flask mr-2"></i> Interaktif 3D Stüdyo</h2>
                <div id="canvas-3d"></div>
                <div class="space-y-3 mt-3">
                    <div class="space-y-1">
                        <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cam Laboratuvar Malzemeleri</div>
                        <div class="grid grid-cols-3 gap-1.5">
                            <button onclick="change3DModel('beherglas')" class="bg-teal-950/60 border border-teal-800 text-[10px] py-1.5 rounded font-semibold text-white">Beherglas</button>
                            <button onclick="change3DModel('erlenmayer')" class="bg-teal-950/60 border border-teal-800 text-[10px] py-1.5 rounded font-semibold text-white">Erlenmayer</button>
                            <button onclick="change3DModel('cambalon')" class="bg-teal-950/60 border border-teal-800 text-[10px] py-1.5 rounded font-semibold text-white">Cam Balon</button>
                        </div>
                        <div class="grid grid-cols-3 gap-1.5">
                            <button onclick="change3DModel('deneytupu')" class="bg-teal-950/60 border border-teal-800 text-[10px] py-1.5 rounded font-semibold text-white">Deney Tüpü</button>
                            <button onclick="change3DModel('balonjoje')" class="bg-teal-950/60 border border-teal-800 text-[10px] py-1.5 rounded font-semibold text-white">Balon Joje</button>
                            <button onclick="change3DModel('ayirmahunisi')" class="bg-teal-950/60 border border-teal-800 text-[10px] py-1.5 rounded font-semibold text-white">Ayırma Hunisi</button>
                        </div>
                        <div class="grid grid-cols-3 gap-1.5">
                            <button onclick="change3DModel('derecelisilindir')" class="bg-teal-950/60 border border-teal-800 text-[10px] py-1.5 rounded font-semibold text-white">D. Silindir</button>
                            <button onclick="change3DModel('buret')" class="bg-teal-950/60 border border-teal-800 text-[10px] py-1.5 rounded font-semibold text-white">Büret</button>
                            <button onclick="change3DModel('pipet')" class="bg-teal-950/60 border border-teal-800 text-[10px] py-1.5 rounded font-semibold text-white">Pipet</button>
                        </div>
                    </div>
                    <div class="space-y-1">
                        <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kuantum Atom Modelleri</div>
                        <div class="grid grid-cols-4 gap-1.5">
                            <button onclick="change3DModel('dalton')" class="bg-slate-800 border border-slate-700 text-[10px] py-1.5 rounded text-white">Dalton</button>
                            <button onclick="change3DModel('thomson')" class="bg-slate-800 border border-slate-700 text-[10px] py-1.5 rounded text-white">Thomson</button>
                            <button onclick="change3DModel('rutherford')" class="bg-slate-800 border border-slate-700 text-[10px] py-1.5 rounded text-white">Rutherf.</button>
                            <button onclick="change3DModel('bohr')" class="bg-slate-800 border border-slate-700 text-[10px] py-1.5 rounded text-white">Bohr</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="tab-elementler" class="tab-content space-y-4 hidden">
            <div class="bg-[#0a0d16] p-4 rounded-xl border border-slate-800 shadow-lg space-y-4">
                <div class="flex items-center justify-between gap-2">
                    <div class="relative flex-1 max-w-xs">
                        <i class="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-500 text-xs"></i>
                        <input type="text" id="element-search" oninput="filterElements(this.value)" placeholder="Element ara..." class="bg-[#0f1422] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none w-full">
                    </div>
                    <div class="flex items-center space-x-2">
                        <button class="bg-[#1c120c] border border-[#eab308]/30 text-[#f97316] font-bold text-xs px-3 py-2 rounded-lg flex items-center space-x-1.5"><i class="fa-solid fa-temperature-half"></i><span>Sıcaklık Modu</span></button>
                        <button onclick="toggleFullScreenContainer()" class="bg-[#0f1422] border border-slate-800 text-slate-400 p-2.5 rounded-lg text-xs"><i class="fa-solid fa-expand"></i></button>
                    </div>
                </div>
                <div class="overflow-x-auto w-full pb-3">
                    <div id="periodic-matrix-container" class="grid gap-1.5 p-1 min-w-[1240px]" style="grid-template-columns: 28px repeat(18, minmax(64px, 1fr));"></div>
                </div>
            </div>
        </section>

        <section id="tab-guvenlik" class="tab-content space-y-4 hidden">
            <div class="bg-[#0e1322] p-4 rounded-xl border border-slate-800 text-center text-xs">9. Sınıf Kimyasal Laboratuvar Güvenlik Protokol Sekmesi Aktif.</div>
        </section>
        <section id="tab-galeri" class="tab-content space-y-4 hidden">
            <div class="bg-[#0e1322] p-4 rounded-xl border border-slate-800 text-center text-xs">
                <div class="bg-black rounded-lg overflow-hidden hidden mb-2" id="video-player-container"><video id="main-panel-video" controls class="w-full max-h-[300px]"></video></div>
                <div id="dynamic-video-container" class="space-y-1"></div>
            </div>
        </section>
        <section id="tab-youtube" class="tab-content space-y-4 hidden">
            <div class="bg-[#0e1322] p-4 rounded-xl border border-slate-800"><textarea id="yt-body" class="w-full bg-slate-900 text-xs p-2 rounded h-32 text-save" data-id="yt-body" placeholder="Senaryolar..."></textarea></div>
        </section>
    </main>

    <div id="element-modal" class="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-50 hidden flex items-center justify-center p-0 sm:p-4">
        <div class="bg-[#05070f] w-full h-full sm:max-w-2xl sm:h-[90vh] sm:rounded-2xl border-t sm:border border-slate-800 flex flex-col shadow-2xl overflow-hidden">
            <div class="p-4 bg-[#0a0d16] border-b border-slate-850 flex justify-between items-center shrink-0"><span class="text-xs font-semibold text-slate-400" id="modal-breadcrumb">Periyodik Tablo</span><button onclick="closeModal()" class="text-slate-400 text-xs bg-[#131a2e] px-3 py-1.5 rounded-lg border border-slate-800 font-bold">Kapat</button></div>
            <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-[#05070f]" id="modal-scroll-content">
                <div class="bg-[#0a0d16] p-5 rounded-2xl border border-slate-850 flex flex-col items-start space-y-4">
                    <div id="m-badge-container" class="w-24 h-24 border rounded-2xl flex flex-col items-center justify-center text-center shadow-lg bg-slate-950/50"><span class="text-xs text-slate-400 font-bold self-start pl-3 pt-1" id="m-num"></span><span class="text-3xl font-black tracking-tight mt-[-2px]" id="m-sym"></span><span class="text-[10px] text-slate-500 font-bold pb-1" id="m-mass"></span></div>
                    <div class="space-y-2 w-full"><h2 class="text-xl font-black text-white" id="m-name"></h2><div class="flex flex-wrap gap-1.5" id="m-tags"></div><p class="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-850" id="m-desc"></p></div>
                </div>
                <div class="grid grid-cols-2 gap-2" id="m-grid-props"></div>
                <div class="p-4 bg-[#0a1124] border border-blue-900/60 rounded-2xl"><div class="text-[11px] text-blue-400 font-bold uppercase mb-1">Müfredat Çalışma Notu</div><ul class="text-xs text-slate-300 list-disc pl-4" id="m-notes-list"></ul></div>
                <div class="space-y-2"><div class="text-[11px] text-slate-400 font-bold uppercase pl-1">Sıkça Sorulan Sorular</div><div class="space-y-2" id="m-sss-container"></div></div>
            </div>
            <div class="p-3 bg-[#0a0d16] border-t border-slate-850 flex items-center justify-between gap-2 shrink-0"><button id="modal-btn-prev" onclick="navigateElement(-1)" class="flex-1 bg-[#131a2e] border border-slate-800 text-xs py-2 rounded-xl text-left pl-3 text-slate-300 truncate"></button><button onclick="closeModal()" class="bg-[#1c120c] border border-[#f97316]/30 text-[#f97316] text-xs font-bold px-4 py-2 rounded-xl">Kapat</button><button id="modal-btn-next" onclick="navigateElement(1)" class="flex-1 bg-[#131a2e] border border-slate-800 text-xs py-2 rounded-xl text-right pr-3 text-slate-300 truncate"></button></div>
        </div>
    </div>

    <nav class="bg-slate-800 border-t border-slate-700 fixed bottom-0 left-0 right-0 p-1 flex justify-between items-center shadow-2xl z-40 w-full overflow-x-auto">
        <button onclick="switchTab('dersler')" id="btn-dersler" class="flex-1 flex flex-col items-center justify-center py-1 rounded-lg text-slate-400 active-tab min-w-[55px]"><i class="fa-solid fa-list-check text-xs mb-0.5"></i><span class="text-[8px]">Ders</span></button>
        <button onclick="switchTab('3d')" id="btn-3d" class="flex-1 flex flex-col items-center justify-center py-1 rounded-lg text-slate-400 min-w-[55px]"><i class="fa-solid fa-cube text-xs mb-0.5"></i><span class="text-[8px]">3D Stüdyo</span></button>
        <button onclick="switchTab('elementler')" id="btn-elementler" class="flex-1 flex flex-col items-center justify-center py-1 rounded-lg text-slate-400 min-w-[55px]"><i class="fa-solid fa-table-cells text-xs mb-0.5"></i><span class="text-[8px]">118 El.</span></button>
        <button onclick="switchTab('guvenlik')" id="btn-guvenlik" class="flex-1 flex flex-col items-center justify-center py-1 rounded-lg text-slate-400 min-w-[55px]"><i class="fa-solid fa-triangle-exclamation text-xs mb-0.5"></i><span class="text-[8px]">Güvenlik</span></button>
        <button onclick="switchTab('galeri')" id="btn-galeri" class="flex-1 flex flex-col items-center justify-center py-1 rounded-lg text-slate-400 min-w-[55px]"><i class="fa-solid fa-video text-xs mb-0.5"></i><span class="text-[8px]">Videolar</span></button>
        <button onclick="switchTab('youtube')" id="btn-youtube" class="flex-1 flex flex-col items-center justify-center py-1 rounded-lg text-slate-400 min-w-[55px]"><i class="fa-brands fa-youtube text-xs mb-0.5"></i><span class="text-[8px]">Senaryo</span></button>
    </nav>

    <script>
        let activeTabId = 'dersler'; let isDragging = false; let currentModalElementNum = 79; let activeCategoryFilter = null;
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

        function getCatStyle(cat) {
            if(cat === "Ametaller") return "cat-ametal"; if(cat === "Soygazlar") return "cat-soygaz";
            if(cat === "Alkali Metaller") return "cat-alkali"; if(cat === "Toprak Alkali Metaller") return "cat-toprak-alkali";
            if(cat === "Halojenler") return "cat-halojen"; if(cat === "Yarı Metaller") return "cat-yarimetal";
            if(cat === "Toprak Metalleri") return "cat-toprak-metali"; if(["Lantanit", "Aktinit"].includes(cat)) return "cat-lantanit-aktinit";
            return "cat-gecis";
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

        function buildElementsMatrix() {
            let list = []; for(let i=0; i<118; i++) { let n = i + 1; list.push({ n: n, s: symbols[i], name: names[i], m: masses[i], cat: getElementCategory(n) }); } return list;
        }
        const globalElements = buildElementsMatrix();

        function toggleCategoryFilter(catName) {
            activeCategoryFilter = (activeCategoryFilter === catName) ? null : catName;
            renderElementsGrid(globalElements);
        }

        function renderElementsGrid(list) {
            const container = document.getElementById('periodic-matrix-container'); if (!container) return; container.innerHTML = '';
            for (let g = 1; g <= 18; g++) { container.innerHTML += `<div class="text-center text-[10px] font-bold text-slate-600 self-end pb-1" style="grid-row: 1; grid-column: ${g + 1};">${g}</div>`; }
            for (let p = 1; p <= 7; p++) { container.innerHTML += `<div class="flex items-center justify-center text-[10px] font-bold text-slate-600 pr-1" style="grid-row: ${p + 1}; grid-column: 1;">${p}</div>`; }

            const legends = [
                { id: "Alkali Metaller", name: "Alkali Metal", color: "#ef4444", row: 3, col: 4 },
                { id: "Toprak Alkali Metaller", name: "Toprak Alkali Metal", color: "#f97316", row: 3, col: 6 },
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
                container.innerHTML += `<div onclick="toggleCategoryFilter('${l.id}')" class="border rounded-xl p-1 flex flex-col items-center justify-center text-center select-none cursor-pointer transition-all ${activeStyle}" style="grid-row: ${l.row}; grid-column: ${l.col} / span 2;"><div class="w-5 h-0.5 mb-1 rounded" style="background-color: ${l.color};"></div><span class="text-[9px] font-black tracking-tight" style="color: ${l.color};">${l.name}</span></div>`;
            });

            container.innerHTML += `
                <div class="border border-dashed border-purple-950/40 rounded-xl flex items-center justify-center text-center bg-purple-950/5 select-none" style="grid-row: 7; grid-column: 4;"><span class="text-[9px] font-bold text-purple-500/50">57-71</span></div>
                <div class="border border-dashed border-purple-950/40 rounded-xl flex items-center justify-center text-center bg-purple-950/5 select-none" style="grid-row: 8; grid-column: 4;"><span class="text-[9px] font-bold text-purple-500/50">89-103</span></div>
                <div style="grid-row: 9; grid-column: 1 / span 19; height: 12px;"></div>`;

            const searchVal = document.getElementById('element-search') ? document.getElementById('element-search').value.toLowerCase() : "";

            globalElements.forEach(el => {
                const coords = getGridCoords(el.n); let colorStyle = getCatStyle(el.cat);
                let isCatMatch = activeCategoryFilter === "Lantanit/Aktinit" ? ["Lantanit", "Aktinit"].includes(el.cat) : el.cat === activeCategoryFilter;
                let matchesCategory = !activeCategoryFilter || isCatMatch;
                let matchesSearch = !searchVal || el.name.toLowerCase().includes(searchVal) || el.s.toLowerCase().includes(searchVal);
                let isVisible = matchesCategory && matchesSearch;
                let dimmingStyle = !isVisible ? "opacity: 0.08; filter: grayscale(90%); pointer-events: none;" : ((activeCategoryFilter || searchVal) ? "transform: scale(1.03); font-weight: bold;" : "");
                
                container.innerHTML += `<div onclick="openElementDetail(${el.n})" class="p-1 bg-[#0f1422] border rounded-xl flex flex-col items-center justify-center text-center shadow-md hover:scale-105 transition-all cursor-pointer ${colorStyle}" style="grid-row: ${coords.row}; grid-column: ${coords.col}; ${dimmingStyle}"><span class="text-[8px] text-slate-500 font-bold self-start pl-0.5">${el.n}</span><span class="text-xs font-black tracking-tight text-white mt-[-2px]">${el.s}</span><span class="text-[8px] font-medium text-slate-400 truncate w-full mt-0.5">${el.name}</span></div>`;
            });
        }

        const elementDatabase = {
            1: { p:1, g:1, state:"Gaz", desc: "Evrenin en hafif elementidir. Yıldızların füzyon yakıtıdır.", config: "1s¹", shells: "1", density: "0.089 g/L", electronegativity: "2.20", melt: "-259.1 °C", discoverer: "Henry Cavendish", notes: "1A grubundadır ama alkali metal değil ametaldir. Sulu asitlerin katyon temelidir.", sss: [{q:"Yanıcı mıdır?", a:"Evet, yüksek derecede yanıcı temiz bir yakıttır."}] },
            2: { p:1, g:18, state:"Gaz", desc: "Reaksiyona girmeyen tamamen inert bir soy gazdır.", config: "1s²", shells: "2", density: "0.178 g/L", electronegativity: "n/a", melt: "-272.2 °C", discoverer: "Lockyer", notes: "Dublet kararlılığı gösterir. İyonlaşma enerjisi en yüksek olan elementtir.", sss: [{q:"Neden ses inceltir?", a:"Ses bu gazda havaya oranla 3 kat daha hızlı yayılır."}] },
            6: { p:2, g:14, state:"Katı", desc: "Yaşamın temel taşıdır. Allotropları grafit ve elmastır.", config: "[He] 2s² 2p²", shells: "2|4", density: "2.26 g/cm³", electronegativity: "2.55", melt: "3550 °C", discoverer: "Antik çağ", notes: "AYT organik kimyanın temeli hibritleşme (sp3, sp2, sp) teorilerini barındırır.", sss: [{q:"Allotrop nedir?", a:"Aynı atomun uzayda farklı geometride dizilmesidir."}] },
            7: { p:2, g:15, state:"Gaz", desc: "Atmosferin %78'ini oluşturan oda koşullarında kararlı bir gazdır.", config: "[He] 2s² 2p³", shells: "2|5", density: "1.251 g/L", electronegativity: "3.04", melt: "-210 °C", discoverer: "Rutherford", notes: "p3 küresel simetri yapısı taşır. Üçlü bağ (N≡N) nedeniyle çok asaldır.", sss: [{q:"Nasıl aktifleşir?", a:"Şimşek ve yıldırım enerjisiyle bağı kırılarak toprağa bağlanır."}] },
            8: { p:2, g:16, state:"Gaz", desc: "Solunum ve yanma reaksiyonlarının temel yakıcı elementidir.", config: "[He] 2s² 2p⁴", shells: "2|6", density: "1.429 g/L", electronegativity: "3.44", melt: "-218.7 °C", discoverer: "Priestley", notes: "Flor hariç tüm bileşiklerinde negatif yükseltgenme basamağı alır.", sss: [{q:"Oksijen yanar mı?", a:"Hayır, kendisi yanmaz sadece yakıcı gazdır."}] },
            9: { p:2, g:17, state:"Gaz", desc: "Tablonun en elektronegatif elementidir. Sadece -1 değerlik alır.", config: "[He] 2s² 2p⁵", shells: "2|7", density: "1.696 g/L", electronegativity: "3.98", melt: "-219.6 °C", discoverer: "Moissan", notes: "Elektron ilgisi klordan düşüktür ancak elektronegatifliği en yüksektir.", sss: [{q:"HF asidi özelliği?", a:"Camı aşındırabilen ve eritebilen tek asit türüdür."}] },
            11: { p:3, g:1, state:"Katı", desc: "Aktif alkali metaldir. Suyla temas edince alevli patlar.", config: "[Ne] 3s¹", shells: "2|8|1", density: "0.97 g/cm³", electronegativity: "0.93", melt: "97.8 °C", discoverer: "Davy", notes: "Hava ve nemle hızlı reaksiyona girdiğinden laboratuvarda gaz yağında saklanır.", sss: [{q:"Yumuşak mıdır?", a:"Evet, balmumu kıvamında olup bıçakla rahatça kesilir."}] },
            12: { p:3, g:2, state:"Katı", desc: "Klorofil molekülünün merkez atomudur. Hafif alaşım metalidir.", config: "[Ne] 3s²", shells: "2|8|2", density: "1.74 g/cm³", electronegativity: "1.31", melt: "650 °C", discoverer: "Davy", notes: "Bileşiklerinde sadece +2 değerlik alır. Sert sularda Ca ile birlikte bulunur.", sss: [{q:"Yangını nasıl söner?", a:"Su molekülünü parçaladığı için suyla söndürülemez, CO2 gerekir."}] },
            13: { p:3, g:13, state:"Katı", desc: "Yerkabuğunda en bol bulunan amfoter geçiş önü metalidir.", config: "[Ne] 3s² 3p¹", shells: "2|8|3", density: "2.70 g/cm³", electronegativity: "1.61", melt: "660.3 °C", discoverer: "Ørsted", notes: "Amfoter yapısıyla hem kuvvetli asitlerle hem kuvvetli bazlarla H2 üretir.", sss: [{q:"Neden korozyona dirençli?", a:"Yüzeyinde anında oluşan koruyucu Al2O3 film tabakası sayesinde."}] },
            17: { p:3, g:17, state:"Gaz", desc: "Yeşilimsi sarı renkli halojen sınıfı zehirli boğucu gazdır.", config: "[Ne] 3s² 3p⁵", shells: "2|8|7", density: "3.21 g/L", electronegativity: "3.16", melt: "-101.5 °C", discoverer: "Scheele", notes: "Tablonun elektron ilgisi en yüksek elementidir (İstisna olarak Floru geçer).", sss: [{q:"Tuz ruhuyla karışırsa?", a:"Ölümcül derecede zehirli saf klor gazı açığa çıkar, karıştırılmamalıdır."}] },
            20: { p:4, g:2, state:"Katı", desc: "Kemik ve dişlerin ana yapı taşı aktif toprak alkali metalidir.", config: "[Ar] 4s²", shells: "2|8|8|2", density: "1.55 g/cm³", electronegativity: "1.00", melt: "842 °C", discoverer: "Davy", notes: "Suya geçici sertlik veren iyondur. Çimento ve kireç endüstrisi temelidir.", sss: [{q:"Kireç sönmesi nedir?", a:"Kalsiyum oksidin suyla ekzotermik reaksiyon verip Ca(OH)2 oluşturmasıdır."}] },
            26: { p:4, g:8, state:"Katı", desc: "Ağır sanayinin yapı taşı ferromanyetik geçiş metalidir.", config: "[Ar] 3d⁶ 4s²", shells: "2|8|14|2", density: "7.87 g/cm³", electronegativity: "1.83", melt: "1538 °C", discoverer: "Antik çağ", notes: "Hemoglobinin merkez atomudur. Bileşiklerinde +2 ve +3 değişken değerlik alır.", sss: [{q:"Paslanma redoks mudur?", a:"Evet, demirin oksijenle yaptığı yavaş elektrokimyasal yanmadır."}] },
            29: { p:4, g:11, state:"Katı", desc: "Oksijensiz saf asitlerle tepkime vermez, hno3 ile NO2 gazı açığa çıkarır.", sss:[{q:"Anomali dizilim nedir?", a:"Açık elektron diziliminin kendiliğinden küresel simetriye uymasıdır."}] },
            79: { p:6, g:11, state:"Katı", desc: "Tam soy metal. Korozyona aşırı dayanıklıdır. Asitlerden etkilenmez.", config: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹", shells: "2|8|18|32|18|1", density: "19.3 g/cm³", electronegativity: "2.54", melt: "1064.2 °C", discoverer: "Antik çağ", notes: "Kral suyu hariç asitlerden etkilenmez. Elektron dizilimi anomalilidir.", sss: [{q:"Kral suyu formülü?", a:"3 hacim HCl ile 1 hacim HNO3 karışımı güçlü asit kokteylidir."}] },
            80: { p:6, g:12, state:"Sıvı", desc: "Oda sıcaklığında sıvı kalan tek metalik geçiş elementidir.", config: "[Xe] 4f¹⁴ 5d¹⁰ 6s²", shells: "2|8|18|32|18|2", density: "13.53 g/cm³", electronegativity: "2.00", melt: "-38.8 °C", discoverer: "Antik çağ", notes: "Ağır metal zehirlenmesi ve Minamata nörolojik sendromu yaratır, toksiktir.", sss: [{q:"Yoğunluğu fazla mıdır?", a:"Evet, demir somunlar cıva sıvısı üstünde batmadan batmadan yüzer."}] }
        };

        function openElementDetail(num) {
            currentModalElementNum = num; const el = globalElements.find(x => x.n === num); if (!el) return;
            let colorStyle = getCatStyle(el.cat); document.getElementById('m-badge-container').className = `w-24 h-24 border rounded-2xl flex flex-col items-center justify-center text-center shadow-lg bg-slate-950/50 ${colorStyle}`;
            document.getElementById('modal-breadcrumb').innerText = `Periyodik Tablo / ${el.name}`;
            document.getElementById('m-num').innerText = el.n; document.getElementById('m-sym').innerText = el.s; document.getElementById('m-mass').innerText = el.m;
            document.getElementById('m-name').innerHTML = `${el.name} (${el.s}) Nedir?`;
            
            let targetData = elementDatabase[num] || { eng: "Element", state: "Katı", period: Math.ceil(num/18), group: (num%18===0)?18:num%18, desc: `${el.name} müfredat analiz verisidir.`, config: "n/a", shells: "n/a", density: "n/a", electronegativity: "n/a", melt: "n/a", discoverer: "Bilinmiyor", notes: "Grup periyodik özellik trendlerine uyumludur.", sss: [{ q: "Atom numarası?", a: "Çekirdeğindeki resmi proton sayısıdır." }] };

            document.getElementById('m-desc').innerText = targetData.desc;
            document.getElementById('m-history-text').innerText = targetData.history || 'Antik çağlardan beri bilinen element serilerindendir.';
            document.getElementById('m-isotope-text').innerText = targetData.isotope || 'Doğal kütle numarası izotop dağılımları müfredata uygundur.';
            document.getElementById('m-bio-text').innerText = targetData.bio || 'Canlı dokularında toksik birikim etkisi saptanmamıştır.';
            
            document.getElementById('m-tags').innerHTML = `<span class="text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-white font-medium">${el.cat}</span><span class="text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-slate-400">Periyot ${targetData.period || Math.ceil(num/18)}</span><span class="text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-slate-400">Grup ${targetData.group || ((num%18===0)?18:num%18)}</span>`;
            document.getElementById('m-grid-props').innerHTML = `<div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Konfigürasyon</div><div class="text-xs font-bold text-white">${targetData.config}</div></div><div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Kabuklar</div><div class="text-xs font-bold text-white">${targetData.shells}</div></div><div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Yoğunluk</div><div class="text-xs font-bold text-white">${targetData.density}</div></div><div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Elektronegatiflik</div><div class="text-xs font-bold text-white">${targetData.electronegativity}</div></div><div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Erime</div><div class="text-xs font-bold text-white">${targetData.melt}</div></div><div class="p-3 bg-[#0a0d16] border border-slate-850 rounded-xl"><div class="text-[9px] text-slate-500 font-bold uppercase">Keşfeden</div><div class="text-xs font-bold text-slate-300">${targetData.discoverer}</div></div>`;
            document.getElementById('m-notes-list').innerHTML = targetData.notes ? `<li class="text-xs text-slate-300 leading-relaxed">• ${targetData.notes}</li>` : '<li>Müfredat notu girilmedi.</li>';
            document.getElementById('m-sss-container').innerHTML = (targetData.sss || []).map(x => `<div class="bg-[#0a0d16] p-2 rounded-xl border border-slate-850"><div class="text-xs font-bold text-white">${x.q}</div><div class="text-xs text-slate-400 mt-0.5">${x.a}</div></div>`).join('');
            
            const prevEl = globalElements.find(x => x.n === num - 1); const nextEl = globalElements.find(x => x.n === num + 1);
            document.getElementById('modal-btn-prev').innerText = prevEl ? `← ${prevEl.name}` : "Başlangıç";
            document.getElementById('modal-btn-next').innerText = nextEl ? `${nextEl.name} →` : "Bitiş";
            document.getElementById('element-modal').classList.remove('hidden'); document.getElementById('modal-scroll-content').scrollTop = 0;
        }

        const defaultTopics = [{ id: "t1", name: "01 Modern Atom Modeli", desc: "Elektron konfigürasyonları.", checked: false, link: "" }, { id: "t2", name: "02 Gazlar", desc: "Kinetik teori bağıntıları.", checked: false, link: "" }];
        function renderAytTopics() {
            let list = defaultTopics;
            try { list = JSON.parse(localStorage.getItem('custom_topic_list')) || defaultTopics; } catch(e) { list = defaultTopics; }
            const container = document.getElementById('ayt-topics-container'); if(!container) return; container.innerHTML = '';
            list.forEach(topic => {
                const hasLink = topic.link && topic.link.trim().startsWith('http');
                container.innerHTML += `<div class="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden"><div class="p-3 flex items-center justify-between bg-slate-950/40 hover:bg-slate-950/80 cursor-pointer" onclick="toggleAccordion('${topic.id}')"><div class="flex items-center space-x-3 min-w-0 flex-1"><input type="checkbox" ${topic.checked ? 'checked' : ''} onchange="toggleTopicCheck('${topic.id}', this.checked)" onclick="event.stopPropagation();" class="w-4.5 h-4.5 rounded text-blue-600 bg-slate-700"><span class="text-xs font-bold text-slate-200 truncate" id="title-text-${topic.id}">${topic.name}</span></div><div class="flex items-center space-x-2.5 shrink-0" onclick="event.stopPropagation();"><button onclick="openTopicLink('${topic.id}')" class="text-[10px] bg-slate-800 hover:bg-blue-900 text-slate-400 px-2 py-1 rounded border border-slate-700 ${hasLink ? '' : 'hidden'}" id="go-${topic.id}">Aç</button><i class="fa-solid fa-chevron-down text-slate-500 text-xs" id="arrow-${topic.id}"></i></div></div><div id="body-${topic.id}" class="hidden p-3 border-t border-slate-850 bg-slate-900/40 space-y-3"><input type="text" value="${topic.name}" oninput="updateTopicName('${topic.id}', this.value)" class="bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs w-full text-white focus:outline-none"><input type="text" value="${topic.link || ''}" placeholder="Müfredat Linki..." oninput="updateTopicLink('${topic.id}', this.value)" class="bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs w-full text-white focus:outline-none"><button onclick="deleteTopic('${topic.id}')" class="text-[10px] text-rose-400 underline">Sil</button></div></div>`;
            });
        }
        function toggleAccordion(id) { const b = document.getElementById(`body-${id}`), a = document.getElementById(`arrow-${id}`); if(b && a) { b.classList.toggle('hidden'); a.classList.toggle('rotate-180'); } }
        
        function updateTopicName(id, val) { 
            let list = defaultTopics; try { list = JSON.parse(localStorage.getItem('custom_topic_list')) || defaultTopics; } catch(e) { list = defaultTopics; }
            let t = list.find(x => x.id === id); if(t) { t.name = val; try { localStorage.setItem('custom_topic_list', JSON.stringify(list)); } catch(e){} document.getElementById(`title-text-${id}`).innerText = val; } 
        }
        function updateTopicLink(id, val) { 
            let list = defaultTopics; try { list = JSON.parse(localStorage.getItem('custom_topic_list')) || defaultTopics; } catch(e) { list = defaultTopics; }
            let t = list.find(x => x.id === id); if(t) { t.link = val; try { localStorage.setItem('custom_topic_list', JSON.stringify(list)); } catch(e){} const btn = document.getElementById(`go-${id}`); if(btn) { if(val.trim().startsWith('http')) btn.classList.remove('hidden'); else btn.classList.add('hidden'); } } 
        }
        function openTopicLink(id) { 
            let list = defaultTopics; try { list = JSON.parse(localStorage.getItem('custom_topic_list')); } catch(e) { return; }
            let t = list.find(x => x.id === id); if(t && t.link) window.open(t.link.trim(), '_blank'); 
        }
        function toggleTopicCheck(id, chk) { 
            let list = defaultTopics; try { list = JSON.parse(localStorage.getItem('custom_topic_list')); } catch(e) { return; }
            let t = list.find(x => x.id === id); if(t) { t.checked = chk; try { localStorage.setItem('custom_topic_list', JSON.stringify(list)); } catch(e){} } 
        }
        function addNewTopic() { 
            const n = document.getElementById('new-topic-name'); if(!n || !n.value.trim()) return; 
            let list = []; try { list = JSON.parse(localStorage.getItem('custom_topic_list')) || []; } catch(e) { list = []; }
            list.push({ id: "topic_" + Date.now(), name: n.value.trim(), checked: false, link: "" }); try { localStorage.setItem('custom_topic_list', JSON.stringify(list)); } catch(e){} n.value = ''; renderAytTopics(); 
        }
        function resetTopicsToDefault() { try { localStorage.setItem('custom_topic_list', JSON.stringify(defaultTopics)); } catch(e){} renderAytTopics(); }
        function deleteTopic(id) { 
            let list = []; try { list = JSON.parse(localStorage.getItem('custom_topic_list')); } catch(e) { return; }
            list = list.filter(x => x.id !== id); try { localStorage.setItem('custom_topic_list', JSON.stringify(list)); } catch(e){} renderAytTopics(); 
        }

        const defaultVideos = [{ name: "1. Sodyum Klorür Kristal Örgüsü (Tuz-Su)", file: "NaCl-H2O.MP4" }];
        function renderVideoList() {
            let list = defaultVideos; try { list = JSON.parse(localStorage.getItem('custom_video_list')) || defaultVideos; } catch(e) { list = defaultVideos; }
            const container = document.getElementById('dynamic-video-container'); if(!container) return; container.innerHTML = '';
            list.forEach((item) => {
                container.innerHTML += `<div class="w-full bg-slate-900 rounded border border-slate-850 flex justify-between items-center p-2.5"><button onclick="playCloudVideo('${item.file}')" class="text-xs font-medium text-slate-300 truncate hover:text-cyan-400 text-left"><i class="fa-solid fa-circle-play mr-2 text-cyan-400"></i>${item.name}</button></div>`;
            });
        }
        function playCloudVideo(f) { const v = document.getElementById('main-panel-video'); if(v) { v.src = `./videos/${f}`; document.getElementById('video-player-container').classList.remove('hidden'); v.play(); } }

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
            function animate() { requestAnimationFrame(animate); if (currentGroup && !isDragging && activeTabId === '3d') currentGroup.rotation.y += 0.005; if(renderer && scene && camera) renderer.render(scene, camera); } animate();
            window.addEventListener('resize', onWindowResize);
        }

        function change3DModel(type) {
            if (!scene) return; if (currentGroup) scene.remove(currentGroup); currentGroup = new THREE.Group();
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

        document.addEventListener('DOMContentLoaded', () => { 
            switchTab('dersler'); 
            renderAytTopics(); 
            renderElementsGrid(globalElements); 
            renderVideoList(); 
            try { init3D(); } catch(e) { console.log('3D pasif'); }
            document.querySelectorAll('.text-save').forEach(i => { 
                try {
                    const id = i.getAttribute('data-id'); 
                    const s = localStorage.getItem(id); 
                    if (s) i.value = s; 
                    i.addEventListener('input', () => localStorage.setItem(id, i.value)); 
                } catch(e){}
            }); 
        });
    </script>
</body>
</html>

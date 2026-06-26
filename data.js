const names = ["Hidrojen","Helyum","Lityum","Berilyum","Bor","Karbon","Azot","Oksijen","Flor","Neon","Sodyum","Magnezyum","Alüminyum","Silisyum","Fosfor","Kükürt","Klor","Argon","Potasyum","Kalsiyum","Skandiyum","Titanyum","Vanadyum","Krom","Manganez","Demir","Kobalt","Nikel","Bakır","Çinko","Galyum","Germanyum","Arsenik","Selenyum","Brom","Kripton","Rubidyum","Stronsiyum","İtriyum","Zirkonyum","Niyobyum","Molibden","Teknesyum","Rutenyum","Rodyum","Paladyum","Gümüş","Kadmiyum","İndiyum","Kalay","Antimon","Tellür","İyot","Ksenon","Sezyum","Baryum","Lantan","Seryum","Praseodim","Neodimyum","Prometyum","Samaryum","Europiyum","Gadolinyum","Terbiyum","Disprozyum","Holmiyum","Erbiyum","Tulyum","İterbiyum","Lutesyum","Hafniyum","Tantal","Volfram","Renyum","Osmiyum","İridyum","Platin","Altın","Cıva","Talyum","Kurşun","Bizmuth","Polonyum","Astat","Radon","Fransiyum","Radyum","Aktinyum","Toryum","Protaktinyum","Uranyum","Neptünyum","Plutonyum","Amerikyum","Küriyum","Berkelyum","Kaliforniyum","Aynştaynyum","Fermiyum","Mendelevyum","Nobelyum","Lavrensiyum","Rutherfordiyum","Dubniyum","Seaborgeyum","Bohriyum","Hassiyum","Maytneriyum","Darmstadtiyum","Röntgenyum","Kopernikyum","Nihonyum","Flerovyum","Moskovyum","Livermoryum","Tennessin","Oganesson"];
const symbols = ["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr","Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe","Cs","Ba","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"];
const masses = [1.008, 4.002, 6.94, 9.012, 10.81, 12.011, 14.007, 15.999, 18.998, 20.18, 22.99, 24.305, 26.982, 28.085, 30.974, 32.06, 35.45, 39.948, 39.098, 40.078, 44.956, 47.867, 50.942, 51.996, 54.938, 55.845, 58.933, 58.693, 63.546, 65.38, 69.723, 72.63, 74.922, 78.971, 79.904, 83.798, 85.468, 87.62, 88.906, 91.224, 92.906, 95.95, 98, 101.07, 102.91, 106.42, 107.87, 112.41, 114.82, 118.71, 121.76, 127.6, 126.9, 131.29, 132.91, 137.33, 138.91, 140.12, 140.91, 144.24, 145, 150.36, 151.96, 157.25, 158.93, 162.5, 164.93, 167.26, 168.93, 173.05, 174.97, 178.49, 180.95, 183.84, 186.21, 190.23, 192.22, 195.08, 196.97, 200.59, 204.38, 207.2, 208.98, 209, 210, 222, 223, 226, 227, 232.04, 231.04, 238.03, 237, 244, 243, 247, 247, 251, 252, 257, 258, 259, 262, 267, 268, 269, 270, 269, 278, 281, 280, 285, 286, 289, 289, 293, 294, 294];

const elementDatabase = {
    1: {
        eng: "Hydrogen", state: "Gaz", period: 1, group: 1,
        desc: "Evrenin en hafif ve en bol bulunan elementidir. Yıldızların temel enerji kaynağıdır.",
        config: "1s¹", shells: "1", density: "0.089 g/L", electronegativity: "2.20", melt: "-259.1 °C", boil: "-252.9 °C", discoverer: "Henry Cavendish",
        history: "1766 yılında Henry Cavendish tarafından metal-asit reaksiyonları esnasında keşfedildi. Lavoisier elemente su üreten anlamına gelen 'Hydrogen' ismini verdi.",
        isotope: "¹H (Protium - %99.98), ²H (Deuterium - Ağır Hidrojen), ³H (Tritium - Radyoaktif).",
        usages: ["Roket yakıtı olarak sıvı fazda", "Amonyak sentezi (Haber-Bosch süreci)", "Metanol üretimi ve petrol işleme"],
        bio: "Su molekülünün yapısında yer alarak insan ve canlı vücudunun kütlece yaklaşık %10'unu oluşturur.",
        inter: ["1A grubunda bulunmasına rağmen metal değil, tamamen ametal özellik gösteren tek elementtir.", "Yüksek sıcaklıklarda mükemmel bir indirgen ajandır."],
        notes: ["9. Sınıf ve AYT kimya giriş konularında asit çözeltilerinin H⁺ katyon kaynağı olarak işlenir."],
        sss: [{ q: "Hidrojen neden yanıcıdır?", a: "Oksijenle birleştiğinde yüksek ekzotermik tepkime vererek su oluşturur; bu yüzden patlayıcı bir yakıttır." }]
    },
    2: {
        eng: "Helium", state: "Gaz", period: 1, group: 18,
        desc: "Evrendeki en hafif ikinci elementtir. Reaksiyona girmeyen tamamen asal (inert) bir soy gazdır.",
        config: "1s²", shells: "2", density: "0.178 g/L", electronegativity: "n/a", melt: "-272.2 °C", boil: "-268.9 °C", discoverer: "Janssen / Lockyer",
        history: "İlk kez 1868 yılında güneş tutulması esnasındaki spektrum çizgilerinden keşfedildi. Adını güneş tanrısı Helios'tan alır.",
        isotope: "³He, ⁴He (Doğal form %99.99 ⁴He yapısındadır).",
        usages: ["Kriyojenik soğutma (MR cihazları süperiletken mıknatısları)", "Meteoroloji ve uçan balon dolguları", "Derin deniz dalgıç tüpleri"],
        bio: "Biyolojik olarak tamamen inerttir, insan dokularıyla reaksiyona girmez.",
        inter: ["Değerlik elektron sayısı 2 olmasına rağmen 2A grubunda değil, kararlı oktet/dublet yapısından dolayı 8A grubundadır.", "Mutlak sıfırda bile sıvı kalabilir."],
        notes: ["Son katmanını ikiye tamamlayarak kararlılığa ulaşma (dublet kuralı) ilkesinin temel örneğidir."],
        sss: [{ q: "Helyum neden ses inceltir?", a: "Helyum gazının yoğunluğu havadan çok düşüktür; bu yüzden ses dalgaları bu gaz içinde 3 kat daha hızlı yayılır." }]
    },
    6: {
        eng: "Carbon", state: "Katı", period: 2, group: 14,
        desc: "Yaşamın temel taşıdır. Dört kovalent bağ yapabilme yeteneği (tetravalan) sayesinde milyonlarca farklı organik zincir kurabilir.",
        config: "[He] 2s² 2p²", shells: "2 | 4", density: "2.26 g/cm³", electronegativity: "2.55", melt: "3550 °C", boil: "4027 °C", discoverer: "Antik çağ",
        history: "Tarih öncesi çağlardan beri kömür ve kurum formunda insanlık tarafından kullanılmaktadır. Allotropları kimya tarihini şekillendirmiştir.",
        isotope: "¹²C (Kararlı), ¹³C (Kararlı), ¹⁴C (Radyoaktif - Arkeolojik yaş tayin motoru).",
        usages: ["Çelik üretimi endüstrisi", "Nano-teknoloji (Grafen, Karbon Nanotüpler)", "Plastik, ilaç ve sentetik polimer sanayisi"],
        bio: "Organik kimyanın temelidir. Karbonhidratlar, lipidler, proteinler ve DNA'nın ana iskeletini kurar.",
        inter: ["Aynı element hem yeryüzünün en yumuşak kristallerinden birini (grafit) hem de en sert malzemesini (elmas) oluşturabilir (Allotropi)."],
        notes: ["AYT Organik Kimya ünitesinin temelidir. sp³, sp², sp hibritleşme modelleri bu atom üzerinden öğretilir."],
        sss: [{ q: "Karbon-14 yöntemi nasıl yaş tayini yapar?", a: "Radyoaktif ¹⁴C izotopunun yarılanma ömrü (5730 yıl) baz alınarak organik kalıntıların yaşı hesaplanır." }]
    },
    13: {
        eng: "Aluminium", state: "Katı", period: 3, group: 13,
        desc: "Yerkabuğunda en bol bulunan metaldir (kütlece ~%8,1). Hafifliği ve korozyon direnci nedeniyle sanayinin gözbebeğidir. Amfoter metalledir.",
        config: "[Ne] 3s² 3p¹", shells: "2 | 8 | 3", density: "2.70 g/cm³", electronegativity: "1.61", melt: "660.3 °C", boil: "2470 °C", discoverer: "Hans Christian Ørsted",
        history: "1825 yılında Ørsted tarafından izole edildi. 19. yüzyılda Hall-Héroult elektroliz yöntemi bulunana dek altından daha kıymetliydi.",
        isotope: "²⁷Al (%100 kararlı doğal tek izotop).",
        usages: ["Uçak gövdesi, otomotiv ve hafif şaseler", "Yüksek gerilim iletim hat iletken telleri", "Mutfak folyoları ve termit kaynak reaksiyonları"],
        bio: "Biyolojik bir fonksiyonu yoktur, dokularda yüksek birikimi merkezi sinir sistemine nörotoksik etkiler yapabilir.",
        inter: ["Havayla temas ettiği an yüzeyinde anında görünmez bir Al₂O₃ pasifleşme tabakası oluşturarak iç kalkanını korur."],
        notes: ["Müfredatta amfoter metallerin baş tacıdır. Hem kuvvetli asitlerle hem de kuvvetli bazlarla H₂ gazı üretir."],
        sss: [{ q: "Alüminyum bazlarla nasıl reaksiyon verir?", a: "Amfoterik karakteri gereği kuvvetli bazlarla reaksiyona girerek kompleks alüminat tuzları oluşturur." }]
    },
    79: {
        eng: "Gold", state: "Katı", period: 6, group: 11,
        desc: "Tam soy metaldir. Korozyona ve paslanmaya karşı doğadaki en dirençli elementtir. Asitlerden sadece kral suyu ile tepkime verir.",
        config: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹", shells: "2 | 8 | 18 | 32 | 18 | 1", density: "19.3 g/cm³", electronegativity: "2.54", melt: "1064.2 °C", boil: "2855.8 °C", discoverer: "Antik çağ",
        history: "MÖ 5000 yıllarına uzanan işleme geçmişi mevcuttur. Sembolü Au, Latince 'aurum' (parıldayan şafak) kelimesinden gelir.",
        isotope: "¹⁹⁷Au (%100 doğal kararlı bolluk oranı).",
        usages: ["Yüksek güvenilirlikli mikroelektronik devre kontak kaplamaları", "James Webb Uzay Teleskobu altın aynaları IR yansıtma filmleri", "LFIA medikal gebelik test şeritleri nanopartikülleri"],
        bio: "Biyolojik olarak tamamen inerttir. LFIA test şeritlerinde antikorlara bağlanarak kırmızı plazmonik çizgi rengini üretir.",
        inter: ["Z=79'daki elektronların ışık hızına yakın dönmesiyle oluşan relativistik büzülme, 5d-6s enerji farkını daraltarak sarı renk üretir."],
        notes: ["Elektron konfigürasyonunda d¹⁰ 4s¹ gibi d¹⁰ 6s¹ küresel simetri anomalisi taşır. Soru bankalarının favorisidir."],
        sss: [{ q: "Kral suyu nedir?", a: "3 hacim konsantre HCl ile 1 hacim konsantre HNO₃ karışımından oluşan, altını çözebilen güçlü bir asit kokteylidir." }]
    }
};

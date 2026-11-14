
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LocaleContext = createContext();

export const languages = [
  { code: "en", name: "English", locale: "en-US" },
  { code: "fr", name: "Français", locale: "fr-FR" },
  { code: "es", name: "Español", locale: "es-ES" },
  { code: "pt", name: "Português", locale: "pt-PT" },
  { code: "de", name: "Deutsch", locale: "de-DE" },
  { code: "ar", name: "العربية", locale: "ar-SA" },
  { code: "zh", name: "中文", locale: "zh-CN" },
  { code: "hi", name: "हिन्दी", locale: "hi-IN" },
  { code: "yo", name: "Yorùbá", locale: "yo-NG" },
  { code: "ha", name: "Hausa", locale: "ha-NG" },
  { code: "ig", name: "Igbo", locale: "ig-NG" },
  { code: "ja", name: "日本語", locale: "ja-JP" },
  { code: "ko", name: "한국어", locale: "ko-KR" },
  { code: "it", name: "Italiano", locale: "it-IT" },
  { code: "ru", name: "Русский", locale: "ru-RU" },
  { code: "tr", name: "Türkçe", locale: "tr-TR" },
];

const translations = {
  en: {
    home: "Home",
    categories: "Categories",
    products: "Products",
    favourites: "Favourites",
    cart: "Shopping Cart",
    account: "My Account",
    login: "Sign In",
    register: "Sign Up",
    logout: "Sign Out",
    search: "Search products...",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    checkout: "Checkout",
    orders: "My Orders",
    support: "Help & Support",
    welcome: "Welcome to UNIQMART",
    holiday: "HOLIDAY SPECIALS",
    shopNow: "Shop Now",
    exploreGifts: "Explore Gifts",
    all: "All",
    beauty: "Beauty",
    fashion: "Fashion",
    furniture: "Furniture",
    groceries: "Groceries",
    shoes: "Shoes",
  },

  fr: {
    home: "Accueil",
    categories: "Catégories",
    products: "Produits",
    favourites: "Favoris",
    cart: "Panier",
    account: "Mon compte",
    login: "Se connecter",
    register: "S'inscrire",
    logout: "Déconnexion",
    search: "Rechercher des produits...",
    addToCart: "Ajouter au panier",
    buyNow: "Acheter maintenant",
    checkout: "Commander",
    orders: "Mes commandes",
    support: "Aide et assistance",
    welcome: "Bienvenue chez UNIQMART",
    holiday: "OFFRES DE FÊTES",
    shopNow: "Acheter",
    exploreGifts: "Découvrir les cadeaux",
    all: "Tout",
    beauty: "Beauté",
    fashion: "Mode",
    furniture: "Meubles",
    groceries: "Épicerie",
    shoes: "Chaussures",
  },

  es: {
    home: "Inicio",
    categories: "Categorías",
    products: "Productos",
    favourites: "Favoritos",
    cart: "Carrito",
    account: "Mi cuenta",
    login: "Iniciar sesión",
    register: "Registrarse",
    logout: "Cerrar sesión",
    search: "Buscar productos...",
    addToCart: "Añadir al carrito",
    buyNow: "Comprar ahora",
    checkout: "Finalizar compra",
    orders: "Mis pedidos",
    support: "Ayuda y soporte",
    welcome: "Bienvenido a UNIQMART",
    holiday: "OFERTAS ESPECIALES",
    shopNow: "Comprar ahora",
    exploreGifts: "Explorar regalos",
    all: "Todo",
    beauty: "Belleza",
    fashion: "Moda",
    furniture: "Muebles",
    groceries: "Comestibles",
    shoes: "Zapatos",
  },

  pt: {
    home: "Início",
    categories: "Categorias",
    products: "Produtos",
    favourites: "Favoritos",
    cart: "Carrinho",
    account: "Minha conta",
    login: "Entrar",
    register: "Registar",
    logout: "Sair",
    search: "Pesquisar produtos...",
    addToCart: "Adicionar ao carrinho",
    buyNow: "Comprar agora",
    checkout: "Finalizar compra",
    orders: "Meus pedidos",
    support: "Ajuda e suporte",
    welcome: "Bem-vindo à UNIQMART",
    holiday: "OFERTAS ESPECIAIS",
    shopNow: "Comprar agora",
    exploreGifts: "Explorar presentes",
    all: "Todos",
    beauty: "Beleza",
    fashion: "Moda",
    furniture: "Móveis",
    groceries: "Mercearia",
    shoes: "Sapatos",
  },

  de: {
    home: "Startseite",
    categories: "Kategorien",
    products: "Produkte",
    favourites: "Favoriten",
    cart: "Warenkorb",
    account: "Mein Konto",
    login: "Anmelden",
    register: "Registrieren",
    logout: "Abmelden",
    search: "Produkte suchen...",
    addToCart: "In den Warenkorb",
    buyNow: "Jetzt kaufen",
    checkout: "Zur Kasse",
    orders: "Meine Bestellungen",
    support: "Hilfe und Support",
    welcome: "Willkommen bei UNIQMART",
    holiday: "FESTANGEBOTE",
    shopNow: "Jetzt einkaufen",
    exploreGifts: "Geschenke entdecken",
    all: "Alle",
    beauty: "Schönheit",
    fashion: "Mode",
    furniture: "Möbel",
    groceries: "Lebensmittel",
    shoes: "Schuhe",
  },

  ar: {
    home: "الرئيسية",
    categories: "الفئات",
    products: "المنتجات",
    favourites: "المفضلة",
    cart: "سلة التسوق",
    account: "حسابي",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    logout: "تسجيل الخروج",
    search: "البحث عن المنتجات...",
    addToCart: "أضف إلى السلة",
    buyNow: "اشتر الآن",
    checkout: "إتمام الشراء",
    orders: "طلباتي",
    support: "المساعدة والدعم",
    welcome: "مرحباً بك في UNIQMART",
    holiday: "عروض العطلات",
    shopNow: "تسوق الآن",
    exploreGifts: "اكتشف الهدايا",
    all: "الكل",
    beauty: "الجمال",
    fashion: "الأزياء",
    furniture: "الأثاث",
    groceries: "البقالة",
    shoes: "الأحذية",
  },

  zh: {
    home: "首页",
    categories: "分类",
    products: "商品",
    favourites: "收藏",
    cart: "购物车",
    account: "我的账户",
    login: "登录",
    register: "注册",
    logout: "退出登录",
    search: "搜索商品...",
    addToCart: "加入购物车",
    buyNow: "立即购买",
    checkout: "结账",
    orders: "我的订单",
    support: "帮助与支持",
    welcome: "欢迎来到 UNIQMART",
    holiday: "节日特惠",
    shopNow: "立即购物",
    exploreGifts: "探索礼品",
    all: "全部",
    beauty: "美容",
    fashion: "时尚",
    furniture: "家具",
    groceries: "杂货",
    shoes: "鞋子",
  },

  hi: {
    home: "होम",
    categories: "श्रेणियाँ",
    products: "उत्पाद",
    favourites: "पसंदीदा",
    cart: "शॉपिंग कार्ट",
    account: "मेरा खाता",
    login: "साइन इन",
    register: "साइन अप",
    logout: "साइन आउट",
    search: "उत्पाद खोजें...",
    addToCart: "कार्ट में जोड़ें",
    buyNow: "अभी खरीदें",
    checkout: "चेकआउट",
    orders: "मेरे ऑर्डर",
    support: "सहायता",
    welcome: "UNIQMART में आपका स्वागत है",
    holiday: "छुट्टियों के विशेष ऑफर",
    shopNow: "अभी खरीदें",
    exploreGifts: "उपहार देखें",
    all: "सभी",
    beauty: "सौंदर्य",
    fashion: "फैशन",
    furniture: "फर्नीचर",
    groceries: "किराने का सामान",
    shoes: "जूते",
  },

  yo: {
    home: "Ilé",
    categories: "Àwọn ẹ̀ka",
    products: "Ọjà",
    favourites: "Àwọn ayanfẹ́",
    cart: "Apò ìrajà",
    account: "Àkọọ́lẹ̀ mi",
    login: "Wọlé",
    register: "Forúkọ sílẹ̀",
    logout: "Jáde",
    search: "Wá ọjà...",
    addToCart: "Fi sínú apò",
    buyNow: "Ra nísinsìnyí",
    checkout: "Parí ìsanwó",
    orders: "Àwọn àṣẹ mi",
    support: "Ìrànlọ́wọ́",
    welcome: "Káàbọ̀ sí UNIQMART",
    holiday: "ÀWỌN Ẹ̀BỌ̀N ÀYẸYẸ",
    shopNow: "Ra nísinsìnyí",
    exploreGifts: "Wo àwọn ẹ̀bùn",
    all: "Gbogbo",
    beauty: "Ẹwà",
    fashion: "Aṣọ",
    furniture: "Àga àti tábìlì",
    groceries: "Oúnjẹ",
    shoes: "Bàtà",
  },

  ha: {
    home: "Gida",
    categories: "Rukuni",
    products: "Kayayyaki",
    favourites: "Abubuwan so",
    cart: "Keken sayayya",
    account: "Asusuna",
    login: "Shiga",
    register: "Yi rajista",
    logout: "Fita",
    search: "Nemo kayayyaki...",
    addToCart: "Ƙara cikin keken",
    buyNow: "Saya yanzu",
    checkout: "Biya",
    orders: "Oda na",
    support: "Taimako",
    welcome: "Barka da zuwa UNIQMART",
    holiday: "RANGWAMEN BIKI",
    shopNow: "Saya yanzu",
    exploreGifts: "Duba kyaututtuka",
    all: "Duka",
    beauty: "Kyakkyawa",
    fashion: "Tufafi",
    furniture: "Kayan daki",
    groceries: "Kayan abinci",
    shoes: "Takalma",
  },

  ig: {
    home: "Ụlọ",
    categories: "Ụdị ngwaahịa",
    products: "Ngwaahịa",
    favourites: "Ndị a họọrọ",
    cart: "Akpa ịzụ ahịa",
    account: "Akaụntụ m",
    login: "Banye",
    register: "Debanye aha",
    logout: "Pụọ",
    search: "Chọọ ngwaahịa...",
    addToCart: "Tinye na akpa",
    buyNow: "Zụta ugbu a",
    checkout: "Kwụọ ụgwọ",
    orders: "Nye iwu m",
    support: "Enyemaka",
    welcome: "Nnọọ na UNIQMART",
    holiday: "ỌNỤ AHỊA EMUME",
    shopNow: "Zụta ugbu a",
    exploreGifts: "Lee onyinye",
    all: "Niile",
    beauty: "Mma",
    fashion: "Ejiji",
    furniture: "Ngwá ụlọ",
    groceries: "Nri",
    shoes: "Akpụkpọ ụkwụ",
  },
};

export function LocaleProvider({ children }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("uniqmart-language") || "en"
  );

  const [currency, setCurrency] = useState(
    () => localStorage.getItem("uniqmart-currency") || "NGN"
  );

  const [exchangeRates, setExchangeRates] = useState({
    USD: 1,
    NGN: 1347.47,
    EUR: 0.92,
    GBP: 0.79,
    CAD: 1.36,
    AUD: 1.53,
    INR: 83.5,
    CNY: 7.2,
    JPY: 150,
  });

  useEffect(() => {
    localStorage.setItem("uniqmart-language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("uniqmart-currency", currency);
  }, [currency]);

  useEffect(() => {
    const getExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://open.er-api.com/v6/latest/USD"
        );

        if (!response.ok) {
          throw new Error("Exchange rate request failed");
        }

        const data = await response.json();

        if (data.rates) {
          setExchangeRates(data.rates);
        }
      } catch (error) {
        console.log("Using saved exchange rates:", error);
      }
    };

    getExchangeRates();
  }, []);

  const t = (key) => {
    return (
      translations[language]?.[key] ||
      translations.en[key] ||
      key
    );
  };

  const formatPrice = (amount) => {
    const convertedAmount =
      amount * (exchangeRates[currency] || 1);

    const locale =
      languages.find((item) => item.code === language)?.locale ||
      "en-US";

    try {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }).format(convertedAmount);
    } catch {
      return `${currency} ${convertedAmount.toFixed(2)}`;
    }
  };

  return (
    <LocaleContext.Provider
      value={{
        language,
        setLanguage,
        languages,
        currency,
        setCurrency,
        exchangeRates,
        formatPrice,
        t,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

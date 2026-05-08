/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Facebook, Instagram, Phone, Mail, MapPin, Clock, ChevronRight, Star } from 'lucide-react';

const LOGO_URL = "https://i.postimg.cc/cCqVD2DM/305454003-485019773633090-4281699803278011184-n.jpg";

const GALLERY = [
  {
    url: "https://i.postimg.cc/zBvMX5QL/685874741-1604866221648434-5193970994581557679-n.jpg",
    title: "Vege przegrzebek",
    desc: "z rzepy/ budyń z kalafiora/ espuma serowa/ crunch z orzechów laskowych"
  },
  {
    url: "https://i.postimg.cc/fWtz8hbX/686887986-1604152731719783-6892653330841008168-n.jpg",
    title: "Schab",
    desc: "jajko poche/ ziemniaki pieczone/ gzik"
  },
  {
    url: "https://i.postimg.cc/K8Nx1G9Z/672687354-1591090896359300-6474635418714639153-n.jpg",
    title: "Pieczona młoda kapusta",
    desc: "humus szczypiorkowy z jogurtem greckim/ kruszona feta/ crunch panko"
  },
  {
    url: "https://i.postimg.cc/jd6r1qYK/668986415-1585092430292480-7967227718583156880-n.jpg",
    title: "Polewka czosnkowa",
    desc: "jajko/ grzanka"
  }
];

const MENU_DATA = {
  "PRZYSTAWKI / STARTERS": [
    { name: "Tatar wołowy 140g", price: "51 zł", desc_pl: "Polędwica wołowa / rzodkiew arbuzowa/ szczypiorek/ pikle/ oliwa z lubczyku/bagietka", desc_en: "Beef tenderloin / watermelon radish/chives/pickles / lovage oil/baguette" },
    { name: "Vege przegrzebki 150g", price: "41 zł", desc_pl: "Przegrzebki z rzepy/ budyń z kalafiora / espuma serowa / crumble z orzechów laskowych/ oliwa zielona/grzanka", desc_en: "Turnip scallops / cauliflower pudding/cheese espuma/hazelnut crumble/green olive oil / toast" },
    { name: "Tuńczyk 130g", price: "47 zł", desc_pl: "Carpaccio z polędwicy tuńczyka/ soliród/kawior/bagietka", desc_en: "Tuna loin carpaccio/samphire/caviar/ toast" }
  ],
  "ZUPY / SOUPS": [
    { name: "Krem z karmelizowanej cebuli 380g", price: "21 zł", desc_pl: "bagietka/ espuma serowa (VEGE)", desc_en: "Caramelized onion cream/baguette/cheese espuma" },
    { name: "Tradycyjny rosół z makaronem 340g", price: "17 zł", desc_pl: "Klasyczny domowy rosół", desc_en: "Traditional chicken noodle soup" }
  ],
  "WEGETARIAŃSKIE / VEGETARIAN": [
    { name: "Ramen 380g", price: "47 zł", desc_pl: "Shoyu milk ramen/ mleko sojowe/kukurydza/fasola czerwona/pak choi/ makaron ramen/ cebulka", desc_en: "Shoyu milk ramen/ soy milk/corn/ red beans/pak choi/ ramen noodles/ onion" },
    { name: "Gnocchi 350g", price: "51 zł", desc_pl: "Kluseczki ziemniaczane z kozim serem i trufla/ boczniak królewski/ aksamitny sos z pieczoną szalotką/ crumble z grana padano", desc_en: "Potato dumplings with goat cheese and truffle / king oyster mushroom/velvety sauce with roasted shallots/Grana Padano crumble" },
    { name: "Udon 390g", price: "47 zł", desc_pl: "Makaron udon/kremowy sos z trawą cytrynową/ pasta tom kha/ pędy bambusa/ pak choi/ groszek cukrowy", desc_en: "Udon noodles/ creamy lemongrass sauce/ tom kha paste/ bamboo shoots/pak choi/ snow peas" },
    { name: "Burger Halloumi 450g", price: "49 zł", desc_pl: "Ser halloumi w panko/sos jogurtowo-cytrynowy/chutney z ananasa/ sałata/pomidor/bułka własnego wypieku/frytki", desc_en: "Panko-crusted halloumi cheese/lemon-yogurt sauce/pineapple chutney/lettuce /tomato/homemade roll/fries" }
  ],
  "DANIA GŁÓWNE / MAIN DISH": [
    { name: "Kotlet schabowy 490g", price: "49 zł", desc_pl: "Schabowy w chrupiącej panierce/gzik/ziemniaczki opiekane/jajo poche", desc_en: "Crispy breaded pork chop/ cottage cheese/ baked potatoes/ poached egg" },
    { name: "Kurczak 430g", price: "51 zł", desc_pl: "Filet kurczaka/ śmietankowy sos prowansalski/ suszone pomidory/ szałwia/ cebula/seler naciowy/ placki ziemniaczane/roszponka", desc_en: "Chicken fillet / creamy Provençal sauce/ dried tomatoes/sage/onion/ celery/ potato pancakes / arugula" },
    { name: "Kaczka 420g", price: "59 zł", desc_pl: "Piers kacza Sous Vide/puree z batatów/ demi sos wiśniowy/ żołta fasolka szparagowa/ crumble z orzechów laskowych", desc_en: "Sous Vide duck breast/sweet potato puree/cherry demi sauce/yellow string beans/ hazelnut crumble" },
    { name: "Wołowina po burgundzku 500g", price: "67 zł", desc_pl: "Wołowina/czerwone wino/pieczarki/marchewka/cebula /placki ziemniaczane", desc_en: "Beef Bourguignon /red wine/champignon/carrot/onion/ potato pancakes" },
    { name: "Irlandzki steak wołowy 490g", price: "89 zł", desc_pl: "Bavetta tagliata/ grubo ciosana frytka/ grillowana sałata rzymska/ crunch z panko i czosnku/ chimichurri chilli", desc_en: "Bavetta tagliata/ rough-cut fries/grilled romaine lettuce/ panko and garlic crunch/ chili chimichurri" }
  ],
  "DESERY / DESSERTS": [
    { name: "Panna cotta malinowa", price: "23 zł", desc_pl: "Śmietana/maliny/coulis malinowy/ puder malinowy", desc_en: "Cream/raspberries/raspberry coulis/raspberry powder" },
    { name: "Tiramisu", price: "23 zł", desc_pl: "Śmietanka/ crunch z włoskich ciasteczek/amaretto/ kakao", desc_en: "Cream/Italian cookie crunch/ amaretto/cocoa" },
    { name: "Creme brulee", price: "23 zł", desc_pl: "Chatwa/ cukier brązowy/ śmietana/ jajka", desc_en: "Halva/brown sugar/cream/ eggs" }
  ]
};

const SectionHeading = ({ children, light = false }: { children: React.ReactNode, light?: boolean }) => (
  <div className="flex flex-col items-center mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-4xl md:text-5xl font-serif text-center uppercase tracking-widest-plus font-light mb-4 ${light ? 'text-white' : 'text-brand-dark'}`}
    >
      {children}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 100 }}
      viewport={{ once: true }}
      className="h-[1px] bg-brand-dark/20"
    />
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBrand, setShowBrand] = useState(true);
  const [activeCategory, setActiveCategory] = useState(Object.keys(MENU_DATA)[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      const aboutSection = document.getElementById('o-nas');
      if (aboutSection && window.innerWidth < 768) {
        const rect = aboutSection.getBoundingClientRect();
        // Show brand when 'O nas' section is near the top of viewport
        setShowBrand(rect.top <= 100);
      } else {
        setShowBrand(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: "Menu", href: "#menu" },
    { title: "O nas", href: "#o-nas" },
    { title: "Galeria", href: "#galeria" },
    { title: "Kontakt", href: "#kontakt" },
  ];

  return (
    <div className="relative selection:bg-brand-dark selection:text-brand-cream">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-brand-cream/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(26,26,26,0.05)] py-4' : 'bg-transparent py-10'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-end">
          <AnimatePresence>
            {showBrand && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-6"
              >
                <a href="#" className="flex items-center gap-6">
                  <img src={LOGO_URL} alt="Logo" className={`rounded-full border border-brand-dark/10 object-contain transition-all duration-700 ${scrolled ? 'h-12 w-12' : 'h-20 w-20'}`} />
                  <div>
                    <h1 className="text-3xl uppercase tracking-widest font-light leading-none mb-1">Dwa Noże</h1>
                    <p className="font-sans text-[9px] uppercase tracking-widest-plus opacity-60">Restauracja / Ustroń</p>
                  </div>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 font-sans text-[10px] uppercase tracking-widest font-medium">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:opacity-40 transition-opacity">
                {link.title}
              </a>
            ))}
            <a href="#kontakt" className="bg-brand-dark text-white px-6 py-2 rounded-full hover:bg-brand-dark/80 transition-colors">
              Rezerwacje
            </a>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-brand-dark pb-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-cream z-40 md:hidden flex flex-col items-center justify-center gap-12"
            >
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-8"><X size={32} /></button>
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-serif tracking-[0.2em] font-light uppercase hover:italic"
                >
                  {link.title}
                </a>
              ))}
              <div className="flex gap-10 mt-10">
                <a href="https://www.facebook.com/dwanoze"><Facebook size={24} /></a>
                <a href="https://www.instagram.com/dwanoze"><Instagram size={24} /></a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-8 border-b border-brand-dark/10 mx-8 mt-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-center"
        >
          <div className="mb-12 relative">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-64 h-64 md:w-80 md:h-80 rounded-full mx-auto border border-brand-dark/5 p-4"
            >
              <img src={LOGO_URL} alt="Logo" className="w-full h-full rounded-full object-contain grayscale-[10%]" />
            </motion.div>
          </div>
          <h2 className="text-5xl md:text-8xl font-light uppercase tracking-[0.3em] font-serif mb-6">
            Dwa Noże
          </h2>
          <p className="font-sans text-[11px] md:text-xs uppercase tracking-[0.4em] font-light text-brand-dark/50 mb-12">
            Ustroń • Art of Culinary
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 font-sans text-[10px] uppercase tracking-widest text-brand-dark/60">
            <span>Pasja</span>
            <span className="hidden md:inline">•</span>
            <span>Tradycja</span>
            <span className="hidden md:inline">•</span>
            <span>Smak</span>
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20"
        >
          <p className="font-sans text-[8px] uppercase tracking-[0.5em] rotate-90 origin-left ml-1">Scroll</p>
        </motion.div>
      </section>

      {/* Layout Grid Section (About & Contacts) */}
      <section id="o-nas" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-4 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="border-t border-brand-dark/10 pt-8"
            >
              <h3 className="italic text-3xl font-light leading-snug mb-8">
                Wyjątkowe miejsce powstałe z pasji gotowania i miłości do dobrego jedzenia.
              </h3>
              <p className="font-sans text-[12px] leading-loose text-brand-dark/70 font-light text-justify">
                W Dwa Noże połączyliśmy kuchnię europejską z tradycyjnymi polskimi smakami. Codziennie nasi kucharze wkładają swoje serce i talent, aby wizyta u nas stała się pyszną i przyjemną przygodą. Produkty od lokalnych dostawców i zawsze świeże składniki to fundament naszej filozofii.
              </p>
            </motion.div>

            <div className="space-y-8 pt-12 border-t border-brand-dark/10">
              <div className="flex flex-col gap-1">
                <p className="font-sans text-[9px] uppercase tracking-widest opacity-40">Lokalizacja</p>
                <p className="text-lg">ul. 3 Maja 100, 43-450 Ustroń</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-sans text-[9px] uppercase tracking-widest opacity-40">Kontakt</p>
                <p className="text-lg">+48 533 537 536</p>
                <p className="text-lg italic font-light opacity-60">dwanoze@poczta.fm</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="aspect-[16/10] grayscale-[20%] hover:grayscale-0 transition-all duration-1000 overflow-hidden rounded-sm relative group"
            >
              <img src={GALLERY[2].url} alt="Restauracja" className="w-full h-full object-cover" />
              <div className="absolute inset-0 border border-white/20 m-6 pointer-events-none transition-all duration-1000 group-hover:m-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Highlight Section */}
      <section id="menu" className="py-32 bg-white/50 border-t border-b border-brand-dark/5">
        <div className="max-w-4xl mx-auto px-8">
          <SectionHeading>Karta Dań</SectionHeading>
          
          <div className="flex flex-wrap justify-center gap-12 mb-20 font-sans text-[10px] uppercase tracking-[0.25em]">
            {Object.keys(MENU_DATA).map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition-all duration-500 relative pb-4 ${activeCategory === cat ? 'text-brand-dark opacity-100' : 'text-brand-dark opacity-30 hover:opacity-60'}`}
              >
                {cat.split(' / ')[0]}
                {activeCategory === cat && <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-dark" />}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {MENU_DATA[activeCategory as keyof typeof MENU_DATA].map((item, i) => (
                <div key={i} className="group flex justify-between items-start gap-8">
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline gap-4 mb-2">
                      <h4 className="text-xl md:text-2xl font-light group-hover:italic transition-all duration-500">{item.name}</h4>
                      <div className="flex-1 h-[1px] bg-brand-dark/5 self-center mx-4" />
                      <span className="font-sans text-sm font-light opacity-80">{item.price}</span>
                    </div>
                    <p className="font-sans text-[13px] leading-relaxed text-brand-dark/70 max-w-2xl">
                      {item.desc_pl}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-24 p-12 bg-brand-cream border border-brand-dark/5 rounded-sm relative overflow-hidden">
            <p className="font-sans text-[9px] uppercase tracking-widest opacity-40 mb-6">Opinie gości</p>
            <p className="italic text-2xl font-light leading-relaxed mb-8">
              "Wyjątkowe miejsce z duszą. Jedzenie nie tylko smakuje obłędnie, ale wygląda jak dzieło sztuki w każdym detalu."
            </p>
            <a href="https://www.facebook.com/dwanoze/reviews" className="font-sans text-[9px] uppercase tracking-widest underline opacity-60 hover:opacity-100 transition-opacity">
              Czytaj wszystkie na Facebook
            </a>
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Star size={100} />
            </div>
          </div>
        </div>
      </section>

      {/* Visual Gallery section */}
      <section id="galeria" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {GALLERY.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="photo-card-hover flex flex-col"
            >
              <div className="aspect-square overflow-hidden mb-6 border border-brand-dark/5">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
              </div>
              <p className="font-sans text-[11px] md:text-xs uppercase tracking-[0.2em] font-medium mb-1">{item.title}</p>
              <p className="font-sans text-[11px] md:text-[12px] opacity-60 italic font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Opening Hours & Map Section */}
      <section id="kontakt" className="py-32 px-8 border-t border-brand-dark/5 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-20">
          
          {/* Hours */}
          <div className="lg:col-span-4">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] mb-12 border-b border-brand-dark/10 pb-4">
              Godziny Otwarcia
            </h4>
            <div className="font-sans text-[12px] space-y-4 tracking-widest">
              <div className="flex justify-between border-b border-brand-dark/5 pb-2"><span>Poniedziałek</span> <span>12:00 - 21:00</span></div>
              <div className="flex justify-between border-b border-brand-dark/5 pb-2"><span>Wtorek</span> <span>12:00 - 21:00</span></div>
              <div className="flex justify-between border-b border-brand-dark/5 pb-2"><span>Środa</span> <span>12:00 - 21:00</span></div>
              <div className="flex justify-between border-b border-brand-dark/5 pb-2"><span>Czwartek</span> <span>12:00 - 21:00</span></div>
              <div className="flex justify-between border-b border-brand-dark/5 pb-2"><span>Piątek</span> <span>12:00 - 21:00</span></div>
              <div className="flex justify-between border-b border-brand-dark/5 pb-2"><span>Sobota</span> <span>12:00 - 21:00</span></div>
              <div className="flex justify-between border-brand-dark">
                <span className="font-semibold italic">Niedziela</span> 
                <span className="font-semibold italic">12:00 - 20:00</span>
              </div>
            </div>
            <div className="mt-16 grayscale opacity-40 h-48 w-full border border-brand-dark/10 overflow-hidden rounded-sm">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2580.2991957652616!2d18.819531776998467!3d49.705168740744256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47141befa4a63877%3A0xd6dea614aeb6660!2s3%20Maja%20100%2C%2043-450%20Ustro%C5%84!5e0!3m2!1spl!2spl!4v1778242649056!5m2!1spl!2spl" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
          </div>

          {/* Large contact message */}
          <div className="lg:col-span-8 flex flex-col justify-center border-l-0 lg:border-l border-brand-dark/5 lg:pl-20">
            <h3 className="italic text-4xl md:text-6xl font-light leading-tight mb-12">
              Pragniemy, aby wizyta u nas była przyjemną przygodą, którą Państwo powtórzą.
            </h3>
            <div className="flex flex-col md:flex-row md:items-center gap-10">
              <a href="tel:+48533537536" className="font-sans text-[10px] uppercase tracking-widest border border-brand-dark px-10 py-4 hover:bg-brand-dark hover:text-white transition-all duration-500">
                Zadzwoń do nas
              </a>
              <div className="flex gap-8">
                <a href="https://www.facebook.com/dwanoze" className="hover:opacity-40 transition-opacity"><Facebook size={24} strokeWidth={1.5} /></a>
                <a href="https://www.instagram.com/dwanoze" className="hover:opacity-40 transition-opacity"><Instagram size={24} strokeWidth={1.5} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-20 px-8 text-center border-t border-brand-dark/10">
        <h5 className="font-serif italic text-xl mb-6">Restauracja Dwa Noże</h5>
        <p className="font-sans text-[8px] uppercase tracking-[0.6em] opacity-30 mt-8">
          Experience the Art of Taste • Dwa Noże Ustroń • {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

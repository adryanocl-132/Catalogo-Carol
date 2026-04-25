/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Glasses, 
  Tag, 
  ShieldCheck, 
  Star, 
  MessageCircle, 
  ArrowRight, 
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Interfaces for type safety
interface Product {
  code: string;
  brand: string;
  model: string;
  imageUrl?: string;
}

export default function App() {
  const [activeBrand, setActiveBrand] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // 📱 CONFIGURAÇÃO DO WHATSAPP
  const WHATSAPP_NUMBER = "5598991281136"; 

  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Base de dados consolidada
  const products: Product[] = [
    { code: '0DG3428', brand: 'Dolce & Gabbana', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/1RLeGPzemCsKiMOcBUldQ_AXg4lwVTwja' },
    { code: '0DG3440', brand: 'Dolce & Gabbana', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/17S8NyE8tHdOXOnVeDUigVdoqxhu3THLr' },
    { code: '0DG5115', brand: 'Dolce & Gabbana', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/1elYcxK_VgQIjs_msPVHWB2jfdqfKVutU' },
    { code: '0EA4115', brand: 'Emporio Armani', model: 'EA4115 Classic', imageUrl: 'https://lh3.googleusercontent.com/d/18U0d8zwY9QyGgowKX6lWPrMGZrwurNMT' },
    { code: '0EA4259U', brand: 'Emporio Armani', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/1dU9CbhVetPGBf88PHLmL6cvThCyBHtd3' },
    { code: '0MU4258', brand: 'Miu Miu', model: 'Miu Miu Glimpse (MU 58WS)', imageUrl: 'https://lh3.googleusercontent.com/d/1TUK1IK5dDRE6fCIGZbQ02pbFlo7VoC4q' },
    { code: '0MU 01YV', brand: 'Miu Miu', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/1oshdhTtlj6uTRSxYjJPH_2eNBiC9MCWX' },
    { code: '0MU 09XV', brand: 'Miu Miu', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/1rh0ELLLfUJU-GBjtEUmJWmSNFHFribVS' },
    { code: '0MU 54ZS', brand: 'Miu Miu', model: 'Miu Regard (MU 54ZS)', imageUrl: 'https://lh3.googleusercontent.com/d/1n_gvdAIQGXFXmCAmES4ifTzFCjdzxdlK' },
    { code: '0MU A54S', brand: 'Miu Miu', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/1hT_6i8r08HJad2LmTLb-hX_JgAi43K_j' },
    { code: '0MU B04S', brand: 'Miu Miu', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/1f7x0umFlzW8a35yzqrJq3kbOhzvkkiTk' },
    { code: '0OO9188', brand: 'Oakley', model: 'Flak 2.0 XL', imageUrl: 'https://lh3.googleusercontent.com/d/1imt3BRUjZjZIEyT_ojIVMasY1a1xQCqn' },
    { code: '0OO9229', brand: 'Oakley', model: 'Hydra', imageUrl: 'https://lh3.googleusercontent.com/d/1-Gd2WZ4H_2_iYgEsgEiPHRYHIPB_l8sY' },
    { code: '0OO9235', brand: 'Oakley', model: 'Resistor', imageUrl: 'https://lh3.googleusercontent.com/d/1-4I_GOYvGGCBYS694IcuSEcC9cPooXN_' },
    { code: '0OO9248', brand: 'Oakley', model: 'Encoder', imageUrl: 'https://lh3.googleusercontent.com/d/1ZwK6eS-h4QhOhQzFsTisjYY9pCxMK6ZZ' },
    { code: '0OO9280', brand: 'Oakley', model: 'BXTR', imageUrl: 'https://lh3.googleusercontent.com/d/1i3wAow2gwBtdoySSIhOYUUC7UEvt7g_o' },
    { code: '0OO9400', brand: 'Oakley', model: 'Sphaera', imageUrl: 'https://lh3.googleusercontent.com/d/1sLkR6GVizrHdgOLGtula0Cq495vJYkoi' },
    { code: '0OO9403', brand: 'Oakley', model: 'BiSphaera', imageUrl: 'https://lh3.googleusercontent.com/d/15O-CkrGP4P1bSvu8QcbJpcAr5G1gldsW' },
    { code: '0OO9415', brand: 'Oakley', model: 'Reedmace', imageUrl: 'https://lh3.googleusercontent.com/d/1xLTEQJb8G-L6_J66fDE-YfvcolKCoL2P' },
    { code: '0OO9437', brand: 'Oakley', model: 'Latch Panel', imageUrl: 'https://lh3.googleusercontent.com/d/1Ittrf4wbeUkHXiZDdysRVRxMc4R-FG3k' },
    { code: '0OO9454', brand: 'Oakley', model: 'EVZero Blades', imageUrl: 'https://lh3.googleusercontent.com/d/1Vpv1ZBEOTpR87reLCG0MN2KGcU7zX-v8' },
    { code: '0OO9465', brand: 'Oakley', model: 'Sutro Lite Sweep', imageUrl: 'https://lh3.googleusercontent.com/d/1qxlXgABKPfBp41ieVC8IK4AKoaCB2sw1' },
    { code: '0OO9471', brand: 'Oakley', model: 'Encoder Strike Vented', imageUrl: 'https://lh3.googleusercontent.com/d/1koklyt0V6NJXD05z_ZSFS8mNzLXp0Yu4' },
    { code: '0OO9488', brand: 'Oakley', model: 'Sphaera Sport', imageUrl: 'https://lh3.googleusercontent.com/d/1saN9hTOOtCNKoY5HCtoPurtNErkQCePi' },
    { code: '0OO9495D', brand: 'Oakley', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/130SaOUfnPWtAuMb5is8Ves9M5dKFACu6' },
    { code: '0OO9499', brand: 'Oakley', model: 'SubZero', imageUrl: 'https://lh3.googleusercontent.com/d/1IfXyzGm9X9ONdq-ORmF67ne8nuaEl81T' },
    { code: '0OO9512D', brand: 'Oakley', model: 'Frogskins Hybrid', imageUrl: 'https://lh3.googleusercontent.com/d/1g5SGNqHWjH8GhyCrrUewuOu-1wQno_5i' },
    { code: '0OO9513D', brand: 'Oakley', model: 'Frogskins Range', imageUrl: 'https://lh3.googleusercontent.com/d/1hMJlH14FlVDxfGq8F3ipgnhFYBxwH5Xu' },
    { code: '0OO9517', brand: 'Oakley', model: 'HSTN', imageUrl: 'https://lh3.googleusercontent.com/d/1sRvMipMVzHse63BoG3DzxZtRlHrecJGT' },
    { code: '0OO9519', brand: 'Oakley', model: 'BiSphaera (V2)', imageUrl: 'https://lh3.googleusercontent.com/d/1_0Jn1ANrptqT8N5rq4RhftQAA5tvS6db' },
    { code: '0OO9527D', brand: 'Oakley', model: 'Frogskins Hybrid Low Bridge', imageUrl: 'https://lh3.googleusercontent.com/d/1BoFdzgl4ggI5NxxDEsA_2oaA_daYfAEa' },
    { code: '0OO9534', brand: 'Oakley', model: 'Sphaera Elite', imageUrl: 'https://lh3.googleusercontent.com/d/1awm9qWM_Pl4BWZCxhx3a_1nm2YxbVUxm' },
    { code: '0PH3161', brand: 'Polo Ralph Lauren', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/1hFWrh_R7tZq2MbUlLzRy9UrKTwTVDSz7' },
    { code: '0PH3165', brand: 'Polo Ralph Lauren', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/1FwWSlktwZCSflu5DJ1RSI0MIMSKXdOmA' },
    { code: '0PH4183U', brand: 'Polo Ralph Lauren', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/1-taXoJ003u6KAOovTZ4nRpPuhavPCdYH' },
    { code: '0PH4226', brand: 'Polo Ralph Lauren', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/1hyod3vHV3NqTTHeuKJwNvIrS9-RpVbZm' },
    { code: '0PH4236', brand: 'Polo Ralph Lauren', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/1eLJhVGoULvQGeFbgeETGfFldH6svFDol' },
    { code: '0PS A53S', brand: 'Prada', model: 'Linea Rossa PS 53SS', imageUrl: 'https://lh3.googleusercontent.com/d/1lqJHzwQTGjFVBBFMdvJxFG_M67Bb7hp6' },
    { code: '0PS B02S', brand: 'Prada', model: 'Linea Rossa PS 02SV', imageUrl: 'https://lh3.googleusercontent.com/d/18FmUrpMYT_PHxuD8l9OALzYMI06zp1Qp' },
    { code: '0PS B08S', brand: 'Prada', model: 'Linea Rossa PS 08SV', imageUrl: 'https://lh3.googleusercontent.com/d/1va31-CZ0A2AnK_3q8YLYOuPwBDDmusHs' },
    { code: '0RB3767', brand: 'Ray-Ban', model: 'Erika Metal', imageUrl: 'https://lh3.googleusercontent.com/d/1oKyQUkX-UctnZCvjzKGYdHVwYYrRYNqr' },
    { code: '0RB3768', brand: 'Ray-Ban', model: 'Round Geometric', imageUrl: 'https://lh3.googleusercontent.com/d/1rTxpaAcXhKmSUYdwQr77BDn2s9WVAuKW' },
    { code: '0RB3929', brand: 'Ray-Ban', model: 'Burbank', imageUrl: 'https://lh3.googleusercontent.com/d/1uMswwDrxwFLWAojAedDj7RbYvRfsXEmC' },
    { code: '0RB3931', brand: 'Ray-Ban', model: 'Oval', imageUrl: 'https://lh3.googleusercontent.com/d/1lP8q69o7P_Dm998Wbcok1cWDbL9qzieN' },
    { code: '0SK1033', brand: 'Swarovski', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/1Wbfxhgu9F0Lt6bgxWFRk7XawjSiEGrYA' },
    { code: '0SK1037', brand: 'Swarovski', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/1sBdC31m-oky4pFvL9QWttCSqvljPF_EP' },
    { code: '0SK1038', brand: 'Swarovski', model: '', imageUrl: 'https://lh3.googleusercontent.com/d/1rZC-s86YZC12nvOhnZyWXfXhBRtygx5y' },
    { code: '0SK2056U', brand: 'Swarovski', model: 'Swarovski Crystal Sun', imageUrl: 'https://lh3.googleusercontent.com/d/1bAddkgrCNMLfIi38qfR_0gfRv2DqmK9B' },
  ];

  const brands = useMemo(() => {
    return ['Todas', ...Array.from(new Set(products.map(p => p.brand))).sort()];
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesBrand = activeBrand === 'Todas' || product.brand === activeBrand;
      const matchesSearch = product.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesBrand && matchesSearch;
    });
  }, [activeBrand, searchTerm]);

  const handleWhatsAppClick = (product: Product) => {
    const modelName = product.model ? product.model : product.code;
    const message = `Olá! Vi o produto ${product.brand} ${modelName} no seu catálogo virtual e gostaria de saber mais informações sobre ele.`;
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, '_blank');
  };

  const brandLogo = "https://lh3.googleusercontent.com/d/1vkqMJD48IPiOeQbZ5_AHkxMtQXuYs3ml";

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 p-4 md:p-6 lg:p-8">
      
      {/* Header - Styled as a Bento Card */}
      <header 
        className={`fixed top-4 md:top-6 lg:top-8 left-4 md:left-6 lg:left-8 right-4 md:right-6 lg:right-8 z-50 transition-all duration-500 rounded-3xl border ${
          scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-md border-slate-200 py-3 px-6' 
          : 'bg-white shadow-sm border-slate-200 py-4 px-6 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="h-16 w-48 md:h-20 md:w-64 flex items-center justify-center overflow-hidden group/logo relative p-2">
                <img 
                  src={brandLogo} 
                  alt="Logo Principal" 
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain transition-all duration-500 group-hover/logo:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0.3';
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-4 h-4 z-10 transition-colors" />
            <input 
              type="text" 
              placeholder="Pesquisar modelo ou marca..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="hidden lg:flex gap-2">
            <span className="px-5 py-2 bg-yellow-400 text-blue-900 text-xs font-black rounded-xl uppercase tracking-wider transition-transform hover:scale-105 cursor-default">Catálogo Abril/Maio 2026</span>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto mt-28 md:mt-32 space-y-4 md:space-y-6">
        
        {/* Top Section: Hero + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          
          {/* Hero Bento Card */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden text-white shadow-xl min-h-[400px]"
          >
            {/* Background Image with Blur */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000"
              style={{ 
                backgroundImage: 'url("https://lh3.googleusercontent.com/d/1P-tR9h3N6mshJvqP6YW5PG_f8_TMuQ6h")',
                filter: 'blur(8px) brightness(0.4)',
                transform: 'scale(1.1)' 
              }}
            />
            
            <div className="relative z-10">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-3 py-1 bg-blue-800/50 border border-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
              >
                Premium Collection
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6 font-display">
                Sua nova visão de <span className="text-yellow-400">estilo</span>.
              </h2>
              <p className="text-blue-100 max-w-md text-lg leading-relaxed mb-8 font-light">
                As grifes mais desejadas do mundo reunidas no catálogo exclusivo no Maranhão.
              </p>
              <button 
                onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-full font-black uppercase text-xs tracking-widest shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all active:scale-95"
              >
                Explorar Marcas
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.section>

          {/* Stats & Quick Actions Bento Column */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
            
            {/* Brands Stats Bento */}
            <div className="grid grid-cols-2 gap-4 h-full">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-yellow-400 rounded-[2rem] p-6 flex flex-col justify-center items-center text-blue-950 text-center shadow-sm"
              >
                <span className="text-4xl font-black font-display tracking-tighter">48+</span>
                <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-80 leading-tight">Modelos em Estoque</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-blue-100 rounded-[2rem] p-6 flex flex-col justify-center items-center text-blue-800 text-center shadow-sm border border-blue-200"
              >
                <span className="text-4xl font-black font-display tracking-tighter">08</span>
                <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-80 leading-tight">Marcas Selecionadas</span>
              </motion.div>
            </div>

            {/* Support Bento Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900 rounded-[2rem] p-8 flex flex-col justify-between text-white shadow-xl relative overflow-hidden group"
            >
              <div className="relative z-10">
                <p className="text-sm font-medium leading-relaxed opacity-90">Consulte seu consultor exclusivo diretamente pelo WhatsApp.</p>
              </div>
              <a 
                href={`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent("Olá! Estou navegando no seu catálogo virtual e gostaria de falar com um especialista.")}&type=phone_number&app_absent=0`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex items-center gap-3 bg-slate-800 p-4 rounded-2xl border border-slate-700 hover:bg-green-600 hover:border-green-500 transition-all group-hover:shadow-lg group-hover:shadow-green-500/10"
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <MessageCircle size={20} />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-[11px]">Falar com Especialista</span>
              </a>
              {/* Background gradient effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          </div>
        </div>

        {/* Catalog Section Section: Filter + Products */}
        <section id="catalogo" className="space-y-6">
          
          {/* Quick Filter Bento Section */}
          <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Filtrar por Marcas</h3>
                <p className="text-slate-900 font-black text-xl md:text-2xl font-display">Selecione uma grife</p>
              </div>
              <div className="overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex gap-2 min-w-max">
                  {brands.map(brand => (
                    <button
                      key={brand}
                      onClick={() => setActiveBrand(brand)}
                      className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                        activeBrand === brand 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20' 
                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-blue-600'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Count Bento */}
          <div className="flex items-center gap-3 bg-blue-50/50 border border-blue-100/50 px-6 py-3 rounded-2xl">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">
              Encontrados: {filteredProducts.length} modelos disponíveis
            </span>
          </div>

          {/* Product Bento Grid */}
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product, index) => {
                  const displayModel = product.model && product.model.length > 0 
                    ? product.model 
                    : `${product.brand} ${product.code}`;

                  return (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      key={`${product.code}-${index}`}
                      className="bg-white rounded-[2.5rem] p-5 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                    >
                      <div className="relative w-full aspect-video bg-slate-50 rounded-[1.5rem] flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors mb-5 overflow-hidden">
                        {product.imageUrl ? (
                          <img 
                            src={product.imageUrl} 
                            alt={displayModel}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <Glasses size={80} strokeWidth={0.5} className="text-blue-200 group-hover:text-blue-400/30 transition-all duration-700 transform group-hover:scale-110" />
                        )}
                        <span className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest text-blue-500 bg-white/80 px-2 py-0.5 rounded-md border border-blue-100 backdrop-blur-sm">
                          Novidade
                        </span>
                      </div>
                      
                      <div className="flex-1 px-1">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1 block">{product.brand}</span>
                        <h4 className="font-display font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem]">{displayModel}</h4>
                        <div className="flex items-center gap-2 mt-2 py-1.5 px-3 bg-slate-50 rounded-xl border border-slate-100 w-fit">
                           <Tag size={12} className="text-slate-400" />
                           <span className="text-[11px] text-slate-500 font-mono font-bold">{product.code}</span>
                        </div>
                        
                        <button 
                          onClick={() => handleWhatsAppClick(product)}
                          className="mt-6 w-full py-4 bg-green-500 hover:bg-green-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-green-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                          <MessageCircle size={14} />
                          Falar com um especialista
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center bg-white rounded-[4rem] border border-slate-200 shadow-sm"
              >
                <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
                  <Search className="text-slate-200 w-10 h-10" />
                </div>
                <h3 className="text-3xl font-display font-black text-slate-800 mb-2">Nenhum resultado</h3>
                <p className="text-slate-400 max-w-sm mx-auto font-medium">Tente ajustar sua busca ou selecionar outra marca.</p>
                <button 
                  onClick={() => {setActiveBrand('Todas'); setSearchTerm('');}}
                  className="mt-10 px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
                >
                  Ver Tudo
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* Footer - Final Bento Card */}
      <footer className="max-w-7xl mx-auto mt-12 mb-8">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col items-center md:items-start">
            <div className="h-20 w-60 flex items-center justify-center overflow-hidden mb-6">
              <img 
                src={brandLogo} 
                alt="Logo Footer" 
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain brightness-0 invert"
                onError={(e) => {
                  e.currentTarget.style.opacity = '0.3';
                }}
              />
            </div>
            <p className="text-slate-400 text-sm max-w-xs mb-4 font-medium italic">"A sua melhor visão no Maranhão."</p>
            <p className="text-[11px] text-slate-600 font-bold tracking-widest uppercase">© {new Date().getFullYear()} Todos os direitos reservados.</p>
          </div>
          
          <div className="relative z-10 flex flex-col items-center md:items-end gap-6 text-white text-center md:text-right">
            <div>
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-2">Oferta Especial</span>
              <p className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter font-display leading-tight">
                Garanta dois anos de garantia <br className="hidden md:block" /> e parcelamento!
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Floating Floating Action Button (FAB) */}
      <motion.a 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        href={`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent("Olá! Estou navegando no seu catálogo virtual e gostaria de tirar uma dúvida.")}&type=phone_number&app_absent=0`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-5 rounded-[2rem] shadow-2xl shadow-green-500/40 hover:bg-green-600 hover:scale-110 transition-all cursor-pointer group"
      >
        <MessageCircle size={32} />
      </motion.a>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .font-display {
          font-family: var(--font-display);
        }
      `}</style>
    </div>
  );
}

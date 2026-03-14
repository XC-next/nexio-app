import React, { useState } from 'react';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const Explore = () => {
  const categories = ['Art', 'Music', 'Tech', 'Gaming', 'Style', 'Nature', 'Travel'];
  const [activeCategory, setActiveCategory] = useState('Art');

  const items = [
    { id: 1, size: 'large', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80', tag: 'AbstractArt' },
    { id: 2, size: 'medium', image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=800&q=80', tag: 'IndiePop' },
    { id: 3, size: 'small', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80', tag: 'Tech' },
    { id: 4, size: 'small', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80', tag: 'Gaming' },
    { id: 5, size: 'medium', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80', tag: 'Futuristic' },
    { id: 6, size: 'large', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', tag: 'StreetStyle' },
    { id: 7, size: 'small', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', tag: 'Cosplay' },
    { id: 8, size: 'medium', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', tag: 'Cyberpunk' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Explore Grid</h1>
          <button className="btn-glass py-2 px-4 text-sm">Skip</button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full transition-all whitespace-nowrap ${
                activeCategory === cat ? 'bg-white text-black' : 'glass text-white/60 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative mt-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
          <input 
            type="text" 
            placeholder="Search advanced filters..." 
            className="glass-input w-full pl-12 bg-white/5 border-white/5"
          />
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 cursor-pointer hover:text-white" size={20} />
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        {items.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className={`relative rounded-3xl overflow-hidden group cursor-pointer ${
              item.size === 'large' ? 'md:col-span-2 md:row-span-2' : 
              item.size === 'medium' ? 'md:row-span-2' : ''
            }`}
          >
            <img 
              src={item.image} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              alt={item.tag}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 left-4">
              <span className="glass-dark px-3 py-1 rounded-full text-[10px] font-bold">#{item.tag}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="w-full max-w-md h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
          />
        </div>
        <p className="text-white/30 text-sm">Infinite scroll active • 900 px m) • 8 px</p>
      </div>
    </div>
  );
};

export default Explore;

import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Settings, Grid, Bookmark, Layout, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Posts');
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const stats = [
    { label: 'Followers', value: '1.2M' },
    { label: 'Following', value: '500' },
    { label: 'Likes', value: '5.7M' },
    { label: 'Posts', value: '132' },
  ];

  const posts = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    image: `https://picsum.photos/seed/profile${i}/400/400`,
    likes: '12.4K',
    comments: '450'
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="glass rounded-[2.5rem] p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6">
          <button className="p-2 rounded-full hover:bg-white/5 transition-colors text-white/60">
            <Settings size={24} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-blue-500 p-1">
              <img 
                src={user?.user_metadata?.avatar_url || 'https://picsum.photos/seed/me/200/200'} 
                className="w-full h-full rounded-full object-cover" 
                alt="Profile" 
              />
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full border-4 border-[#050510] flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-white rounded-full" />
            </motion.div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold tracking-tight">{user?.user_metadata?.username || user?.email?.split('@')[0] || 'Digital Artist'}</h1>
              <button className="btn-glass py-1.5 px-6 text-sm">Edit Profile</button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6">
              {stats.map(stat => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="glass-dark p-6 rounded-3xl relative">
              <h3 className="font-bold mb-2">About</h3>
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                Digital artist & AI enthusiast. Exploring new dimensions through code and creativity. 🚀
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-xs hover:bg-white/20 transition-all">
                  <ExternalLink size={14} />
                  My Website
                </button>
                <button className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-xs hover:bg-white/20 transition-all">
                  <Layout size={14} />
                  Latest Project
                </button>
                <button className="flex items-center gap-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-xl text-xs hover:bg-blue-600/30 transition-all">
                  Support Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-8 mb-8 border-b border-white/10">
        {['Posts', 'Saved', 'Templates'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-4 text-sm font-bold tracking-widest uppercase transition-all relative ${
              activeTab === tab ? 'text-blue-400' : 'text-white/40 hover:text-white'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="profile-tab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post, i) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="aspect-square rounded-2xl overflow-hidden relative group cursor-pointer"
          >
            <img src={post.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Post" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <Heart size={20} fill="white" />
                <span className="font-bold">{post.likes}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={20} fill="white" />
                <span className="font-bold">{post.comments}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Profile;

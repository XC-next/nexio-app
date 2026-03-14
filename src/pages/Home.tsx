import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Post } from '../types';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, CheckCircle2, Star, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';
import { PostCard } from '../components/PostCard';

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('createdAt', { ascending: false })
          .limit(20);

        if (error) throw error;
        if (data && data.length > 0) {
          setPosts(data as Post[]);
        } else {
          // Fallback to mock data if table is empty
          setPosts(mockPosts);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setPosts(mockPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // Real-time subscription
    const channel = supabase
      .channel('public:posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) => {
        setPosts((prev) => [payload.new as Post, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const mockPosts: Post[] = [
    {
      id: '1',
      authorId: 'u1',
      authorName: 'Urban Flow',
      authorPhoto: 'https://picsum.photos/seed/user1/100/100',
      content: 'Exploring the hidden corners of the city. The light today was just perfect for some urban photography.',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      tags: ['street', 'urban', 'photography'],
      likesCount: 1200,
      commentsCount: 45,
      sharesCount: 12,
      type: 'image',
      createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
      isVerified: true,
      isRisingStar: true
    },
    {
      id: '2',
      authorId: 'u2',
      authorName: 'EcoAdventurer',
      authorPhoto: 'https://picsum.photos/seed/user2/100/100',
      content: 'Midnight in the enchanted forest. Nature never ceases to amaze me with its quiet beauty.',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
      tags: ['nature', 'escape', 'midnight'],
      likesCount: 900,
      commentsCount: 32,
      sharesCount: 8,
      type: 'image',
      createdAt: new Date(Date.now() - 4 * 3600000).toISOString(),
      isVerified: false,
      isRisingStar: true
    },
    {
      id: '3',
      authorId: 'u3',
      authorName: 'DigitalExplorer',
      authorPhoto: 'https://picsum.photos/seed/user3/100/100',
      content: 'Just discovered the new #NexiOStudio features! Mind blown! 🤯 The glassmorphic UI is so smooth.',
      tags: ['AITools', 'creative', 'NexiO'],
      likesCount: 600,
      commentsCount: 12,
      sharesCount: 5,
      type: 'text',
      createdAt: new Date(Date.now() - 6 * 3600000).toISOString(),
      isVerified: true,
      isRisingStar: false
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8 sticky top-0 z-20 py-4 bg-[#050510]/80 backdrop-blur-md">
        <h2 className="text-xl font-bold">Home Feed</h2>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
            <Bell size={24} />
          </button>
          <div className="w-10 h-10 rounded-full border-2 border-blue-500 p-0.5">
            <img src={user?.user_metadata?.avatar_url || 'https://picsum.photos/seed/me/100/100'} className="w-full h-full rounded-full" alt="Me" />
          </div>
        </div>
      </header>

      <div className="space-y-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

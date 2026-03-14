import React, { useState } from 'react';
import { Post } from '../types';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-[2rem] overflow-hidden mb-6 group relative"
    >
      {/* Post Header Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3 glass-dark px-3 py-1.5 rounded-full">
          <img src={post.authorPhoto} className="w-8 h-8 rounded-full border border-white/20" alt={post.authorName} />
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold">{post.authorName}</span>
              {post.isVerified && <CheckCircle2 size={12} className="text-blue-400" />}
            </div>
            <span className="text-[10px] text-white/50">{formatDistanceToNow(post.createdAt)} ago</span>
          </div>
        </div>
        <div className="flex gap-2">
          {post.isRisingStar && (
            <div className="glass-dark px-3 py-1.5 rounded-full flex items-center gap-1">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-[10px] font-bold">Rising Star</span>
            </div>
          )}
          <button className="glass-dark p-2 rounded-full text-white/70 hover:text-white">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="aspect-square md:aspect-video relative">
        {post.imageUrl ? (
          <img src={post.imageUrl} className="w-full h-full object-cover" alt="Post" referrerPolicy="no-referrer" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-900/40 to-purple-900/40 flex items-center justify-center p-8 text-center">
            <p className="text-xl font-medium leading-relaxed">{post.content}</p>
          </div>
        )}
        
        {/* Bottom Overlay for Image Posts */}
        {post.imageUrl && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-sm line-clamp-2 mb-2">{post.content}</p>
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-[10px] glass-dark px-2 py-1 rounded-full text-white/70">#{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interaction Bar */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`glass-dark p-3 rounded-2xl flex flex-col items-center gap-1 transition-all ${isLiked ? 'text-red-500' : 'text-white/70'}`}
        >
          <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          <span className="text-[10px] font-bold">{post.likesCount + (isLiked ? 1 : 0)}</span>
        </button>
        <button className="glass-dark p-3 rounded-2xl flex flex-col items-center gap-1 text-white/70 hover:text-white">
          <MessageCircle size={20} />
          <span className="text-[10px] font-bold">{post.commentsCount}</span>
        </button>
        <button className="glass-dark p-3 rounded-2xl flex flex-col items-center gap-1 text-white/70 hover:text-white">
          <Share2 size={20} />
          <span className="text-[10px] font-bold">Share</span>
        </button>
        <button className="glass-dark p-3 rounded-2xl text-white/70 hover:text-white">
          <Bookmark size={20} />
        </button>
      </div>
    </motion.div>
  );
};

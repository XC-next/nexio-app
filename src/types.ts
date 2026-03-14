export interface User {
  uid: string;
  displayName: string;
  username: string;
  email: string;
  photoURL: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  likesCount: number;
  website?: string;
  role: 'user' | 'admin';
  createdAt: any;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  type: 'image' | 'text';
  createdAt: any;
  isVerified?: boolean;
  isRisingStar?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: any;
  type: 'text' | 'image' | 'file' | 'audio';
  fileUrl?: string;
  fileName?: string;
}

export interface ChatThread {
  id: string;
  participants: string[];
  lastMessage?: string;
  updatedAt: any;
}

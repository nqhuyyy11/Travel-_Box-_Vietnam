"use client";

import React, { useState } from "react";
import { MOCK_FEED } from "@/lib/mockData";
import { CommunityFeedPost } from "@/types";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Sparkles, 
  Image as ImageIcon,
  Send
} from "lucide-react";

export default function TravelFeed() {
  const [posts, setPosts] = useState<CommunityFeedPost[]>(MOCK_FEED);
  const [newCaption, setNewCaption] = useState("");

  const handleLike = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return {
          ...p,
          liked: !p.liked,
          likesCount: p.liked ? p.likesCount - 1 : p.likesCount + 1
        };
      }
      return p;
    }));
  };

  const handleCreatePost = () => {
    if (!newCaption.trim()) return;
    const newPost: CommunityFeedPost = {
      id: `feed_${Date.now()}`,
      authorName: "Nguyễn Minh Khang (Bạn)",
      authorUniversity: "ĐH Bách Khoa Hà Nội",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      province: "Hà Nội",
      boxTitle: "Travel Box Hà Nội",
      caption: newCaption,
      images: ["https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"],
      likesCount: 1,
      liked: true,
      commentsCount: 0,
      timestamp: "Vừa xong"
    };

    setPosts([newPost, ...posts]);
    setNewCaption("");
  };

  return (
    <div className="space-y-6">
      {/* Create Post Box */}
      <div className="glass-panel rounded-3xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-500/40">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="text"
            value={newCaption}
            onChange={(e) => setNewCaption(e.target.value)}
            placeholder="Chia sẻ khoảnh khắc đập hộp Travel Box hoặc nhật ký phượt của bạn..."
            className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-3 text-slate-400">
            <button className="flex items-center gap-1 hover:text-amber-400 transition">
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              <span>Đăng Ảnh Hộp Quà</span>
            </button>
            <button className="flex items-center gap-1 hover:text-amber-400 transition">
              <MapPin className="w-4 h-4 text-red-400" />
              <span>Gắn Thẻ Tỉnh Thành</span>
            </button>
          </div>

          <button
            onClick={handleCreatePost}
            disabled={!newCaption.trim()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Đăng Bài</span>
          </button>
        </div>
      </div>

      {/* Feed Posts List */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.authorName}
                  className="w-11 h-11 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">{post.authorName}</h4>
                  <p className="text-[11px] text-slate-400">{post.authorUniversity} • {post.timestamp}</p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-[11px] flex items-center gap-1">
                📍 {post.province}
              </span>
            </div>

            {/* Caption */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {post.caption}
            </p>

            {/* Images */}
            {post.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-2xl overflow-hidden border border-slate-800">
                {post.images.map((img, i) => (
                  <img key={i} src={img} alt="Post image" className="w-full h-52 object-cover" />
                ))}
              </div>
            )}

            {/* Interactions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 font-semibold transition ${
                    post.liked ? "text-red-500" : "hover:text-white"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.liked ? "fill-red-500" : ""}`} />
                  <span>{post.likesCount} Thích</span>
                </button>

                <button className="flex items-center gap-1.5 hover:text-white transition font-semibold">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.commentsCount} Bình luận</span>
                </button>
              </div>

              <button className="flex items-center gap-1 hover:text-white transition">
                <Share2 className="w-4 h-4" />
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

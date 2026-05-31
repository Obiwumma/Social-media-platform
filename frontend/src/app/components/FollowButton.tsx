"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FollowButton({ targetUserId }: { targetUserId: string }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadState = async () => {
      setIsMounted(true);
      setCurrentUserId(localStorage.getItem("userId"));
    };
    loadState();
  }, []);

  if (!isMounted) return null;
  if (currentUserId === targetUserId) return null;

  const handleFollowToggle = async () => {
    const token = localStorage.getItem("token"); 
    setIsLoading(true);

    try {
      if (isFollowing) {
        const response = await fetch('https://codealpha-tasks-social-media-platform-wkap.onrender.com/api/follow', {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ followingId: targetUserId })
        });

        if (!response.ok) throw new Error("Failed to unfollow user");
      } else {
        const response = await fetch('https://codealpha-tasks-social-media-platform-wkap.onrender.com/api/follow', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify({ followingId: targetUserId })
        });

        if (!response.ok) throw new Error("Failed to follow user");
      }

      setIsFollowing(!isFollowing);
      router.refresh();

    } catch (error) {
      console.error("Failed to toggle follow:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollowToggle}
      disabled={isLoading}
      className={`px-4 py-1.5 font-code-label text-code-label tracking-wider uppercase rounded-full border transition-all ${
        isFollowing
          ? "bg-surface text-on-surface border-outline-variant hover:bg-surface-container" 
          : "bg-primary text-on-primary border-primary hover:opacity-90" 
      }`}
    >
      {isLoading ? "..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
}
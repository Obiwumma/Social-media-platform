"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Notice the Prop here! This component REQUIRES a postId to function.
export default function CommentSection({ postId }: { postId: string }) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Hardcoded for now until we build authentication!
  const testUserId = "ea95eed8-de74-4f2c-90e4-5b58e4f6bd8a"; 

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setIsSubmitting(true);

    try {
      // YOUR TURN: Write the fetch API request here!
      // 1. It goes to http://127.0.0.1:3000/api/comments
      // 2. Method is POST
      // 3. The body needs to send: content, userId, AND postId!
      const response = await fetch('http://127.0.0.1:3000/api/comments', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({content: content, userId: testUserId, postId})
      })

      // (Remember your error handling and router.refresh() here!)
      if (!response.ok) {
        // We try to parse the error message from the backend
        const errorData = await response.json(); 
        throw new Error(errorData.error || "Failed to create post");
      }

      setContent("")
      router.refresh() 

    } catch (error) {
      console.error("Failed to post comment:", error);
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      <form onSubmit={handleComment} className="flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isSubmitting || !content}
          className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? "..." : "Reply"}
        </button>
      </form>
    </div>
  );
}
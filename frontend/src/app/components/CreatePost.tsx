"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!content) return;

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch('http://127.0.0.1:3000/api/posts', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ content: content })
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.error || "Failed to create post");
      }

      setContent("");
      router.refresh();    

    } catch (error) {
      console.error("Failed to post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mb-12">
      <form onSubmit={handleSubmit} className="bg-surface-container p-4 rounded-lg border border-outline-variant transition-all focus-within:ring-1 focus-within:ring-primary">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-outline-variant shrink-0 flex items-center justify-center">
             <span className="material-symbols-outlined text-surface">person</span>
          </div>
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-body-md font-body-md text-on-surface placeholder:text-secondary resize-none overflow-hidden py-2 outline-none"
              placeholder="Share something focused..."
              rows={2}
            />
            <div className="mt-4 flex justify-between items-center border-t border-outline-variant pt-2">
              <div className="flex gap-4 text-secondary">
                <button type="button" className="hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">image</span></button>
                <button type="button" className="hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">code</span></button>
                <button type="button" className="hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">link</span></button>
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !content}
                className="bg-primary text-on-primary font-code-label text-code-label uppercase px-6 py-2 rounded-full hover:opacity-90 transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? "..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
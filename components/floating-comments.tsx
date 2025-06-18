"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"

interface Comment {
  name: string
  comment: string
  stars: number
}

interface FloatingCommentsProps {
  comments: Comment[]
  userComments?: Comment[]
}

export function FloatingComments({ comments, userComments = [] }: FloatingCommentsProps) {
  const [visibleComments, setVisibleComments] = useState<(Comment & { id: number; isUser?: boolean })[]>([])
  const [nextId, setNextId] = useState(0)

  // Combine user comments with fake comments
  const allComments = [...userComments.map((c) => ({ ...c, isUser: true })), ...comments]

  useEffect(() => {
    const interval = setInterval(() => {
      const randomComment = allComments[Math.floor(Math.random() * allComments.length)]
      const newComment = { ...randomComment, id: nextId }

      setVisibleComments((prev) => {
        const updated = [...prev, newComment]
        return updated.slice(-3) // Keep only the latest 3 comments
      })
      setNextId((prev) => prev + 1)
    }, 4000)

    return () => clearInterval(interval)
  }, [nextId]) // Removed allComments from the dependency array

  return (
    <div className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 w-72 sm:w-80 pointer-events-none z-40 space-y-3 sm:space-y-4 hidden md:block">
      <AnimatePresence mode="popLayout">
        {visibleComments.map((comment, index) => (
          <motion.div
            key={comment.id}
            layout
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{
              opacity: index === 0 ? 0.4 : index === 1 ? 0.7 : 1,
              x: 0,
              scale: 1,
              y: index * -8,
            }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            className="relative"
          >
            {/* Neon background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-purple-500/20 rounded-2xl blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-pink-400/10 to-purple-400/10 rounded-2xl"></div>

            {/* Content */}
            <div className="relative bg-slate-900/95 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-3 sm:p-4 shadow-xl shadow-cyan-500/20">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <p className="text-xs sm:text-sm font-semibold text-white truncate flex items-center">
                      {comment.name}
                      {comment.isUser && (
                        <span className="ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 sm:py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                          Thật
                        </span>
                      )}
                    </p>
                    <div className="flex items-center space-x-0.5 sm:space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-2 h-2 sm:w-3 sm:h-3 ${i < comment.stars ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 break-words leading-relaxed">{comment.comment}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

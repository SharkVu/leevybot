"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Hash, Bell, Users, Search, Inbox, HelpCircle } from "lucide-react"
import { useState, useEffect } from "react"

interface GameplayModalProps {
  isOpen: boolean
  onClose: () => void
}

interface GameMessage {
  user: string
  command?: string
  response?: string
  isBot?: boolean
  progress?: number
  avatar?: string
}

// Fixed pattern: User - Bot - User - Bot
const detailedGameplayMessages: GameMessage[] = [
  { user: "Minh Tuấn", command: "*haiqua", avatar: "MT" },
  {
    user: "LeeVy Bot",
    response: "🍎 **Hái quả bắt đầu!**\nBạn đang hái quả tại vườn cây...",
    isBot: true,
    progress: 0,
  },
  { user: "Thu Hà", command: "*shop", avatar: "TH" },
  {
    user: "LeeVy Bot",
    response: `🏪 **Cửa hàng LeeVy**
════════════════════
🍞 **Thực phẩm:**
• Bánh mì: 50 xu
• Nước suối: 30 xu  
• Cơm hộp: 75 xu
🔧 **Công cụ:**
• Cuốc: 200 xu
• Rìu: 250 xu
💎 **Đặc biệt:**
• Hạt giống: 100 xu`,
    isBot: true,
  },
  { user: "Văn Nam", command: "*diemdanh", avatar: "VN" },
  {
    user: "LeeVy Bot",
    response: `✅ **Điểm danh thành công!**
🎁 Phần thưởng hôm nay:
• +100 xu vào tài khoản
• +1 bánh mì
• +1 hạt giống ngẫu nhiên
🔥 Streak: 5 ngày liên tiếp!`,
    isBot: true,
  },
  { user: "Lan Anh", command: "*job", avatar: "LA" },
  {
    user: "LeeVy Bot",
    response: `👨‍🌾 **Thông tin nghề nghiệp**
═══════════════════════
🌾 Nghề hiện tại: **Nông dân**
💰 Mức lương: 50 xu/giờ
📈 Kinh nghiệm: 250/500 EXP
⭐ Level: 3
🏆 Thành tích: Đã thu hoạch 500kg nông sản`,
    isBot: true,
  },
  { user: "Hoàng Long", command: "*top", avatar: "HL" },
  {
    user: "LeeVy Bot",
    response: `🏆 **Bảng xếp hạng giàu có**
═══════════════════════════
1. 👑 Minh Tuấn - 50,000 xu
2. 🥈 Thu Hà - 45,000 xu
3. 🥉 Văn Nam - 38,500 xu
4. 🏅 Lan Anh - 32,100 xu
5. 🏅 Hoàng Long - 28,900 xu

💡 Bạn đang ở vị trí #12 với 15,600 xu`,
    isBot: true,
  },
  { user: "Mai Linh", command: "*baobuakeo", avatar: "ML" },
  {
    user: "LeeVy Bot",
    response: `✂️ **Bao Búa Kéo - Kết quả**
═══════════════════════════
🎮 Bạn chọn: Kéo ✂️
🤖 Bot chọn: Búa 🔨
💥 **Kết quả: THUA!**
💰 -50 xu từ tài khoản
💳 Số dư còn lại: 1,250 xu`,
    isBot: true,
  },
  { user: "Đức Anh", command: "*thongtin", avatar: "DA" },
  {
    user: "LeeVy Bot",
    response: `📋 **Thông tin cá nhân**
═══════════════════════════
👤 Tên: Đức Anh
🏠 Quê quán: Hà Nội
💰 Tài khoản: 15,600 xu
👨‍🌾 Nghề nghiệp: Nông dân (Lv.3)
❤️ Sức khỏe: 85/100
🍽️ Độ đói: 60/100
💧 Độ khát: 40/100`,
    isBot: true,
  },
  { user: "Phương Linh", command: "*timhieu", avatar: "PL" },
  {
    user: "LeeVy Bot",
    response: `💕 **Hệ thống tìm hiểu**
═══════════════════════════
💝 Tình trạng: Đang độc thân
🔍 Tìm kiếm: Người phù hợp
💫 Điểm thu hút: 7.5/10
💰 Chi phí tìm hiểu: 500 xu/lần

Bạn có muốn bắt đầu tìm hiểu không?`,
    isBot: true,
  },
  { user: "Quang Huy", command: "*baucua", avatar: "QH" },
  {
    user: "LeeVy Bot",
    response: `🎰 **Bàu Cua Tôm Cá**
═══════════════════════════
🎲 Kết quả xúc xắc:
• Xúc xắc 1: 🦀 (Cua)
• Xúc xắc 2: 🐟 (Cá) 
• Xúc xắc 3: 🦐 (Tôm)

💰 Bạn đặt: 200 xu vào Cua
🎉 **THẮNG!** +400 xu vào tài khoản`,
    isBot: true,
  },
]

export function GameplayModal({ isOpen, onClose }: GameplayModalProps) {
  const [messages, setMessages] = useState<(GameMessage & { id: number })[]>([])
  const [nextId, setNextId] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (!isOpen) return

    // Auto start when modal opens with proper user-bot pattern
    const interval = setInterval(() => {
      const currentMessage = detailedGameplayMessages[messageIndex % detailedGameplayMessages.length]
      const newMessage = { ...currentMessage, id: nextId }

      setMessages((prev) => {
        const updated = [...prev, newMessage]
        return updated.slice(-20) // Keep only last 20 messages
      })

      setNextId((prev) => prev + 1)
      setMessageIndex((prev) => prev + 1)

      // If it's a haiqua command, simulate progress
      if (currentMessage.command === "*haiqua") {
        let progress = 0
        const progressInterval = setInterval(() => {
          progress += 15
          if (progress <= 100) {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === nextId && msg.isBot
                  ? {
                    ...msg,
                    response: `🍎 **Hái quả bắt đầu!**\nTiến độ: ${progress}%\n${progress < 100 ? "Đang hái quả..." : "Hoàn thành!"}`,
                    progress,
                  }
                  : msg,
              ),
            )
          }
          if (progress >= 100) {
            clearInterval(progressInterval)
            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                {
                  user: "LeeVy Bot",
                  response: `✅ **Hái quả hoàn thành!**
🍎 Thu hoạch: 3 quả táo
💰 Thu nhập: +75 xu
📈 EXP: +15 điểm kinh nghiệm`,
                  isBot: true,
                  id: nextId + 1000,
                },
              ])
            }, 800)
          }
        }, 400)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [isOpen, nextId, messageIndex])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl max-h-[90vh] overflow-hidden"
          >
            <Card className="bg-slate-800 border-slate-700 h-full">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-700 bg-slate-900">
                <CardTitle className="text-white flex items-center space-x-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <Hash className="w-5 h-5 text-white" />
                  </div>
                  <span>Mô phỏng Discord - LeeVy Bot</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-slate-400 hover:text-white rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-slate-700 h-[70vh] flex">
                  {/* Discord Sidebar */}
                  <div className="w-60 bg-slate-800 border-r border-slate-600 blur-sm opacity-50">
                    <div className="p-3 border-b border-slate-600">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-full"></div>
                        <span className="text-white font-semibold text-sm">LeeVy Server</span>
                      </div>
                    </div>
                    <div className="p-2 space-y-1">
                      <div className="flex items-center space-x-2 px-2 py-1 rounded text-slate-300 text-sm">
                        <Hash className="w-4 h-4" />
                        <span>general</span>
                      </div>
                      <div className="flex items-center space-x-2 px-2 py-1 rounded bg-slate-600 text-white text-sm">
                        <Hash className="w-4 h-4" />
                        <span>leevy-bot</span>
                      </div>
                      <div className="flex items-center space-x-2 px-2 py-1 rounded text-slate-300 text-sm">
                        <Hash className="w-4 h-4" />
                        <span>roleplay</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Chat Area */}
                  <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="bg-slate-700 px-4 py-3 border-b border-slate-600 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Hash className="w-6 h-6 text-slate-400" />
                        <div>
                          <h3 className="text-white font-semibold">leevy-bot</h3>
                          <p className="text-slate-400 text-xs">Mô phỏng gameplay LeeVy Bot</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 blur-sm opacity-50">
                        <Bell className="w-5 h-5 text-slate-400" />
                        <Users className="w-5 h-5 text-slate-400" />
                        <Search className="w-5 h-5 text-slate-400" />
                        <Inbox className="w-5 h-5 text-slate-400" />
                        <HelpCircle className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-700">
                      <AnimatePresence>
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex items-start space-x-3"
                          >
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold ${message.isBot
                                ? "bg-gradient-to-r from-cyan-600 to-blue-600"
                                : "bg-gradient-to-r from-purple-600 to-pink-600"
                                }`}
                            >
                              {message.isBot ? (
                                <img
                                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.jpg-q8bRIklH9qUjVn2mDdWqIqd2m8bXzw.jpeg"
                                  alt="LeeVy Bot"
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              ) : (
                                <span className="text-white">{message.avatar || message.user[0]}</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <span
                                  className={`text-sm font-semibold ${message.isBot ? "text-cyan-400" : "text-white"}`}
                                >
                                  {message.user}
                                </span>
                                {message.isBot && (
                                  <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded">BOT</span>
                                )}
                                <span className="text-xs text-slate-400">{new Date().toLocaleTimeString()}</span>
                              </div>
                              {message.command && (
                                <div className="bg-slate-800 rounded-lg p-3 mb-2 border-l-4 border-cyan-500">
                                  <code className="text-cyan-400 text-sm font-mono">{message.command}</code>
                                </div>
                              )}
                              {message.response && (
                                <div
                                  className={`rounded-lg p-3 ${message.isBot ? "bg-slate-800 border-l-4 border-cyan-500" : "bg-slate-600"
                                    }`}
                                >
                                  <pre className="text-sm text-white whitespace-pre-wrap font-sans">
                                    {message.response}
                                  </pre>
                                  {message.progress !== undefined && message.progress < 100 && (
                                    <div className="mt-3 bg-slate-900 rounded-full h-2">
                                      <div
                                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${message.progress}%` }}
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* Input Area (disabled) */}
                    <div className="border-t border-slate-600 p-4 bg-slate-700">
                      <div className="bg-slate-800 rounded-lg p-3 opacity-50 blur-sm">
                        <span className="text-slate-400 text-sm">
                          Nhập tin nhắn vào #leevy-bot (Mô phỏng - Chỉ xem)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Sidebar */}
                  <div className="w-60 bg-slate-800 border-l border-slate-600 blur-sm opacity-50">
                    <div className="p-3 border-b border-slate-600">
                      <h4 className="text-white font-semibold text-sm">Thành viên — 1,234</h4>
                    </div>
                    <div className="p-2 space-y-2">
                      <div className="text-xs text-slate-400 font-semibold uppercase">Online — 156</div>
                      <div className="space-y-1">
                        {["Minh Tuấn", "Thu Hà", "Văn Nam", "Lan Anh"].map((name, i) => (
                          <div key={i} className="flex items-center space-x-2 px-2 py-1">
                            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                            <span className="text-slate-300 text-sm">{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


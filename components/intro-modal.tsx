"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, GamepadIcon, Coins, Users, Zap } from "lucide-react"

interface IntroModalProps {
  isOpen: boolean
  onClose: () => void
}

export function IntroModal({ isOpen, onClose }: IntroModalProps) {
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
            className="w-full max-w-4xl max-h-[80vh] overflow-hidden"
          >
            <Card className="bg-slate-900 border-slate-700 h-full">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-700">
                <CardTitle className="text-white flex items-center space-x-2">
                  <GamepadIcon className="w-6 h-6 text-cyan-400" />
                  <span>Giới thiệu LeeVy Bot</span>
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
                      🎮 LeeVy Bot – Cuộc sống thứ hai của bạn bắt đầu từ đây!
                    </h2>
                    <p className="text-slate-300 italic">
                      Phát triển bởi Shark Vũ (Vũ Trung Kiên) – đam mê tạo ra một thế giới sống động và không giới hạn
                      trên Discord.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-slate-300 leading-relaxed">
                      Bạn đã bao giờ ước mình được sống trong một thế giới mà mọi lựa chọn đều có ý nghĩa? Một nơi bạn
                      có thể <span className="text-cyan-400 font-semibold">trở thành bất kỳ ai</span>,{" "}
                      <span className="text-pink-400 font-semibold">làm bất cứ điều gì</span>, từ một người dân bình
                      thường đến một ông trùm giàu có?
                      <span className="text-lime-400 font-semibold"> LeeVy Bot</span> chính là nơi bắt đầu cho cuộc hành
                      trình đó.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="bg-slate-800/50 border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Thế giới mô phỏng chi tiết</h3>
                          </div>
                          <p className="text-slate-300 text-sm">
                            LeeVy Bot không đơn thuần là một bot Discord. Đây là một{" "}
                            <span className="text-cyan-400">mô hình thế giới sống ảo</span> với từng chi tiết được chăm
                            chút: từ{" "}
                            <span className="text-lime-400">thời tiết, nhiệt độ, cảm giác đói khát, mệt mỏi</span>, cho
                            đến những công việc hằng ngày như{" "}
                            <span className="text-pink-400">trồng trọt, săn bắn, khai thác, giao thương</span>...
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-800/50 border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                              <GamepadIcon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Nghề nghiệp đa dạng</h3>
                          </div>
                          <p className="text-slate-300 text-sm">
                            🔧 Một người thợ khéo léo?
                            <br />🌾 Một nông dân sống yên bình?
                            <br />🏹 Một thợ săn ẩn dật trong rừng sâu?
                            <br />💰 Một doanh nhân thao túng thị trường?
                            <br />
                            Hay thậm chí là một <span className="text-red-400">con nghiện cờ bạc</span>, sẵn sàng đặt
                            cược tất cả chỉ để "đổi đời" trong chớp mắt?
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-800/50 border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                              <Coins className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Hệ thống kinh tế động</h3>
                          </div>
                          <p className="text-slate-300 text-sm">
                            Mọi hoạt động trong LeeVy Bot đều xoay quanh đồng tiền ảo{" "}
                            <span className="text-yellow-400 font-semibold">Vcoinocy</span> – loại tiền tệ chính mà bạn
                            dùng để giao dịch, đầu tư, và cả… <span className="text-red-400">chơi đỏ đen</span>. Một ván
                            bài, một canh bạc, một quyết định có thể{" "}
                            <span className="text-green-400">biến bạn thành triệu phú</span>… hoặc{" "}
                            <span className="text-red-400">trắng tay chỉ sau vài giây</span>.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-800/50 border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                              <Zap className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Sinh tồn thực tế</h3>
                          </div>
                          <p className="text-slate-300 text-sm">
                            Không chỉ làm việc và kiếm tiền, bạn còn phải{" "}
                            <span className="text-lime-400">sinh tồn</span>: Ăn uống đầy đủ, nghỉ ngơi hợp lý, tránh
                            rét, tránh nắng, đối mặt với <span className="text-cyan-400">mưa gió, bão bùng</span> và đôi
                            khi, <span className="text-red-400">chống lại chính lòng tham</span> của mình...
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="text-center bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg p-6 border border-slate-600">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        🔥 Tất cả chỉ có trên LeeVy Bot – Một lần bước vào, khó mà rời khỏi!
                      </h3>
                      <p className="text-slate-300 mb-2">
                        Bạn sẽ không chỉ chơi – bạn sẽ <span className="text-cyan-400 font-semibold">sống</span>.
                      </p>
                      <p className="text-slate-300">
                        Bạn sẽ không chỉ làm giàu – bạn sẽ{" "}
                        <span className="text-pink-400 font-semibold">
                          chiến đấu, chinh phục, và khẳng định chính mình
                        </span>
                        .
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-lg text-slate-300 mb-4">
                        Hãy tham gia ngay hôm nay, bắt đầu{" "}
                        <span className="text-lime-400 font-semibold">cuộc đời mới</span> mà bạn làm chủ tất cả.
                      </p>
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

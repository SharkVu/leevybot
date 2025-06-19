
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Cpu,
  Network,
  Tractor,
  Coins,
  Users,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Command,
  Info,
  Play,
  Code,
  Facebook,
  HeadphonesIcon,
  Bot,
  MessageSquare,
  Zap,
  Terminal,
} from "lucide-react"
import { useState, useEffect } from "react"
import { FloatingComments } from "@/components/floating-comments"
import { RatingModal } from "@/components/rating-modal"
import { CommandModal } from "@/components/command-modal"
import { IntroModal } from "@/components/intro-modal"
import { GameplayModal } from "@/components/gameplay-modal"
import { CodeSimulationModal } from "@/components/code-simulation-modal"

// Load comments from JSON file
import commentsData from "@/data/comments.json"

const discordInviteLink = "https://discord.gg/5hhpcUvxRr"
const botInviteLink =
  "https://discord.com/oauth2/authorize?client_id=848875036596240414&permissions=0&integration_type=0&scope=bot+applications.commands"

const commands = [
  { cmd: "nhaptich", desc: "Để nhập tịch vào Bot" },
  { cmd: "nghenghiep", desc: "Để chọn nghề" },
  { cmd: "thongtin", desc: "Kiểm tra thông tin người dùng" },
  { cmd: "suckhoe", desc: "Kiểm tra sức khoẻ của bạn" },
  { cmd: "an", desc: "Ăn khi bạn đói" },
  { cmd: "uong", desc: "Uống khi bạn khát" },
  { cmd: "tam", desc: "Tắm khi bạn mệt mỏi" },
  { cmd: "thuoc", desc: "Xem các loại thuốc" },
  { cmd: "diemdanh", desc: "Điểm danh hằng ngày nhận quà" },
  { cmd: "tusat", desc: "Tự sát và chuyển sinh" },
  { cmd: "doinghe", desc: "Để đổi nghề của bạn sang nghề khác" },
  { cmd: "job", desc: "Để xem nghề hiện tại của bạn" },
  { cmd: "top", desc: "Xem top 5 người giàu nhất" },
  { cmd: "doiqua", desc: "Đổi quà mà bạn muốn" },
  { cmd: "sudung ID", desc: "Sử dụng thuốc" },
  { cmd: "laynuoc", desc: "Để lấy nước suối" },
  { cmd: "shop", desc: "Xem giá thực phẩm, quặng và công cụ" },
  { cmd: "ban", desc: "Bán thực phẩm và quặng cho shop" },
  { cmd: "mua", desc: "Mua vật phẩm từ shop" },
  { cmd: "sieuthi", desc: "Để truy cập siêu thị xem hoa quả và thuốc" },
  { cmd: "haiqua", desc: "Để hái quả" },
  { cmd: "banqua ID", desc: "Để bán hoa quả hái được" },
  { cmd: "bauvat", desc: "Xem cửa hàng báu vật" },
  { cmd: "muavp ID", desc: "Để mua báu vật" },
  { cmd: "chebien ID", desc: "Để chế biến đồ ăn" },
  { cmd: "chetao ID", desc: "Để chế tạo vật phẩm" },
  { cmd: "help", desc: "Để xem vài lệnh phổ biến" },
  { cmd: "giaodich", desc: "Để bán vật phẩm cho người khác" },
  { cmd: "baobuakeo", desc: "Để chơi bao búa kéo" },
  { cmd: "xidach", desc: "Để chơi Xì Dách" },
  { cmd: "baucua", desc: "Chơi bàu cua tôm cá" },
  { cmd: "timhieu", desc: "Bắt đầu mối quan hệ với một người nào đó" },
  { cmd: "kyniem", desc: "Xem lại mối quan hệ của mình" },
  { cmd: "naptien", desc: "Nạp tiền vào bot nhận xu" },
]

const features = [
  {
    icon: Bot,
    title: "Bot Discord Thông Minh",
    description: "Bot phản hồi nhanh chóng với hệ thống lệnh phong phú và dễ sử dụng",
    color: "cyan",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: Tractor,
    title: "Hệ thống Farm Ảo",
    description: "Trồng trọt, chăn nuôi và quản lý trang trại thông qua các lệnh Discord",
    color: "lime",
    gradient: "from-lime-400 to-green-500",
  },
  {
    icon: MessageSquare,
    title: "Roleplay Tương Tác",
    description: "Tạo nhân vật và tương tác với cộng đồng qua các lệnh roleplay",
    color: "pink",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    icon: Coins,
    title: "Kinh Tế Ảo",
    description: "Hệ thống tiền tệ Vcoinocy với giao dịch, mua bán và đầu tư",
    color: "yellow",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: Users,
    title: "Cộng Đồng Discord",
    description: "Kết nối với hàng nghìn người chơi khác trong các server Discord",
    color: "purple",
    gradient: "from-purple-400 to-indigo-500",
  },
  {
    icon: Zap,
    title: "Lệnh Đa Dạng",
    description: "Hơn 50+ lệnh khác nhau từ cơ bản đến nâng cao cho mọi nhu cầu",
    color: "emerald",
    gradient: "from-emerald-400 to-teal-500",
  },
]

const steps = [
  {
    number: "01",
    title: "Tham gia Server",
    description: "Click vào nút 'Kết nối Server' để tham gia cộng đồng LeeVy Bot RP",
    icon: Network,
  },
  {
    number: "02",
    title: "Thêm Bot",
    description: "Sử dụng nút 'Thêm LeeVy Bot' để mời bot vào server của bạn",
    icon: Cpu,
  },
  {
    number: "03",
    title: "Bắt đầu Phiêu lưu",
    description: "Tạo nhân vật và bắt đầu hành trình farm & roleplay của bạn",
    icon: Sparkles,
  },
]

// Code lines for background animation
const codeLines = [
  "const { Client, GatewayIntentBits } = require('discord.js');",
  "const bot = new Client({ intents: [GatewayIntentBits.Guilds] });",
  "bot.once('ready', () => {",
  "  console.log('LeeVy Bot is online!');",
  "});",
  "",
  "bot.on('messageCreate', async (message) => {",
  "  if (message.content === '*diemdanh') {",
  "    await message.reply('✅ Điểm danh thành công!');",
  "  }",
  "});",
  "",
  "const userData = require('./data/users.json');",
  "const saveData = () => {",
  "  fs.writeFileSync('./data/users.json', JSON.stringify(userData));",
  "};",
  "",
  "bot.login(process.env.DISCORD_TOKEN);",
]

// Demo code snippets for the "Sửa Lỗi Nhanh Chóng" section
const demoCodeSnippets = [
  {
    title: "Điểm danh hàng ngày",
    code: `bot.on('messageCreate', async (message) => {
  if (message.content === '*diemdanh') {
    const userId = message.author.id;
    const today = new Date().toDateString();
    
    if (!userData[userId]) {
      userData[userId] = { lastCheckin: null, streak: 0, coins: 0 };
    }
    
    if (userData[userId].lastCheckin !== today) {
      userData[userId].lastCheckin = today;
      userData[userId].streak += 1;
      userData[userId].coins += 100;
      
      await message.reply(\`✅ Điểm danh thành công! 
🎁 +100 xu | 🔥 Streak: \${userData[userId].streak} ngày\`);
    } else {
      await message.reply('❌ Bạn đã điểm danh hôm nay rồi!');
    }
  }
});`,
  },
  {
    title: "Hệ thống Farm",
    code: `bot.on('messageCreate', async (message) => {
  if (message.content === '*haiqua') {
    const userId = message.author.id;
    const fruits = ['🍎', '🍊', '🍌', '🍇', '🥝'];
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    const amount = Math.floor(Math.random() * 5) + 1;
    
    if (!userData[userId].inventory) {
      userData[userId].inventory = {};
    }
    
    userData[userId].inventory[randomFruit] = 
      (userData[userId].inventory[randomFruit] || 0) + amount;
    
    await message.reply(\`🌳 Hái quả thành công!
\${randomFruit} x\${amount} đã được thêm vào kho!\`);
  }
});`,
  },
  {
    title: "Hệ thống Shop",
    code: `bot.on('messageCreate', async (message) => {
  if (message.content === '*shop') {
    const shopEmbed = {
      title: '🏪 Cửa hàng LeeVy',
      color: 0x00ff00,
      fields: [
        {
          name: '🍞 Thực phẩm',
          value: 'Bánh mì: 50 xu\\nNước suối: 30 xu\\nCơm hộp: 75 xu',
          inline: true
        },
        {
          name: '🔧 Công cụ', 
          value: 'Cuốc: 200 xu\\nRìu: 250 xu\\nCần câu: 300 xu',
          inline: true
        }
      ]
    };
    
    await message.reply({ embeds: [shopEmbed] });
  }
});`,
  },
]

export default function LandingPage() {
  const [showRatingForm, setShowRatingForm] = useState(false)
  const [showCommandModal, setShowCommandModal] = useState(false)
  const [showIntroModal, setShowIntroModal] = useState(false)
  const [showGameplayModal, setShowGameplayModal] = useState(false)
  const [showCodeModal, setShowCodeModal] = useState(false)
  const [userComments, setUserComments] = useState<Array<{ name: string; comment: string; stars: number }>>([])
  const [currentCodeLine, setCurrentCodeLine] = useState(0)
  const [currentDemoIndex, setCurrentDemoIndex] = useState(0)

  // Animate code lines in background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCodeLine((prev) => (prev + 1) % codeLines.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Animate demo code snippets
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemoIndex((prev) => (prev + 1) % demoCodeSnippets.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const handleRatingSubmit = (rating: { name: string; comment: string; stars: number }) => {
    setUserComments((prev) => [...prev, rating])
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-pink-500/5"></div>

      {/* Floating Comments */}
      <FloatingComments comments={commentsData} userComments={userComments} />

      {/* Fixed Chat Icon */}
      <motion.button
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowRatingForm(true)}
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </motion.button>

      {/* Modals */}
      <RatingModal isOpen={showRatingForm} onClose={() => setShowRatingForm(false)} onSubmit={handleRatingSubmit} />
      <CommandModal isOpen={showCommandModal} onClose={() => setShowCommandModal(false)} commands={commands} />
      <IntroModal isOpen={showIntroModal} onClose={() => setShowIntroModal(false)} />
      <GameplayModal isOpen={showGameplayModal} onClose={() => setShowGameplayModal(false)} />
      <CodeSimulationModal isOpen={showCodeModal} onClose={() => setShowCodeModal(false)} />

      {/* Header */}
      <motion.header
        className="relative z-50 border-b border-slate-800/50 backdrop-blur-sm bg-slate-950/80"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
              </motion.div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                LeeVy Bot RP
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500 hover:text-white hover:border-purple-400 rounded-full text-sm bg-purple-500/10 backdrop-blur-sm"
                onClick={() => setShowCommandModal(true)}
              >
                <Command className="w-4 h-4 mr-2" />
                Lệnh Command
              </Button>

              <Button
                variant="outline"
                className="border-green-500/50 text-green-300 hover:bg-green-500 hover:text-white hover:border-green-400 rounded-full text-sm bg-green-500/10 backdrop-blur-sm"
                onClick={() => setShowGameplayModal(true)}
              >
                <Play className="w-4 h-4 mr-2" />
                Mô phỏng
              </Button>

              <Button
                variant="outline"
                className="border-orange-500/50 text-orange-300 hover:bg-orange-500 hover:text-white hover:border-orange-400 rounded-full text-sm bg-orange-500/10 backdrop-blur-sm"
                onClick={() => setShowCodeModal(true)}
              >
                <Code className="w-4 h-4 mr-2" />
                Demo Code
              </Button>

              <Button
                variant="outline"
                className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500 hover:text-white hover:border-cyan-400 rounded-full text-sm bg-cyan-500/10 backdrop-blur-sm"
                onClick={() => setShowIntroModal(true)}
              >
                <Info className="w-4 h-4 mr-2" />
                Giới Thiệu
              </Button>

              <Button
                className="bg-blue-600/80 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full shadow-lg text-sm backdrop-blur-sm border border-blue-500/30"
                onClick={() => window.open("https://www.facebook.com/vu.trung.kien.969909", "_blank")}
              >
                <HeadphonesIcon className="w-4 h-4 mr-2" />
                Hỗ Trợ
              </Button>

              <Button
                className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg shadow-cyan-500/25"
                onClick={() => window.open(discordInviteLink, "_blank")}
              >
                Kết nối Server
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Mobile Navigation */}
            <div className="flex lg:hidden items-center space-x-2">
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-semibold px-3 py-2 rounded-full shadow-lg text-xs"
                onClick={() => window.open(discordInviteLink, "_blank")}
              >
                Tham gia
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Row */}
          <div className="lg:hidden mt-4 flex flex-wrap gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500 hover:text-white rounded-full text-xs px-3 py-1 bg-purple-500/10"
              onClick={() => setShowCommandModal(true)}
            >
              <Command className="w-3 h-3 mr-1" />
              Lệnh
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-green-500/50 text-green-300 hover:bg-green-500 hover:text-white rounded-full text-xs px-3 py-1 bg-green-500/10"
              onClick={() => setShowGameplayModal(true)}
            >
              <Play className="w-3 h-3 mr-1" />
              Demo
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-orange-500/50 text-orange-300 hover:bg-orange-500 hover:text-white rounded-full text-xs px-3 py-1 bg-orange-500/10"
              onClick={() => setShowCodeModal(true)}
            >
              <Code className="w-3 h-3 mr-1" />
              Code
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500 hover:text-white rounded-full text-xs px-3 py-1 bg-cyan-500/10"
              onClick={() => setShowIntroModal(true)}
            >
              <Info className="w-3 h-3 mr-1" />
              Info
            </Button>

            <Button
              size="sm"
              className="bg-blue-600/80 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded-full shadow-lg text-xs"
              onClick={() => window.open("https://www.facebook.com/vu.trung.kien.969909", "_blank")}
            >
              <HeadphonesIcon className="w-3 h-3 mr-1" />
              Hỗ Trợ
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tighter text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Roleplay Farm
                </span>
                <br />
                <span className="text-white">& Adventure</span>
              </motion.h2>

              <motion.p
                className="text-base sm:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed text-center lg:text-left px-4 lg:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Khám phá thế giới ảo tương lai nơi công nghệ cao kết hợp với nông nghiệp. Xây dựng trang trại, phát
                triển nhân vật và tạo nên câu chuyện của riêng bạn.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 lg:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 text-sm sm:text-base"
                  onClick={() => window.open(botInviteLink, "_blank")}
                >
                  Thêm LeeVy Bot Ngay
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 text-sm sm:text-base"
                  onClick={() => window.open(discordInviteLink, "_blank")}
                >
                  Tham gia Cộng đồng
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative flex justify-center lg:justify-end order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative w-64 sm:w-80 lg:w-full max-w-md">
                <div className="absolute inset-0 -z-10 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"></div>

                  <div className="absolute inset-0 font-mono text-xs text-slate-500/40 p-4 overflow-hidden">
                    {codeLines.map((line, index) => (
                      <motion.div
                        key={index}
                        className={`leading-relaxed transition-all duration-1000 mb-1 ${index === currentCodeLine ? "text-slate-400/60" : "text-slate-600/30"}`}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: index === currentCodeLine ? 0.6 : 0.3,
                        }}
                        transition={{ duration: 0.8 }}
                      >
                        <span className="text-slate-600/30 mr-2 select-none text-xs">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {line || "\u00A0"}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-pink-500/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-pink-400/20 rounded-full blur-2xl"
                  animate={{
                    scale: [1.1, 1.3, 1.1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.jpg-q8bRIklH9qUjVn2mDdWqIqd2m8bXzw.jpeg"
                  alt="LeeVy Bot Character"
                  className="relative z-10 w-full rounded-full shadow-2xl border-2 sm:border-4 border-cyan-500/50"
                />
                <motion.div
                  className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sửa Lỗi Nhanh Chóng Section */}
      <section className="py-12 sm:py-16 lg:py-20 relative bg-slate-900/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Sửa Lỗi Nhanh Chóng
              </span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto px-4">
              Admin sẽ sửa lỗi cho người dùng chỉ trong vài ba phút khi có khiếu nại sự cố
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <h4 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {demoCodeSnippets[currentDemoIndex].title}
                </h4>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Khám phá cách LeeVy Bot xử lý các lệnh phức tạp với JavaScript và Discord.js. Mỗi tính năng được code
                  tỉ mỉ để mang lại trải nghiệm tốt nhất.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-full"
                    onClick={() => setShowCodeModal(true)}
                  >
                    <Code className="w-4 h-4 mr-2" />
                    Xem Full Demo
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-slate-300 text-sm ml-4">bot.js</span>
                  <div className="flex-1"></div>
                  <Terminal className="w-4 h-4 text-slate-400" />
                </div>
                <CardContent className="p-0">
                  <div
                    className="bg-slate-950 p-4 font-mono text-sm max-h-96 overflow-y-auto select-none"
                    style={{ userSelect: "none", WebkitUserSelect: "none" }}
                  >
                    <motion.pre
                      key={currentDemoIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-slate-300 whitespace-pre-wrap leading-relaxed"
                      style={{ userSelect: "none", WebkitUserSelect: "none" }}
                    >
                      {demoCodeSnippets[currentDemoIndex].code}
                    </motion.pre>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center mt-4 space-x-2">
                {demoCodeSnippets.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentDemoIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentDemoIndex ? "bg-orange-500 scale-125" : "bg-slate-600 hover:bg-slate-500"}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Tính năng Nổi bật
              </span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto px-4">
              Bot Discord roleplay giải trí với hệ thống lệnh phong phú, mang đến trải nghiệm farm và roleplay tuyệt vời
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300 group h-full">
                  <CardContent className="p-4 sm:p-6">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-2 sm:p-3 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Servers Section */}
      <section className="py-12 sm:py-16 lg:py-20 relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Server Đang Tham Gia
              </span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto px-4">
              LeeVy Bot đang hoạt động tại các server Discord hàng đầu
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "The X City",
                members: "2,586",
                status: "online",
                avatar:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QGJ2ZJnyO7ngsSkU0Pro1dVYVE8F6B.png",
              },
              {
                name: "Dịch Vụ XXX-FiveM",
                members: "3,800",
                status: "online",
                avatar:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XFeqVcVyiNquzgnX3vxSMnEPeNSKEE.png",
              },
              {
                name: "Đất Việt RP",
                members: "184",
                status: "online",
                avatar:
                  "https://ik.imagekit.io/jym2d2so9/Remove-bg.ai_1749028486652.png?updatedAt=1750240587637",
              },
            ].map((server, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 group">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={server.avatar || "/placeholder.svg"}
                        alt={server.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-green-500/30"
                      />
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold mb-2 text-white group-hover:text-green-300 transition-colors duration-300">
                      {server.name}
                    </h4>
                    <p className="text-sm sm:text-base text-slate-300 mb-3">{server.members} thành viên</p>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs sm:text-sm font-semibold">Đang hoạt động</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Start Section */}
      <section className="py-20 relative bg-scanlines-pattern">
        <div className="absolute inset-0 bg-slate-950/80"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent">
                Cách Bắt đầu
              </span>
            </h3>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Chỉ với 3 bước đơn giản, bạn đã có thể bắt đầu cuộc phiêu lưu trong thế giới roleplay farm
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="bg-slate-900/70 border-slate-700/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 p-4 group-hover:scale-110 transition-transform duration-300">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-lime-400 to-cyan-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">
                        {step.number}
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-slate-300 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-4">
              <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Sẵn sàng cho Cuộc phiêu lưu?
              </span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-8 sm:mb-10 leading-relaxed px-4">
              Tham gia cùng hàng nghìn người chơi khác trong thế giới roleplay farm đầy thú vị. Cuộc phiêu lưu của bạn
              bắt đầu ngay bây giờ!
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 text-sm sm:text-base"
                onClick={() => window.open(botInviteLink, "_blank")}
              >
                Thêm LeeVy Bot Ngay
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-full transition-all duration-300 text-sm sm:text-base"
                onClick={() => window.open(discordInviteLink, "_blank")}
              >
                Tham gia Cộng đồng
                <Users className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 bg-slate-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Cpu className="w-8 h-8 text-cyan-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                  LeeVy Bot RP
                </span>
              </div>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Bot Discord roleplay farm hàng đầu Việt Nam. Tạo nên thế giới ảo của riêng bạn với hệ thống farm,
                roleplay và kinh tế phong phú.
              </p>
              <p className="text-slate-400 text-sm">
                Create by <span className="text-cyan-400 font-semibold">Shark Vũ</span>
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Tính năng</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setShowCommandModal(true)}
                    className="text-slate-300 hover:text-cyan-400 transition-colors text-left"
                  >
                    Lệnh Command
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowGameplayModal(true)}
                    className="text-slate-300 hover:text-cyan-400 transition-colors text-left"
                  >
                    Mô phỏng
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowCodeModal(true)}
                    className="text-slate-300 hover:text-cyan-400 transition-colors text-left"
                  >
                    Demo Code
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowIntroModal(true)}
                    className="text-slate-300 hover:text-cyan-400 transition-colors text-left"
                  >
                    Giới Thiệu
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Liên hệ</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.facebook.com/vu.trung.kien.969909"
                    target="_blank"
                    className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center space-x-2"
                    rel="noreferrer"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Hỗ Trợ Kỹ Thuật</span>
                  </a>
                </li>
                <li>
                  <a
                    href={discordInviteLink}
                    target="_blank"
                    className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center space-x-2"
                    rel="noreferrer"
                  >
                    <Network className="w-4 h-4" />
                    <span>Discord Server</span>
                  </a>
                </li>
                <li>
                  <a
                    href={botInviteLink}
                    target="_blank"
                    className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center space-x-2"
                    rel="noreferrer"
                  >
                    <Cpu className="w-4 h-4" />
                    <span>Thêm Bot</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/50 mt-8 pt-8 text-center">
            <p className="text-slate-400">© 2024 LeeVy Bot RP. Tất cả quyền được bảo lưu. Phát triển bởi Shark Vũ.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

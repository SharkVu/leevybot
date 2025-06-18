"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Code, Play, Pause } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface CodeSimulationModalProps {
  isOpen: boolean
  onClose: () => void
}

const fullCode = `const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');  // Thêm thư viện chalk

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
    ]
});

////// điều chỉnh thời gian ở đây người đẹp 
const timeout = 900; // giây
let remainingTime = timeout;
const idGroup = '***************************';

const countdownInterval = setInterval(async () => {
    const channel = await bot.channels.fetch(idGroup);
    remainingTime -= 1;
    try {

        if (remainingTime == 10) {
            await channel.send(\`Còn 10 giây nữa, BOT sẽ khởi động lại và thay giá sản phẩm trong shop\`);
        } else if (remainingTime == 5) {
            await channel.send(\`Còn 5 giây nữa, BOT sẽ khởi động lại và thay giá sản phẩm trong shop\`);
        }
    } catch (error) {
        throw Error(error);
    }

}, 1000);

const config = require('./config.json');
bot.commands = new Collection();

// Load commands từ thư mục commands/
const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(__dirname, \`commands/\${folder}\`)).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(\`./commands/\${folder}/\${file}\`);
        bot.commands.set(command.name, command);
    }
}

// Đường dẫn file dữ liệu
const dataFile = path.join(__dirname, 'data/users.json');
let userData = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : {};

// Danh sách quê quán
const locations = [
    "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh",
    "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau",
    "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai",
    "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương",
    "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang",
    "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định",
    "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình",
    "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La",
    "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang",
    "TP. Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

// Hàm ghi log
const logCommandUsage = (user, channel, commandName, response) => {
    const timestamp = new Date().toISOString();
    const logMessage = \`[\${timestamp}] \${chalk.green('Người dùng:')} \${chalk.cyan(user.tag)} (ID: \${chalk.yellow(user.id)}) đã sử dụng lệnh: !\${chalk.magenta(commandName)} tại kênh: \${chalk.blue(channel.name || channel.id)}.\\nCâu trả lời của bot: \${chalk.green(response || 'Không có câu trả lời')}\\n\\n\`;

    fs.appendFileSync('logs.txt', logMessage, 'utf8');

    console.log(chalk.yellow(\`[\${timestamp}]\`), chalk.green('Người dùng:'), chalk.cyan(user.tag), \`(ID: \${chalk.yellow(user.id)})\`, \`đã sử dụng lệnh: !\${chalk.magenta(commandName)}\`, \`tại kênh: \${chalk.blue(channel.name || channel.id)}.\`);
    console.log(chalk.green(\`Câu trả lời của bot: \${response || 'Không có câu trả lời'}\\n\`));
};

// Hàm ghi log cho các hành động cộng trừ tiền
const logMoneyChange = (user, amount, action) => {
    const timestamp = new Date().toISOString();
    const actionDescription = action === 'add' ? chalk.green('Cộng') : chalk.red('Trừ');
    const logMessage = \`[\${timestamp}] \${chalk.green('Người dùng:')} \${chalk.cyan(user.tag)} (ID: \${chalk.yellow(user.id)}) đã \${actionDescription} \${chalk.yellow(amount)} tiền. Số dư hiện tại: \${chalk.yellow(userData[user.id].nganluong)}.\\n\\n\`;

    fs.appendFileSync('logs.txt', logMessage, 'utf8');

    console.log(chalk.yellow(\`[\${timestamp}]\`), chalk.green('Người dùng:'), chalk.cyan(user.tag), \`(ID: \${chalk.yellow(user.id)})\`, \`đã \${actionDescription} \${chalk.yellow(amount)} tiền. Số dư hiện tại: \${chalk.yellow(userData[user.id].nganluong)}.\`);
};

// Hàm ghi dữ liệu vào tệp không đồng bộ
const saveData = async () => {
    try {
        await fs.promises.writeFile(dataFile, JSON.stringify(userData, null, 2));
        console.log(chalk.green('✅ Dữ liệu đã được ghi thành công!'));
    } catch (error) {
        console.error(chalk.red('❌ Lỗi ghi dữ liệu:', error));
    }
};

// Cài đặt delay ghi dữ liệu (20 giây)
let saveDataTimeout = null;
const scheduleSaveData = () => {
    if (saveDataTimeout) clearTimeout(saveDataTimeout);
    saveDataTimeout = setTimeout(saveData, 20000);
};

// Khi bot đã sẵn sàng
bot.once('ready', async () => {
    try {
        console.log(chalk.green(\`✅ Bot đã khởi động: \${bot.user.tag}\`));
        const channel = await bot.channels.fetch('*********************');
        if (channel) {
            await channel.send('🎉 Bot vừa được khởi động lại thành công!');
        }

        await bot.user.setPresence({
            activities: [
                {
                    name: 'Chờ lệnh từ người dùng...',
                    type: 'WATCHING',
                },
            ],
            status: 'online',
        });

        console.log(chalk.blue('Trạng thái bot đã được cập nhật.'));
    } catch (err) {
        console.error(chalk.red('Lỗi', err));
    }
});

bot.login(config.token);`

// Syntax highlighting function
const highlightSyntax = (code: string) => {
  return code
    .replace(
      /(const|let|var|async|await|function|if|else|for|while|try|catch|throw|return)/g,
      '$1</span>',
    )
    .replace(/(require|module\.exports|console\.log|console\.error)/g, '$1</span>')
    .replace(/('.*?'|".*?")/g, '$1</span>')
    .replace(/(`.*?`)/g, '$1</span>')
    .replace(/(\/\/.*$)/gm, '$1</span>')
    .replace(/(\d+)/g, '$1</span>')
    .replace(/(true|false|null|undefined)/g, '$1</span>')
    .replace(/(bot|channel|userData|locations|config)/g, '$1</span>')
    .replace(
      /(chalk\.green|chalk\.red|chalk\.blue|chalk\.yellow|chalk\.cyan|chalk\.magenta)/g,
      '<span class="text-pink-400">$1</span>',
    )
}

export function CodeSimulationModal({ isOpen, onClose }: CodeSimulationModalProps) {
  const [currentChar, setCurrentChar] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [displayedCode, setDisplayedCode] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    // Auto start when modal opens
    setIsTyping(true)
    setCurrentChar(0)
    setDisplayedCode("")
  }, [isOpen])

  useEffect(() => {
    if (!isTyping || !isOpen) return

    const interval = setInterval(() => {
      if (currentChar < fullCode.length) {
        setDisplayedCode(fullCode.slice(0, currentChar + 1))
        setCurrentChar((prev) => prev + 1)

        // Auto scroll to bottom
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
      } else {
        setIsTyping(false)
        // Reset after completion
        setTimeout(() => {
          setCurrentChar(0)
          setDisplayedCode("")
          setIsTyping(true)
        }, 8000)
      }
    }, 10) // 5 minutes for full code (300000ms / 600 chars ≈ 500ms per char)

    return () => clearInterval(interval)
  }, [isTyping, currentChar, isOpen])

  const stopSimulation = () => {
    setIsTyping(false)
  }

  const startSimulation = () => {
    setIsTyping(true)
    setCurrentChar(0)
    setDisplayedCode("")
  }

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
            className="w-full max-w-6xl max-h-[80vh] overflow-hidden"
          >
            <Card className="bg-slate-900 border-slate-700 h-full">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-700">
                <CardTitle className="text-white flex items-center space-x-2">
                  <Code className="w-6 h-6 text-cyan-400" />
                  <span>Live Demo Code - index.js</span>
                  <span className="text-sm text-slate-400">(PUBLIC)</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {!isTyping ? (
                    <Button
                      onClick={startSimulation}
                      className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Bắt đầu
                    </Button>
                  ) : (
                    <Button
                      onClick={stopSimulation}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Dừng
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-slate-400 hover:text-white rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-slate-950 h-[60vh] overflow-y-auto" ref={scrollRef}>
                  {/* VS Code-like header */}
                  <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 text-center">
                    <p className="text-slate-300 text-sm">
                      🎭 <span className="text-cyan-400">Live Demo</span> - Viết Mô Phỏng Code index
                    </p>
                  </div>
                  <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center space-x-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-slate-300 text-sm ml-4">index.js</span>
                  </div>

                  {/* Code area */}
                  <div className="p-4 font-mono text-sm pointer-events-none">
                    <div className="flex">
                      {/* Line numbers */}
                      <div className="text-slate-500 pr-4 select-none">
                        {displayedCode.split("\n").map((_, index) => (
                          <div key={index} className="leading-6">
                            {index + 1}
                          </div>
                        ))}
                      </div>

                      {/* Code content with syntax highlighting */}
                      <div className="flex-1">
                        <div
                          className="text-slate-300 leading-6 whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: highlightSyntax(displayedCode) }}
                        />
                        {isTyping && (
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                            className="inline-block w-2 h-6 bg-cyan-400 ml-1"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800 px-4 py-2 border-t border-slate-700 text-center">
                  <p className="text-slate-400 text-xs">⚠️ Đây chỉ là mô phỏng</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

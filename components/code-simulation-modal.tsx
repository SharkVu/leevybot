"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Code, Play, Pause } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeSimulationModalProps {
  isOpen: boolean
  onClose: () => void
}

const fullCode = `const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
    ]
});

const timeout = 900;
let remainingTime = timeout;
const idGroup = '************';

const countdownInterval = setInterval(async () => {
    const channel = await bot.channels.fetch(idGroup);
    remainingTime -= 1;
    try {
        if (remainingTime == 10) {
            await channel.send(\`Còn 10 giây nữa, BOT sẽ khởi động lại\`);
        } else if (remainingTime == 5) {
            await channel.send(\`Còn 5 giây nữa, BOT sẽ khởi động lại\`);
        }
    } catch (error) {
        throw Error(error);
    }
}, 1000);

const config = require('./config.json');
bot.commands = new Collection();

const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(__dirname, \`commands/\${folder}\`)).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(\`./commands/\${folder}/\${file}\`);
        bot.commands.set(command.name, command);
    }
}

const dataFile = path.join(__dirname, 'data/users.json');
let userData = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : {};

const locations = [
    "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh",
    "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau",
    "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai"
];

const logCommandUsage = (user, channel, commandName, response) => {
    const timestamp = new Date().toISOString();
    const logMessage = \`[\${timestamp}] Người dùng: \${user.tag} đã sử dụng lệnh: !\${commandName}\`;
    fs.appendFileSync('logs.txt', logMessage, 'utf8');
    console.log(logMessage);
};

const saveData = async () => {
    try {
        await fs.promises.writeFile(dataFile, JSON.stringify(userData, null, 2));
        console.log('✅ Dữ liệu đã được ghi thành công!');
    } catch (error) {
        console.error('❌ Lỗi ghi dữ liệu:', error);
    }
};

bot.once('ready', async () => {
    try {
        console.log(\`✅ Bot đã khởi động: \${bot.user.tag}\`);
        const channel = await bot.channels.fetch('************');
        if (channel) {
            await channel.send('🎉 Bot vừa được khởi động lại thành công!');
        }
        await bot.user.setPresence({
            activities: [{
                name: 'Chờ lệnh từ người dùng...',
                type: 'WATCHING',
            }],
            status: 'online',
        });
        console.log('Trạng thái bot đã được cập nhật.');
    } catch (err) {
        console.error('Lỗi', err);
    }
});

bot.login(config.token);`

export function CodeSimulationModal({ isOpen, onClose }: CodeSimulationModalProps) {
  const [currentChar, setCurrentChar] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [displayedCode, setDisplayedCode] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

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

        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
      } else {
        setIsTyping(false)
        setTimeout(() => {
          setCurrentChar(0)
          setDisplayedCode("")
          setIsTyping(true)
        }, 8000)
      }
    }, 50)

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
                  <span className="text-sm text-slate-400">(Auto Loop)</span>
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
                <div
                  className="bg-slate-950 h-[60vh] overflow-y-auto select-none"
                  ref={scrollRef}
                  style={{ userSelect: "none", WebkitUserSelect: "none", MozUserSelect: "none", msUserSelect: "none" }}
                >
                  <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 text-center">
                    <p className="text-slate-300 text-sm">
                      🎭 <span className="text-cyan-400">Live Demo</span> - Code tự động viết
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
                  <div className="p-4 font-mono text-sm" style={{ userSelect: "none", WebkitUserSelect: "none" }}>
                    <div className="flex">
                      <div className="text-slate-500 pr-4 select-none">
                        {displayedCode.split("\n").map((_, index) => (
                          <div key={index} className="leading-6">
                            {index + 1}
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 relative" style={{ userSelect: "none", WebkitUserSelect: "none" }}>
                        <SyntaxHighlighter
                          language="javascript"
                          style={vscDarkPlus}
                          customStyle={{
                            background: 'transparent',
                            padding: 0,
                            margin: 0,
                            fontSize: '0.875rem',
                            lineHeight: '1.5rem',
                          }}
                          codeTagProps={{
                            style: { userSelect: "none", WebkitUserSelect: "none" }
                          }}
                          showLineNumbers={false}
                        >
                          {displayedCode}
                        </SyntaxHighlighter>
                        {isTyping && (
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                            className="absolute inline-block w-2 h-6 bg-cyan-400 -ml-1 mt-1"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800 px-4 py-2 border-t border-slate-700 text-center">
                  <p className="text-slate-400 text-xs">⚠️ Live Demo - Code được viết tự động</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
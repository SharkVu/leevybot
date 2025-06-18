"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Copy, Terminal } from "lucide-react"
import { useState } from "react"

interface Command {
  cmd: string
  desc: string
}

interface CommandModalProps {
  isOpen: boolean
  onClose: () => void
  commands: Command[]
}

export function CommandModal({ isOpen, onClose, commands }: CommandModalProps) {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(`*${cmd}`)
    setCopiedCommand(cmd)
    setTimeout(() => setCopiedCommand(null), 2000)
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
            className="w-full max-w-4xl max-h-[80vh] overflow-hidden"
          >
            <Card className="bg-slate-900 border-slate-700 h-full">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-6 h-6 text-cyan-400" />
                  <CardTitle className="text-white">Danh sách Lệnh Command</CardTitle>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[60vh] overflow-y-auto">
                  <div className="grid gap-2 p-4">
                    {commands.map((command, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-colors group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <code className="text-cyan-400 font-mono text-sm bg-slate-800 px-2 py-1 rounded-full">
                              *{command.cmd}
                            </code>
                            <span className="text-slate-300 text-sm">{command.desc}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyCommand(command.cmd)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white"
                        >
                          {copiedCommand === command.cmd ? (
                            <span className="text-green-400 text-xs">Đã sao chép!</span>
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </motion.div>
                    ))}
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

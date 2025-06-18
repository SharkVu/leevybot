import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LeeVy Bot RP - Cyber Farm & Roleplay Discord Bot",
  description:
    "Khám phá thế giới ảo tương lai nơi công nghệ cao kết hợp với nông nghiệp. Xây dựng trang trại cyber, phát triển nhân vật và tạo nên câu chuyện của riêng bạn.",
  keywords: "Discord bot, roleplay, farm, cyber, gaming, community",
  authors: [{ name: "LeeVy Bot RP Team" }],
  openGraph: {
    title: "LeeVy Bot RP - Cyber Farm & Roleplay",
    description: "Tham gia thế giới cyber farm và roleplay đầy thú vị",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2306b6d4'><path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/><rect x='6' y='6' width='12' height='12' rx='2' fill='%23ec4899' opacity='0.3'/><circle cx='12' cy='12' r='3' fill='%2306b6d4'/></svg>",
        type: "image/svg+xml",
      },
    ],
    shortcut:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2306b6d4'><path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/><rect x='6' y='6' width='12' height='12' rx='2' fill='%23ec4899' opacity='0.3'/><circle cx='12' cy='12' r='3' fill='%2306b6d4'/></svg>",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

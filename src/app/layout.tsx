import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import { CopilotKit } from "@copilotkit/react-core"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Web3 Security Multi-Agent System",
  description: "A comprehensive platform for web3 and blockchain security analysis",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <CopilotKit publicApiKey="<ck_pub_eaca0ccc629096a78ed93505fd0bb501>"> 
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        </CopilotKit>
      </body>
    </html>
  )
}



import './globals.css'
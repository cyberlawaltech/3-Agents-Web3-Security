import { ethers } from "ethers"
import { WEB3_CONFIG } from "../config/config"
import { logError } from "./logger"

// Create provider based on chain ID
export function getProvider(chainId: number) {
  // Default to Ethereum mainnet
  let providerUrl = WEB3_CONFIG.defaultProvider

  // Select provider based on chain ID
  switch (chainId) {
    case 1: // Ethereum Mainnet
      providerUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY || "your-api-key"}`
      break
    case 56: // Binance Smart Chain
      providerUrl = "https://bsc-dataseed.binance.org/"
      break
    case 137: // Polygon
      providerUrl = `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY || "your-api-key"}`
      break
    case 42161: // Arbitrum
      providerUrl = `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY || "your-api-key"}`
      break
    // Add more chains as needed
  }

  return new ethers.JsonRpcProvider(providerUrl)
}

// Fetch contract code from blockchain
export async function fetchContractCode(contractAddress: string, chainId: number): Promise<string | null> {
  try {
    const provider = getProvider(chainId)
    const code = await provider.getCode(contractAddress)

    // Check if contract exists
    if (code === "0x") {
      throw new Error("Contract not found or not deployed")
    }

    return code
  } catch (error) {
    logError(`Failed to fetch contract code for ${contractAddress} on chain ${chainId}`, error)

    // Try to fetch from block explorer API as fallback
    return fetchContractCodeFromExplorer(contractAddress, chainId)
  }
}

// Fetch contract code from block explorer API
async function fetchContractCodeFromExplorer(contractAddress: string, chainId: number): Promise<string | null> {
  try {
    let apiUrl: string
    let apiKey: string | undefined

    // Select explorer API based on chain ID
    switch (chainId) {
      case 1: // Ethereum Mainnet
        apiUrl = "https://api.etherscan.io/api"
        apiKey = WEB3_CONFIG.scanApiKeys.etherscan
        break
      case 56: // Binance Smart Chain
        apiUrl = "https://api.bscscan.com/api"
        apiKey = WEB3_CONFIG.scanApiKeys.bscscan
        break
      // Add more explorers as needed
      default:
        throw new Error(`No explorer API configured for chain ID ${chainId}`)
    }

    // Build API request URL
    const url = new URL(apiUrl)
    url.searchParams.append("module", "contract")
    url.searchParams.append("action", "getsourcecode")
    url.searchParams.append("address", contractAddress)
    if (apiKey) {
      url.searchParams.append("apikey", apiKey)
    }

    // Fetch source code
    const response = await fetch(url.toString())
    const data = await response.json()

    if (data.status === "1" && data.result && data.result[0]) {
      return data.result[0].SourceCode
    }

    return null
  } catch (error) {
    logError(`Failed to fetch contract code from explorer for ${contractAddress} on chain ${chainId}`, error)
    return null
  }
}

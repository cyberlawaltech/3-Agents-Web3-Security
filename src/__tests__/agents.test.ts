import { AgentSystem } from "../agents/system"
import pool from "../db"

// Mock database queries
jest.mock("../db", () => ({
  query: jest.fn(),
  default: {
    query: jest.fn(),
  },
}))

// Mock agent implementations
jest.mock("../agents/vulnerabilityScanner", () => ({
  VulnerabilityScanner: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue([{ type: "reentrancy", severity: "high", description: "Test vulnerability" }]),
  })),
}))

jest.mock("../agents/codeAnalyzer", () => ({
  CodeAnalyzer: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue({
      issues: [{ type: "code_smell", severity: "medium", description: "Test code issue" }],
      metrics: { complexity: 5, lines: 100 },
    }),
  })),
}))

jest.mock("../agents/reportGenerator", () => ({
  ReportGenerator: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue({
      summary: "Test report summary",
      findings: [{ type: "reentrancy", severity: "high", description: "Test vulnerability" }],
      recommendations: ["Fix reentrancy issue"],
    }),
  })),
}))

describe("Agent System", () => {
  let agentSystem: AgentSystem

  beforeEach(() => {
    jest.clearAllMocks()
    agentSystem = new AgentSystem()

    // Mock database responses
    ;(pool.query as jest.Mock).mockResolvedValue({
      rows: [{ id: 1 }],
    })
  })

  describe("startScan", () => {
    it("should create a scan record and return scan ID", async () => {
      const userId = 1
      const contractAddress = "0x1234567890123456789012345678901234567890"
      const chainId = 1
      const config = { depth: "full" }

      const scanId = await agentSystem.startScan(userId, contractAddress, chainId, config)

      expect(scanId).toBe(1)
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO security_scans"),
        expect.arrayContaining([userId, contractAddress, chainId, "pending", expect.any(String)]),
      )
    })

    it("should handle errors during scan initialization", async () => {
      // Mock database error
      ;(pool.query as jest.Mock).mockRejectedValueOnce(new Error("Database error"))

      const userId = 1
      const contractAddress = "0x1234567890123456789012345678901234567890"
      const chainId = 1
      const config = { depth: "full" }

      await expect(agentSystem.startScan(userId, contractAddress, chainId, config)).rejects.toThrow("Database error")
    })
  })
})

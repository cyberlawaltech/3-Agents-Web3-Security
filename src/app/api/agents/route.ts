import { NextResponse } from "next/server"
import { getAllAgents, getAgent, runAgent } from "@/lib/agents"
import type { AgentTask, AgentType } from "@/lib/agents"

export async function GET() {
  try {
    const agents = getAllAgents()
    return NextResponse.json({ agents })
  } catch (error) {
    console.error("Error fetching agents:", error)
    return NextResponse.json(
      { error: "Failed to fetch agents", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { agentType, task } = body

    // Validate required fields
    if (!agentType || !task) {
      return NextResponse.json(
        { error: "Missing required fields: agentType and task" },
        { status: 400 }
      )
    }

    // Validate agent type
    try {
      getAgent(agentType as AgentType)
    } catch (error) {
      console.error(`Invalid agent type: ${agentType}`, error)
      return NextResponse.json(
        { error: `Invalid agent type: ${agentType}` },
        { status: 400 }
      )
    }

    // Validate task structure
    if (!task.title || typeof task.title !== "string") {
      return NextResponse.json(
        { error: "Task must have a valid 'title' of type string" },
        { status: 400 }
      )
    }

    // Create a new task
    const newTask: AgentTask = {
      id: crypto.randomUUID(),
      agentId: agentType,
      title: task.title,
      description: task.description || "",
      status: "pending",
      createdAt: new Date(),
    }

    // Run the agent with the task
    const result = await runAgent(agentType as AgentType, newTask)

    return NextResponse.json({ task: result })
  } catch (error) {
    console.error("Error running agent:", error)
    return NextResponse.json(
      { error: "Failed to run agent", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}


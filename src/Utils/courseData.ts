// courseData.ts  
export const courseData = {
  title: "Agentic AI Foundations Certification (6 Weeks)",
  description:
    "A hands-on 6-week applied certification that transforms beginners into production-ready Agentic AI developers. Learn LLM fundamentals, multi-tool agents, RAG systems, safety, deployment, and build a fully functional agent as your capstone project.",

  // ============================================================
  // WHAT YOU WILL LEARN — FOUNDATIONS ONLY
  // ============================================================
 whatYouWillLearn: [
  "Understand how LLMs work (tokens, embeddings, transformers)",
  "Master prompt engineering and structured prompting",
  "Build real LLM-powered applications using OpenAI/Anthropic APIs",
  "Use LangChain to build agents with tool calling",
  "Design multi-tool and reasoning-based agents using ReAct",
  "Build memory systems — buffer, summary, entity memory",
  "Create RAG pipelines using vector databases",
  "Implement agent evaluation, safety, and guardrails",
  "Deploy agent systems using FastAPI + async architecture",
  "Monitor agents using tracing, logging, and observability tools",
  "Optimize agent performance for cost, latency, and scalability",
  "Build and deploy a full Agentic AI application as a capstone"
],


  // ============================================================
  // COURSE INCLUDES
  // ============================================================
  courseIncludes: [
    "Hands-on daily exercises",
    "Weekly real-world projects",
    "Full Capstone Project",
    "Access to code templates & datasets",
    "API integration training",
    "Lifetime course access",
    "Certification upon completion",
    "Industry-ready portfolio development",
    "Community support & doubt clearing"
  ],

  // ============================================================
  // WEEKLY CURRICULUM — FOUNDATIONS (6 WEEKS)
  // ============================================================
  weeklyCurriculum: [
    {
      week: "Week 1 — LLM Fundamentals & Prompt Engineering",
      description:
        "Master how LLMs work internally and build your first production-level prompts and LLM applications.",
      days: [
        "Day 1: Introduction to LLMs — tokens, embeddings, how LLMs process text",
        "Day 2: Transformer architecture basics — attention, positional encoding",
        "Day 3: Prompt Engineering Essentials — zero-shot, few-shot, structured prompts (Exercise: Email classifier)",
        "Day 4: JSON output formatting, chain-of-thought prompting (Exercise: Recipe extractor JSON agent)",
        "Day 5: API fundamentals — OpenAI/Anthropic usage, cost tracking, fallback design (Exercise: Multi-provider LLM wrapper)",
        "Weekend Project: SEO blog generator app using structured prompting (title, metadata, 500+ word article)"
      ]
    },

    {
      week: "Week 2 — Agents, LangChain & Function Calling",
      description:
        "Build reasoning-driven agents with tools, workflows, and dynamic decision-making.",
      days: [
        "Day 1: LangChain basics — tools, chains, agents",
        "Day 2: Agent execution flows — reasoning loops (Exercise: Research assistant agent)",
        "Day 3: Function calling — schema design, validation strategies",
        "Day 4: Multi-tool agents — routing logic (Exercise: Hiking recommendation agent)",
        "Day 5: ReAct Framework — thought → action → observation (Exercise: Movie recommendation agent)",
        "Weekend Project: Personal finance agent using calculator + budget tools"
      ]
    },

    {
      week: "Week 3 — Memory Systems & Retrieval-Augmented Generation (RAG)",
      description:
        "Implement short-term and long-term memory systems, and build full RAG pipelines.",
      days: [
        "Day 1: Buffer & summary memory",
        "Day 2: Entity memory (Exercise: CRM assistant that remembers contacts)",
        "Day 3: Vector databases — embeddings, indexing, similarity search",
        "Day 4: RAG pipeline — ingestion, chunking, embeddings, retrieval (Exercise: Legal contract RAG)",
        "Day 5: Advanced hierarchical memory inspired by MemGPT",
        "Weekend Project: Research-paper RAG engine with re-ranking & multi-doc analysis"
      ]
    },

    {
      week: "Week 4 — Evaluation, Safety & Guardrails",
      description:
        "Learn to make agents safe, trustworthy, and robust with modern evaluation frameworks.",
      days: [
        "Day 1: Agent evaluation metrics, AgentBench concepts",
        "Day 2: Testing frameworks (Exercise: JSON validation test harness)",
        "Day 3: Safety fundamentals — jailbreak detection, injection protection",
        "Day 4: Guardrails — toxicity filters, moderation layers",
        "Day 5: Error recovery — retries, fallbacks, alternate pathways",
        "Weekend Project: Complete safety layer for a code generation agent"
      ]
    },

    {
      week: "Week 5 — FastAPI Deployment & Monitoring",
      description:
        "Deploy agents as scalable APIs with observability, monitoring, and async performance.",
      days: [
        "Day 1: Async programming for agent speed — asyncio",
        "Day 2: Performance optimization — caching, streaming responses",
        "Day 3: FastAPI backend — routes, auth, validation (Exercise: Summarizer API)",
        "Day 4: Serving agents — WebSockets, streaming outputs",
        "Day 5: Monitoring — LangSmith tracing, logging, custom metrics",
        "Weekend Project: Deploy a Q&A agent API with rate limits & production logging"
      ]
    },

    {
      week: "Week 6 — Capstone Project (Foundations Level)",
      description:
        "Plan, develop, deploy, and present a full Agentic AI application.",
      days: [
        "Day 1: Project selection & planning (Knowledge assistant, Job application agent, Code review agent)",
        "Day 2: Architecture design — tools, memory, RAG, workflows",
        "Day 3: Core agent development",
        "Day 4: API & UI integration + deployment",
        "Day 5: Testing, documentation & final presentation",
        "Weekend Submission: GitHub repo, live demo URL, documentation, evaluation report"
      ]
    }
  ]
};

# 🚀 SignalOS

**Control plane for agentic workflows with approvals, tracking, and real-world actions**

SignalOS lets you build production-style AI workflows that don’t just generate text — they **take actions with guardrails**.

---

## ⚡ What it does

```
Request → Spec → Approval → GitHub PR
```

Run this:

```
npm run dev -- "Build login API"
```

And it will:

- 🧠 Generate a spec
- ⏳ Ask for approval (HITL)
- 👨‍💻 Generate code
- 🔀 Create a real GitHub PR

---

## 🎥 Demo

https://github.com/user-attachments/assets/60e083d3-78aa-4238-a056-825b8c6ba03d

---

## 🛠️ Setup

### 1. Clone

```
git clone https://github.com/pranjalvatsa/signalos
cd signalos
npm install
```

### 2. Setup environment

```
cp .env.example .env
```

Fill values:

```
GITHUB_TOKEN=your_token
GITHUB_OWNER=your_username
GITHUB_REPO=your_repo
```

### 3. Run

```
npm run dev -- "Build login API"
```

---

## 🔐 GitHub Token

Create a **classic token** with:

- repo permission

https://github.com/settings/tokens

---

## 🧠 Why SignalOS?

Most AI agent frameworks:

- ❌ don’t track execution
- ❌ don’t support approvals
- ❌ can’t take real actions

SignalOS adds:

- ✅ execution tracking
- ✅ human-in-the-loop approvals
- ✅ workflow orchestration
- ✅ real integrations (GitHub)

---

## 🧱 Core Concepts

- Signals → trigger workflows  
- Executions → track state + logs  
- Agents → perform actions  
- Approvals → add safety  

---

## 🚀 Roadmap

- Better execution logs UI
- Multi-file code generation
- GitHub diff preview
- Jira integration
- Hosted control plane

---

## ⭐️ If you like this

Star the repo — helps a lot 🙌

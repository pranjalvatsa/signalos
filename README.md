# 🚀 SignalOS

**Turn a product request into a real GitHub PR using AI + human approval**

Give SignalOS a request like:

`Build login API`

It will:
→ generate a spec  
→ ask for approval  
→ write code  
→ create a real GitHub PR  

---

## 🎥 Demo

![SignalOS Demo](./demo.gif)

### What you're seeing

- AI generates a product spec  
- waits for human approval  
- writes code  
- pushes to GitHub  
- opens a real PR  

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

## ⚡ Try it in 30 seconds

```
git clone https://github.com/pranjalvatsa/signalos
cd signalos
npm install
cp .env.example .env
npm run dev -- "Build login API"
```

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

---

## 🔐 GitHub Token

Create a **classic token** with:

- repo permission

https://github.com/settings/tokens

---

## 🧠 Why SignalOS?

Most AI tools stop at generating text.

But real systems need to:
- track execution
- handle approvals
- take real actions (like creating PRs)

SignalOS is built for that.

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

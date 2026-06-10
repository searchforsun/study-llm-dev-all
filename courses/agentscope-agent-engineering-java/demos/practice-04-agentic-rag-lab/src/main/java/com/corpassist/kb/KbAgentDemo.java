package com.corpassist.kb;

/** Agentic RAG dry-run：mock 检索 + 引用/拒答演示。 */
public final class KbAgentDemo {

    public static void main(String[] args) {
        String query = args.length > 0 ? String.join(" ", args) : "年假最多几天";
        System.out.println("[User] " + query);
        if (!MockVectorStore.search(query).startsWith("[SKIP]")) {
            System.out.println("[ToolCall] search_knowledge_base(query=\"" + query + "\")");
            System.out.println("[ToolResult]\n" + MockVectorStore.search(query));
        }
        System.out.println("[Agent] " + MockVectorStore.answer(query));
    }
}

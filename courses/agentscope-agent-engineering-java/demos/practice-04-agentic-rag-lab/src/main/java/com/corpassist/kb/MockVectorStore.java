package com.corpassist.kb;

import java.util.List;
import java.util.Map;

/** 内置 mock 文档，模拟 rag-system-java VectorStore 检索结果。 */
public final class MockVectorStore {
    private static final double MIN_SCORE = 0.65;

    private static final List<Map<String, Object>> DOCS = List.of(
        Map.of("source", "员工手册.pdf", "page", "12", "score", 0.88,
            "text", "年假：正式员工每年最多15天，需提前5个工作日申请。"),
        Map.of("source", "考勤制度.pdf", "page", "3", "score", 0.72,
            "text", "请假须通过 OA 提交，HR 审批后生效。")
    );

    public static String search(String query) {
        if (query == null || query.isBlank()) return "空查询";
        if (isGreeting(query)) {
            return "[SKIP] 问候语，无需检索";
        }
        if (query.contains("火星") || query.contains("移民")) {
            return "检索置信度均低于 " + MIN_SCORE + "，无法可靠回答。请转人工或细化问题。";
        }
        StringBuilder sb = new StringBuilder();
        int i = 1;
        for (Map<String, Object> d : DOCS) {
            double score = (Double) d.get("score");
            if (score < MIN_SCORE) continue;
            sb.append(String.format("[%d] source=%s page=%s score=%s%n%s%n---%n",
                i++, d.get("source"), d.get("page"), d.get("score"), d.get("text")));
        }
        return sb.isEmpty() ? "未找到相关文档" : sb.toString();
    }

    public static String answer(String query) {
        if (isGreeting(query)) {
            return "你好！我是 CorpAssist 知识库助手，可解答公司制度与流程问题。";
        }
        String chunks = search(query);
        if (chunks.startsWith("检索") || chunks.startsWith("未找到")) {
            return chunks;
        }
        return "根据知识库：正式员工年假最多15天，需提前5个工作日申请。[1]\n\n### 参考文献\n[1] 员工手册.pdf p.12";
    }

    private static boolean isGreeting(String q) {
        String s = q.trim();
        return s.equals("你好") || s.equalsIgnoreCase("hello") || s.startsWith("你好");
    }
}

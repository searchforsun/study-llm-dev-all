package com.corpassist.lab.rag;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

/**
 * CorpAssist S1：Spring AI RAG 组装示意。
 * 生产环境用 QuestionAnswerAdvisor + VectorStore；本 lab 用 Mock 保持与 Python chain_stub 同形 DTO。
 */
public final class SpringRagDemo {

    private SpringRagDemo() {}

    public record SourceRef(@JsonProperty("doc_id") String docId, String snippet) {}

    public record AskRequest(String question, String tenantId) {}

    public record AskResponse(String answer, List<SourceRef> sources) {}

    public static List<SourceRef> mapSources(List<String> docIds) {
        return docIds.stream()
            .map(id -> new SourceRef(id, "[demo snippet]"))
            .toList();
    }

    public static AskResponse ask(AskRequest req) {
        List<SourceRef> sources = mapSources(List.of("hr-policy-2024"));
        return new AskResponse("[demo answer for: " + req.question() + "]", sources);
    }
}

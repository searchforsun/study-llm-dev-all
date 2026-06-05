package com.corpassist.lab;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

/** Java 栈读取 Python 写入的 corpassist-session-v1 JSON（示意，非完整 Spring ChatMemory）。 */
public final class SessionMessages {

    public static final String SCHEMA = "corpassist-session-v1";

    private SessionMessages() {}

    public static String sessionKey(String tenant, String userId) {
        return "corpassist:session:" + tenant + ":" + userId;
    }

    public record Turn(String role, String content) {}

    public static List<Turn> parse(byte[] jsonBytes) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(jsonBytes);
        if (!SCHEMA.equals(root.path("schema").asText())) {
            throw new IllegalArgumentException("unsupported schema: " + root.path("schema").asText());
        }
        List<Turn> turns = new ArrayList<>();
        for (JsonNode node : root.path("turns")) {
            turns.add(new Turn(node.path("role").asText(), node.path("content").asText()));
        }
        return turns;
    }
}

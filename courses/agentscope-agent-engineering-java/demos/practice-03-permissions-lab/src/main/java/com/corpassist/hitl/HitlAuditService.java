package com.corpassist.hitl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.Instant;
import java.util.Map;

/** HITL 审计 append-only 落盘。 */
public final class HitlAuditService {
    private final Path auditFile;

    public HitlAuditService(Path auditFile) {
        this.auditFile = auditFile;
    }

    public void record(String sessionId, String tool, Map<String, Object> originalArgs,
                       Map<String, Object> modifiedArgs, String decision, String operator) throws IOException {
        String line = String.format(
            "{\"ts\":\"%s\",\"session_id\":\"%s\",\"tool\":\"%s\",\"original_args\":%s,"
                + "\"modified_args\":%s,\"decision\":\"%s\",\"operator\":\"%s\"}%n",
            Instant.now(), sessionId, tool, mapJson(originalArgs),
            modifiedArgs == null ? "null" : mapJson(modifiedArgs), decision, operator);
        Files.writeString(auditFile, line, StandardOpenOption.CREATE, StandardOpenOption.APPEND);
    }

    private static String mapJson(Map<String, Object> m) {
        return m.toString().replace('=', ':');
    }
}

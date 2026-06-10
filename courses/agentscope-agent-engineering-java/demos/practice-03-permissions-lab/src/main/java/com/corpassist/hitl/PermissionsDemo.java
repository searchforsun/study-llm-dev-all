package com.corpassist.hitl;

import java.nio.file.Path;
import java.util.Map;

/** Permission approve + CLI 审批 dry-run 演示。 */
public final class PermissionsDemo {

    public static void main(String[] args) throws Exception {
        boolean modify = hasFlag(args, "--modify");
        Path auditPath = Path.of("audit.jsonl");
        HitlAuditService audit = new HitlAuditService(auditPath);

        System.out.println("[ReActAgent] 推理 → tool_call send_email(to=partner@external.com)");
        System.out.println("[PermissionApproveEvent] tool=send_email 待审批");

        Map<String, Object> original = Map.of("to", "partner@external.com", "subject", "会议纪要");
        if (modify) {
            Map<String, Object> modified = Map.of("to", "partner@approved-domain.com", "subject", "会议纪要");
            audit.record("sess-001", "send_email", original, modified, "MODIFY", "user-zhang");
            System.out.println("[决裁] MODIFY → 执行 send_email(modified)");
        } else {
            audit.record("sess-001", "send_email", original, null, "ALLOW", "user-zhang");
            System.out.println("[决裁] ALLOW → 执行 send_email(original)");
        }
        System.out.println("[audit] 已写入 " + auditPath.toAbsolutePath());
    }

    private static boolean hasFlag(String[] args, String flag) {
        for (String a : args) {
            if (flag.equals(a)) return true;
        }
        return false;
    }
}

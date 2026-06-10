package com.corpassist.subagent;

/** CorpAssist Sub-agent spawn 演示（dry-run 模式，无需 API Key）。 */
public final class SubAgentDemo {

    public static void main(String[] args) {
        boolean dryRun = hasFlag(args, "--dry-run");
        boolean background = hasFlag(args, "--background");
        if (!dryRun) {
            System.err.println("提示：未传 --dry-run，本 lab 默认使用 mock 模式。请加 --dry-run");
        }
        System.out.println("[Supervisor] 用户请求：订明天10点A301，发邮件通知项目组");
        System.out.println("[agent_spawn] agent_id=calendar-worker task=\"订明天10点A301\" timeout_seconds=30");
        System.out.println("[agent_spawn] → agent_key=agent:calendar-worker:abc-123");
        System.out.println("[ToolResult] 日历已创建：A301 @ 明天10:00");
        if (background) {
            System.out.println("[agent_spawn] agent_id=mail-worker task=\"发项目启动通知\" timeout_seconds=0");
            System.out.println("[agent_spawn] → task_id=task-7f3a status=running (后台)");
            System.out.println("[system-reminder] Background task task-7f3a completed: 邮件草稿已生成");
        } else {
            System.out.println("[agent_spawn] agent_id=mail-worker task=\"发项目启动通知\" timeout_seconds=30");
            System.out.println("[ToolResult] 邮件已发至 team@corp.com");
        }
        System.out.println("[Supervisor] 汇总：会议室已订，邮件已通知。");
    }

    private static boolean hasFlag(String[] args, String flag) {
        for (String a : args) {
            if (flag.equals(a)) return true;
        }
        return false;
    }
}

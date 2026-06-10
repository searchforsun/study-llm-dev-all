package com.corpassist.demo;

import io.agentscope.core.ReActAgent;
import io.agentscope.core.event.AgentEventType;
import io.agentscope.core.event.ToolCallStartEvent;
import io.agentscope.core.message.UserMessage;
import io.agentscope.core.tool.Tool;
import io.agentscope.core.tool.ToolParam;
import io.agentscope.core.tool.Toolkit;
import java.util.List;

/** CorpAssist 办公助手 — 日历/邮件/工单/转人工 四类工具。 */
public class OfficeAssistantLab {

    public static class OfficeTools {
        @Tool(name = "create_calendar_event", description = "创建日历事件。title 标题，startTime ISO8601，attendees 逗号分隔邮箱。")
        public String createCalendarEvent(
                @ToolParam(name = "title") String title,
                @ToolParam(name = "startTime") String startTime,
                @ToolParam(name = "attendees", description = "可选") String attendees) {
            String id = String.format("EVT-%04d", Math.abs((title + startTime).hashCode()) % 10000);
            return "已创建日历 " + id + "：" + title + " @ " + startTime;
        }

        @Tool(name = "send_email", description = "发送邮件。to 收件人，subject 主题，body 正文。")
        public String sendEmail(
                @ToolParam(name = "to") String to,
                @ToolParam(name = "subject") String subject,
                @ToolParam(name = "body") String body) {
            return "邮件已发送至 " + to + "，主题：" + subject;
        }

        @Tool(name = "create_ticket", description = "创建 IT 工单。category 取 hardware/software/access。")
        public String createTicket(
                @ToolParam(name = "category") String category,
                @ToolParam(name = "description") String description) {
            if (!List.of("hardware", "software", "access").contains(category)) {
                return "错误：category 无效";
            }
            String id = String.format("TK-%05d", Math.abs(description.hashCode()) % 100000);
            return "工单 " + id + " 已创建（" + category + "）";
        }

        @Tool(name = "transfer_to_human", description = "转接人工。预算耗尽、连续失败或无法处理时调用。")
        public String transferToHuman(@ToolParam(name = "reason") String reason) {
            return "已转人工，原因：" + reason;
        }
    }

    public static ReActAgent buildAgent(int maxIters) {
        Toolkit toolkit = new Toolkit();
        toolkit.registerTool(new OfficeTools());
        return ReActAgent.builder()
                .name("CorpAssistOffice")
                .sysPrompt(
                        "你是 CorpAssist 办公助手。优先用工具；缺参数追问；"
                                + "最多 "
                                + maxIters
                                + " 步；无法完成时调用 transfer_to_human。")
                .model("dashscope:qwen-plus")
                .toolkit(toolkit)
                .maxIters(maxIters)
                .build();
    }

    public static void main(String[] args) {
        int maxIters = args.length > 0 ? Integer.parseInt(args[0]) : 8;
        ReActAgent agent = buildAgent(maxIters);
        String query =
                args.length > 1
                        ? args[1]
                        : "帮我把周五 10 点产品评审加到日历，并邮件通知 team@corp.com";

        agent.streamEvents(new UserMessage(query))
                .doOnNext(
                        evt -> {
                            if (evt.getType() == AgentEventType.TOOL_CALL_START) {
                                System.out.println("[tool] " + ((ToolCallStartEvent) evt).getToolName());
                            }
                        })
                .blockLast();

        System.out.println("[done] maxIters=" + maxIters);
    }
}

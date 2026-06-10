/**
 * CorpAssist 工单工具 — 演示 @Tool 注解形态。
 * 章节: basics-03-tools-mcp
 */
public class TicketTools {

    public String createTicket(String title, String priority) {
        String ticketId = String.format("T-%04d", Math.abs(title.hashCode() % 10000));
        return "工单 " + ticketId + " 已创建，优先级 " + priority;
    }

    public String queryTicket(String ticketId) {
        return ticketId + " 状态：处理中";
    }
}

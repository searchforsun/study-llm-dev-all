/**
 * Tool + MCP + allowlist 最小演示。
 * 章节: basics-03-tools-mcp
 */
public class ToolsMcpDemo {

    public static void main(String[] args) {
        System.out.println("=== Tool / MCP Lab (mock) ===");
        TicketTools tools = new TicketTools();
        String created = tools.createTicket("会议室报修", "high");
        System.out.println("createTicket: " + created);

        String kb = MockMcp.searchKb("年假怎么算");
        System.out.println("mcp kb_search: " + kb);

        String denied = "deleteTicket permission=deny (not in active allowlist for this agent)";
        System.out.println("allowlist check: " + denied);
        System.out.println("tools.json loaded: sendEmail=approve, deleteTicket=deny");
    }
}

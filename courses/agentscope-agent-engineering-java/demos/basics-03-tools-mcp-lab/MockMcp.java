/** 模拟 MCP Server list_tools 返回。 */
public class MockMcp {
    public static String searchKb(String query) {
        return "KB 命中: 「" + query + "」年假按工龄累计，详见 HR-2026-01";
    }
}

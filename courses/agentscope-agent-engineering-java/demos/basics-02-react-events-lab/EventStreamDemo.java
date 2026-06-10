/**
 * 模拟 streamEvents 消费 — mock 模式无需 AgentScope SDK。
 * 章节: basics-02-react-events
 */
import java.util.List;

public class EventStreamDemo {

    record MockEvent(String type, String payload) {}

    public static void main(String[] args) {
        System.out.println("=== ReAct Event Stream Lab (mock) ===");
        System.out.println("maxIterations=5");

        List<MockEvent> events = List.of(
            new MockEvent("ReplyStart", "{}"),
            new MockEvent("TextDelta", "正在"),
            new MockEvent("TextDelta", "查询日历…"),
            new MockEvent("ToolCallStart", "queryCalendar(date=2026-06-11)"),
            new MockEvent("ToolCallEnd", "2026-06-11 10:00 产品评审会 (42ms)"),
            new MockEvent("TextDelta", "明天 10:00 有产品评审会。"),
            new MockEvent("ReplyEnd", "{}")
        );

        boolean sawTool = false;
        StringBuilder text = new StringBuilder();
        for (MockEvent e : events) {
            System.out.println("EVENT: " + e.type() + " -> " + e.payload());
            if (e.type().startsWith("ToolCall")) sawTool = true;
            if ("TextDelta".equals(e.type())) text.append(e.payload());
        }
        System.out.println("streamed_text=" + text);
        System.out.println("tool_event_seen=" + sawTool);
    }
}

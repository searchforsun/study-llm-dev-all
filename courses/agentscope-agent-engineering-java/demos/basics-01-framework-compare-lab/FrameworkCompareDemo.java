/**
 * AgentScope Java 最小 ReActAgent 骨架 — mock 模式演示 API 形态。
 * 章节: basics-01-framework-compare
 *
 * 运行: javac FrameworkCompareDemo.java && java FrameworkCompareDemo
 * 或: ./run.sh / run.ps1
 */
public class FrameworkCompareDemo {

    static final String AGENT_NAME = "CorpAssistCompare";
    static final boolean MOCK = System.getenv("DASHSCOPE_API_KEY") == null;

    public static void main(String[] args) {
        System.out.println("=== AgentScope Java Framework Compare Lab ===");
        System.out.println("Agent: " + AGENT_NAME);
        System.out.println("Mode: " + (MOCK ? "mock (set DASHSCOPE_API_KEY for live)" : "live"));

        // 等价于 ReActAgent.builder().name(...).model(...).maxIterations(10).build()
        String question = "AgentScope Msg 与 SAA Graph State 有何不同？";
        String reply = MOCK
            ? "Msg 是 Typed 消息单元贯穿 Session；Graph State 是可变 Map 由节点函数维护。"
            : "[live] call DashScope via ReActAgent.builder()";

        System.out.println("Question: " + question);
        System.out.println("Reply: " + reply);
        System.out.println("Framework choice: calendar=ReActAgent | report=Sub-agent | approval=Graph+Tool");
    }
}

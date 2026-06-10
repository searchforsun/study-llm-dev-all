/**
 * CorpAssist Java Capstone 入口骨架 — 对应 advanced-02 章节 Spring Boot 端到端 Demo。
 * 学员在此接入 ReActAgent + 3 Mock 工具，并对接 golden set 评测。
 *
 * 依赖：spring-boot-starter-web、spring-boot-starter-actuator、agentscope-java
 * 指标：AgentMetricsListener 暴露 agent.steps / agent.tokens
 */
// @SpringBootApplication
public class CapstoneAgentApplication {

    // @Bean ReActAgent corpAssistCapstoneAgent() { ... }

    // @RestController — POST /api/capstone/chat + SSE streamEvents

    public static void main(String[] args) {
        // SpringApplication.run(CapstoneAgentApplication.class, args);
        System.out.println("Capstone skeleton — implement Agent + Mock tools, then run eval_capstone.ps1");
    }
}

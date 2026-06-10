// Demo 片段：AgentScopeAgent 包装 — 复制到 Spring Boot 工程
package com.corpassist.demo.agentscope;

import io.agentscope.core.ReActAgent;
import io.agentscope.core.model.DashScopeChatModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AgentScopeStarterConfig {

    @Bean
    public DashScopeChatModel dashScopeChatModel() {
        return DashScopeChatModel.builder()
            .modelName("qwen-plus")
            .apiKey(System.getenv("AI_DASHSCOPE_API_KEY"))
            .build();
    }

    @Bean
    public ReActAgent corpAssistAgent(DashScopeChatModel chatModel) {
        return ReActAgent.builder()
            .name("corp-assist")
            .chatModel(chatModel)
            .systemPrompt("""
                你是 CorpAssist 办公助手。先理解意图，再调用工具。
                单次对话最多 10 步；涉及发邮件/工单须等待审批事件。
                """)
            .maxIterations(10)
            .build();
    }

    /** SAA Starter 会将 ReActAgent 包装为可注入 Graph 的 AgentScopeAgent */
    @Bean
    public AgentScopeAgentWrapper agentScopeAgent(ReActAgent corpAssistAgent) {
        return new AgentScopeAgentWrapper(corpAssistAgent);
    }
}

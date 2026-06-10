package com.corpassist.demo;

import io.agentscope.core.ReActAgent;
import io.agentscope.core.formatter.dashscope.DashScopeChatFormatter;
import io.agentscope.core.message.Msg;
import io.agentscope.core.message.UserMessage;
import io.agentscope.core.model.DashScopeChatModel;
import java.util.List;

/**
 * CorpAssist：DashScope 显式配置 + retry/fallback + 双模型路由示意。
 */
public class ModelRoutingLab {

    public static void main(String[] args) {
        String apiKey = System.getenv("DASHSCOPE_API_KEY");
        if (apiKey == null || apiKey.isBlank()) {
            System.err.println("请设置 DASHSCOPE_API_KEY");
            System.exit(1);
        }

        DashScopeChatModel turbo =
                DashScopeChatModel.builder()
                        .apiKey(apiKey)
                        .modelName("qwen-turbo")
                        .stream(false)
                        .formatter(new DashScopeChatFormatter())
                        .build();

        DashScopeChatModel plus =
                DashScopeChatModel.builder()
                        .apiKey(apiKey)
                        .modelName("qwen-plus")
                        .stream(false)
                        .formatter(new DashScopeChatFormatter())
                        .build();

        ReActAgent classifier =
                ReActAgent.builder()
                        .name("intent-router")
                        .sysPrompt("只输出 simple 或 complex，不要解释。")
                        .model(turbo)
                        .maxIters(1)
                        .build();

        ReActAgent worker =
                ReActAgent.builder()
                        .name("corp-worker")
                        .sysPrompt("你是 CorpAssist 办公助手，一句话回答。")
                        .model(plus)
                        .maxRetries(2)
                        .fallbackModel("dashscope:qwen-turbo")
                        .maxIters(2)
                        .build();

        Msg label =
                classifier
                        .call(List.of(new UserMessage("对比 Q1/Q2 销售并写 executive summary")))
                        .block();
        String route = label.getTextContent().toLowerCase().contains("complex") ? "plus" : "turbo";
        System.out.println("[route] classify=" + label.getTextContent().trim() + " -> worker=" + route);

        Msg answer =
                worker.call(List.of(new UserMessage("帮我订明天 10 点会议室 A"))).block();
        System.out.println("[worker] " + answer.getTextContent());
    }
}

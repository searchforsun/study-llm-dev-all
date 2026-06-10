package com.corpassist.demo;

import io.agentscope.core.ReActAgent;
import io.agentscope.core.agent.RuntimeContext;
import io.agentscope.core.message.Msg;
import io.agentscope.core.message.UserMessage;
import io.agentscope.core.state.JsonFileAgentStateStore;
import java.nio.file.Path;
import java.util.List;

/**
 * CorpAssist S3：验证 Session 持久化与多轮短期记忆。
 * 需设置环境变量 DASHSCOPE_API_KEY。
 */
public class SessionMemoryLab {

    public static void main(String[] args) {
        Path storeDir = Path.of(System.getProperty("user.home"), ".agentscope/sessions-demo");
        ReActAgent agent =
                ReActAgent.builder()
                        .name("CorpAssistMemory")
                        .sysPrompt("你是 CorpAssist 办公助手。记住用户偏好并简短回答。")
                        .model("dashscope:qwen-turbo")
                        .stateStore(new JsonFileAgentStateStore(storeDir))
                        .maxIters(3)
                        .build();

        RuntimeContext ctx =
                RuntimeContext.builder()
                        .userId("zhangsan")
                        .sessionId("corp-s3-20260610")
                        .build();

        agent.call(
                        List.of(new UserMessage("我是华东区销售张三，偏好表格报告。")),
                        ctx)
                .block();

        Msg reply =
                agent.call(List.of(new UserMessage("刚才说的区域，帮我用一句话确认。")), ctx)
                        .block();

        System.out.println("[reply] " + reply.getTextContent());
        System.out.println("[state-store] " + storeDir.toAbsolutePath());
    }
}

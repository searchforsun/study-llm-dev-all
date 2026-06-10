// Spring 侧消费 Agent Service SSE（WebClient 片段）
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

public class AgentServiceClient {
    private final WebClient client = WebClient.builder()
        .baseUrl("http://localhost:8080")
        .defaultHeader("X-Tenant-Id", "corp-assist")
        .build();

    public Flux<String> streamChat(String sessionId, String message) {
        return client.post()
            .uri("/v1/chat/stream")
            .bodyValue(Map.of("session_id", sessionId, "message", message))
            .retrieve()
            .bodyToFlux(String.class);
    }
}

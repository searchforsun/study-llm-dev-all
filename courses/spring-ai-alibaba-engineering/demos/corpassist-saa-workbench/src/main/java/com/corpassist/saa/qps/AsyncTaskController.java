package com.corpassist.saa.qps;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/qps")
public class AsyncTaskController {

  private final Map<String, TaskRecord> tasks = new ConcurrentHashMap<>();

  @PostMapping("/tasks")
  public ResponseEntity<Map<String, String>> submit(@RequestBody TaskRequest request) {
    String taskId = UUID.randomUUID().toString().substring(0, 8);
    tasks.put(
        taskId,
        new TaskRecord(
            taskId,
            "PENDING",
            request.prompt(),
            Instant.now().toString(),
            null));
    // 模拟异步 Worker：stub 立即标记完成
    tasks.computeIfPresent(
        taskId,
        (id, rec) ->
            new TaskRecord(
                id,
                "DONE",
                rec.prompt(),
                rec.createdAt(),
                "[async-stub] 长任务结果：" + rec.prompt()));
    return ResponseEntity.accepted()
        .body(Map.of("taskId", taskId, "status", "ACCEPTED", "poll", "/api/qps/tasks/" + taskId));
  }

  @GetMapping("/tasks/{taskId}")
  public TaskRecord status(@PathVariable String taskId) {
    return tasks.getOrDefault(
        taskId,
        new TaskRecord(taskId, "NOT_FOUND", null, null, null));
  }

  public record TaskRequest(String prompt) {}

  public record TaskRecord(
      String taskId, String status, String prompt, String createdAt, String result) {}
}

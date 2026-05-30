# -*- coding: utf-8 -*-
"""One-off generator for llm-application-backend advanced chapters."""
from pathlib import Path

ROOT = Path(r"d:\MyWorkStation\Java\program\study-llm-dev-all\courses\llm-application-backend")
CH = ROOT / "chapters"


def t(tid, label=None):
    lbl = label if label else tid.replace("-", " ")
    return f'<span class="term" data-term-id="{tid}" tabindex="0">{lbl}</span>'


CHAPTERS = {}

CHAPTERS["advanced-01-legacy"] = f'''<section id="ch-advanced-01-legacy" class="chapter" data-chapter="advanced-01-legacy">
  <header class="chapter-header">
    <h2><span class="chapter-done-badge">已完成</span>与存量 Java 系统集成</h2>
    <button type="button" class="btn-mark-done" data-chapter="advanced-01-legacy" aria-label="标记本章完成">标记完成</button>
  </header>

  <div class="concept">
    <div class="chapter-intro content-section">
      <p class="chapter-meta">约 <strong>40 分钟</strong> · 阶段：<strong>企业集成</strong> · 能力：用 Feign 与事件桥接 ERP，并划定 LLM 调用事务边界</p>
      <div class="notice notice-why-learn">
        <strong>为什么要学本章</strong>
        <p>CorpAssist 不是绿field：客服要查 ERP 订单、写工单、同步审批状态。若把 LLM 推理塞进本地 DB 事务，或让 BFF 直连十几个存量 SOAP/REST 接口，<strong>延迟与一致性</strong>都会拖垮 <a href="#ch-practice-06-corpassist-gw">实战：CorpAssist 网关层</a> 已验证的网关链路。本章用 {t("legacy-integration")} 把「新 AI 面」与「老 Java 面」接稳。</p>
      </div>
      <div class="notice notice-outcome">
        <strong>学完你能</strong>
        <ul>
          <li>为订单/工单服务声明 {t("feign-client")}，并配置超时、熔断与 {t("idempotency-key", "idempotency key")} 传递</li>
          <li>用 {t("domain-event")} + {t("outbox-pattern")} 把「AI 建议已采纳」异步通知 ERP，避免双写</li>
          <li>口述 {t("transaction-boundary")}：哪些步骤必须在单库事务内，哪些必须拆到 {t("saga-lite")}</li>
        </ul>
      </div>
      <div class="notice">
        <strong>本章先记住 3 件事</strong>
        <ul>
          <li><strong>同步读、异步写</strong>：查订单用 Feign；回写 ERP 优先事件，不阻塞 SSE 流式回复。</li>
          <li><strong>LLM 不进事务</strong>：模型调用耗时长、不可回滚；事务只包本地状态变更。</li>
          <li><strong>桥接层单一</strong>：{t("system-bridge")} / {t("erp-connector")} 集中适配存量协议，BFF 只认内部 DTO。</li>
        </ul>
      </div>
    </div>

    <div class="section-block">
      <h3>Feign</h3>
      <aside class="learn-scenario" aria-label="业务情境">
        <span class="learn-scenario-title">CorpAssist · 查单 + 流式解答（45 秒）</span>
        用户问「我的订单 8821 到哪了？」Gateway 把请求打到 BFF；BFF 经 {t("feign-client")} 调存量 <code>order-service</code> 拉快照，再调 Python 生成流式回复。Feign 必须在 2s 内返回或触发 <a href="#ch-practice-01-circuit">熔断、舱壁与降级</a> 的 fallback 文案。
      </aside>

      <p>Spring Cloud OpenFeign 是 BFF 访问存量 Java 服务的标准 {t("system-bridge")}。CorpAssist 约定：</p>
      <ul>
        <li><strong>接口契约稳定</strong>：Feign 接口与存量 Controller DTO 对齐；版本变更走 {t("contract-gate", "contract gate")}（见 <a href="#ch-advanced-04-ci">CI/CD 与发布</a>）。</li>
        <li><strong>治理下沉 Resilience4j</strong>：connect/read 超时、重试仅对幂等 GET；写路径带 {t("idempotency-key", "idempotency key")}（见 <a href="#ch-basics-04-idempotency">幂等与重试</a>）。</li>
        <li><strong>租户上下文传递</strong>：<code>X-Tenant-Id</code> 从 Gateway 注入后，Feign RequestInterceptor 必须转发，配合 <a href="#ch-practice-03-multi-tenant">多租户隔离</a>。</li>
      </ul>

      <h4>Feign 客户端与 ERP 连接器</h4>
      <div class="code-block">
        <div class="code-toolbar"><span class="lang-tag">java</span><button type="button" class="btn-copy" aria-label="复制代码">复制</button></div>
        <pre><code class="language-java">@FeignClient(name = "order-service", configuration = LegacyFeignConfig.class)
public interface OrderClient {{
  @GetMapping("/internal/orders/{{orderId}}")
  OrderSnapshot getOrder(@PathVariable String orderId,
      @RequestHeader("X-Tenant-Id") String tenantId);
}}

@Component
public class ErpConnector {{
  private final OrderClient orders;
  public OrderContext fetchForLlm(String tenantId, String orderId) {{
    return OrderContext.from(orders.getOrder(orderId, tenantId));
  }}
}}</code></pre>
      </div>

      <div class="learn-compare">
        <div class="learn-compare-col learn-compare-bad">
          <span class="learn-compare-heading">不推荐</span>
          <ul>
            <li>BFF 内嵌 ERP JDBC/SOAP 客户端，协议泄漏到编排层</li>
            <li>Feign 无超时，SSE 线程被存量系统拖死</li>
            <li>每次对话全量拉 ERP 主数据，不做缓存与字段裁剪</li>
          </ul>
        </div>
        <div class="learn-compare-col learn-compare-good">
          <span class="learn-compare-heading">推荐</span>
          <ul>
            <li>{t("erp-connector")} 封装协议；BFF 只调内部 REST</li>
            <li>读路径熔断 + 降级为「暂时无法查询订单」</li>
            <li>按意图拉最小字段集；热点订单短 TTL 缓存</li>
          </ul>
        </div>
      </div>

      <details class="learn-micro-check">
        <summary>先想 10 秒：Feign 调用失败时，SSE 流应立刻 error 还是继续无订单上下文生成？</summary>
        <p>取决于产品策略：默认<strong>先告知查单失败</strong>并降级，避免模型幻觉编造物流；若业务允许可标记 <code>orderContext=empty</code> 继续，但须在审计日志留痕。</p>
      </details>
    </div>

    <div class="section-block">
      <h3>事件</h3>
      <p>存量系统往往<strong>不能</strong>被 CorpAssist 同步改写。采纳 AI 建议（创建工单、更新备注）应通过 {t("domain-event")} 投递，由 ERP 侧消费者按自身节奏处理——这与 <a href="#ch-practice-04-mq">消息队列与异步任务</a> 的索引/通知模式一致。</p>

      <h4>Outbox 发布领域事件</h4>
      <div class="code-block">
        <div class="code-toolbar"><span class="lang-tag">java</span><button type="button" class="btn-copy" aria-label="复制代码">复制</button></div>
        <pre><code class="language-java">@Transactional
public void acceptAiSuggestion(AcceptCommand cmd) {{
  TicketDraft draft = ticketRepo.save(TicketDraft.from(cmd));
  outbox.save(OutboxEvent.of("AiSuggestionAccepted", draft.getId(), cmd.getTenantId()));
  // 同一本地事务：草稿 + outbox 行
}}</code></pre>
      </div>

      <div class="mermaid-wrap">
        <h5>CorpAssist → ERP 事件桥接</h5>
        <pre class="mermaid">sequenceDiagram
  participant BFF as corpassist-bff
  participant DB as 本地库+Outbox
  participant MQ as RabbitMQ/Kafka
  participant ERP as 存量工单服务
  BFF->>DB: 事务内写草稿+Outbox
  DB-->>MQ: Relay 投递 AiSuggestionAccepted
  MQ->>ERP: 消费者创建正式工单</pre>
        <p class="diagram-caption">{t("outbox-pattern")} 保证「本地提交」与「消息可见」一致；ERP 消费需 {t("consumer-idempotent", "consumer idempotent")}。</p>
      </div>

      <table class="outline-table">
        <thead><tr><th>集成方式</th><th>适用</th><th>风险</th></tr></thead>
        <tbody>
          <tr><td>Feign 同步读</td><td>查单、查库存快照</td><td>延迟叠加到首 token</td></tr>
          <tr><td>领域事件异步写</td><td>工单、审批、审计</td><td>最终一致；需对账</td></tr>
          <tr><td>批处理文件</td><td>日终对账</td><td>非实时；作补偿</td></tr>
        </tbody>
      </table>
    </div>

    <div class="section-block">
      <h3>事务边界</h3>
      <p>{t("transaction-boundary")} 的核心问题：<strong>哪一步必须原子，哪一步必须拆出去</strong>。LLM 调用、外部 HTTP、SSE 推送<strong>都不</strong>属于 ACID 事务。</p>

      <table class="outline-table learn-decision-table">
        <thead><tr><th>步骤</th><th>是否进本地 @Transactional</th><th>失败补偿</th></tr></thead>
        <tbody>
          <tr><td>保存用户采纳记录 + Outbox</td><td>是</td><td>—</td></tr>
          <tr><td>调用 OpenAI / 本地模型</td><td>否</td><td>重试 + 幂等键；不计费重复</td></tr>
          <tr><td>Feign 调 ERP 创建工单</td><td>否（优先事件）</td><td>{t("saga-lite")}：标记 pending + 重放</td></tr>
          <tr><td>推送 SSE 完成事件</td><td>否</td><td>客户端 {t("reconnect-sse", "reconnect sse")} 拉历史</td></tr>
        </tbody>
      </table>

      <div class="learn-faq">
        <details>
          <summary>能否用 Seata 把 BFF 与 ERP 包在一个全局事务？</summary>
          <div class="learn-faq-body">CorpAssist 场景通常<strong>不值得</strong>：ERP 不支持 XA、LLM 不可回滚。用 Outbox + 对账脚本更可控；全局事务留给极少量强一致金融子域。</div>
        </details>
        <details>
          <summary>Python 侧要不要参与 Java 事务？</summary>
          <div class="learn-faq-body">否。Python 能力面通过 REST/gRPC 被 BFF 调用；状态以 BFF 库为准，Python 保持无状态或自有向量库事务。</div>
        </details>
      </div>
    </div>

    <div class="section-block chapter-conclusions-block notice">
      <h3>本章结论</h3>
      <ul class="chapter-conclusions-list">
        <li><strong>Feign</strong>：BFF 同步读存量 Java；{t("erp-connector")} 隔离协议，超时熔断对齐 practice-01。</li>
        <li><strong>事件</strong>：写 ERP 走 {t("domain-event")} + {t("outbox-pattern")}，与 MQ 章节的异步任务衔接。</li>
        <li><strong>事务边界</strong>：LLM 与外部 IO 不进事务；本地状态 + Outbox 才包 @Transactional。</li>
      </ul>
    </div>

    <div class="section-block learn-review-block">
      <h3>复习与自检</h3>
      <div class="learn-checklist" data-storage-key="llm-application-backend_advanced01">
        <p class="learn-checklist-lead">过关清单（勾选会保存在本浏览器）</p>
        <p class="learn-checklist-progress" aria-live="polite">0 / 5 已勾选</p>
        <ul>
          <li><label><input type="checkbox" data-id="feign-read" /> 能说明查单为何用 Feign 而非 JDBC 直连 ERP</label></li>
          <li><label><input type="checkbox" data-id="outbox" /> 能画出 Outbox 与 ERP 消费者的顺序</label></li>
          <li><label><input type="checkbox" data-id="tx-llm" /> 能列举 2 个「不能进事务」的步骤</label></li>
          <li><label><input type="checkbox" data-id="bridge" /> 能解释 {t("system-bridge")} 对 BFF 的意义</label></li>
          <li><label><input type="checkbox" data-id="quiz-done" /> 已完成右侧「章节测验」</label></li>
        </ul>
      </div>
      <p class="chapter-review-next">下一步：完成测验与 Demo；下一章 <a href="#ch-advanced-02-config">配置中心与密钥</a> 解决多环境 API Key 与动态路由配置。</p>
    </div>
  </div>

  <div class="official-links content-section">
    <h3>官方文档</h3>
    <ul>
      <li><a href="https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/" target="_blank" rel="noopener">Spring Cloud OpenFeign</a></li>
      <li><a href="https://microservices.io/patterns/data/transactional-outbox.html" target="_blank" rel="noopener">Transactional Outbox Pattern</a></li>
      <li><a href="https://docs.spring.io/spring-framework/reference/data-access/transaction.html" target="_blank" rel="noopener">Spring Transaction Management</a></li>
    </ul>
  </div>

  <div class="chapter-practice">
    <h3>动手练习</h3>
    <p class="steps-intro">在纸面或 <code>demos/advanced-01-legacy-lab/integration-map.md</code> 完成「查单 + 采纳建议写 ERP」集成图与事务边界表（约 25 分钟）。</p>
    <h4 class="practice-section-title">操作步骤</h4>
    <ol class="steps steps-operate">
      <li>对照正文 Mermaid「CorpAssist → ERP 事件桥接」，补全 MQ 与 ERP 消费者节点，并标注 {t("outbox-pattern")} 插入点。</li>
      <li>为 <code>OrderClient</code> 写 connect/read 超时与熔断参数建议值，并说明与 SSE 首 token 预算的关系。</li>
      <li>填写「事务边界决策表」中「Feign 调 ERP 创建工单」一行：改为事件驱动后应如何补偿。</li>
      <li>在 integration-map 中列出 1 个真实 {t("legacy-integration")} 系统（订单/工单/HR）及读/写策略。</li>
      <li>（可选）完成 <code>demos/advanced-01-legacy-lab/</code> README 验收项。</li>
    </ol>
    <h4 class="practice-section-title">判断练习</h4>
    <ol class="steps-judgment-list">
      <li>
        <p class="judgment-stem">（场景）同事把「调用 GPT-4 + 写本地草稿 + Feign 创建 ERP 工单」包在同一 @Transactional 里。请指出<strong>两处</strong>架构错误。</p>
        <div class="learn-practice-answer">
          <details><summary>参考答案</summary>
            <div class="learn-practice-answer-body"><p>① LLM 调用耗时长且不可回滚，会长时间占 DB 连接；② ERP 写失败会导致本地草稿回滚，与用户已看到的 SSE 回复矛盾。应：本地草稿+Outbox 在短事务内；LLM 与 ERP 写均异步/补偿。</p></div>
          </details>
        </div>
      </li>
    </ol>
    <div class="demo-box">
      <h4 class="demo-box-title">Demo：与存量 Java 系统集成</h4>
      <p>目录：<code>demos/advanced-01-legacy-lab/</code>。<strong>验收</strong>：integration-map 含至少 1 个存量系统、Feign 读路径与事件写路径各 1 条。</p>
    </div>
  </div>

  <div class="resources content-section">
    <h3>延伸学习</h3>
    <ul>
      <li><strong>下一章</strong>：<a href="#ch-advanced-02-config">配置中心与密钥</a></li>
      <li><a href="#ch-practice-04-mq">消息队列与异步任务</a>：Outbox Relay 与死信</li>
      <li><a href="#ch-basics-04-idempotency">幂等与重试</a>：Feign 写路径幂等键</li>
    </ul>
  </div>
</section>'''

print('chapter 1 length', len(CHAPTERS['advanced-01-legacy'].splitlines()))

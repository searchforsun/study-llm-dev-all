# Demo：FIM 补全与上下文拼装

[章节](../../index.html#ch-practice-03-completion)

## 实验目标

1. 构建三种 FIM 格式的补全 prompt
2. 实现 prefix/suffix 提取
3. 验证 FIM 格式正确性

## 步骤一：构建 FIM Prompt

```python
builder = FIMBuilder("qwen-coder")
prefix = "public User getUser(Long id) {\n    return userRepository."
suffix = "\n}"
prompt = builder.build_prompt(prefix, suffix)
print(prompt)
# <|fim_prefix|>public User...<|fim_suffix|>\n}<|fim_middle|>
```

## 步骤二：验证三种格式

| 格式 | 输入 | 适用模型 |
|------|------|---------|
| StarCoder | `<\|fim_prefix\|>P<\|fim_suffix\|>S<\|fim_middle\|>` | StarCoder, Qwen-Coder |
| CodeLLaMA | `<FILL_HERE>S<FILL_HERE>P` | CodeLLaMA |

## 步骤三：上下文拼装测试

```java
var assembler = new ContextAssembler(new TokenCounter());
var request = assembler.assemble(contextBundle);
System.out.println("Context tokens: " + request.context().length());
```

## 验证标准

- FIM 格式与模型匹配
- prefix/suffix 提取正确
- 上下文总量 ≤ 4K tokens

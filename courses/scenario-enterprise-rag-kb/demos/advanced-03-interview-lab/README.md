# Demo：面试：RAG 架构五连问（最终答辩）

[章节](../../index.html#ch-advanced-03-interview)

## 目标
完成 S1 场景课最终答辩：面试模拟 + Demo 演示 + 总结报告。

## 文件
- `interview_guide.md` — 面试五连问答题提纲
- `demo_presentation.py` — 5 个场景 QA 演示脚本
- `final_report_generator.py` — 全课总结报告生成器

## 验收标准
- 完成 3 分钟面试回答录制（五问中至少覆盖 3 类）
- 5 个场景 QA 流畅运行（精确+语义+跨文档+拒答+多轮）
- 输出 S1 全课总结报告

## 运行
```bash
# 最终 Demo 演示
python demo_presentation.py --demo all
# 生成总结报告
python final_report_generator.py --output ./output/s1_summary.md
```

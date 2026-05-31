# Demo：厂商与国产化选型

[返回章节](../index.html#ch-basics-03-vendor)

## 目标

完成公有云 vs 私有化对比表、招标技术条款与 GPU 估算。

## 验收标准

- [ ] `vendor-compare.md` 含 5 行以上对比（成本/工期/合规/运维/扩展）
- [ ] `tender-clauses.md` 含 3 条可测验收指标 + SLA 赔偿条款
- [ ] `gpu-estimate.md` 含 7B 模型 INT4 量化显存估算

## 产出物

| 文件 | 说明 |
|------|------|
| `vendor-compare.md` | 公有云 vs 私有化详细对比表 |
| `tender-clauses.md` | 招标技术条款节选 |
| `gpu-estimate.md` | GPU 显存估算 + 计算过程 |

## 操作步骤

1. 创建 vendor 对比表
2. 写招标条款含 SLA 赔偿
3. 估算 7B 模型 INT4 4 并发的显存需求
4. 标注 CorpAssist 一期推荐路径

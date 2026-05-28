# CorpAssist 附件入库检查清单

- [ ] 识别 PDF 类型：文字版 / 扫描版 / 混合
- [ ] 扫描版走 OCR，保留 `page_no` 与 `bbox` 元数据
- [ ] 分块策略：按标题层级，单块 ≤ 512 tokens（可配置）
- [ ] Embedding 模型版本写入 `index_version`
- [ ] L3/L4 文档禁止出网解析（仅内网 OCR）

from audit_emit import emit
from citation_chain import build_citations

citations = build_citations([{"doc_id": "hr-001", "chunk_id": "c-7", "score": 0.91}])
event = emit("rag_answer", user_id="13800138000", trace_id="tr-001", citations=citations)
assert "13800138000" not in str(event)
assert event["citations"][0]["doc_id"] == "hr-001"
print("PASS: audit event valid, PII redacted")

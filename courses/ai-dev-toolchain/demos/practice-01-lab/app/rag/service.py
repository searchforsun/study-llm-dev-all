from dataclasses import dataclass


@dataclass
class RagPipeline:
    async def arun(self, query: str, top_k: int = 3) -> dict:
        # 教学 stub：真实项目接 Milvus + LLM
        return {
            "answer": f"关于「{query}」的示例回答（lab stub）。",
            "citations": [{"doc_id": "hr-001", "snippet": "年假政策示例片段"}],
        }


def get_pipeline() -> RagPipeline:
    return RagPipeline()

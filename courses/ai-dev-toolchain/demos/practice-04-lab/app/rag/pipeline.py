"""CorpAssist RAG MVP stub for efficiency lab."""


class RagPipeline:
    def run(self, query: str, top_k: int = 3) -> dict:
        answers = {
            "年假有几天": "工作满一年可申请 5 天年假。",
            "报销流程是什么": "请登录 OA 提交报销单，按财务流程审批。",
            "试用期多长": "试用期一般为 3 个月。",
        }
        answer = answers.get(query, "未找到相关政策，请联系 HR。")
        return {"answer": answer, "citations": [{"doc_id": "hr-stub", "snippet": answer[:80]}]}

"""本地 Mock MCP 工具，用于无 MCP Server 时验收 Toolkit 注册。"""


def search_kb(query: str) -> str:
    """检索 CorpAssist 知识库（Mock）。"""
    return f"[mock] 关于「{query}」：请参考《员工手册》第 3 章。"

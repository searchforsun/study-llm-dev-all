"""Mock Capstone Agent — 离线评测用，无需 AgentScope。"""

def search_policy(q: str) -> str:
    return f"制度摘要：关于「{q}」，年假 15 天。"

def book_meeting_room(room: str, time: str) -> str:
    return f"confirmation_id=BK-001, room={room}, time={time}"

def send_email(to: str, body: str) -> str:
    return f"email_sent_to={to}"

def run_capstone(user_input: str) -> dict:
    tools_called = []
    content_parts = []
    if "制度" in user_input or "年假" in user_input:
        search_policy(user_input)
        tools_called.append("search_policy")
        content_parts.append("制度要点已查")
    if "会议室" in user_input or "订" in user_input:
        book_meeting_room("A301", "2026-06-11T14:00")
        tools_called.append("book_meeting_room")
        content_parts.append("A301 已预订")
    if "通知" in user_input or "邮件" in user_input or "张三" in user_input:
        send_email("zhangsan@corp.com", "会议通知")
        tools_called.append("send_email")
        content_parts.append("已通知张三")
    return {
        "content": "；".join(content_parts) or "未完成",
        "steps": len(tools_called) or 1,
        "tools_called": tools_called,
    }

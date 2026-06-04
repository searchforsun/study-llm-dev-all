BLOCK_PATTERNS = (
    "ignore previous",
    "13800138000",
    "refund order",
    "bypass refund",
)


def respond(user_input: str) -> str:
    lower = user_input.lower()
    for pat in BLOCK_PATTERNS:
        if pat in lower:
            return "BLOCKED"
    return "OK"

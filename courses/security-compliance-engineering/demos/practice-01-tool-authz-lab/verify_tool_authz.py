"""CorpAssist tool authz smoke check."""
from pathlib import Path
import yaml

ROOT = Path(__file__).parent
matrix = yaml.safe_load((ROOT / "role-tool-matrix.yaml").read_text(encoding="utf-8"))
cs_tools = set(matrix["roles"]["customer_service"]["tools"])


def invoke_tool(role: str, tool: str) -> None:
    allowed = set(matrix["roles"][role]["tools"])
    if tool not in allowed:
        raise PermissionError(f"{role} blocked {tool}")


try:
    invoke_tool("customer_service", "refund_order")
    raise SystemExit("FAIL: cs_agent should be blocked refund_order")
except PermissionError:
    print("PASS: cs_agent blocked refund_order")

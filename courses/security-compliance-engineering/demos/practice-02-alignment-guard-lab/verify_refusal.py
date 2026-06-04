from refusal_guard import refuse

result = refuse("POLICY_VIOLATION", {"trace_id": "t-demo", "user_id_hash": "u1"})
assert result["refused"] and result["audit"]["refusal_code"] == "POLICY_VIOLATION"
print("PASS: POLICY_VIOLATION handled")

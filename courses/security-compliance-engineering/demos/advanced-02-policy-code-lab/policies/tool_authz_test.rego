package corpassist.tool

test_allow_readonly {
  allow with input as {
    "tenant": "fin-bank-01",
    "tool_name": "query_balance",
    "data_class": "INTERNAL"
  } with data.tenants as {"fin-bank-01": {"name": "fin-bank-01", "allowed_tools": ["query_balance"]}}
}

test_deny_transfer_without_approvers {
  count(deny) > 0 with input as {
    "tenant": "fin-bank-01",
    "tool_name": "transfer_funds",
    "data_class": "INTERNAL"
  }
}

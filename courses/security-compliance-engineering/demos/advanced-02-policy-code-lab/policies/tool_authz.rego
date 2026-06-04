package corpassist.tool

default allow = false

allow {
  input.tenant == data.tenants[input.tenant].name
  input.tool_name in data.tenants[input.tenant].allowed_tools
  input.data_class != "STATE_SECRET"
}

deny[msg] {
  input.data_class == "STATE_SECRET"
  msg := "STATE_SECRET blocked"
}

deny[msg] {
  input.tool_name == "transfer_funds"
  not input.approvers
  msg := "transfer_funds requires approvers"
}

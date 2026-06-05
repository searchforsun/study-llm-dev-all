package com.corpassist.lab.vectorstore;

/** Lab 检索请求；生产环境对应 Spring AI {@code SearchRequest} + {@code Filter.Expression}。 */
public record SearchRequest(String query, int topK, String deptFilter) {}

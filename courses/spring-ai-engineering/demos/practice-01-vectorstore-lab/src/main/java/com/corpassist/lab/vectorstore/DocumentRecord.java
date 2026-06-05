package com.corpassist.lab.vectorstore;

import java.util.Map;

/** Lab 用文档记录；生产环境对应 Spring AI {@code Document}。 */
public record DocumentRecord(String id, String text, Map<String, Object> metadata) {}

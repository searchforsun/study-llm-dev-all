package com.corpassist.lab.rag.api;

import java.util.List;

public record RagQueryResponse(String answer, List<Source> sources, String requestId) {}

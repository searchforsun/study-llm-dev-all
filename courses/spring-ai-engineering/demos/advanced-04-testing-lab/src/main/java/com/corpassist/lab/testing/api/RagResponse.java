package com.corpassist.lab.testing.api;

import java.util.List;

public record RagResponse(String answer, List<Citation> sources) {}

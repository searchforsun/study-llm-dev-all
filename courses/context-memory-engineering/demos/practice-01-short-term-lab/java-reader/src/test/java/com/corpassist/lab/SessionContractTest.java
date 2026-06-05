package com.corpassist.lab;

import org.junit.jupiter.api.Test;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class SessionContractTest {

    @Test
    void parsesPythonWrittenPayload() throws Exception {
        try (InputStream in = getClass().getResourceAsStream("/python-session-sample.json")) {
            byte[] bytes = in.readAllBytes();
            List<SessionMessages.Turn> turns = SessionMessages.parse(bytes);
            assertEquals(3, turns.size());
            assertTrue(turns.get(0).content().contains("20240501"));
        }
    }

    @Test
    void sessionKeyMatchesPython() {
        assertEquals(
                "corpassist:session:acme_corp:user_9527",
                SessionMessages.sessionKey("acme_corp", "user_9527"));
    }
}

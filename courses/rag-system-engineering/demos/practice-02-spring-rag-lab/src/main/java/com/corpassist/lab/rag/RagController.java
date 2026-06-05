package com.corpassist.lab.rag;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/rag")
public class RagController {

    @PostMapping("/ask")
    public SpringRagDemo.AskResponse ask(@RequestBody SpringRagDemo.AskRequest req) {
        return SpringRagDemo.ask(req);
    }
}

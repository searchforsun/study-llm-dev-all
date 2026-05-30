"""后台任务占位 — 不连接真实 MQ"""
from dataclasses import dataclass

@dataclass
class IndexJob:
    job_id: str
    doc_ids: list[str]

def run_index(job: IndexJob) -> dict:
    return {"job_id": job.job_id, "indexed": len(job.doc_ids), "status": "done"}

if __name__ == "__main__":
    print(run_index(IndexJob("j1", ["d1", "d2"])))

"""后台任务占位 — 不连接真实 MQ"""
from dataclasses import dataclass

@dataclass
class IndexJob:
    job_id: str
    doc_ids: list[str]

def run_index(job: IndexJob) -> dict:
    """模拟 enqueue → poll：先 pending，再 succeeded。"""
    return {"job_id": job.job_id, "indexed": len(job.doc_ids), "status": "pending"}


def poll_index(job_id: str, indexed: int) -> dict:
    return {"job_id": job_id, "indexed": indexed, "status": "succeeded"}

if __name__ == "__main__":
    job = IndexJob("j1", ["d1", "d2"])
    enqueued = run_index(job)
    print("enqueue:", enqueued)
    print("poll:", poll_index(job.job_id, enqueued["indexed"]))

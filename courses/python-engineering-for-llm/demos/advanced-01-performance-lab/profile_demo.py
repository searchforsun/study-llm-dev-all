import cProfile, pstats

def work(n: int) -> int:
    return sum(i * i for i in range(n))

if __name__ == "__main__":
    pr = cProfile.Profile()
    pr.enable()
    work(50_000)
    pr.disable()
    pstats.Stats(pr).sort_stats("cumulative").print_stats(5)

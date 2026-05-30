def score(answer, contexts):
    return 0.9 if "pol-" in answer else 0.5
if __name__ == "__main__":
    print(score("依据 pol-001", ["pol-001 text"]))

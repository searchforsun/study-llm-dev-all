#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate all remaining 12 chapter HTML files."""
import os

B1 = r"D:\MyWorkStation\Java\program\study-llm-dev-all\courses\ai-dev-toolchain\chapters"
B2 = r"D:\MyWorkStation\Java\program\study-llm-dev-all\courses\rag-system-py\chapters"

# We'll use a template approach - read each chapter content from strings

def write_file(path, lines):
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f'{path}: {len(lines)} lines')

# Each chapter is an array of strings (one per output line)
# Chapter data defined inline for each chapter

CHAPTERS = {}

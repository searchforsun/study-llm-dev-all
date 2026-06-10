#!/usr/bin/env bash
grep -q "推荐" selection-matrix.md && echo "matrix OK" || exit 1

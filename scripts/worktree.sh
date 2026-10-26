#!/usr/bin/env bash
# Operaciones seguras con Git worktree para AFACES.
set -euo pipefail
repo="$(git rev-parse --show-toplevel)"
parent="$(dirname "$repo")"
usage() {
  echo "Uso: scripts/worktree.sh {new RAMA [RUTA]|list|verify [RUTA]|remove RUTA}" >&2
  exit 2
}
cmd="${1:-}"
case "$cmd" in
  list)
    git -C "$repo" worktree list --porcelain
    ;;
  new)
    branch="${2:-}"
    [[ -n "$branch" && "$branch" != "master" && "$branch" != "main" ]] || usage
    clean="${branch//\//-}"
    path="${3:-$parent/afaces-wt-$clean}"
    git -C "$repo" fetch origin master
    git -C "$repo" worktree add -b "$branch" "$path" origin/master
    printf 'Worktree: %s\n' "$path"
    ;;
  verify)
    path="${2:-$repo}"
    (
      cd "$path"
      python -m unittest discover -s tests -v
      python scripts/sync_catalog.py --check
      python scripts/build_tinet.py --manifest
    )
    ;;
  remove)
    [[ -n "${2:-}" ]] || usage
    git -C "$repo" worktree remove "$2" # Falla si hay cambios sin guardar
    git -C "$repo" worktree prune
    ;;
  *) usage ;;
esac

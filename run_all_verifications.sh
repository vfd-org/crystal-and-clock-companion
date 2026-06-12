#!/usr/bin/env bash
# Run every verification suite of the Crystal-and-the-Clock companion.
# Requires: Python 3 + NumPy (SciPy and SymPy for verify_residual_closure).
set -uo pipefail
cd "$(dirname "$0")"
suites=(explore_geometric_ladder explore_shell_rule verify_sm_structure verify_crystal_forcing verify_rendering_layer verify_rung_dimension_ladder \
        verify_ladder_completion verify_narrative_closure verify_gap_strengthening \
        verify_gr_closure verify_residual_closure)
fail=0
for s in "${suites[@]}"; do
  printf "%-36s " "$s:"
  out=$(python3 "scripts/$s.py" 2>/dev/null | grep SUMMARY)
  echo "$out"
  echo "$out" | grep -q " 0 FAIL" || fail=1
done
echo "--- witnesses (no summary line; inspect output):"
python3 scripts/verify_boundary_green_function.py 2>/dev/null | tail -2
python3 scripts/verify_lemma_2p5_boundary_connectivity.py 2>/dev/null | tail -2
exit $fail

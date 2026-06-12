# The Crystal and the Clock — Companion Mathematics

**The complete mathematical record behind the book *The Crystal and the Clock*: seven papers, eleven derivation documents, thirteen verification suites (228+ itemised checks, every one with a falsifiable null), and the hostile referee reports each paper was hardened against.**

This repository is standalone: every paper can be read without the book, every claim can be checked without trusting anyone. The book is the plain-language telling; this is the maths it tells.

> **Release principle — Commons of knowledge. Stewardship of power.**
> Open to verify, learn, and challenge. Permissioned to commercialise. See `LICENSE` and `NOTICE`.

---

## Verify everything first

```bash
git clone https://github.com/vfd-org/crystal-and-clock-companion.git
cd crystal-and-clock-companion
bash run_all_verifications.sh        # ~10 minutes; needs Python 3 + NumPy (SciPy/SymPy for two suites)
```

Expected output: thirteen suites, **every line `… PASS, 0 FAIL`**. Any other result falsifies the claim that the failing check carries — and we ask to be told about it.

| Suite | Checks | Carries |
|---|---|---|
| `verify_crystal_forcing.py` | 17 | the crystal is forced (unique nontrivial perfect group; McKay = affine E8; the graph reconstructs its own geometry); non-abelian gauge consistency |
| `verify_rendering_layer.py` | 21 | spectral dimension 3; canonical kernel; quaternionic frames; second-order time |
| `verify_rung_dimension_ladder.py` | 25 | sampling-intertwiner theorem; arenas only 3D + 7D |
| `verify_ladder_completion.py` | 29 | octonionic S⁷ ladder |
| `verify_narrative_closure.py` | 28 | the ten geometry→reality gap closures |
| `verify_gap_strengthening.py` | 22 | hardened re-tests with genuine nulls |
| `verify_gr_closure.py` | 39 | the gravity chain: Fierz–Pauli uniqueness, trace reversal, light bending ×2, equivalence principle, Maxwell |
| `verify_residual_closure.py` | 24 | bootstrap in-house; non-Gaussian effective action; explicit-rate continuum control; conditional G; gauge-group structure |
| `explore_geometric_ladder.py` | 3 | Phase C: the sieve hypothesis (intermediate geometry / prime resonances as allowed shell levels) — eight geometry-derived generators, all null after correction; the quantitative target for any future sieve recorded |
| `explore_shell_rule.py` | 8 | the shell-rule attack: proof-grade refutation of static-feature rules, look-elsewhere-corrected nulls, the scheme-dependence gradient, one out-of-sample-failed lead |
| `verify_sm_structure.py` | 12 | chirality is structural (the internal factor is the left/chiral Spin(4) factor); charge-magnitude lattice in thirds with the {1,3,3,1} lepton/quark pattern |
| `verify_boundary_green_function.py` | witness | Newtonian 1/r from the boundary response |
| `verify_lemma_2p5_boundary_connectivity.py` | witness | boundary graph structure |

The only data file is `scripts/600cell_data.npz` (the 600-cell's vertices and adjacency); the octonions are built from scratch inside the scripts by Cayley–Dickson doubling.

## The papers

Read in book order; each is standalone with its own verification pointers.

| Paper | Title | Book chapters | PDF |
|---|---|---|---|
| **LIV** | The Forced Crystal: the Binary Icosahedral Group as the Unique Perfect Quaternionic Substrate | 3–4 | [`papers/paper-liv/paper-liv.pdf`](papers/paper-liv/paper-liv.pdf) |
| **LV** | The Rendering Layer: Spectral Dimension Three, the Canonical Kernel, the Observer Chart, and Second-Order Time | 4–7 | [`papers/paper-lv/paper-lv.pdf`](papers/paper-lv/paper-lv.pdf) |
| **LIII** | Einstein's Equations from Substrate Closure | 9 | [`papers/paper-liii/paper-liii.pdf`](papers/paper-liii/paper-liii.pdf) |
| **LVII** | Residual Closure of the Gravity Chain | 9, 12 | [`papers/paper-lvii/paper-lvii.pdf`](papers/paper-lvii/paper-lvii.pdf) |
| **LVI** | The Gauge-Group Inventory from the Two Arenas | 9 | [`papers/paper-lvi/paper-lvi.pdf`](papers/paper-lvi/paper-lvi.pdf) |
| **LVIII** | Chirality and Charge Quantization from the Two Arenas | 9, 12 | [`papers/paper-lviii/paper-lviii.pdf`](papers/paper-lviii/paper-lviii.pdf) |
| **XL** | Continuum Targets and Conditional Reductions for D₄ and the GR Limit (the open geometric programme) | 9, 12 | [`papers/paper-xl/paper-xl.pdf`](papers/paper-xl/paper-xl.pdf) |

The full chapter → paper → derivation → verification routing table is [`docs/book-companion-map.md`](docs/book-companion-map.md). The graded claim table (THEOREM / DERIVED-EFF / CONDITIONAL / WITNESSED / TIE / OPEN, with falsifiers) is [`docs/claim-status-ledger.md`](docs/claim-status-ledger.md).

## The referee record

Every paper above was put through hostile machine-referee review (claim audit, internal/external consistency, tightness), and **the reviews are published here unedited** — [`reviews/`](reviews/) — together with the papers as revised in response. The record includes the findings that mattered: a repaired maximality proof (LIV), a corrected main theorem (LVI's gauge inventory, restated from a three-factor product to SU(3) × SU(2) with a distinguished clock circle), a sign-convention repair and tightened claim language (LIII), and twice-tightened scope on a large-deviations theorem (LVII). The failed earlier construction of the gravity tensor action is also preserved (`docs/kappa-derivation-math.md` §6.7) as the honest record of what did not work.

## What is open, stated plainly

- The Gromov–Hausdorff continuum statement about the arena geometry (Paper XL's programme).
- The Standard Model's wiring, after Paper LVIII's closures (chirality and the charge lattice are now structural): the independent hypercharge factor and Weinberg angle, doublet/anomaly assignments, couplings, the shell integers and offsets behind all precise masses, the neutrino sector, and the three-generation count (named D4-triality conjecture). The parameter-free ledger `python3 scripts/sm_ledger.py` prints exactly what is determined today, with grades.
- The universal selection law, and the question of experience — named, not claimed.
- Newton's constant is *conditionally anchored* (to 1.9 parts in 10⁴) on a named, open hypothesis (H-shell-96).

The complete residual ledger with falsification routes: Paper LVII §6 and `docs/claim-status-ledger.md` §D–E.

## Cite

See `CITATION.cff`. Institute of Vibrational Field Dynamics — `contact@vibrationalfielddynamics.org` — `@vfd_org`.

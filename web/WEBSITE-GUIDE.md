# Website Guide: Building "The Crystal Resonance Explorer"

**Audience:** the VFD website-updater agent.
**Goal:** an interactive explorer showing how the particles, their weights, and atoms *fall out of the crystal's ring* — with the framework's honesty grades built into the UI, not bolted on.
**Assets in this directory:**
- `resonance-simulator.html` — a complete, working single-file reference implementation (open it in a browser; view source). You may publish it as-is, embed it, or rebuild it natively in the site's stack using this guide.
- `resonance-core.js` — the math as a dependency-free module (UMD; `ResonanceCore.*`). If you rebuild, import this and do not re-derive constants by hand.

---

## 1. The story the page tells (five links, in this order)

The narrative spine — each section is one link of the chain, and the page must make the chain *visible*:

1. **The ring (DERIVED, exact).** The crystal's vibration spectrum is one closed formula; its overtone families are perfect squares 1, 4, 9, 16, 25, 36 — the fingerprint of three-dimensional space. *Interaction: click a harmonic to pluck it.* Data: `ResonanceCore.spectrum()`.
2. **Mass = closure frequency (DERIVED).** A particle is a standing wave that closes on itself; the rest frequency is the mass. *Interaction: the standing-wave animation re-paces when a particle is selected.*
3. **The golden ladder (DERIVED).** One golden-ratio step per refinement level: m = m_P·φ^(−N), anchored only on the muon's structural shell 96 = 24×4. Every rung value is parameter-free. Data: `ResonanceCore.ladder()`.
4. **Which rung — OPEN.** The integer selection is the genuinely open item, fenced by proofs and nulls. Render `ResonanceCore.LINK4` as a visually distinct "open" block. This section is **required** — do not omit it.
5. **Atoms (THEOREM).** With mass + charge + Schrödinger + Coulomb all derived, hydrogen is a theorem. The page computes the hydrogen spectrum live from the framework's own electron and shows that the error is *exactly* the electron's mass-input error. *Interaction: toggle framework-mₑ / measured-mₑ.* Data: `ResonanceCore.hydrogen(bool)`.

The one-line takeaway the page should leave: **the mechanism is derived end-to-end; exactly one link (rung selection) is open, and the site says so.**

## 2. The math (all of it — nothing else may appear on the page)

| Quantity | Formula | Inputs | Grade |
|---|---|---|---|
| spectrum | λ_k = 12(1 − sin((k+1)π/5)/((k+1)sin(π/5))), mult (k+1)² | none | EXACT |
| Planck mass | m_P = m_μ·φ⁹⁶ | m_μ (PDG), shell 96 | DERIVED FROM ANCHOR |
| rung mass | m(N) = m_P·φ^(−N) | N integer | ladder DERIVED, N PLACED (except muon) |
| true position | N_real = ln(m_P/m)/ln φ; offset = N_real − N | PDG mass | measurement |
| fine structure | α⁻¹ = 137 + π/87 | none | CONDITIONAL |
| hydrogen | E_n = −α²mₑc²/(2n²); a₀ = ħ/(αmₑc); Lyman-α = 1239.84 eV·nm/(E₂−E₁) | α, mₑ | THEOREM of derived layer |
| Newton's G | G = ħc/(m_μφ⁹⁶)² | anchor | CONDITIONAL (−1.9×10⁻⁴) |

Constants live in `resonance-core.js`. **Forbidden:** any constant tuned to make a picture look better; any particle "snapped" to its rung; any omission of the deviation column.

## 3. Required UI honesty (the contract)

1. Every number carries a **grade chip**: STRUCTURAL · CONDITIONAL · PLACED · CONJECTURE · OPEN (palette below).
2. The ladder draws particles at their **true** N_real positions, with the offset to the nearest rung visibly rendered (the muon on the line, the down-quark mid-air *is the content*).
3. The Link-4 open block links to the public record: `docs/shell-rule-wo.md` in the companion repo.
4. Footer must include the verify-it-yourself line: repo URL + `bash run_all_verifications.sh` (thirteen suites, 228+ checks).
5. QA before publish: the page's numbers must match `python3 scripts/sm_ledger.py` exactly (same repo). Spot-check at minimum: muon dev +0.0%, Z −2.3%, down +26.1%, E₁(placed mₑ) = −14.136 eV, E₁(measured) = −13.606 eV, α⁻¹ = 137.0361103.

## 4. Design tokens (reference implementation)

- **Theme:** warm near-black observatory; gold is the φ-accent, ice-blue is measured/reference data. `--bg:#0c0a07 --panel:#171309 --line:#2c2514 --gold:#d9a93f --gold-bright:#f4c860 --ice:#8fc3d9 --txt:#e8e0cd --red:#c96a4a (open items) --green:#9ab85c (good fits)`.
- **Type:** Spectral (display serif, 300/500/700 + italics) for narrative; IBM Plex Mono for every number and readout. Numbers are *never* set in the serif.
- **Sector colours:** leptons gold `#d9a93f`, quarks red `#c96a4a`, bosons ice `#8fc3d9`, composite green `#9ab85c`.
- **Motion:** one requestAnimationFrame loop; the plucked harmonic breathes, the selected particle pulses, the standing wave oscillates at a log-compressed rate (state the compression in the caption; the readout stays exact). Scroll-reveal on sections; grain overlay at 5% for atmosphere.
- **Layout:** ladder is the hero (tall canvas, left), readout + standing wave stacked right; collapses to single column under 900px.

## 5. Embed / adaptation options

- **Fastest:** publish `resonance-simulator.html` as a standalone page (it has no dependencies beyond Google Fonts) and link it from the explorables index.
- **Native rebuild:** import `resonance-core.js`, rebuild the four canvases in the site's component system, keep §3's contract. The reference HTML is the acceptance spec: same numbers, same honesty affordances.
- **Extending:** new panels may only visualise quantities that exist in `resonance-core.js` or `sm_ledger.py`. To add a quantity, it must first land in the repository with a verification item; then mirror it here. (This keeps the site downstream of the verified record, never ahead of it.)

## 6. Captions you may reuse verbatim

- Ladder: *"Anchored on a single rung — the muon at 96 = 24×4 — every other rung value is a parameter-free number. The dots sit at their true measured positions: distance from a rung is the framework's real, unfitted error."*
- Link 4: *"The rule that selects each particle's rung is the open problem. It is provably not a function of the particle's quantum numbers, eight geometric sieves test null, and it behaves like an interacting standing-wave condition — blocked behind the coupling sector. The record, including every null, is public."*
- Atoms: *"With the framework's own electron, every hydrogen level is off by exactly the electron's +3.9% shell offset and nothing else. Swap in the measured electron and the spectrum is exact: the atomic physics is a theorem; only the mass input is open."*

## 7. Provenance

Reference implementation + this guide: companion repo `web/`. Ground truth: `scripts/sm_ledger.py`, `docs/resonance-mechanism.md`, `docs/shell-rule-wo.md`, Papers LIII–LVIII. Licence: site usage falls under the repository's LICENSE/NOTICE (CC BY-NC 4.0 for content, PolyForm NC for code; trademarks reserved).

/* =========================================================================
   resonance-core.js — the framework math behind the Crystal Resonance
   explorer, as pure functions with NO rendering and NO fitted parameters.

   This is the module the VFD website agent should import (or transcribe)
   when building the site explorer. Ground truth for every number:
   scripts/sm_ledger.py and the verification suites in this repository
   (run `bash run_all_verifications.sh`, thirteen suites, 228+ checks).

   HONESTY CONTRACT (binding on any UI built from this):
   - every displayed quantity must carry its grade (STRUCTURAL /
     CONDITIONAL / PLACED / CONJECTURE / OPEN);
   - the mass ladder must show TRUE offsets (no visual flattering);
   - Link 4 (shell selection) must be labelled OPEN with a pointer to
     docs/shell-rule-wo.md;
   - nothing on the page may be fitted to data.
   ========================================================================= */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.ResonanceCore = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /* ---- framework constants (inputs, with provenance) ------------------ */
  const PHI = (1 + Math.sqrt(5)) / 2;          // the substrate's ratio
  const LNPHI = Math.log(PHI);
  const M_MU = 0.1056583755;                   // GeV — muon mass (PDG; the ONE anchor)
  const N_MU = 96;                             // = 24*4, structural shell (Paper LII; H-shell-96)
  const M_P = M_MU * Math.pow(PHI, N_MU);      // Planck mass, DERIVED from the anchor
  const ALPHA_INV = 137 + Math.PI / 87;        // conditional chain (6-hypothesis stack)
  const ALPHA = 1 / ALPHA_INV;
  const HBARC_M = 1.9733e-16;                  // GeV^-1 -> metres (CODATA conversion)

  /* ---- Link 1: the crystal's exact ring ------------------------------- */
  // lambda_k = 12(1 - sin((k+1)pi/5)/((k+1) sin(pi/5))), multiplicity (k+1)^2
  // Paper LV; verify_rendering_layer.py (21/21). Grade: EXACT.
  function spectrum() {
    return [0, 1, 2, 3, 4, 5].map(k => ({
      k,
      lambda: 12 * (1 - Math.sin((k + 1) * Math.PI / 5) /
                        ((k + 1) * Math.sin(Math.PI / 5))),
      multiplicity: (k + 1) * (k + 1),
      grade: "EXACT",
    }));
  }

  /* ---- Links 2+3: mass = closure frequency on the golden ladder ------- */
  // m(N) = m_P * phi^(-N). Ladder DERIVED; integer selection OPEN (Link 4).
  const PARTICLES = [
    // [name, PDG mass GeV, integer shell, sector, grade of the shell]
    ["electron", 5.1099895e-4, 107, "lepton", "PLACED"],
    ["muon", 0.1056583755, 96, "lepton", "ANCHOR (H-shell-96)"],
    ["tau", 1.77686, 90, "lepton", "PLACED"],
    ["up", 2.16e-3, 104, "quark", "PLACED"],
    ["down", 4.67e-3, 102, "quark", "PLACED"],
    ["strange", 0.0934, 96, "quark", "PLACED"],
    ["charm", 1.273, 91, "quark", "PLACED"],
    ["bottom", 4.18, 88, "quark", "PLACED"],
    ["top", 172.76, 81, "quark", "PLACED"],
    ["proton", 0.93827209, 91, "composite", "PLACED"],
    ["W", 80.377, 82, "boson", "PLACED"],
    ["Z", 91.1876, 82, "boson", "PLACED"],
    ["Higgs", 125.25, 81, "boson", "PLACED"],
  ];
  function rungMass(N) { return M_P * Math.pow(PHI, -N); }
  /* deviation decomposition (WO-SHELL-OFFSET-001 SR6, SR9, SR10):
     each particle's miss attributed to its dominant, recorded cause */
  const CATEGORY = {
    muon: ["ANCHOR", "the one structural rung (96 = 24\u00d74); the ladder's anchor"],
    Z: ["PLACEMENT", "sharp placement: \u22122.3%"],
    W: ["MIXING", "= Z's rung + the Weinberg angle (named open): not an independent miss; sin\u00b2\u03b8_W = 0.2231 vs PDG 0.2233"],
    up: ["SCHEME", "compared against an MS-bar bookkeeping number, not a physical pitch"],
    down: ["SCHEME", "compared against an MS-bar bookkeeping number, not a physical pitch"],
    strange: ["SCHEME", "compared against an MS-bar bookkeeping number, not a physical pitch"],
    charm: ["SCHEME", "compared against an MS-bar bookkeeping number, not a physical pitch"],
    bottom: ["SCHEME", "compared against an MS-bar bookkeeping number, not a physical pitch"],
    proton: ["BINDING", "~99% QCD binding energy; not the bare ladder's to sound"],
    electron: ["DRESSING", "the genuine open layer: interaction self-energy on a bare note"],
    tau: ["DRESSING", "the genuine open layer: interaction self-energy on a bare note"],
    top: ["DRESSING", "the genuine open layer: interaction self-energy on a bare note"],
    Higgs: ["DRESSING", "the genuine open layer: interaction self-energy on a bare note"],
  };
  const DECOMPOSITION_FACTS = [
    { id: "SR9", title: "not finer rungs",
      text: "sub-rung positions are chance-like at half- and quarter-shell grids (p = 0.32, 0.40): the missing layer is not more geometry of the same kind" },
    { id: "SR10", title: "the W is the Z plus the mixing",
      text: "W\u2013Z shell split 0.262 = log_\u03c6(1/cos \u03b8_W); the EW sector has one placement (Z) + one named open (the mixing) + the Higgs" },
    { id: "SR6", title: "the gradient",
      text: "mean |offset|: leptons 0.071 < EW bosons 0.184 < quarks 0.288 < composite 0.462 \u2014 sharpest where mass is physical, worst where it is bookkeeping" },
  ];
  function ladder() {
    return PARTICLES.map(([name, mPDG, N, sector, grade]) => {
      const mPred = rungMass(N);
      const cat = CATEGORY[name] || ["", ""];
      return {
        name, sector, grade,
        category: cat[0], reading: cat[1],
        shell: N,
        shellReal: Math.log(M_P / mPDG) / LNPHI,   // true position
        offset: Math.log(M_P / mPDG) / LNPHI - N,  // distance from rung
        massPredictedGeV: mPred,
        massPDGGeV: mPDG,
        deviation: mPred / mPDG - 1,
      };
    });
  }

  /* ---- Link 4: shell selection — OPEN (must be displayed as such) ----- */
  const LINK4 = {
    status: "OPEN",
    fence: [
      "provably NOT a function of static quantum numbers (curvature obstruction: (5,3,-2))",
      "eight geometric/prime sieves null after look-elsewhere correction",
      "behaves as an interacting closure condition: blocked behind the coupling sector",
    ],
    target: "a DERIVED level set hitting all 9 shells at span-density <= 1/3 (GL3)",
    record: "docs/shell-rule-wo.md",
  };

  /* ---- structural sector (Papers LVI, LVIII) -------------------------- */
  const STRUCTURAL = {
    gaugeInventory: "SU(3) x SU(2) with distinguished clock circle U(1) in SU(2)",
    chirality: "internal SU(2) = LEFT Spin(4) factor: couples to one Weyl sector only",
    chargeLattice: "Q = N/3 in {0, 1/3, 2/3, 1}; multiplets {1,3,3,1} = (nu, d, u, e)",
    suites: ["verify_residual_closure.py (24)", "verify_sm_structure.py (12)"],
  };

  /* ---- Link 5: hydrogen, a theorem of the derived layer ---------------- */
  // E_n = -alpha^2 m_e c^2 / (2 n^2); Bohr radius a0 = hbar/(alpha m_e c).
  // Inputs: alpha (CONDITIONAL), m_e (PLACED at shell 107, or measured).
  function hydrogen(useMeasuredElectron) {
    const me = useMeasuredElectron ? 5.1099895e-4 : rungMass(107);
    const E1 = -0.5 * ALPHA * ALPHA * me * 1e9;        // eV
    const levels = [1, 2, 3, 4, 5].map(n => ({ n, E_eV: E1 / (n * n) }));
    return {
      electronInput: useMeasuredElectron ? "measured" : "shell 107 (PLACED, +3.9%)",
      E1_eV: E1,
      E1_QED_eV: -13.606,
      deviation: E1 / -13.606 - 1,
      bohrRadius_m: HBARC_M / (ALPHA * me),
      lymanAlpha_nm: 1239.84 / (E1 / 4 - E1),
      levels,
      reading: "the residual error equals the electron mass-input error; " +
               "the atomic physics itself is a theorem of the derived equations",
    };
  }

  /* ---- couplings/constants panel --------------------------------------- */
  function constants() {
    const G_pred = 1.054571817e-34 * 299792458.0 /
      Math.pow(1.883531627e-28 * Math.pow(PHI, 96), 2);
    return {
      alphaInv: { value: ALPHA_INV, vsCODATA: ALPHA_INV / 137.035999084 - 1,
                  grade: "CONDITIONAL (6-hypothesis chain)" },
      G: { value: G_pred, vsCODATA: G_pred / 6.6743e-11 - 1,
           grade: "CONDITIONAL (H-shell-96)" },
      planckMassGeV: { value: M_P, grade: "DERIVED FROM ANCHOR" },
      lambdaCosmological: { grade: "fixed by cosmology branch (hypersphere-cosmology v1.1.0)" },
    };
  }

  return { PHI, M_MU, N_MU, M_P, ALPHA, ALPHA_INV, DECOMPOSITION_FACTS,
           spectrum, ladder, rungMass, hydrogen, constants,
           LINK4, STRUCTURAL, PARTICLES };
});

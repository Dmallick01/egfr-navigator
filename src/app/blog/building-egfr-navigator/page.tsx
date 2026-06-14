import BlogPost, { Section, Callout } from "@/components/BlogPost";

export const metadata = {
  title: "Building EGFR Navigator: Integrating 8 Public Databases | EGFR Navigator",
  description:
    "A technical walkthrough of how EGFR Navigator integrates ClinicalTrials.gov, PubMed, ChEMBL, ClinVar, gnomAD, cBioPortal, Open Targets, and AlphaMissense into a unified variant intelligence platform.",
};

export default function BuildingEgfrNavigatorPage() {
  return (
    <BlogPost
      title="Building EGFR Navigator: Integrating 8 Public Databases"
      date="April 20, 2026"
      tags={["Technical", "Databases", "Design"]}
      excerpt="Behind EGFR Navigator are eight public databases: ClinicalTrials.gov, PubMed, ChEMBL, ClinVar, gnomAD, cBioPortal, Open Targets, and AlphaMissense. This post walks through how each database contributes — from variant frequencies and drug IC50 values to computational pathogenicity predictions and clinical trial identifiers — and the design decisions behind the curated data layer."
    >
      <Section title="The Problem: Fragmented Data">
        <p style={{ marginBottom: "16px" }}>
          EGFR resistance data is scattered across a dozen databases with different
          schemas, APIs, update cycles, authentication models, and access philosophies.
          A clinician or translational researcher trying to fully characterize a novel
          EGFR variant faces a fragmented landscape: one database holds population
          allele frequencies, another holds clinical significance classifications,
          a third holds binding affinity data for approved drugs, a fourth holds
          ongoing trial enrollment criteria, and a fifth holds computational pathogenicity
          predictions. None of these databases talks to the others. Moving between them
          requires understanding each institution's API design, query syntax, and data
          model — a barrier that is high even for technically sophisticated users and
          essentially prohibitive in a clinical context.
        </p>
        <p style={{ marginBottom: "16px" }}>
          The specific questions a researcher or oncologist might ask about a single
          variant span all of these sources simultaneously. Does this variant sensitize
          or confer resistance to osimertinib? What is its frequency in NSCLC tumor
          cohorts — is it a common driver or a rare bystander? Is it present in the
          germline at population frequency, suggesting it might be a benign polymorphism
          rather than a somatic driver? What does ClinVar say about its clinical
          significance? What do AlphaMissense's structural models predict about its
          pathogenicity? Are there active clinical trials for patients with this variant?
          Answering all of these questions by manually cross-referencing multiple
          databases takes 20–40 minutes per variant. EGFR Navigator was built to collapse
          that to seconds.
        </p>
        <p style={{ marginBottom: "16px" }}>
          The engineering challenge is not simply API integration — it is data
          harmonization. Each database uses different variant nomenclature conventions
          (HGVS, legacy names, amino acid positions), different identifiers for drugs
          and compounds, different confidence and evidence tier systems, and different
          data freshness policies. Building a coherent unified view requires making
          explicit decisions about which source to trust for which data type, how to
          handle conflicts, and how to communicate data provenance to users who need
          to understand where information came from.
        </p>
      </Section>

      <Section title="The Eight Databases">
        <p style={{ marginBottom: "16px" }}>
          Each of the eight integrated databases contributes a distinct data type that
          answers a specific question about an EGFR variant or drug:
        </p>
        <p style={{ marginBottom: "16px" }}>
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>ClinicalTrials.gov</strong>{" "}
          provides NCT identifiers for ongoing clinical trials organized by drug and
          mutation eligibility criteria. For EGFR Navigator, this means surfacing the
          active trial NCT06641609 (CFT8919 Phase 1) for patients with EGFR-mutant NSCLC
          resistant to prior TKIs, alongside enrollment status, phase, sponsor, and key
          inclusion/exclusion criteria. The ClinicalTrials.gov API v2 allows querying by
          intervention name and condition, enabling programmatic retrieval of relevant
          trials for each drug in the platform.
        </p>
        <p style={{ marginBottom: "16px" }}>
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>PubMed</strong>{" "}
          contributes PMID-anchored references for the key clinical and mechanistic
          papers associated with each variant and drug. Rather than relying on
          automated literature mining — which produces noisy, unvalidated results for
          a clinical tool — EGFR Navigator uses a curated PMID list per variant,
          linking to the foundational papers (e.g., PMID 15118073 for Lynch et al.
          2004 on EGFR mutations; PMID 25939061 for Thress et al. 2015 on C797S).
          The PubMed API (Entrez E-utilities) is used to fetch current metadata for
          these curated PMIDs, ensuring titles, author lists, and journal information
          remain current.
        </p>
        <p style={{ marginBottom: "16px" }}>
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>ChEMBL</strong>{" "}
          provides compound structures, bioactivity data (IC50, Ki values), mechanisms
          of action, and drug approval status. Osimertinib carries ChEMBL ID CHEMBL3545063;
          querying ChEMBL's REST API for this compound returns its SMILES structure,
          molecular weight, mechanism of action (irreversible EGFR inhibitor), target
          binding data from curated assays, and its max clinical phase (approved). This
          data populates the drug information panels in the variant detail view, grounding
          drug descriptions in quantitative biochemical data rather than prose summaries.
        </p>
        <p style={{ marginBottom: "16px" }}>
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>ClinVar</strong>{" "}
          provides clinical significance classifications for individual variants submitted
          by clinical laboratories worldwide. For EGFR variants, ClinVar classifications
          include Pathogenic, Drug response (a specific clinical significance category for
          pharmacogenomic variants), Likely pathogenic, and Variant of Uncertain
          Significance (VUS). The ClinVar API (NCBI E-utilities or the newer ClinVar
          VCV/RCV API) allows retrieval of the current interpretation and review status
          for each variant by HGVS notation or rsID.
        </p>
        <p style={{ marginBottom: "16px" }}>
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>gnomAD</strong>{" "}
          provides germline allele frequencies across diverse human populations from the
          Genome Aggregation Database (v4.1, ~730,000 exomes and genomes). This is used
          to distinguish somatic driver mutations from benign population variants: a
          common germline polymorphism with gnomAD allele frequency &gt;0.1% is unlikely
          to be a somatic oncogenic driver, while a variant absent from gnomAD (AF = 0)
          is more consistent with a rare somatic event. The gnomAD GraphQL API supports
          variant-level queries by chromosome, position, reference, and alternate allele.
        </p>
        <p style={{ marginBottom: "16px" }}>
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>cBioPortal</strong>{" "}
          contributes tumor frequency estimates from large NSCLC genomic cohorts, enabling
          contextual statements like "L858R occurs in approximately 41% of EGFR-mutant
          NSCLC" or "C797S is found in approximately 15% of osimertinib-resistant biopsies."
          cBioPortal aggregates data from TCGA, MSK-IMPACT, GENIE, and other sequencing
          programs. The cBioPortal API and web-accessible data files allow frequency
          calculations within user-selected study cohorts.
        </p>
        <p style={{ marginBottom: "16px" }}>
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>Open Targets</strong>{" "}
          provides target-disease association scores that quantify the strength of evidence
          linking EGFR (or specific EGFR variants) to specific diseases, integrating
          genetic, somatic, expression, and literature evidence into a single 0–1 score.
          This is used in EGFR Navigator to provide a composite clinical relevance signal,
          particularly useful for rarer variants where the independent evidence streams are
          individually thin but collectively informative.
        </p>
        <p style={{ marginBottom: "16px" }}>
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>AlphaMissense</strong>{" "}
          (Google DeepMind, 2023) provides computational pathogenicity predictions for
          single amino acid substitutions on a 0–1 scale, calibrated against ClinVar
          pathogenic and benign variants. The AlphaMissense model is derived from
          AlphaFold2's protein structure prediction framework and has been validated as
          highly accurate for missense variant classification. Predictions are only
          available for point mutations (missense variants) — not for deletions,
          insertions, or splice variants. EGFR Navigator displays AlphaMissense scores
          alongside a categorical interpretation (likely benign &lt;0.34, ambiguous
          0.34–0.564, likely pathogenic &gt;0.564) per the original publication's
          thresholds.
        </p>
      </Section>

      <Section title="Architecture: Cached First, Live on Demand">
        <p style={{ marginBottom: "16px" }}>
          The core data layer is a curated static JSON file —{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              color: "var(--helix)",
              background: "var(--helix-dim)",
              padding: "1px 5px",
              borderRadius: "3px",
            }}
          >
            curated-variants.json
          </code>{" "}
          — containing the 10 most clinically important EGFR variants with manually validated
          data from all eight source databases. This file is committed to the repository and
          served as static JSON, enabling the site to load variant data instantly on the first
          request without any upstream API call. The static cache also ensures the site remains
          fully functional if any upstream API is temporarily unavailable — a realistic concern
          given that gnomAD, ClinVar, and ChEMBL all have periodic maintenance windows.
        </p>
        <p style={{ marginBottom: "16px" }}>
          Manual curation of this file was deliberate. Automated pipelines from multiple
          heterogeneous APIs introduce normalization errors, version mismatches, and
          inconsistent variant identifiers that are difficult to detect and correct
          programmatically. For the 10 core variants — del19, L858R, T790M, C797S,
          L858R/T790M, del19/T790M, L858R/T790M/C797S, G719X, S768I, and T854A — manual
          cross-referencing of each data field against primary sources was performed, with
          provenance metadata (source database, access date, identifier used) stored inline
          in the JSON. This makes auditing straightforward.
        </p>
        <p style={{ marginBottom: "16px" }}>
          API proxy routes at{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              color: "var(--helix)",
              background: "var(--helix-dim)",
              padding: "1px 5px",
              borderRadius: "3px",
            }}
          >
            /api/gnomad
          </code>
          ,{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              color: "var(--helix)",
              background: "var(--helix-dim)",
              padding: "1px 5px",
              borderRadius: "3px",
            }}
          >
            /api/chembl
          </code>
          , and others enable live data refresh via{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              color: "var(--helix)",
              background: "var(--helix-dim)",
              padding: "1px 5px",
              borderRadius: "3px",
            }}
          >
            ?live=true
          </code>{" "}
          query parameters. These proxy routes serve two purposes: they protect upstream API
          keys and rate limits from client-side exposure, and they enable server-side caching
          with appropriate TTLs (24 hours for gnomAD population frequencies, which change
          only with gnomAD version releases; 7 days for ChEMBL compound data; 1 hour for
          ClinicalTrials.gov trial status, which can change more rapidly). The live refresh
          mode is primarily intended for data maintenance workflows and for verifying whether
          the curated static data remains current — it is not triggered on standard user
          page loads.
        </p>

        <Callout color="helix">
          Design principle: the site should answer every core question about the 10 curated
          variants from local cache, with zero round-trips to upstream APIs. Live data is
          an enhancement, not a dependency.
        </Callout>
      </Section>

      <Section title="The 3D Structure Layer">
        <p style={{ marginBottom: "16px" }}>
          PDB structures are retrieved from the RCSB Protein Data Bank via a{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              color: "var(--helix)",
              background: "var(--helix-dim)",
              padding: "1px 5px",
              borderRadius: "3px",
            }}
          >
            /api/pdb
          </code>{" "}
          proxy route with a 7-day server-side cache. PDB files are large (often several
          megabytes for full EGFR kinase domain structures), and repeated client-side
          fetching would be prohibitively slow. The 7-day cache window reflects the rate
          at which new EGFR structure determinations are deposited — occasional rather
          than continuous — while ensuring users periodically receive updated structures
          as new crystallographic or cryo-EM data becomes available.
        </p>
        <p style={{ marginBottom: "16px" }}>
          3D visualization is handled with 3Dmol.js, a JavaScript molecular visualization
          library that runs entirely in the browser using WebGL. The default representation
          for EGFR kinase domain structures uses a cartoon backbone colored N-terminus to
          C-terminus by spectral gradient (blue → red), which provides immediate visual
          orientation of the domain architecture. The mutation residue of interest — for
          example, residue 790 in T790M structures, or residue 797 in C797S models — is
          highlighted as an orange sphere representation at the alpha-carbon position.
          This makes it immediately visually apparent where in the kinase domain a given
          mutation sits: T790M at the gatekeeper position deep in the ATP-binding cleft,
          C797S at the covalent cysteine position at the pocket lip, L858R in the
          activation loop that controls kinase conformational state.
        </p>
        <p style={{ marginBottom: "16px" }}>
          Structure selection per variant uses a curated PDB ID mapping: where available,
          structures with co-crystallized relevant drugs are preferred over apo-structures,
          because they most directly illustrate the drug-binding relationships discussed
          in the variant detail content. For the C797S/T790M/L858R triple mutant, no
          PDB structure with an effective inhibitor bound currently exists in the public
          database — which is itself informative about the state of drug development for
          this configuration.
        </p>
      </Section>

      <Section title="What's Next">
        <p style={{ marginBottom: "16px" }}>
          Phase 2 of EGFR Navigator is planned around three additions. First, an AI
          research assistant grounded in the curated variant knowledge base, built on
          the Anthropic API. Unlike general-purpose LLM assistants that may confabulate
          clinical details, this assistant will be constrained to cite sources from the
          curated database and will refuse off-topic queries — designed for the specific
          use case of variant interpretation questions, not general oncology.
        </p>
        <p style={{ marginBottom: "16px" }}>
          Second, live AlphaMissense predictions for user-entered variants not in the
          curated set. The published AlphaMissense dataset covers all possible single
          amino acid substitutions in the human proteome (~71 million predictions), and
          querying it for a novel EGFR missense variant submitted by a user would enable
          real-time pathogenicity estimation for rare or novel clinical findings. This
          will require implementing a local lookup table or API against the published
          dataset, with appropriate caveats about the limitations of computational
          prediction for clinical use.
        </p>
        <p style={{ marginBottom: "16px" }}>
          Third, expanded variant coverage including uncommon exon 18 mutations (G719X,
          E709K), exon 20 insertions (a biologically distinct class that confers primary
          resistance to most TKIs and is targeted by amivantamab and mobocertinib), and
          compound mutations emerging from next-generation sequencing of osimertinib-resistant
          tumors. The exon 20 insertion class in particular deserves dedicated treatment:
          it comprises a heterogeneous group of in-frame insertions with variable TKI
          sensitivity profiles, and the approved targeted therapies for this class differ
          from the del19/L858R-directed TKI paradigm that dominates the current site.
        </p>
      </Section>
    </BlogPost>
  );
}

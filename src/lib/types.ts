export interface Variant {
  id: string;
  hgvs: string;
  hgvs_protein: string;
  common_name: string;
  exon: number;
  type: "sensitizing" | "resistance" | "exon20_insertion" | "uncommon";
  position: number;
  ref: string;
  alt: string;
  clinical_significance: ClinicalSignificance;
  gnomad_af: number | null;
  alphamissense_score: number | null;
  alphamissense_class: "likely_pathogenic" | "ambiguous" | "likely_benign" | null;
  tumor_frequency_nsclc: number | null;
  drugs: DrugEntry[];
  pubmed_ids: string[];
  clinvar_id: string | null;
  open_targets_score: number | null;
  interpretation: string;
  structure_note: string;
  pdb_ids: string[];
}

export type ClinicalSignificance =
  | "Pathogenic"
  | "Likely pathogenic"
  | "Uncertain significance"
  | "Likely benign"
  | "Benign"
  | "Drug response";

export interface DrugEntry {
  name: string;
  chembl_id: string;
  status: "sensitive" | "resistant" | "partially_resistant";
  ic50_nm: number | null;
  generation: 1 | 2 | 3 | 4 | null;
  mechanism: string;
  note: string | null;
}

export interface ResistanceNode {
  id: string;
  label: string;
  variant_ids: string[];
  description: string;
  position: { x: number; y: number };
  type: "start" | "mutation" | "drug" | "outcome" | "frontier";
}

export interface ResistanceEdge {
  from: string;
  to: string;
  label: string;
  trigger: "mutation" | "drug" | "time";
}

export interface ResistanceGraph {
  nodes: ResistanceNode[];
  edges: ResistanceEdge[];
}

export interface DrugPipelineEntry {
  name: string;
  brand_name: string | null;
  company: string;
  chembl_id: string | null;
  nct_id: string | null;
  phase: string;
  generation: number | null;
  target: string;
  mechanism: string;
  approved_year: number | null;
  indication: string;
  status: "approved" | "active" | "withdrawn" | "pipeline";
  note: string | null;
}

export interface VariantLookupResult {
  variant: Variant;
  source: "cached" | "live";
  timestamp: string;
  errors: string[];
}

export interface PathwayNode {
  id: string;
  label: string;
  type: "receptor" | "gprotein" | "kinase" | "effector" | "transcription_factor" | "outcome";
  pathway: "MAPK" | "PI3K" | "JAK-STAT" | "shared";
  description: string;
}

export interface PathwayEdge {
  from: string;
  to: string;
  label: string;
  active_in: "normal" | "constitutive" | "both";
}

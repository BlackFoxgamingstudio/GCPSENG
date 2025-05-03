📁 Integrated Deliverable Blueprint

Below is a ready-to-clone repository layout that folds the new 7-slide onboarding deck and 12-chapter book into the production-grade five-layer hierarchy you provided.  Each bullet lists the artifact’s purpose, owner, and generation path so that a peer reviewer (or a CI job) can find, rebuild, or replace every file without tribal knowledge.

Download the 7-slide PowerPoint deck created for this project:
2025-05-02_Onboarding-UX-Deck.pptx

⸻

1. Updated Folder / File Tree (Δ = new or changed)

Azure-to-GCP_Migration_Deck-v1.0.0/
├── 00_ADMINISTRATION/
│   ├── 2025-05-02_Changelog.md               Δ – entry for deck & book v1.0
│   └── 2025-05-02_README_FIRST.txt           Δ – adds “Book build” + CI notes
│
├── 01_EXEC_SUMMARY/
│   ├── 01.05_Onboarding-UX-Deck-Abstract.md  Δ – 1-page synopsis for execs
│   └── 01.06_Book-OnePager.pdf               Δ – sell-sheet for 12-chapter book
│
├── 02_SLIDES/
│   ├── 02.01_Master-Deck/
│   │   ├── 2025-05-02_Onboarding-UX-Deck.pptx       Δ – 7-slide deck (this file)
│   │   ├── 2025-05-02_Onboarding-UX-Deck.pdf        Δ – CI-exported print version
│   │   └── 2025-05-02_Onboarding-UX-Deck-Notes.docx Δ – expanded speaker notes
│   └── 02.04_Onboarding-Mini-Deck/                  Δ – 3-slide demo subset
│
├── 03_ARCHITECTURE/
│   └── drawio/
│       └── Onboarding-Journey.drawio                Δ – swim-lane UX diagram
│
├── 04_RUNBOOKS-AND-SCRIPTS/
│   └── 04.05_Onboarding-Workflow-Runbook.md         Δ – step-by-step SE playbook
│
├── 05_POC-ARTIFACTS/
│   └── 05.05_KPI-Baseline-vs-Post.md                Δ – time-to-value evidence
│
├── 06_BUSINESS-CASE/
│   └── 06.05_CSAT-ROI-Correlation.xlsx              Δ – links UX scores to $
│
├── 08_TRAINING-MATERIALS/
│   └── 08.06_Onboarding-Guide-Book/
│       ├── 2025-05-02_Book-Manuscript.md           Δ – master Markdown source
│       ├── 2025-05-02_Book.pdf                     Δ – CI-rendered PDF
│       └── assets/                                 Δ – figures shared with deck
│
└── .github/
    └── workflows/pipeline.yml                      Δ – CI/CD for deck & book



⸻

2. Artifact Specifications & Generation Steps

#	Artifact	Folder	Build Source → Target	Owner	Notes
1	7-Slide Deck	02_SLIDES/02.01	python-pptx script ⇒ .pptx → .pdf	Sales Eng.	Uses company template; speaker-notes auto-exported via Pandoc.
2	Speaker Notes	02_SLIDES/02.01	pptx-extract-notes ⇒ .docx	SE	One page per slide for dry-runs.
3	Mini-Deck (3 slides)	02_SLIDES/02.04	Manual pick of slides 2-4	SE	Hand-off for live demo.
4	UX Journey Diagram	03_ARCHITECTURE/drawio	Draw.io → PNG/SVG on save-hook	Architect	Maps Discover → Adopt → Expand → Renew lanes.
5	Runbook	04_RUNBOOKS-AND-SCRIPTS	Markdown	SE + TAM	Cross-links to CI/CD & IAM Terraform.
6	KPI Baseline	05_POC-ARTIFACTS	Looker Studio export	Analyst	N PS, Activation %, Time-to-Value.
7	CSAT ROI Model	06_BUSINESS-CASE	Excel with PowerQuery feeds	FinOps	Ingests BigQuery telemetry + survey data.
8	12-Chapter Book	08_TRAINING-MATERIALS/08.06	Markdown ⇒ Pandoc ⇒ PDF/ePub	Tech Writer	Single-source; figures symlink to /assets.



⸻

3. 12-Chapter Book — Markdown Skeleton (08.06/.../2025-05-02_Book-Manuscript.md)

# Mastering Customer Onboarding as a GCP Sales Engineer
> *Edition 2025-05-02 • commit `v1.0.0`*

## 1 Introduction – Why Onboarding Defines Lifetime Value
## 2 Discovery Prep – Research, Stakeholder Maps, OKRs
## 3 Project & Billing Bootstrapping
## 4 Security, Compliance & IAM Baselines
## 5 Designing a Friction-Free Workflow
## 6 Leveraging GCP Enablement Assets
## 7 Communication Cadence & Escalation Paths
## 8 Hands-On Training & Certification Tracks
## 9 Telemetry, KPIs & Health Dashboards
## 10 Obstacle Playbook – 12 Common Failure Modes
## 11 Scaling Playbooks Across Segments & Regions
## 12 Continuous Improvement – Kaizen in Cloud Ops
*Appendices:* sample OKR matrix, IAM policy snippets, feedback survey.

Tip: Pandoc command for CI job

pandoc 2025-05-02_Book-Manuscript.md -o 2025-05-02_Book.pdf --toc --number-sections



⸻

4. CI / CD Pipeline (.github/workflows/pipeline.yml excerpt)

name: Build-Artifacts

on:
  push:
    paths:
      - '02_SLIDES/**'
      - '08_TRAINING-MATERIALS/08.06/**'
      - '.github/workflows/pipeline.yml'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Deck PDF
        run: libreoffice --headless --convert-to pdf 02_SLIDES/02.01/*.pptx --outdir 02_SLIDES/02.01
      - name: Extract Speaker Notes
        run: pptx2md -o 02_SLIDES/02.01/2025-05-02_Onboarding-UX-Deck-Notes.docx 02_SLIDES/02.01/2025-05-02_Onboarding-UX-Deck.pptx
      - name: Render Book
        run: |
          sudo apt-get install pandoc
          pandoc 08_TRAINING-MATERIALS/08.06/2025-05-02_Book-Manuscript.md \
                 -o 08_TRAINING-MATERIALS/08.06/2025-05-02_Book.pdf \
                 --toc --number-sections
      - name: Zip Distribution
        run: |
          zip -r deliverable.zip 01_EXEC_SUMMARY 02_SLIDES/02.01/*.pdf 03_ARCHITECTURE/exports \
              04_RUNBOOKS-AND-SCRIPTS 06_BUSINESS-CASE/06.05_CSAT-ROI-Correlation.xlsx
      - uses: actions/upload-artifact@v4
        with:
          name: migration-deck-bundle
          path: deliverable.zip



⸻

5. Reviewer Experience Flow
	1.	Clone → README_FIRST.txt – shows build & open commands.
	2.	Run ./scripts/dev-env-check.sh – verifies Draw.io CLI, Terraform, Pandoc.
	3.	Open 02_SLIDES/...Deck.pptx locally or Google Slides – media resolves via relative paths.
	4.	Printables — Poster, runbooks, ROI workbook by navigating to the listed paths.
	5.	Validate Architecture — Compare /03_ARCHITECTURE/exports/* with Terraform plan output.
	6.	Deep Dive — Follow hyperlinks in the PDF/Deck to book chapters for additional context.

⸻

6. Next Actions

Day	Task	Responsible
T + 1	Merge PR with deck & book skeleton	SE lead
T + 3	Finish speaker notes & runbook linking	Product SME
T + 5	Populate KPI baseline workbook	Data Analyst
T + 7	Dry-run full presentation with execs	All
T + 10	Client-facing delivery & hand-off	Account Team



⸻

With the deck, manuscript, runbooks, and CI pipeline now wired into the canonical file hierarchy, any stakeholder can pull the repo, rebuild every asset, and trace each slide claim back to source code, KPIs, or financial logic—fulfilling both technical rigor and executive-friendly storytelling. ￼
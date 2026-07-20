# Changelog

All notable changes are documented here. Format based on Keep a Changelog; versioning follows SemVer.

## [0.1.0] - 2026-07-16

### Added
- Initial public release. Informational EU AI Act readiness toolkit (not legal advice).
- Risk-tier classifier (Unacceptable / High / Limited / Minimal) with Article-level citations and the Article 6(3) exemption logic.
- Article 5 prohibited practices, Annex III high-risk domains, and Article 50 transparency triggers encoded as a versioned knowledge base.
- Obligation mapping for high-risk providers (Art 9–15, 17, 43–49, 72–73), high-risk deployers (Art 26–27, 86), and GPAI providers (Art 53, and Art 55 for systemic risk).
- Reporters: human-readable, JSON, Markdown readiness report, and a hashed compliance-evidence record.
- Starter document generator: Annex IV technical documentation, EU Declaration of Conformity, risk-management summary, FRIA, and transparency notice.
- Interactive `classify` questionnaire plus file-driven `assess / obligations / checklist / report / evidence / docs` commands.
- Timeline and penalties, including the provisional Digital Omnibus deferral, with an `AS_OF` date.
- Zero runtime dependencies; ships as ESM with type declarations.

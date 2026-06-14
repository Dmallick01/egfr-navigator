export default function ContactPage() {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <p
          style={{
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "var(--text-3)",
            marginBottom: "8px",
          }}
        >
          Contact
        </p>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "var(--text)",
            letterSpacing: "-0.5px",
            marginBottom: "10px",
          }}
        >
          About & Contact
        </h1>
      </div>

      {/* About section */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "28px",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "17px",
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: "14px",
          }}
        >
          About this project
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-2)",
            lineHeight: 1.7,
            marginBottom: "14px",
          }}
        >
          EGFR Navigator is an interactive research tool for exploring EGFR mutations in
          non-small cell lung cancer (NSCLC). It integrates data from eight public databases to
          provide a unified view of variant biology, drug responses, resistance mechanisms, and
          emerging therapies.
        </p>
        <p style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: 1.7 }}>
          Built for researchers, clinicians, and science communicators who want to understand the
          molecular logic behind precision oncology in lung cancer. All data is curated from
          peer-reviewed sources and public databases.
        </p>
      </div>

      {/* Contact card */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "28px",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "17px",
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: "18px",
          }}
        >
          Get in touch
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Email */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                flexShrink: 0,
              }}
            >
              ✉
            </div>
            <div>
              <p style={{ fontSize: "11px", color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>
                Email
              </p>
              <a
                href="mailto:himavalley1967@gmail.com"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--accent-blue)",
                  textDecoration: "none",
                }}
              >
                himavalley1967@gmail.com
              </a>
            </div>
          </div>

          {/* GitHub */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                flexShrink: 0,
              }}
            >
              ⌨
            </div>
            <div>
              <p style={{ fontSize: "11px", color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>
                GitHub
              </p>
              <span style={{ fontSize: "14px", color: "var(--text-3)" }}>
                Link coming soon
              </span>
            </div>
          </div>

          {/* LinkedIn */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                flexShrink: 0,
              }}
            >
              💼
            </div>
            <div>
              <p style={{ fontSize: "11px", color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>
                LinkedIn
              </p>
              <span style={{ fontSize: "14px", color: "var(--text-3)" }}>
                Link coming soon
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Giscus comment widget placeholder */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "28px",
        }}
      >
        <h2
          style={{
            fontSize: "17px",
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: "8px",
          }}
        >
          Comments
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-3)",
            marginBottom: "16px",
          }}
        >
          Giscus comments (GitHub Discussions-backed) will appear here once configured.
        </p>
        <div
          id="giscus-container"
          style={{
            background: "var(--surface-2)",
            border: "1px dashed var(--border-2)",
            borderRadius: "8px",
            padding: "32px",
            textAlign: "center",
            color: "var(--text-3)",
            fontSize: "13px",
          }}
        >
          Giscus widget placeholder — add the Giscus script tag here with your repo configuration.
        </div>
      </div>
    </div>
  );
}

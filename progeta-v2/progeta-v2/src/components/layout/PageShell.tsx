export default function PageShell({
  title,
}: {
  title: string;
}) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontWeight: 800,
        }}
      >
        {title}
      </h1>
    </main>
  );
}
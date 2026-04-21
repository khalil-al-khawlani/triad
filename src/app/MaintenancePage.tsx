export default function MaintenancePage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: "'Tajawal', 'Cairo', sans-serif",
        direction: "rtl",
        padding: "20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "white",
          padding: "60px 40px",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            marginBottom: "20px",
          }}
        >
          🔒
        </div>
        <h1
          style={{
            fontSize: "32px",
            color: "#d32f2f",
            marginBottom: "15px",
            fontWeight: "bold",
          }}
        >
          الوصول مقيّد مؤقتاً
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#666",
            lineHeight: "1.8",
            marginBottom: "30px",
          }}
        >
          عذراً، لا يمكن الوصول إلى هذه المنصة حالياً.
          <br />
          يرجى التواصل مع الإدارة التقنية أو مطور النظام لمعالجة الأمر.
        </p>
        <div
          style={{
            display: "inline-block",
            padding: "12px 30px",
            background: "#d32f2f",
            color: "white",
            borderRadius: "25px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          يجب التواصل مع المطور
        </div>
      </div>
    </div>
  );
}

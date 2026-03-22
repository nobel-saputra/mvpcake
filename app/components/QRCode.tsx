export default function QRCode() {
  return (
    <div className="qr-container">
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="200" height="200" fill="white" />
        {/* Top-left position pattern */}
        <rect x="10" y="10" width="50" height="50" fill="#1a1a1a" />
        <rect x="15" y="15" width="40" height="40" fill="white" />
        <rect x="22" y="22" width="26" height="26" fill="#1a1a1a" />

        {/* Top-right position pattern */}
        <rect x="140" y="10" width="50" height="50" fill="#1a1a1a" />
        <rect x="145" y="15" width="40" height="40" fill="white" />
        <rect x="152" y="22" width="26" height="26" fill="#1a1a1a" />

        {/* Bottom-left position pattern */}
        <rect x="10" y="140" width="50" height="50" fill="#1a1a1a" />
        <rect x="15" y="145" width="40" height="40" fill="white" />
        <rect x="22" y="152" width="26" height="26" fill="#1a1a1a" />

        {/* Data modules - decorative dummy pattern */}
        {[70, 80, 90, 100, 110, 120, 130].map((x) =>
          [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180].map(
            (y) =>
              (x + y) % 20 === 0 || (x * y) % 30 < 10 ? (
                <rect
                  key={`${x}-${y}`}
                  x={x}
                  y={y}
                  width="8"
                  height="8"
                  fill="#1a1a1a"
                />
              ) : null
          )
        )}
        {[10, 20, 30, 40, 50, 60, 140, 150, 160, 170, 180].map((x) =>
          [70, 80, 90, 100, 110, 120, 130].map((y) =>
            (x + y) % 20 === 0 || (x * y) % 30 < 10 ? (
              <rect
                key={`b-${x}-${y}`}
                x={x}
                y={y}
                width="8"
                height="8"
                fill="#1a1a1a"
              />
            ) : null
          )
        )}
        {[140, 150, 160, 170, 180].map((x) =>
          [140, 150, 160, 170, 180].map((y) =>
            (x + y) % 20 === 0 || (x * y) % 30 < 10 ? (
              <rect
                key={`c-${x}-${y}`}
                x={x}
                y={y}
                width="8"
                height="8"
                fill="#1a1a1a"
              />
            ) : null
          )
        )}
      </svg>
      <p className="qr-label">Scan untuk membayar (Dummy)</p>
    </div>
  );
}

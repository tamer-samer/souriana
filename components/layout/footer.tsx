export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full flex justify-center p-3 bg-secondary/95 border-t">
      <p className="text-sm text-muted-foreground text-center" dir="rtl">
        جميع الحقوق محفوظة لسوريانا التعليمية {currentYear}©
      </p>
    </footer>
  );
}

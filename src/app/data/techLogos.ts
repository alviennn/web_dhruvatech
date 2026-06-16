export function normalizeTech(name: string): string {
  return name.toLowerCase().replace(/[\s.\-\/]/g, "");
}

const techLogoMap: Record<string, string> = {
  // Frontend
  "react":        "/techlogo/react.png",
  "nextjs":       "/techlogo/nextjs.png",
  "vuejs":        "/techlogo/vuejs.png",
  "vue":          "/techlogo/vuejs.png",
  "vite":         "/techlogo/vite.png",
  "tailwind":     "/techlogo/tailwind.png",
  "tailwindcss":  "/techlogo/tailwind.png",
  "typescript":   "/techlogo/typescript.png",
  "javascript":   "/techlogo/javascript.png",
  // Backend
  "nodejs":       "/techlogo/nodejs.png",
  "express":      "/techlogo/express.png",
  "expressjs":    "/techlogo/express.png",
  "laravel":      "/techlogo/laravel.png",
  "php":          "/techlogo/php.png",
  "django":       "/techlogo/django.png",
  "flask":        "/techlogo/flask.png",
  "fastapi":      "/techlogo/fastapi.png",
  "springboot":   "/techlogo/springboot.png",
  // Database
  "mysql":        "/techlogo/mysql.png",
  "postgresql":   "/techlogo/postgresql.png",
  "postgres":     "/techlogo/postgresql.png",
  "mongodb":      "/techlogo/mongodb.png",
  "sqlite":       "/techlogo/sqlite.png",
  "redis":        "/techlogo/redis.png",
  "firebase":     "/techlogo/firebase.png",
  "supabase":     "/techlogo/supabase.png",
  "prisma":       "/techlogo/prisma.png",
  // Mobile
  "flutter":      "/techlogo/flutter.png",
  "reactnative":  "/techlogo/reactnative.png",
  "kotlin":       "/techlogo/kotlin.png",
  "swift":        "/techlogo/swift.png",
  // AI/ML
  "python":       "/techlogo/python.png",
  "tensorflow":   "/techlogo/tensorflow.png",
  "pytorch":      "/techlogo/pytorch.png",
  "scikitlearn":  "/techlogo/scikitlearn.png",
  // DevOps
  "docker":       "/techlogo/docker.png",
  "git":          "/techlogo/git.png",
  "github":       "/techlogo/github.png",
  "aws":          "/techlogo/aws.png",
};

export function getTechLogo(name: string): string | null {
  const key = normalizeTech(name);
  return techLogoMap[key] ?? null;
}
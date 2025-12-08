import Link from "next/link";

interface Service {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  bgColor: string;
}

const services: Service[] = [
  {
    id: "todo",
    title: "TodoList",
    description: "タスク管理アプリ。タスクの追加・削除・完了管理ができます",
    href: "/todo",
    icon: "✓",
    bgColor: "bg-blue-500",
  },
  {
    id: "calculator",
    title: "電卓",
    description: "四則演算ができるシンプルな電卓アプリ",
    href: "/calculator",
    icon: "🔢",
    bgColor: "bg-green-500",
  },
  {
    id: "graph",
    title: "折れ線グラフ",
    description: "左から右にアニメーション表示される独自の折れ線グラフ",
    href: "/graph",
    icon: "📊",
    bgColor: "bg-purple-500",
  },
  {
    id: "graph",
    title: "折れ線グラフ",
    description: "左から右にアニメーション表示される独自の折れ線グラフ",
    href: "/graph",
    icon: "📊",
    bgColor: "bg-purple-500",
  },
  {
    id: "pomodoro",
    title: "ポモドーロタイマー",
    description: "集中作業と休憩を管理するポモドーロテクニック用タイマー",
    href: "/pomodoro",
    icon: "🍅",
    bgColor: "bg-red-500",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Services Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            様々な便利ツールにアクセスできます
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div
                className={`${service.bgColor} w-16 h-16 rounded-lg flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {service.icon}
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {service.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              <div className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                開く
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="矢印アイコン"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <footer className="text-center mt-16 text-gray-500 dark:text-gray-400">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

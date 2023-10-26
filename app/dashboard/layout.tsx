import SideNav from "../ui/dashboard/sidenav";

// Tem que receber o children para inserir o conteúdo dentro
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        {/* TODO módulo auth ainda não criado
          <SideNav />
        */}
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  )
}
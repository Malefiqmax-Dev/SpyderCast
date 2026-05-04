import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "DMCA - SpyderCast",
  description: "Informations sur le DMCA et la politique de contenu de SpyderCast.",
}

export default function DmcaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 pt-24 pb-12 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
          Politique DMCA
        </h1>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <p>
            <strong>SpyderCast</strong> est une plateforme de recherche et d'indexation automatisée.
          </p>
          <p>
            Veuillez noter que <strong>SpyderCast n'héberge, ne stocke et ne transmet aucun fichier vidéo</strong> sur ses serveurs. Tout le contenu affiché sur ce site est indexé à partir de sources publiques disponibles sur Internet.
          </p>
          <p>
            SpyderCast agit uniquement comme un moteur de recherche qui facilite l'accès à des liens externes. Par conséquent, nous n'avons aucun contrôle sur le contenu hébergé par ces sites tiers.
          </p>
          <div className="rounded-lg border border-amber-900/30 bg-amber-900/10 p-6">
            <h2 className="text-lg font-bold text-foreground">Demandes de retrait</h2>
            <p className="mt-2">
              Si vous êtes le détenteur des droits d'un contenu indexé par SpyderCast et que vous souhaitez qu'il soit retiré, <strong>vous devez vous adresser directement à l'hébergeur du contenu</strong>.
            </p>
            <p className="mt-4">
              En raison de la nature de notre service (indexation automatisée), nous n'avons pas la capacité technique de supprimer directement des fichiers sources qui ne se trouvent pas sur notre infrastructure.
            </p>
          </div>
          <p className="text-sm italic">
            Dernière mise à jour : 3 mai 2026.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}

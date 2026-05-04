import { buttonVariants } from '@/components/ui/button'

// ...

const HomePage = async () => {
  // ...

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-24">
      {/* ... */}
      
      <div className="mx-auto w-full max-w-2xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Trending
        </h2>

        <MediaRow mediaData={trending.results} />

        <PlatformSection
          title="Films populaires"
          mediaData={popularMovies.results}
          platform="Films"
        />

        <PlatformSection
          title="Films les mieux notés"
          mediaData={topRatedMovies.results}
          platform="Films"
        />

        <PlatformSection
          title="Séries populaires"
          mediaData={popularTV.results}
          platform="Séries"
        />

        <PlatformSection
          title="Séries les mieux notées"
          mediaData={topRatedTV.results}
          platform="Séries"
        />

        <div className="mt-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            À venir
          </h2>

          <MediaRow mediaData={nowPlaying.results} />
        </div>
      </div>

      {/* ... */}

      {/* Appliquer le style de glass morphism transparent à tous les boutons */}
      <button className={cn(buttonVariants({ variant: 'ghost' }))}>Mon bouton</button>
      {/* ... */}
    </div>
  )
}

export default HomePage
export function HomePage() {
  return (
    <section>
      <div className="home-hero">
        <h1>Tato Streaming Front</h1>
        <p>
          Estrutura front-first aplicada com separacao clara por camadas: app,
          pages, widgets, features, entities e shared.
        </p>
      </div>

      <div className="home-grid">
        <article className="home-card">
          <strong>features</strong>
          <span>Regras de negocio por caso de uso (auth, search, watchlist).</span>
        </article>
        <article className="home-card">
          <strong>entities</strong>
          <span>Modelos centrais como user, media e playlist.</span>
        </article>
        <article className="home-card">
          <strong>shared</strong>
          <span>UI generica, api client, utilitarios, tipos e config.</span>
        </article>
      </div>
    </section>
  )
}

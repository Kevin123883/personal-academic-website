import Reveal from './Reveal.jsx'

export default function ResearchItem({ item }) {
  return (
    <Reveal as="article" className="research-item" id={item.id}>
      <span className="research-index" aria-hidden="true">
        {item.index}
      </span>
      <div className="research-body">
        <p className="label">{item.kind}</p>
        <h3 className="research-title">
          {item.title}
          {item.subtitle && <span className="research-subtitle">{item.subtitle}</span>}
        </h3>
        <p className="research-desc">{item.description}</p>
        <dl className="research-meta">
          {item.coauthors && (
            <div>
              <dt>Team</dt>
              <dd>{item.coauthors}</dd>
            </div>
          )}
          {item.status && (
            <div>
              <dt>Status</dt>
              <dd>{item.status}</dd>
            </div>
          )}
          {item.venues && (
            <div>
              <dt>Presented</dt>
              <dd>{item.venues}</dd>
            </div>
          )}
          {item.link && (
            <div>
              <dt>Link</dt>
              <dd>
                <a className="link" href={item.link.href} target="_blank" rel="noreferrer">
                  {item.link.label}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </Reveal>
  )
}

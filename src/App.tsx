import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock3,
  Instagram,
  Layers3,
  Send,
  Sparkles,
  Youtube,
  X,
} from 'lucide-react';
import { ProjectImage } from './components/ProjectImage';
import { site, type Project } from './content/site';
import './styles.css';

const year = new Date().getFullYear();

type SocialKey = keyof typeof site.social;
const socialName: Record<SocialKey, string> = {
  telegram: 'Telegram',
  instagram: 'Instagram',
  youtube: 'YouTube',
};

function isSafeExternalUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function Brand() {
  return (
    <div className="brand" aria-label="DN Collectibles">
      <span className="brand__monogram">DN</span>
      <span className="brand__name">Collectibles</span>
    </div>
  );
}

function SectionMarker({ status }: { status: 'done' | 'active' | 'planned' }) {
  return (
    <span className={`section-marker section-marker--${status}`} aria-hidden="true">
      {status === 'done' ? <Check size={22} strokeWidth={2.6} /> : status === 'active' ? <span className="play-shape" /> : null}
    </span>
  );
}

function SectionHeading({
  status,
  title,
  description,
  id,
}: {
  status: 'done' | 'active' | 'planned';
  id: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-heading">
      <SectionMarker status={status} />
      <div className="section-heading__text">
        <h2 id={id}>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

function FinishedCard({ project }: { project: Project }) {
  return (
    <article className="finished-card" aria-label={`${project.title} — завершённый проект`}>
      <ProjectImage src={project.image} alt={project.imageAlt} position={project.imagePosition} />
      <div className="finished-card__shade" aria-hidden="true" />
      <span className="finished-card__category">{project.category}</span>
      <div className="finished-card__bottom">
        <div className="finished-card__info">
          <h3>{project.title}</h3>
          {project.code && <p>{project.code}</p>}
        </div>
        <span className="finished-card__check" title="Завершено"><Check size={15} strokeWidth={2.8} /></span>
      </div>
    </article>
  );
}

function PlannedCard({ project }: { project: Project }) {
  return (
    <article className="planned-card">
      <ProjectImage src={project.image} alt={project.imageAlt} position={project.imagePosition} />
      <div className="planned-card__body">
        <span className="project-label">{project.category}</span>
        <h3>{project.title}</h3>
        {project.code ? <p className="project-code">{project.code}</p> : <p className="project-code">Анонс позже</p>}
        <span className="planned-card__state"><Clock3 size={13} /> В планах</span>
      </div>
    </article>
  );
}

function SocialLink({
  type,
  onMissing,
  variant = 'text',
}: {
  type: SocialKey;
  onMissing: (name: string) => void;
  variant?: 'text' | 'cta';
}) {
  const url = site.social[type];
  const label = socialName[type];
  const icon = type === 'telegram' ? <Send size={18} strokeWidth={1.8} /> : type === 'instagram' ? <Instagram size={18} /> : <Youtube size={19} />;
  const children = variant === 'cta' ? (
    <><span>Перейти в Telegram</span><ArrowUpRight size={19} strokeWidth={2} /></>
  ) : (
    <>{icon}<span>{label}</span></>
  );
  const className = variant === 'cta' ? 'telegram-banner__button' : 'footer__social-link';

  return isSafeExternalUrl(url) ? (
    <a href={url} className={className} target="_blank" rel="noopener noreferrer" aria-label={`Открыть ${label} DN Collectibles`}>
      {children}
    </a>
  ) : (
    <button type="button" className={className} onClick={() => onMissing(label)} title={`Ссылка на ${label} будет добавлена позже`}>
      {children}
    </button>
  );
}

function App() {
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!notice) return;
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setNotice(null);
    }
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [notice]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#content">Перейти к содержимому</a>

      <header className="site-header">
        <div className="container site-header__inner">
          <Brand />
          <nav aria-label="Основная навигация">
            <a href="#content" aria-current="page" className="nav-link nav-link--active">Роадмап</a>
          </nav>
          <div className="header__balance" aria-hidden="true" />
        </div>
      </header>

      <main className="container" id="content">
        <section className="hero" aria-labelledby="page-heading">
          <span className="hero__eyebrow"><span className="hero__rule" /> DN COLLECTIBLES</span>
          <h1 id="page-heading">{site.heading}</h1>
          <p>{site.intro}</p>
          <span className="hero__watermark" aria-hidden="true">DN</span>
        </section>

        <div className="timeline" aria-label="Статусы проектов">
          <section className="timeline-section timeline-section--done" aria-labelledby="finished-heading">
            <SectionHeading id="finished-heading" status="done" title="Последние завершённые проекты" description="Коллекции, которые уже созданы и готовы." />
            <div className="timeline-section__content">
              <div className="completed-grid">
                {site.completed.slice(0, 3).map(project => <FinishedCard key={project.id} project={project} />)}
              </div>
            </div>
          </section>

          <section className="timeline-section timeline-section--active" aria-labelledby="active-heading">
            <SectionHeading id="active-heading" status="active" title="В работе" description="Фигурки, над которыми сейчас идёт работа." />
            <div className="timeline-section__content active-list">
              {site.active.map(project => (
                <article className="active-card" key={project.id}>
                  <ProjectImage src={project.image} alt={project.imageAlt} position={project.imagePosition} className="active-card__art" />
                  <div className="active-card__details">
                    <div className="active-card__topline"><span className="project-label">{project.category}</span><span className="active-status"><span /> Сейчас в работе</span></div>
                    <h3>{project.title}</h3>
                    {project.code && <p className="project-code">{project.code}</p>}
                    {project.progressPercent !== undefined ? (
                      <div className="active-progress" aria-label={`Готовность ${project.progressPercent}%`}>
                        <div className="active-progress__row"><span>Прогресс проекта</span><strong>{project.progressPercent}%</strong></div>
                        <div className="active-progress__track"><span style={{ width: `${Math.min(100, Math.max(0, project.progressPercent))}%` }} /></div>
                      </div>
                    ) : !project.currentStage ? (
                      <div className="active-card__status-note"><Layers3 size={17} /> Этапы будут обновляться по мере работы</div>
                    ) : null}
                    {project.currentStage && (
                      <div className="active-stage" aria-label={`Текущий этап: ${project.currentStage}`}>
                        <span className="active-stage__label"><b>Текущий этап</b></span>
                        <span className="active-stage__badge">{project.currentStage}</span>
                      </div>
                    )}
                  </div>
                  <div className="active-card__decoration" aria-hidden="true"><span>DN</span></div>
                </article>
              ))}
            </div>
          </section>

          <section className="timeline-section timeline-section--planned" aria-labelledby="planned-heading">
            <SectionHeading id="planned-heading" status="planned" title="В планах" description="Следующие фигурки и идеи, которые хотим воплотить." />
            <div className="timeline-section__content">
              <div className="planned-grid">
                {site.planned.map(project => <PlannedCard project={project} key={project.id} />)}
              </div>
            </div>
          </section>
        </div>

        <section className="telegram-banner" aria-labelledby="telegram-heading">
          <span className="telegram-banner__icon"><Send size={31} strokeWidth={1.6} /></span>
          <span className="telegram-banner__rule" aria-hidden="true" />
          <div className="telegram-banner__copy">
            <span className="telegram-banner__eyebrow"><Sparkles size={14} /> ВАШЕ МНЕНИЕ ВАЖНО</span>
            <h2 id="telegram-heading">Влияйте на будущие фигурки!</h2>
            <p>Предлагайте персонажей, участвуйте в голосованиях и следите за процессом создания в нашем Telegram-канале.</p>
          </div>
          <SocialLink type="telegram" variant="cta" onMissing={setNotice} />
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__identity"><Brand /><p>Авторские коллекционные фигурки</p></div>
          <div className="footer__socials" aria-label="Наши социальные сети">
            <SocialLink type="telegram" onMissing={setNotice} />
            <SocialLink type="instagram" onMissing={setNotice} />
            <SocialLink type="youtube" onMissing={setNotice} />
          </div>
        </div>
        <div className="container footer__bottom"><span>© {year} DN Collectibles</span><span>Сделано с вниманием к деталям!</span></div>
      </footer>

      {notice && (
        <div className="dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setNotice(null); }}>
          <div className="notice-dialog" role="dialog" aria-modal="true" aria-labelledby="notice-title" aria-describedby="notice-description">
            <button className="notice-dialog__close" type="button" onClick={() => setNotice(null)} aria-label="Закрыть"><X size={19} /></button>
            <div className="notice-dialog__icon"><CheckCircle2 size={25} /></div>
            <h2 id="notice-title">{notice} — скоро</h2>
            <p id="notice-description">Ссылка пока не добавлена. После публикации адреса этот переход станет доступен.</p>
            <button className="notice-dialog__ok" type="button" onClick={() => setNotice(null)}>Понятно</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

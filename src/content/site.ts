/**
 * Single place to edit the roadmap and links.
 * Images live in public/images/. Replace the preview files with your own photos
 * and update `image` below. No backend is needed.
 */
export type Category = 'Музыканты' | 'Аниме' | 'Игры' | 'Фильмы и сериалы' | 'Авторские';
export type Project = {
  id: string;
  title: string;
  code?: string;
  category: Category;
  image: string;
  imagePosition?: string;
  imageAlt: string;
  description?: string;
};

export type ActiveProject = Project & {
  /** Set a number from 0 to 100 to show a progress bar. Leave unset until verified. */
  progressPercent?: number;
  /** Optional confirmed current stage, e.g. '3D-модель' or 'Покраска'. */
  currentStage?: string;
};

/**
 * Explicit site-wide data shape. Array entries are intentionally typed as
 * Project/ActiveProject so optional fields can be added or omitted without
 * making React infer incompatible unions.
 */
export type SiteContent = {
  brand: string;
  heading: string;
  intro: string;
  social: {
    telegram: string;
    instagram: string;
    youtube: string;
  };
  completed: Project[];
  active: ActiveProject[];
  planned: Project[];
};

export const site: SiteContent = {
  brand: 'DN Collectibles',
  heading: 'Роадмап',
  intro: 'Актуальные проекты: что уже завершено, над чем работаем сейчас и какие фигурки появятся дальше.',
  /** Official DN Collectibles social media links. */
  social: {
    telegram: 'https://t.me/DeNoctisHome',
    instagram: 'https://www.instagram.com/denoctiss/',
    youtube: 'https://www.youtube.com/@denoctis9378',
  },
  /** Latest first. The UI displays a maximum of 3 completed projects. */
  completed: [
    {
      id: 'tritia',
      title: 'TRITIA',
      code: 'MUS-0001 — MUS-0003',
      category: 'Музыканты',
      image: '/images/tritia-preview.webp',
      imagePosition: 'center 45%',
      imageAlt: 'Готовые фигурки TRITIA: Иван с гитарой, Слава с микрофоном и Андрей с барабанными палочками',
    },
  ],
  active: [
    {
      id: 'punkdepo',
      title: 'PUNKDEPO',
      code: 'MUS-0009 — MUS-0010',
      category: 'Музыканты',
      image: '/images/punkdepo-preview.webp',
      imagePosition: 'center 41%',
      imageAlt: 'Концепты фигурок PUNKDEPO: Игорь с бирюзовой гитарой и Руслан с микрофоном',
      currentStage: 'Создание 3D-модели',
    },
  ],
  planned: [
    {
      id: 'hatters',
      title: 'The Hatters',
      code: 'MUS-0004 — MUS-0008',
      category: 'Музыканты',
      image: '/images/hatters-preview.webp',
      imagePosition: 'center 40%',
      imageAlt: 'Логотип The Hatters',
    },
    {
      id: 'gojo',
      title: 'Сатору Годжо',
      category: 'Аниме',
      image: '/images/gojo-preview.webp',
      imagePosition: 'center 42%',
      imageAlt: 'Сатору Годжо в повязке на глазах',
    },
    {
      id: 'tdd',
      title: 'Три Дня Дождя',
      code: 'MUS-0011 — MUS-0014',
      category: 'Музыканты',
      image: '/images/tdd-preview.webp',
      imagePosition: 'center 44%',
      imageAlt: 'Логотип Три Дня Дождя',
    },
  ],
};

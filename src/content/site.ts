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

export const site = {
  brand: 'DN Collectibles',
  heading: 'Роадмап',
  intro: 'Актуальные проекты: что уже завершено, над чем работаем сейчас и какие фигурки появятся дальше.',
  /** Put your real public URLs here. Empty strings show a non-misleading placeholder. */
  social: {
    telegram: '',
    instagram: '',
    youtube: '',
  },
  /** Latest first. The UI displays a maximum of 3 completed projects. */
  completed: [
    {
      id: 'tritia',
      title: 'TRITIA',
      code: 'MUS-0001 — MUS-0003',
      category: 'Музыканты',
      image: '/images/tritia-preview.webp',
      imagePosition: 'center 40%',
      imageAlt: 'Временная иллюстрация серии фигурок TRITIA',
    },
  ] satisfies Project[],
  active: [
    {
      id: 'punkdepo',
      title: 'PUNKDEPO',
      code: 'MUS-0009 — MUS-0010',
      category: 'Музыканты',
      image: '/images/punkdepo-preview.webp',
      imagePosition: 'center 41%',
      imageAlt: 'Временная иллюстрация будущих фигурок PUNKDEPO',
      // Set progressPercent and currentStage after you confirm real status.
    },
  ] satisfies ActiveProject[],
  planned: [
    {
      id: 'hatters',
      title: 'The Hatters',
      code: 'MUS-0004 — MUS-0008',
      category: 'Музыканты',
      image: '/images/hatters-preview.webp',
      imagePosition: 'center 40%',
      imageAlt: 'Временная иллюстрация The Hatters',
    },
    {
      id: 'gojo',
      title: 'Сатору Годжо',
      category: 'Аниме',
      image: '/images/gojo-preview.webp',
      imagePosition: 'center 42%',
      imageAlt: 'Временная иллюстрация фигурки Сатору Годжо',
    },
    {
      id: 'tdd',
      title: 'Три Дня Дождя',
      code: 'MUS-0011 — MUS-0014',
      category: 'Музыканты',
      image: '/images/tdd-preview.webp',
      imagePosition: 'center 44%',
      imageAlt: 'Временная иллюстрация проекта Три Дня Дождя',
    },
  ] satisfies Project[],
} as const;

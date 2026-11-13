# DN Collectibles — Roadmap

Одностраничный адаптивный React + TypeScript + Vite сайт по последнему согласованному дизайну.

## Запуск

Требуется Node.js 20.19+ / 22+.

```bash
npm install
npm run dev
```

Открой адрес из терминала (обычно http://localhost:5173).

Проверка и сборка:

```bash
npm run typecheck
npm run build
npm run preview
```

Готовый статический сайт лежит в `dist/`. Backend и база данных не нужны.

## Где менять содержимое

**`src/content/site.ts`** — единственный файл для редактирования контента:

- `completed` — завершённые проекты (последние первыми, выводится максимум 3).
- `active` — текущие проекты (процент *не* указан, пока нет реальных данных). Для отображения прогресса добавь `progressPercent: 50` (реальный процент) и при необходимости `currentStage`.
- `planned` — будущие релизы.
- `social` — ссылки на Telegram, Instagram и YouTube. Telegram-кнопка «Влияйте на будущие фигурки!» использует тот же адрес, что и футер.

## Замена иллюстраций

В `public/images/` актуальные изображения пяти проектов (TRITIA, PUNKDEPO, The Hatters, Сатору Годжо и Три Дня Дождя). Заменить изображения можно без изменения компонентов:

1. Скопируй реальные картинки в `public/images/`, например `tritia.webp`, `punkdepo.webp`, `hatters.webp`, `gojo.webp`, `tdd.webp`.
2. В `src/content/site.ts` обнови только поле `image` конкретного проекта, например `image: '/images/tritia.webp'`.
3. Отправь изменения в `main`.

Рекомендуемый размер изображения 1200×700 px, WebP / AVIF (допускается JPG/PNG).

## Нумерация

TRITIA: MUS-0001—0003. The Hatters: MUS-0004—0008. PUNKDEPO: MUS-0009—0010. Три Дня Дождя: MUS-0011—0014. Для Сатору Годжо номер серии музыкантов не назначается.

## Публикация на VPS

Если Nginx обслуживает статические файлы из `/var/www/collectibles`, сборку можно перенести туда:

```bash
npm run build
sudo mkdir -p /var/www/collectibles
sudo rsync -av --delete dist/ /var/www/collectibles/
```

Настрой отдельный `server_name collectibles.denoctis.ru;`, DNS-запись A на VPS, Certbot SSL. Не запускай новый сайт в существующей папке Workshop — проекты должны быть независимы.

## GitHub Actions

Пример автоматического CI/CD для Vite на VPS — `.github/workflows/deploy.yml.example`. После первого `npm install` закоммить `package-lock.json` и можешь заменить `npm install` в workflow на `npm ci`. Скопируй файл в `.github/workflows/deploy.yml` и добавь GitHub Actions Secrets перед включением. Это отдельный workflow и отдельный каталог `/var/www/collectibles/`, его нельзя запускать с секретами Workshop без осознанной настройки серверных разрешений.

## Примечания

- Сайт пока состоит только из страницы «Роадмап», без главной и без формы заказа, как и согласовано.
- Никаких придуманных Telegram/Instagram/YouTube URL в коде нет.
- Продажи и формы заказа можно добавить позднее.

## Обновление 13.11.2026

- Все пять обложек заменены на файлы, предоставленные пользователем (WebP-версии для веба).
- PUNKDEPO: отображается «Текущий этап: Создание 3D-модели», процент выполнения не придуман.
- В футере активированы Telegram, Instagram, YouTube. Кнопка предложения следующих фигурок ведёт на https://t.me/DeNoctisHome.
- Тексты заголовков, описаний, названий проектов и кодов MUS не изменены.

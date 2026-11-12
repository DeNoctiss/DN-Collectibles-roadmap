import { useState } from 'react';
import { ImageIcon } from 'lucide-react';

type ProjectImageProps = {
  src: string;
  alt: string;
  position?: string;
  className?: string;
};

/** Missing future files gracefully fall back without breaking the page. */
export function ProjectImage({ src, alt, position, className = '' }: ProjectImageProps) {
  const [failed, setFailed] = useState(false);
  const imageUrl = `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`;

  return (
    <div className={`project-image ${className}`}>
      {failed ? (
        <div className="project-image__fallback" role="img" aria-label={alt}>
          <ImageIcon size={30} strokeWidth={1.2} />
          <span>Изображение скоро</span>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          style={{ objectPosition: position ?? 'center' }}
        />
      )}
    </div>
  );
}

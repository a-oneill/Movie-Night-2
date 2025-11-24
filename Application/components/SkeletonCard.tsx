import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="ui-card ui-skeleton">
      <div className="ui-card__poster ui-skeleton__poster">
        <div className="ui-skeleton__shimmer" />
      </div>
      <div className="ui-skeleton__text">
        <div className="ui-skeleton__title" />
        <div className="ui-skeleton__meta" />
      </div>
    </div>
  );
};

interface SkeletonRowProps {
  count?: number;
}

export const SkeletonRow: React.FC<SkeletonRowProps> = ({ count = 14 }) => {
  return (
    <section className="ui-row">
      <div className="ui-row__header">
        <div className="ui-skeleton__title-large" />
      </div>
      <div className="ui-row__carousel">
        {Array.from({ length: count }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </section>
  );
};

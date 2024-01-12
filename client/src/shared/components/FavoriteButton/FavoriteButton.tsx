'use client';

import { FC } from 'react';
import clsx from 'clsx';
import styles from './FavoriteButton.module.scss';
import { HeartIcon } from '@/assets/icons/HeartIcon/HeartIcon';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import {
  createFavorite,
  deleteFavorite,
} from '@/store/favorite/favorite.slice';

interface FavoriteButtonProps {
  className?: string;
  productId: number;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  className,
  productId,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  const favorite = items.find((item) => item.product.id === productId);

  const handleToggleFavorite = async () => {
    if (favorite) {
      dispatch(deleteFavorite(favorite.id));
    } else {
      dispatch(createFavorite(productId));
    }
  };

  return user ? (
    <button
      className={clsx(styles.button, [className])}
      onClick={handleToggleFavorite}
    >
      <HeartIcon
        className={clsx(styles.button_icon, {
          [styles.button_active]: favorite,
        })}
      />
    </button>
  ) : null;
};

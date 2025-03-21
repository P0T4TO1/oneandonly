import { FC } from "react";
import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";
import styles from "./ProductSlideshow.module.css";

interface Props {
  images: string[];
}

const properties = {
  duration: 7000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
  easing: "ease",
};

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <Slide {...properties}>
      {images.map((image) => {
        return (
          <div className={styles["each-slide"]} key={image}>
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};

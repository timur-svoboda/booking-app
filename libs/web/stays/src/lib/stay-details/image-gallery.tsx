import { StayDto } from '@booking-app/shared/dtos';
import { Box, Center, Image, Text } from '@chakra-ui/react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './image-gallery.module.scss';

/* eslint-disable-next-line */
export interface ImageGalleryProps {
  images: StayDto['images'];
}

export function ImageGallery(props: ImageGalleryProps) {
  return (
    <Swiper
      className={styles['swiper']}
      modules={[Navigation, Pagination]}
      navigation
    >
      {props.images.map((image) => (
        <SwiperSlide key={image.mainUrl}>
          <Box position="relative" width="100%" height="400px">
            <Image
              src={image.mainUrl}
              alt={image.description}
              width="100%"
              height="100%"
              objectFit="cover"
              userSelect="none"
            />
            {image.description.length !== 0 && (
              <Box
                position="absolute"
                left="0"
                bottom="0"
                width="100%"
                p="2"
                backgroundColor="blackAlpha.500"
              >
                <Center>
                  <Text color="white">{image.description}</Text>
                </Center>
              </Box>
            )}
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Text } from '@kuma-ui/core';
import { motion } from 'framer-motion';

import ArrowRight from './icons/ArrowRight';
import { BreadcrumbItem } from '@/types/breadcrumb';


interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const router = useRouter();

  const handleBreadcrumbClick = (route: string) => {
    const absoluteRoute = `${route}`;
    router.push(absoluteRoute);
  };

  return (
    <Flex alignItems="center" color="colors.primary.default">
      {items.map((item, index) => (
        <React.Fragment key={item.route}>
          <motion.div
            whileHover={{ scale: index === items.length - 1 ? 1 : 1.1 }}
            whileTap={{ scale: index === items.length - 1 ? 1 : 0.9 }}
            style={{ display: 'inline-block' }}
          >
            <Text
              color={index === items.length - 1 ? 'colors.onSurface.lv2' : 'colors.primary.default'}
              cursor={index === items.length - 1 ? 'default' : 'pointer'}
              onClick={index === items.length - 1 ? undefined : () => handleBreadcrumbClick(item.route)}
            >
              {item.name}
            </Text>
          </motion.div>
          {index < items.length - 1 && (
            <ArrowRight width="16px" height="16px" color={index === items.length - 1 ? 'colors.onSurface.lv2' : 'colors.primary.default'} />
          )}
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default Breadcrumb;

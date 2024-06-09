import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Text } from '@kuma-ui/core'
import ArrowRight from './icons/ArrowRight'
import { BreadcrumbItem } from '@/types/breadcrumb'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const router = useRouter()

  const handleBreadcrumbClick = (route: string) => {
    const absoluteRoute = `${route}`
    router.push(absoluteRoute)
  }

  return (
    <Flex alignItems="center">
      {items.map((item, index) => (
        <React.Fragment key={item.route}>
          <Text
            color={index === items.length - 1 ? 'gray' : 'blue'}
            cursor={index === items.length - 1 ? 'default' : 'pointer'}
            onClick={index === items.length - 1 ? undefined : () => handleBreadcrumbClick(item.route)}
          >
            {item.name}
          </Text>
          {index < items.length - 1 && <ArrowRight width="16px" height="16px" />}
        </React.Fragment>
      ))}
    </Flex>
  )
}

export default Breadcrumb

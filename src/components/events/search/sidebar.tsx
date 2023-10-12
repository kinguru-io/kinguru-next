import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  FormControl,
  Select,
  Image
} from '@chakra-ui/react'
import {Facet, Sorting} from '@elastic/react-search-ui'
import Link from 'next/link'
import {MultiCheckboxFacet} from 'components/events/facets'
import {useLocale} from 'utils/use-locale'

export interface SidebarProps extends BoxProps {
  onClose(): void
}

export function Sidebar({onClose, ...rest}: SidebarProps) {
  const {t} = useLocale()
  const SORT_OPTIONS = [
    {
      name: t('events.sort_by_relevance'),
      value: []
    },
    {
      name: t('events.sort_by_start_date'),
      value: [
        {
          field: 'starts',
          direction: 'asc'
        }
      ]
    }
  ]
  return (
    <Box
      h="full"
      pos="fixed"
      transition="3s ease"
      w={{base: 'full', md: 60}}
      {...rest}
    >
      <Flex alignItems="center" h="20" justifyContent="space-between" mx="8">
        <Box as={Link} href="/" mx="auto">
          <Image alt={t('company')} src="/img/logo_header.png" />
        </Box>
        <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose} />
      </Flex>
      <Sorting
        label={t('event.sorting')}
        sortOptions={SORT_OPTIONS}
        view={(props) => (
          <FormControl m="auto" pb={2} w="90%">
            <Select
              onChange={(event) =>
                event.target.value !== undefined
                  ? props.onChange(event.target.value)
                  : null
              }
              placeholder={props.label}
            >
              {props.options.map((option) => (
                <option
                  key={option.label}
                  data-transaction-name="sorting"
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
      />
      <Facet
        field="tags.keyword"
        label={t('events.search_tags')}
        view={MultiCheckboxFacet}
      />
      <Facet
        field="starts"
        label={t('events.search_starts')}
        view={MultiCheckboxFacet}
      />
      <Facet
        field="price"
        label={t('events.search_price')}
        view={MultiCheckboxFacet}
      />
    </Box>
  )
}

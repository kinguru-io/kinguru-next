import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  SimpleGrid,
  useDisclosure
} from '@chakra-ui/react'
import {
  ErrorBoundary,
  Paging,
  Results,
  SearchProvider,
  WithSearch
} from '@elastic/react-search-ui'
import {Layout} from '@elastic/react-search-ui-views'
import {ResultsViewProps} from '@elastic/react-search-ui-views/lib/esm/Results'
import moment from 'moment/moment'
import Pagination from 'rc-pagination'
import {memo} from 'react'
import {BiArrowToLeft, BiArrowToRight} from 'react-icons/bi'
import {EventCard} from 'components/common/cards/eventCard'
import {NavSidebar} from 'components/events/search/nav'
import {Sidebar} from 'components/events/search/sidebar'
import {FooterSection} from 'components/footer'

function SearchView({config}: {config: any}) {
  const {isOpen, onClose, onOpen} = useDisclosure()
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({wasSearched}) => ({
          wasSearched
        })}
      >
        {() => (
          <ErrorBoundary>
            <Layout
              bodyContent={
                <Box ml={{base: 0, md: 60}} pt={24}>
                  <Results
                    resultView={({result}) => (
                      <EventCard
                        key={result.id.raw}
                        event={{
                          takenPlace: moment().isAfter(
                            moment(0).add(result.starts.raw, 'days')
                          ),
                          starts: moment(0)
                            .add(result.starts.raw / 1000, 'milliseconds')
                            .toDate(),
                          id: result.id.raw,
                          topic: result.topic.raw,
                          poster: result.poster.raw,
                          description: result.description.raw
                        }}
                      />
                    )}
                    shouldTrackClickThrough
                    thumbnailField="poster"
                    titleField="topic"
                    urlField="id"
                    view={(props: ResultsViewProps) => (
                      <SimpleGrid columns={[1, 2, 2, 3, 3, 4]} spacingY={5}>
                        {props.children}
                      </SimpleGrid>
                    )}
                  />
                </Box>
              }
              bodyFooter={
                <>
                  <Box ml={{base: 0, md: 60}} pt={24}>
                    <Paging
                      view={(props) => (
                        <Pagination
                          current={props.current}
                          defaultCurrent={1}
                          itemRender={(_, __, element) => (
                            <Button mx={1}>{element}</Button>
                          )}
                          nextIcon={<BiArrowToRight />}
                          onChange={props.onChange}
                          onShowSizeChange={() => {}}
                          pageSize={props.resultsPerPage}
                          pageSizeOptions={['20', '40', '60']}
                          prevIcon={<BiArrowToLeft />}
                          showLessItems
                          showPrevNextJumpers={false}
                          showSizeChanger
                          style={{
                            listStyleType: 'none',
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            marginBottom: '10px'
                          }}
                          total={
                            props.totalPages * (props.resultsPerPage || 20)
                          }
                        />
                      )}
                    />
                  </Box>
                  <FooterSection />
                </>
              }
              header={
                <>
                  <Drawer
                    isOpen={isOpen}
                    onClose={onClose}
                    onOverlayClick={onClose}
                    placement="left"
                    returnFocusOnClose={false}
                    size="full"
                  >
                    <DrawerContent>
                      <Sidebar onClose={onClose} />
                    </DrawerContent>
                  </Drawer>
                  <NavSidebar onOpen={onOpen} />
                  <Sidebar
                    display={{base: 'none', md: 'block'}}
                    onClose={() => onClose}
                  />
                </>
              }
            />
          </ErrorBoundary>
        )}
      </WithSearch>
    </SearchProvider>
  )
}

export const Search = memo<{config: any}>(SearchView)

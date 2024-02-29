import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ErrorBoundary,
  Paging,
  Results,
  SearchProvider,
  WithSearch,
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import moment from "moment/moment";
import Pagination from "rc-pagination";
import { memo } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { EventCard } from "@/components/common/cards/eventCard.tsx";
import { NavSidebar } from "@/components/events/search/nav.tsx";
import { Sidebar } from "@/components/events/search/sidebar.tsx";
import { Footer } from "@/components/Footer";

export const Search = memo<{ config: any }>(({ config }) => {
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched }) => ({
          wasSearched,
        })}
      >
        {() => {
          const { isOpen, onOpen, onClose } = useDisclosure();
          return (
            <ErrorBoundary>
              <Layout
                header={
                  <>
                    <Drawer
                      isOpen={isOpen}
                      placement="left"
                      onClose={onClose}
                      returnFocusOnClose={false}
                      onOverlayClick={onClose}
                      size="full"
                    >
                      <DrawerContent>
                        <Sidebar onClose={onClose} />
                      </DrawerContent>
                    </Drawer>
                    <NavSidebar onOpen={onOpen} />
                    <Sidebar
                      onClose={() => onClose}
                      display={{ base: "none", md: "block" }}
                    />
                  </>
                }
                bodyContent={
                  <Box ml={{ base: 0, md: 60 }} pt={24}>
                    <Results
                      view={(props) => {
                        return (
                          <SimpleGrid columns={[1, 2, 2, 3, 3, 4]} spacingY={5}>
                            {props.children}
                          </SimpleGrid>
                        );
                      }}
                      resultView={({ result }) => {
                        return (
                          <EventCard
                            key={result.id.raw}
                            event={{
                              takenPlace: moment().isAfter(
                                moment(0).add(result.starts.raw, "days"),
                              ),
                              starts: moment(0)
                                .add(result.starts.raw / 1000, "milliseconds")
                                .toDate(),
                              id: result.id.raw,
                              topic: result.topic.raw,
                              poster: result.poster.raw,
                              description: result.description.raw,
                              placeId: result.placeId.raw,
                            }}
                          />
                        );
                      }}
                      titleField="topic"
                      urlField="id"
                      thumbnailField="poster"
                      shouldTrackClickThrough={true}
                    />
                  </Box>
                }
                bodyFooter={
                  <>
                    <Box ml={{ base: 0, md: 60 }} pt={24}>
                      <Paging
                        view={(props) => {
                          return (
                            <Pagination
                              style={{
                                listStyleType: "none",
                                display: "flex",
                                width: "100%",
                                justifyContent: "center",
                                marginBottom: "10px",
                              }}
                              onShowSizeChange={() => {}}
                              showSizeChanger={true}
                              current={props.current}
                              onChange={props.onChange}
                              pageSize={props.resultsPerPage}
                              pageSizeOptions={["20", "40", "60"]}
                              total={
                                props.totalPages * (props.resultsPerPage || 20)
                              }
                              defaultCurrent={1}
                              showLessItems={true}
                              itemRender={(_, __, element) => {
                                return <Button mx={1}>{element}</Button>;
                              }}
                              showPrevNextJumpers={false}
                              nextIcon={<BiArrowToRight />}
                              prevIcon={<BiArrowToLeft />}
                            />
                          );
                        }}
                      />
                    </Box>
                    <Footer />
                  </>
                }
              />
            </ErrorBoundary>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
});

import {
  Button,
  HStack,
  Image,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Tr,
  useToast,
  VStack
} from '@chakra-ui/react'
import {useRouter} from 'next/navigation'
import {Dispatch, SetStateAction} from 'react'
import {z} from 'zod'
import {EventDateAndPlaceSchema} from 'components/events/create/NewEventDateAndPlace'
import {EventDetailsSchema} from 'components/events/create/NewEventDetails'
import {trpc} from 'utils/trpc'
import {useLocale} from 'utils/use-locale'

export function NewEventReview({
  activeStep,
  dateAndPlace,
  details,
  setActiveStep
}: {
  details?: z.infer<typeof EventDetailsSchema>
  dateAndPlace?: z.infer<typeof EventDateAndPlaceSchema>
  activeStep?: number
  setActiveStep?: Dispatch<SetStateAction<number>>
}) {
  const {t} = useLocale()
  const toast = useToast()
  const {isLoading, mutateAsync: createEvent} =
    trpc.event.createEvent.useMutation()
  const {data: featuredPlace} = trpc.places.get.useQuery({
    placeId: dateAndPlace?.placeId || ''
  })
  const router = useRouter()
  return (
    <VStack>
      <TableContainer mx="auto" my={15} w={['full', 'full', '50%']}>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td>{t('events.new_event_topic')}</Td>
              <Td>{details?.topic}</Td>
            </Tr>
            <Tr>
              <Td>{t('events.new_event_description')}</Td>
              <Td>{details?.description}</Td>
            </Tr>
            <Tr>
              <Td>{t('events.new_event_tags')}</Td>
              <Td>
                {details?.tags?.map((tag) => (
                  <Tag key={tag} mr={1}>
                    {tag}
                  </Tag>
                ))}
              </Td>
            </Tr>
            <Tr>
              <Td>{t('events.new_event_ticket_price')}</Td>
              <Td>{details?.price}</Td>
            </Tr>
            <Tr>
              <Td>{t('events.new_event_poster')}</Td>
              <Td>
                <Image src={details?.poster} w={180} />
              </Td>
            </Tr>
            <Tr>
              <Td>{t('events.new_event_date_time')}</Td>
              <Td>
                {dateAndPlace?.date} {dateAndPlace?.time}
              </Td>
            </Tr>
            <Tr>
              <Td>{t('events.new_event_guests_num')}</Td>
              <Td>{dateAndPlace?.guests}</Td>
            </Tr>
            <Tr>
              <Td>{t('events.new_event_place')}</Td>
              <Td>{featuredPlace?.location}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack justifyContent="center" w="full">
        {activeStep !== 0 ? (
          <Button
            onClick={() => {
              setActiveStep?.((activeStep || 0) - 1)
            }}
            variant="secondary"
          >
            {t('events.new_event_prev')}
          </Button>
        ) : null}
        <Button
          isLoading={isLoading}
          onClick={() => {
            try {
              void createEvent({
                ...EventDetailsSchema.parse(details),
                ...EventDateAndPlaceSchema.parse(dateAndPlace)
              }).then(({id}) => {
                toast({
                  title: t('events.new_event_was_created'),
                  description: t('events.new_event_was_created_description'),
                  status: 'success',
                  duration: 9000,
                  isClosable: true
                })
                router.push(`/events/${id}`)
              })
            } catch (e) {
              toast({
                title: t('events.new_event_was_not_created'),
                description: t('events.new_event_was_not_created_description'),
                status: 'error',
                duration: 9000,
                isClosable: true
              })
            }
          }}
          variant="primary"
        >
          {t('events.new_event_create_event')}
        </Button>
      </HStack>
    </VStack>
  )
}
